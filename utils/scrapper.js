const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

const folderPath = '../../';

// Read all files in the folder
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }

  // Filter .doc files
  const docFiles = files.filter(file => path.extname(file).toLowerCase() === '.doc');

  // Loop through .doc files
  docFiles.forEach(docFile => {
    const filePath = path.join(folderPath, docFile);

    // Read the .doc file
    const docContent = fs.readFileSync(filePath, 'utf-8');

    // Extract text content
    mammoth.extractRawText({ arrayBuffer: docContent })
      .then(result => {
        const textContent = result.value;

        // Save the text content to a .txt file
        const outputFileName = path.basename(docFile, path.extname(docFile)) + '.txt';
        const outputPath = path.join(folderPath, outputFileName);
        fs.writeFileSync(outputPath, textContent, 'utf-8');
        console.log(`Text content from ${docFile} extracted and saved to ${outputFileName}`);
      })
      .catch(error => {
        console.error(`Error extracting text content from ${docFile}:`, error);
      });
  });
});
