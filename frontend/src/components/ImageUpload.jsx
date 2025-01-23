import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateAdminInfo } from '../utils/slices/admin.slice.js'; // Adjust the import based on your file structure

const ImageUpload = ({ adminId, adminInfo }) => {
    const dispatch = useDispatch();
    const [imagePreview, setImagePreview] = useState(adminInfo.imageUrl || "");
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Handle file input change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle image upload
    const handleImageUpload = async () => {
        try {
            const formData = new FormData();
            if (!selectedFile) {
                setError('Please select an image file.');
                return;
            }
            
            formData.append('image', selectedFile); // 'image' matches the backend field name

            const response = await fetch(`http://localhost:3000/admin/uploadimage/${adminId}`, {
                method: "POST",
                credentials: "include", // Make sure you have credentials if needed
                body: formData, // Send FormData with the image file
            });

            const data = await response.json();
            console.log("Image response data", data);

            if (!response.ok) {
                setError(data.message || 'An error occurred while uploading the image.');
                return;
            }

            setError(''); // Reset the error
            console.log(data.admin);
            
            dispatch(updateAdminInfo(data.admin)); // Assuming you update the Redux store with the new user info
            
            
            setSuccess(data.message); // Display success message
        } catch (error) {
            setError(error.message || 'An error occurred while uploading the image.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
            <div className="relative w-full h-64 mb-4">
                <img
                    src={imagePreview || "default_image_url"} // Add a fallback for missing image
                    alt="Thumbnail"
                    className="w-full h-full object-cover rounded-lg shadow"
                />
                {/* Hidden file input */}
                <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />
                {/* Trigger the file input click when the button is clicked */}
                <button
                    type="button"
                    className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow hover:bg-blue-700 transition"
                    onClick={() => document.getElementById('imageInput').click()} // Trigger the file input
                >
                    Choose Image
                </button>
            </div>

            {/* Display error and success messages */}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

            {/* Upload button - trigger the upload process */}
            {selectedFile && (
                <button
                    type="button"
                    className="mt-2 w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                    onClick={handleImageUpload} // Call handleImageUpload to upload the image
                >
                    Upload
                </button>
            )}
        </div>
    );
};

export default ImageUpload;