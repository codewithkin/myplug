import openaiClient from "..";

/**
 * Generates a refined, broad-purpose prompt for a chatbot
 * that introduces its role, the website it serves, and its goal.
 */
export default async function generatePurposePromptAssistant({
  website,
  purpose,
  name,
}: {
  website: string;
  name?: string;
  purpose: string;
}) {
  try {
    const systemPrompt = `
You are an expert prompt engineer. Your job is to take a basic idea of a chatbot's purpose and transform it into a well-written, broad-purpose prompt.

The resulting prompt should:
- Clearly explain the chatbot’s purpose and name (if provided)
- Mention the website it is built for
- Be helpful, polite, and suitable for general users
- Be written in natural, friendly English

Output only the final prompt. Do not include explanations, formatting, or bullet points.
`;

    const userInput = `
        Website: ${website}
        ${name ? `Name: ${name}` : ""}
        Purpose: ${purpose}
    `;

    const res = await openaiClient.chat.completions.create({
      model: "deepseek-ai/DeepSeek-R1",
      messages: [
        { role: "system", content: systemPrompt.trim() },
        { role: "user", content: userInput.trim() },
      ],
      temperature: 0.7,
    });

    const result = res.choices[0]?.message?.content?.trim();

    if (!result) {
      throw new Error("No response from DeepSeek");
    }

    return result;
  } catch (e) {
    console.error("An error occurred while generating assistant prompt:", e);
    return "You are a helpful assistant designed to guide visitors and answer questions about the website.";
  }
}