# secure-file-upload-and-download-system
Secure File Upload &amp; Download System – A web application built with Node.js, Express, MongoDB, and Multer that allows users to securely upload, view, download, and delete files. The system stores file metadata in MongoDB and files on the server, with a clean and responsive frontend interface.
## Features

- Upload files securely with metadata tracking (filename, original name, size, upload date)
- View all uploaded files in a dynamic table
- Download files directly from the web interface
- Delete files from both the server and MongoDB
- Fully dynamic UI with automatic refresh after upload or delete
- Simple and intuitive frontend design

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose, Multer
- **Frontend:** HTML, CSS, JavaScript
- **Environment Variables:** `.env` (for MongoDB URI and server PORT)

## Project Structure

secure-file-upload/
│
├─ server.js # Backend server
├─ upload.js # Multer setup and File model
├─ package.json # Node.js dependencies
├─ .env # Environment variables (ignored in git)
├─ uploads/ # Folder for uploaded files (ignored in git)
└─ public/
└─ index.html # Frontend UI

yaml
Copy code
