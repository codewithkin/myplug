import fs from "fs";
import OpenAI from "openai";

const client = new OpenAI({
    baseURL: 'https://api.studio.nebius.com/v1/',
    apiKey: process.env.NEBIUS_API_KEY,
});

export async function uploadFileToOpenAI(filePath: string) {
    console.log("Uploading file to OpenAI: ", filePath);

    const uploadedFile = await client.files.create({
        file: fs.createReadStream(filePath),
        purpose: "user_data",
    });

  return uploadedFile.id;
}