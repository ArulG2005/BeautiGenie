const UserModel = require('../models/userModel');

class UserController {
  static async createUser(req, res) {
    try {
      const { sessionId, name, age } = req.body;
      
      if (!sessionId || !name || !age) {
        return res.status(400).json({ error: 'sessionId, name and age are required' });
      }
      
      const user = await UserModel.createUser({ sessionId, name, age });
      res.json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getUser(req, res) {
    try {
      const { sessionId } = req.params;
      const user = await UserModel.getUserBySessionId(sessionId);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = UserController;