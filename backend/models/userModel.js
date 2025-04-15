const supabase = require('../config/db')

class UserModel {
  static async getBySessionId(sessionId) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('session_id', sessionId)
      .single();

    return data || null;
  }

  static async initializeSession(sessionId) {
    const { error, data } = await supabase
      .from('users')
      .insert([{ session_id: sessionId, onboarding_step: 'name' }]);
  
    if (error) {
      console.error("Error initializing session:", error);
    } else {
      console.log("Session initialized successfully:", data);
    }
  }
  

  static async updateTempName(sessionId, name) {
    const { error } = await supabase
      .from('users')
      .update({ name })
      .eq('session_id', sessionId);

    if (error) console.error("Error updating name:", error);
  }

  static async finalizeUser(sessionId, name, age) {
    const { error } = await supabase
      .from('users')
      .update({ name, age })
      .eq('session_id', sessionId);

    if (error) console.error("Error finalizing user:", error);
  }

  static async updateOnboardingStep(sessionId, step) {
    const { error } = await supabase
      .from('users')
      .update({ onboarding_step: step })
      .eq('session_id', sessionId);

    if (error) console.error("Error updating onboarding step:", error);
  }
}

module.exports = UserModel;
