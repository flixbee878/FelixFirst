import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://edtiawvzdcsdosvpnwqe.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_2_WVyHcOnI4ZCxFvimxbyg_KBdiw0Oo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});
