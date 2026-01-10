"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function SupabaseConnectionTest() {
  const [status, setStatus] = useState("idle");
  const [results, setResults] = useState<
    Array<{
      test: string;
      status: "pass" | "fail" | "warning";
      message: string;
    }>
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Auto-run test on component mount
    runTests();
  }, []);

  async function runTests() {
    setLoading(true);
    setStatus("testing");
    const testResults: Array<{
      test: string;
      status: "pass" | "fail" | "warning";
      message: string;
    }> = [];

    try {
      // Dynamically import supabase client
      const { supabase } = await import("@/lib/supabase");

      // Test 1: Check environment variables
      const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (envUrl && envKey) {
        testResults.push({
          test: "Environment Variables",
          status: "pass",
          message: `✅ Found Supabase URL and key`,
        });
      } else {
        testResults.push({
          test: "Environment Variables",
          status: "fail",
          message: `❌ Missing Supabase configuration`,
        });
      }

      // Test 2: Lessons table
      try {
        const { data, error } = await supabase
          .from("lessons")
          .select("*", { count: "exact" })
          .limit(1);

        if (error) {
          testResults.push({
            test: "Lessons Table",
            status: "fail",
            message: `❌ ${error.message}`,
          });
        } else {
          testResults.push({
            test: "Lessons Table",
            status: "pass",
            message: `✅ Connected - Found ${data?.length || 0} record(s)`,
          });
        }
      } catch (err: any) {
        testResults.push({
          test: "Lessons Table",
          status: "fail",
          message: `❌ ${err.message}`,
        });
      }

      // Test 3: Exercises table
      try {
        const { data, error } = await supabase
          .from("exercises")
          .select("*", { count: "exact" })
          .limit(1);

        if (error) {
          testResults.push({
            test: "Exercises Table",
            status: "warning",
            message: `⚠️ ${error.message}`,
          });
        } else {
          testResults.push({
            test: "Exercises Table",
            status: "pass",
            message: `✅ Connected - Found ${data?.length || 0} record(s)`,
          });
        }
      } catch (err: any) {
        testResults.push({
          test: "Exercises Table",
          status: "warning",
          message: `⚠️ ${err.message}`,
        });
      }

      // Test 4: Authentication
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          testResults.push({
            test: "Authentication",
            status: "warning",
            message: `ℹ️ ${error.message}`,
          });
        } else if (data?.session) {
          testResults.push({
            test: "Authentication",
            status: "pass",
            message: `✅ Session active for ${data.session.user.email}`,
          });
        } else {
          testResults.push({
            test: "Authentication",
            status: "warning",
            message: `ℹ️ No active session`,
          });
        }
      } catch (err: any) {
        testResults.push({
          test: "Authentication",
          status: "warning",
          message: `⚠️ ${err.message}`,
        });
      }

      // Test 5: Database health check
      try {
        const { error } = await supabase.rpc("get_current_timestamp", {});

        if (error && error.code === "42883") {
          testResults.push({
            test: "Database RPC",
            status: "warning",
            message: `ℹ️ Function not available (expected)`,
          });
        } else if (error) {
          testResults.push({
            test: "Database RPC",
            status: "warning",
            message: `ℹ️ ${error.message}`,
          });
        } else {
          testResults.push({
            test: "Database RPC",
            status: "pass",
            message: `✅ Database responding`,
          });
        }
      } catch (err: any) {
        testResults.push({
          test: "Database RPC",
          status: "warning",
          message: `ℹ️ RPC not available`,
        });
      }
    } catch (err: any) {
      testResults.push({
        test: "Import Supabase",
        status: "fail",
        message: `❌ Failed to import Supabase: ${err.message}`,
      });
    }

    setResults(testResults);
    setStatus("complete");
    setLoading(false);
  }

  const passCount = results.filter((r) => r.status === "pass").length;
  const failCount = results.filter((r) => r.status === "fail").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">
            Supabase Connection Test
          </h1>
          <p className="text-gray-600 mb-6">
            Testing frontend and backend connectivity
          </p>

          {status === "idle" || status === "testing" ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin">
                <div className="h-8 w-8 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
              </div>
              <p className="mt-4 text-gray-600">
                {status === "testing" ? "Running tests..." : "Loading..."}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600">
                    {passCount}
                  </div>
                  <div className="text-sm text-green-700">Passed</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="text-2xl font-bold text-red-600">
                    {failCount}
                  </div>
                  <div className="text-sm text-red-700">Failed</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">
                    {results.length}
                  </div>
                  <div className="text-sm text-blue-700">Total Tests</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      result.status === "pass"
                        ? "bg-green-50 border-green-400"
                        : result.status === "fail"
                        ? "bg-red-50 border-red-400"
                        : "bg-amber-50 border-amber-400"
                    }`}
                  >
                    <div className="font-semibold text-gray-900">
                      {result.test}
                    </div>
                    <div className="text-sm text-gray-700">
                      {result.message}
                    </div>
                  </div>
                ))}
              </div>

              {failCount === 0 ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-green-800 font-semibold">
                    ✅ All tests passed! Your Supabase connection is working.
                  </p>
                </div>
              ) : (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-800 font-semibold">
                    ❌ Some tests failed. Check your configuration.
                  </p>
                </div>
              )}

              <Button
                onClick={runTests}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading ? "Testing..." : "Run Tests Again"}
              </Button>
            </>
          )}
        </Card>

        <div className="mt-6 text-sm text-gray-700 bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-2">Environment Checks:</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              NEXT_PUBLIC_SUPABASE_URL:{" "}
              {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅" : "❌"}
            </li>
            <li>
              NEXT_PUBLIC_SUPABASE_ANON_KEY:{" "}
              {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅" : "❌"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
