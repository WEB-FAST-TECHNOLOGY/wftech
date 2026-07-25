const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://iigudvprhfjpulneisad.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpZ3VkdnByaGZqcHVsbmVpc2FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3NjMwNDAsImV4cCI6MjA5MzMzOTA0MH0.1bFApsaDXz0d8xOD2pmyrs9fHZsR2BHl_z272_0myNA'
);

async function checkAndCreate() {
  const email = 'webfasttechnologysarl@gmail.com';
  const password = 'WebFast@2026';

  console.log('Attempting to log in...');
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    console.log('Login failed:', signInError.message);
    if (signInError.message === 'Invalid login credentials') {
      console.log('Attempting to sign up...');
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) {
        console.error('Signup failed:', signUpError.message);
      } else {
        console.log('Signup successful!', signUpData.user?.id);
      }
    }
  } else {
    console.log('Login successful!', signInData.user?.id);
  }
}

checkAndCreate();
