const fs = require("fs");
const path = require("path");

module.exports = (directory, foldersOnly = false) => {
  let fileNames = [];
  const files = fs.readdirSync(directory, { withFileTypes: true });
  for (const file of files) {
    const filePath = path.join(directory, file.name);
    if (file.isDirectory()) {
      fileNames.push(filePath);
      fileNames = fileNames.concat(module.exports(filePath, foldersOnly));
    } else if (!foldersOnly) {
      fileNames.push(filePath);
    }
  }
  return fileNames;
};
