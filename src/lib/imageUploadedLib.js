const multer = require("multer");
const path = require("path");
const AppEror = require("./errorLib");
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		const date = new Date();
		const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
		const fileExtension = path.extname(file.originalname);

		// Modify the filename format here
		const newFilename = `${formattedDate}_${file.originalname}`;

		cb(null, newFilename);
	},
});

// ! Filter Image
const imageFilter = (req, file, cb) => {
	const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"]; // Add more extensions if needed
	const fileExtension = path.extname(file.originalname).toLowerCase();
	const mimeType = file.mimetype.startsWith("image/") || file.mimetype.startsWith("multipart/form-data");
	if (mimeType) {
		if (allowedExtensions.includes(fileExtension)) {
			cb(null, true);
		} else {
			cb(new AppEror("Only image files with valid extensions are allowed.", 404));
		}
	} else {
		cb(new AppEror("Invalide mimeType", 404));
	}
};

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 10 * 1024 * 1024, // 10MB limit
	},
	fileFilter: imageFilter,
});

module.exports = {
	upload: upload,
};
