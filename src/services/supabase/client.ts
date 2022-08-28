import { createClient } from "@supabase/supabase-js";

const options = {
  schema: "public",
  headers: {
    Authorization:
      // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxeHh6eWNpZ2hkb3llaXBweGJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgyNTY5NDEsImV4cCI6MTk3MzgzMjk0MX0.ReCILrdjkf1QxJ90xMUFvhn0zNHApXpPG5Su3bIxmUI",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxeHh6eWNpZ2hkb3llaXBweGJsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY1ODI1Njk0MSwiZXhwIjoxOTczODMyOTQxfQ.4qiaGI1vQdyR9bYQxatpNOUpdT0SSb1b4hsFlr6uQZA",
  },
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
};
const supabaseUrl = "https://xqxxzycighdoyeippxbl.supabase.co";
const supabaseKey = "sbp_5c905198d2cdaeaccda866e384a568ddf023cf6b";
export const supabaseClient = createClient(supabaseUrl, supabaseKey, options);
