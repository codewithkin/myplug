import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    credentials: {
        accessKeyId: process.env.SEVALLA_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.SEVALLA_SECRET_ACCESS_KEY || "",
    },
    region: process.env.SEVALLA_REGION
});

export default s3Client;