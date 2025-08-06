import OpenAI from "openai";

const openaiClient = new OpenAI({
    baseURL: 'https://api.studio.nebius.com/v1/',
    apiKey: process.env.NEBIUS_API_KEY,
});

export default openaiClient;