const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://iigudvprhfjpulneisad.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpZ3VkdnByaGZqcHVsbmVpc2FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3NjMwNDAsImV4cCI6MjA5MzMzOTA0MH0.1bFApsaDXz0d8xOD2pmyrs9fHZsR2BHl_z272_0myNA'
);

async function resetPwd() {
  const email = 'webfasttechnologysarl@gmail.com';
  console.log('Requesting password reset...');
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    console.error('Reset error:', error);
  } else {
    console.log('Reset email sent!', data);
  }
}

resetPwd();
