import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mzfyhsxluqqkcltwhpbm.supabase.co'; // Replace with your Supabase project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16Znloc3hsdXFxa2NsdHdocGJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0NDgzMTAsImV4cCI6MjA0OTAyNDMxMH0.17KG4UXz0vzxOHskYb2pdPxHzaCe6yb6Wgh6SKVWbG0'; // Replace with your Supabase anon/public key
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
