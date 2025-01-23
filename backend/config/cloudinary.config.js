import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

try {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
}
catch (error) {
    console.log(error);
}


const uploadOnCloudinary = async (file) => {
    try {

        if (!file) {
            console.error('No file provided');
            return null;
        }



        const response = await cloudinary.uploader.upload(file, {
            folder: 'uploads', // Specify folder in Cloudinary (optional)
            use_filename: true, // Retain the original filename (optional)
            resource_type: 'image' // Ensure it's uploading as an image
        });



        console.log('File uploaded successfully:', response.url);

        // Clean up the local file after successful upload
        fs.unlinkSync(file);

        return response;
    } catch (error) {
        console.error('Error uploading file:', error);

        // Ensure the file is removed even if upload fails
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }

        return null;
    }
};

export { uploadOnCloudinary };
