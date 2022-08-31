import { createClient } from "@supabase/supabase-js";
const url =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRobWFnaWVmdWt5emFlcmR2eG9iIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2MTM1MTI3MCwiZXhwIjoxOTc2OTI3MjcwfQ.6foTB72LTXQ5Myikl8ZnmRDkCjwRXTTq5cM2vdhygs0";

const options = {
  schema: "public",
  headers: {
    Authorization: url,
  },
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
};

const supabaseUrl = "https://thmagiefukyzaerdvxob.supabase.co/";
const supabaseKey = "sbp_603679c7cd130103c2c9c2cea4995f59c45ba5e4";
export const supabaseClient = createClient(supabaseUrl, supabaseKey, options);
