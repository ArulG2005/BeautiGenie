const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

console.log("🔷 Initializing database connection...");

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.error("❌ Missing Supabase credentials in .env file");
  process.exit(1);
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
  auth: { persistSession: false }
});

(async () => {
  try {
    console.log("🔍 Testing database connection...");

    const { data, error } = await supabase
      .from('conversations')
      .select('id')
      .limit(1);

    if (error) throw error;

    console.log("🟢 Database connection successful");
    console.log(`📦 Conversations table found with ${data.length} record(s)`);

  } catch (err) {
    console.error("❌ Connection failed:", {
      message: err.message,
      code: err.code,
      details: err.details || 'Check your database connection or table names'
    });
    process.exit(1);
  }
})();

module.exports = supabase;
