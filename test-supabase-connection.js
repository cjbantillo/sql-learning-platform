import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log("\n╔════════════════════════════════════════════════════════╗");
console.log("║     SUPABASE CONNECTION TEST                           ║");
console.log("╚════════════════════════════════════════════════════════╝\n");

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ ERROR: Missing environment variables!");
  console.error("   Required:");
  console.error("   - VITE_SUPABASE_URL");
  console.error("   - VITE_SUPABASE_ANON_KEY");
  console.error("\n   Found in .env:");
  console.error(
    `   - VITE_SUPABASE_URL: ${supabaseUrl ? "✓ Set" : "✗ Missing"}`
  );
  console.error(
    `   - VITE_SUPABASE_ANON_KEY: ${supabaseAnonKey ? "✓ Set" : "✗ Missing"}`
  );
  process.exit(1);
}

console.log("📋 Configuration:");
console.log(`   URL: ${supabaseUrl}`);
console.log(`   Anon Key: ${supabaseAnonKey.substring(0, 20)}...`);
console.log("");

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
});

async function testConnections() {
  console.log("🔍 Testing connections...\n");

  // Test 1: Basic connection
  console.log("1️⃣  Basic Supabase Connection:");
  try {
    const { data: tables, error } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .limit(1);

    if (error) {
      console.log(`   ❌ Failed: ${error.message}`);
    } else {
      console.log("   ✅ Connected successfully!");
    }
  } catch (err) {
    console.log(`   ❌ Error: ${err.message}`);
  }

  // Test 2: Check if lessons table exists
  console.log("\n2️⃣  Testing lessons table:");
  try {
    const { data, error, status } = await supabase
      .from("lessons")
      .select("*", { count: "exact" })
      .limit(1);

    if (error) {
      if (error.code === "PGRST116") {
        console.log(`   ⚠️  Table doesn't exist or is not accessible`);
      } else {
        console.log(`   ❌ Error: ${error.message}`);
      }
    } else {
      console.log(`   ✅ Lessons table accessible`);
      console.log(`   📊 Found ${data.length} record(s)`);
    }
  } catch (err) {
    console.log(`   ❌ Error: ${err.message}`);
  }

  // Test 3: Check other common tables
  console.log("\n3️⃣  Checking common tables:");
  const tables = ["users", "exercises", "user_progress", "courses"];

  for (const tableName of tables) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select("*", { count: "exact" })
        .limit(1);

      if (error) {
        console.log(`   ❌ ${tableName}: Not accessible`);
      } else {
        console.log(`   ✅ ${tableName}: Accessible`);
      }
    } catch (err) {
      console.log(`   ⚠️  ${tableName}: Error checking`);
    }
  }

  // Test 4: Test authentication
  console.log("\n4️⃣  Testing authentication:");
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.log(`   ℹ️  Not authenticated: ${error.message}`);
    } else if (data.session) {
      console.log(`   ✅ Session found for user: ${data.session.user.email}`);
    } else {
      console.log(`   ℹ️  No active session (expected for anon client)`);
    }
  } catch (err) {
    console.log(`   ⚠️  Could not check auth: ${err.message}`);
  }

  // Test 5: Health summary
  console.log("\n╔════════════════════════════════════════════════════════╗");
  console.log("║ SUMMARY                                                ║");
  console.log("╠════════════════════════════════════════════════════════╣");
  console.log("║ If you see ✅ above, your Supabase is connected!       ║");
  console.log("║                                                        ║");
  console.log("║ ✅ = Connection working                                ║");
  console.log("║ ❌ = Issue to fix                                      ║");
  console.log("║ ⚠️  = Warning/Expected                                 ║");
  console.log("║ ℹ️  = Informational                                    ║");
  console.log("╚════════════════════════════════════════════════════════╝\n");
}

// Run tests
testConnections().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
