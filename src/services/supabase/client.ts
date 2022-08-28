import { createClient } from "@supabase/supabase-js";
const url = "INSERIR KEY AQUI";
const options = {
  schema: "public",
  headers: {
    Authorization: url,
  },
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
};
const supabaseUrl = "https://xqxxzycighdoyeippxbl.supabase.co";
const supabaseKey = "sbp_5c905198d2cdaeaccda866e384a568ddf023cf6b";
export const supabaseClient = createClient(supabaseUrl, supabaseKey, options);
