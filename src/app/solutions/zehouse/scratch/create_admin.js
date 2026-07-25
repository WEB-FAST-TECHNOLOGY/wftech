const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://iigudvprhfjpulneisad.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpZ3VkdnByaGZqcHVsbmVpc2FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3NjMwNDAsImV4cCI6MjA5MzMzOTA0MH0.1bFApsaDXz0d8xOD2pmyrs9fHZsR2BHl_z272_0myNA'
);

async function createAdmin() {
  const email = 'admin@zehouse.com';
  const password = 'Password@2026';

  console.log('Registering admin account...');
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) {
    console.error('Signup error:', error.message);
  } else {
    console.log('Signup successful!', data.user?.email);
  }
}

createAdmin();
