const { GoogleGenerativeAI } = require('@google/generative-ai');  
require('dotenv').config(); 
const SalonModel = require('../models/salonModel');  

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class AIService {
  static async generateResponse(prompt) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return text || 'Sorry, I could not generate a response.';
    } catch (error) {
      console.error('Error generating response:', error);
      return 'Sorry, something went wrong while generating the response.';
    }
  }

  static async getServicesResponse() {
    try {
      const services = await SalonModel.getServices(); 
      if (!services || services.length === 0) {
        return 'Sorry, no services are available at the moment.';
      }
      const serviceNames = services.map(service => `• ${service.name}: ${service.description} (${service.duration} mins, $${service.price})`);
      return `We offer the following services:\n\n${serviceNames.join('\n')}\n\nHow can I assist you further?`;
    } catch (error) {
      console.error('Error fetching services:', error);
      return 'Sorry, we could not retrieve the services at the moment. Please try again later.';
    }
  }
  static async getAvailabilityResponse(date) {
    try {
      if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        date = new Date().toISOString().split('T')[0];  
      }

      const availability = await SalonModel.getAvailability(date);
      if (!availability || availability.availableSlots.length === 0) {
        return `Sorry, there are no available slots on ${new Date(date).toLocaleDateString()}. Would you like to check another date?`;
      }
      return `Available slots on ${new Date(date).toLocaleDateString()}:\n\n` +
             availability.availableSlots.map(slot => `• ${slot}`).join('\n') +
             `\n\nWould you like to book an appointment?`;
    } catch (error) {
      console.error('Error fetching availability:', error);
      return 'Sorry, we could not retrieve availability at the moment. Please try again later.';
    }
  }
  static async getCustomAnswer(prompt) {
    try {
      const lowerPrompt = prompt.toLowerCase();
      if (lowerPrompt.includes("services") || 
          lowerPrompt.includes("offer") || 
          lowerPrompt.includes("provide") ||
          lowerPrompt.includes("what do you")) {
        return await this.getServicesResponse();
      } 
      else if (lowerPrompt.includes("available") || 
               lowerPrompt.includes("slots") || 
               lowerPrompt.includes("appointment") ||
               lowerPrompt.includes("booking")) {
        const dateMatch = prompt.match(/\d{4}-\d{2}-\d{2}/) || 
                         prompt.match(/\d{2}\/\d{2}\/\d{4}/) ||
                         prompt.match(/\b(today|tomorrow)\b/i);
        
        let date = new Date().toISOString().split('T')[0];
        if (dateMatch) {
          if (dateMatch[0].toLowerCase() === 'tomorrow') {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            date = tomorrow.toISOString().split('T')[0];
          } else {
            date = new Date(dateMatch[0]).toISOString().split('T')[0];
          }
        }
        
        return await this.getAvailabilityResponse(date);
      } 
      else {
        const enhancedPrompt = `You are a helpful assistant for a beauty salon. 
          Respond professionally and helpfully to this query: "${prompt}". 
          Keep responses concise (1-2 paragraphs max). 
          If the query is not salon-related, politely indicate you can only answer beauty/salon questions.`;
        
        return await this.generateResponse(enhancedPrompt);
      }
    } catch (error) {
      console.error('Error processing custom answer:', error);
      return 'Sorry, something went wrong while processing your request. Please try again.';
    }
  }
}

module.exports = AIService;