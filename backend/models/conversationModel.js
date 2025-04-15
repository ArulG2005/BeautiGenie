const supabase = require('../config/db');

class ConversationModel {
  static async store(sessionId, query, response, metadata = {}) {
    const { data } = await supabase
      .from('conversations')
      .insert([{
        session_id: sessionId,
        query,
        response,
        metadata
      }])
      .select();
    return data;
  }

  static async getRelevant(sessionId, embedding, limit = 3) {
    const { data } = await supabase.rpc('match_conversations', {
      query_embedding: embedding,
      match_threshold: 0.7,
      match_count: limit,
      session_id: sessionId
    });
    return data;
  }
}

module.exports = ConversationModel;