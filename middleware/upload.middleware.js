const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dnevsqlug',      // Replace with your Cloudinary Cloud Name
  api_key: '978323198553146',   // Replace with your Cloudinary API Key
  api_secret: 'cm0M4xiGC-hwTmt3QH6EGzf28TA', // Replace with your Cloudinary API Secret
});

// Function to upload to Cloudinary using a Promise
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      (error, result) => {
        if (error) {
          reject(new Error('Cloudinary upload failed'));
        } else {
          resolve(result);
        }
      }
    );
    // Pipe the file buffer into the upload stream
    uploadStream.end(file.buffer);
  });
};

// Multer setup with memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } });  // 10MB file limit

// Middleware for Cloudinary upload
const cloudinaryUpload = async (req, res, next) => {
  if (req.file) {
    try {
      const result = await uploadToCloudinary(req.file); // Upload file to Cloudinary
      req.fileUrl = result.secure_url;  // Store the Cloudinary URL for use in the request
      next();
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: 'Error uploading to Cloudinary' });
    }
  } else {
    next();
  }
};

module.exports = { upload, cloudinaryUpload };
