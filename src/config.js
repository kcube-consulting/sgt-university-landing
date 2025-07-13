/**
 * Centralized configuration for all environment variables
 */
export const config = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    key: import.meta.env.VITE_SUPABASE_KEY
  },
  openai: {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY
  },
  email: {
    host: import.meta.env.SMTP_HOST,
    port: Number(import.meta.env.SMTP_PORT) || 587,
    user: import.meta.env.SMTP_USER,
    pass: import.meta.env.SMTP_PASS,
    to: import.meta.env.EMAIL_TO
  },
  twilio: {
    accountSid: import.meta.env.TWILIO_ACCOUNT_SID,
    authToken: import.meta.env.TWILIO_AUTH_TOKEN,
    whatsappNumber: import.meta.env.TWILIO_WHATSAPP_NUMBER
  },
  isProduction: import.meta.env.PROD
};

// Validate configuration on startup
(() => {
  const requiredConfigs = [
    { key: 'VITE_SUPABASE_URL', value: config.supabase.url },
    { key: 'VITE_SUPABASE_KEY', value: config.supabase.key },
    { key: 'VITE_OPENAI_API_KEY', value: config.openai.apiKey },
    { key: 'SMTP_HOST', value: config.email.host },
    { key: 'SMTP_USER', value: config.email.user },
    { key: 'SMTP_PASS', value: config.email.pass },
    { key: 'TWILIO_ACCOUNT_SID', value: config.twilio.accountSid },
    { key: 'TWILIO_AUTH_TOKEN', value: config.twilio.authToken }
  ];

  requiredConfigs.forEach(({ key, value }) => {
    if (!value) {
      console.error(`Missing required environment variable: ${key}`);
      if (config.isProduction) {
        throw new Error(`Missing required environment variable: ${key}`);
      }
    }
  });
})();