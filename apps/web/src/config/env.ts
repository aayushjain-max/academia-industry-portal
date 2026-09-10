export const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  AI_URL: process.env.NEXT_PUBLIC_AI_URL || process.env.NEXT_PUBLIC_AI_SERVICE_URL || 'http://localhost:8001/api/v1/ai',
};
