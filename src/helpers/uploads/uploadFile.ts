import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "./s3";

export default async function uploadFile(file: File) {
    const dataFileUrl = await s3Client.send(new PutObjectCommand({
        Bucket: process.env.SEVALLA_BUCKET,
        Key: `chatbots/${file.name}`,
        Body: file
    }));

    return dataFileUrl.toString();
}