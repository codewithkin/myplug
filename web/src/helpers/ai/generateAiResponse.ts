import openaiClient from ".";

export default async function generateAiResponse(message: string) {
    try {
        const response = await openaiClient.chat.completions.create({
            model: "deepseek-ai/DeepSeek-R1-fast",
            messages: [
                {
                    role: "user",
                    content: message
                }
            ]
        })
        
        return response.choices[0].message.content;
    } catch (e) {
        console.log("An error occured while generating AI response: ", e);
    }
}