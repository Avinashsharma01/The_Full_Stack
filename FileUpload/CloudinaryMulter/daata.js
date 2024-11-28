import { v2 as cloudinary } from 'cloudinary';

// Replace with your exact public ID
const public_id = 'uploads/1732306102040-react';

cloudinary.config({
    cloud_name: "drucek3tt",
    api_key: "812592149661196",
    api_secret: '7rBB1def8CxBU9RLRXrkYUDe4oU',
});

cloudinary.uploader.destroy(public_id)
    .then(result => console.log('Delete result:', result))
    .catch(err => console.error('Error:', err));
