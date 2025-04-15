const AIService = require('./aiService');
const UserModel = require('../models/userModel');
const ConversationModel = require('../models/conversationModel');
const SalonService = require('./salonService');

class MemoryService {
  static async processOnboarding(sessionId, query) {
    let user = await UserModel.getBySessionId(sessionId);
    if (!user) {
      await UserModel.initializeSession(sessionId);
      return "Welcome to BeautiGenie! May I know your name please?";
    }
    if (user.onboarding_step === 'name') {
      await UserModel.updateTempName(sessionId, query);
      await UserModel.updateOnboardingStep(sessionId, 'age');
      await ConversationModel.store(sessionId, "User name request", query, { step: 'name_response' });

      return `Nice to meet you, ${query}! Could you tell me your age?`;
    }

    if (user.onboarding_step === 'age') {
      const age = parseInt(query);
      if (isNaN(age)) {
        return "Please enter a valid age (number).";
      }

      const nameResponse = await ConversationModel.getRelevant(sessionId, query);
      let name = 'there'; 
      if (nameResponse && nameResponse.length > 0) {
        const response = nameResponse[0];
        if (response.metadata?.step === 'name_response') {
          name = response.query;
        }
      }
      await UserModel.finalizeUser(sessionId, name, age);
      await UserModel.updateOnboardingStep(sessionId, 'complete');

      return `Thank you, ${name}! How can I assist you with our beauty services today?`;
    }

    return await this.processRegularQuery(sessionId, query, user);
  }

  static async processRegularQuery(sessionId, query, user) {
    const pastConversations = await ConversationModel.getRelevant(sessionId, query);
    const services = await SalonService.getServices();

    let context = `You are BeautiGenie, a friendly beauty salon assistant. Current user: ${user.name}, ${user.age} years old.\n\n`;
    context += `Available Services:\n${services.map(s => `- ${s.name}: ${s.description} (${s.duration} mins, $${s.price})`).join('\n')}\n\n`;

    if (pastConversations?.length > 0) {
      context += "Previous Conversations:\n";
      pastConversations.forEach((conv, i) => {
        context += `${i + 1}. User: ${conv.query}\n   Bot: ${conv.response}\n`;
      });
    }

    const prompt = `${context}\n\nUser: ${query}\nBeautiGenie:`;

    const response = await AIService.generateResponse(prompt);

    await ConversationModel.store(sessionId, query, response, {
      user_name: user.name,
      user_age: user.age
    });

    return response;
  }

  static async processQuery(sessionId, query) {
    const user = await UserModel.getBySessionId(sessionId);

    if (!user || user.onboarding_step !== 'complete') {
      return await this.processOnboarding(sessionId, query);
    }

    return await this.processRegularQuery(sessionId, query, user);
  }
}

module.exports = MemoryService;
