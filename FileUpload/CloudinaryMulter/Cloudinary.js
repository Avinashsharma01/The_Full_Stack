import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    debug: true, // Enable Cloudinary debugging
});

// Configure Multer Storage with Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        public_id: (req, file) => `${Date.now()}-${file.originalname}`,
    },
});

//manually delete the image

const deleteimg = () => {
    cloudinary.uploader.destroy('uploads/1732308729971-Screenshot (244)')
}


// Initialize Multer
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'];
        if (!allowedTypes.includes(file.mimetype)) {
            cb(new Error('Only JPEG, PNG, and GIF files are allowed'));
        } else {
            cb(null, true);
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});




app.post('/upload', upload.single('file'), (req, res) => {
    try {
        console.log('File upload successful:', req.file);
        res.status(200).json({
            message: 'File uploaded successfully',
            file: req.file,
        });
        deleteimg();
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ error: err.message });
    }
});


// fetch all images from cloudinary
app.get('/list-images', async (req, res) => {
    try {
        // Get all resources (images) in the 'uploads' folder
        const result = await cloudinary.api.resources({
            type: 'upload',
            prefix: 'uploads/',  // Folder name in Cloudinary
            max_results: 50, // Optional: limit number of results
            resource_type: 'image',  // or 'video' for video files
        });

        // Map the response to get URLs of each file
        const imageUrls = result.resources.map(resource => (
            {
                id: resource.public_id,
                url: resource.secure_url
            }
        ));

        res.status(200).json({
            message: 'Fetched image URLs successfully',
            imageUrls: imageUrls, // Array of URLs of all images in the folder
        });
    } catch (err) {
        console.error('Error fetching resources:', err);
        res.status(500).json({ error: err.message });
    }
});


// Delete a single image from Cloudinary using params
app.delete('/delete-image/:public_id', async (req, res) => {
    const { public_id } = req.params; // Extract `public_id` from URL params

    if (!public_id) {
        return res.status(400).json({ error: 'Public ID is required' });
    }

    try {
        // Call Cloudinary's destroy method
        const result = await cloudinary.uploader.destroy(public_id);

        if (result.result === 'ok') {
            res.status(200).json({ message: 'Image deleted successfully' });
        } else {
            res.status(400).json({ error: 'Failed to delete image', details: result });
        }
    } catch (err) {
        console.error('Error deleting image:', err);
        res.status(500).json({ error: err.message });
    }
});



// Routes
app.get('/', (req, res) => {
    res.render('index');
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
