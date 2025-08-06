import openaiClient from "..";

export default async function getResponseFromAssistant ({
    assistantId,
    systemPrompt,
    message
}: {
    assistantId: string,
    systemPrompt: string,
    message: string
}) {
    try {
        const res = await openaiClient.chat.completions.create({
            "model": "deepseek-ai/DeepSeek-R1",
            "max_tokens": 8192,
            "temperature": 0.6,
            "top_p": 0.95,
            "messages": [
                {
                    "role": "system",
                    "content": systemPrompt
                },
                {
                    "role": "user",
                    "content": message
                }
            ]
        })

        return res.choices[0].message.content;
    } catch (e) {
        console.log("An error occuredwhile getting response from assistant: ", e);
    }
}