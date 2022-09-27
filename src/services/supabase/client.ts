import { createClient } from "@supabase/supabase-js";
const url =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3YmJybnlhaHBnaGZ6eHBzYnF3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2NDIxNzIxNywiZXhwIjoxOTc5NzkzMjE3fQ.cSLIN0l_EZgTS7d7uauUTXOVRHwG4I8Jkv01nkXGLSE";

const options = {
  schema: "public",
  headers: {
    Authorization: url,
  },
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
};

const supabaseUrl = "https://hwbbrnyahpghfzxpsbqw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3YmJybnlhaHBnaGZ6eHBzYnF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQyMTcyMTcsImV4cCI6MTk3OTc5MzIxN30.SuZ5EO6qEpGDELC8uKP8uFWryc02VQJzqNp6cXGVZ_0";
export const supabaseClient = createClient(supabaseUrl, supabaseKey, options);
