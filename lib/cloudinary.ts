
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
       
export const uploadBase64 = async (
  base64: string,
  folder: string,
  resourceType: "image" | "video" | "raw",
  extension: string // ← Add this line
) => {
  return await cloudinary.uploader.upload(base64, {
    folder,
    resource_type: resourceType,
    public_id: `filename-${Date.now()}.${extension}` // ← Use the extension here
  });
};

   
export default cloudinary;