const cloudinary = require('cloudinary').v2;  
const { CloudinaryStorage } = require('multer-storage-cloudinary-v2');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,   
  params: {
    folder: 'StayVerse_uploads',  //Storage folder name on cloudinary account
    allowedFormats: ["png", "jpg", "jpeg"], //We can allow more file formats such as pdf, etc
  },
});

module.exports = {
    cloudinary,
    storage,
};