const AIService = require('../services/aiService'); 

async function handleChat(req, res) {
  try {
    const userQuery = req.body.query;  
    const response = await AIService.getCustomAnswer(userQuery); 
    res.json({ reply: response }); 
  } catch (error) {
    console.error('Error handling chat:', error);
    res.json({ reply: 'Sorry, something went wrong while processing your request.' });
  }
}

module.exports = { handleChat };
