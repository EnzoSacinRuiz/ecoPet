const fs = require('fs');
const path = require('path');

const folderPath = "../Bilder/Mat"

// Read all files in the folder
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }

  // Rename files sequentially
  files.forEach((file, index) => {
    const oldFilePath = path.join(folderPath, file);
    const newFileName = (index + 1).toString();
    const newFilePath = path.join(folderPath, newFileName + path.extname(file));

    fs.renameSync(oldFilePath, newFilePath);
    console.log(`Renamed ${file} to ${newFileName}`);
  });
});
