const fs = require('fs');

function getShuffleMapping(values) {
  const shuffled = values.map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return values.reduce((acc, value, index) => {
    acc[value] = shuffled[index];
    return acc;
  }, {});
}

function listFolderContents(folderPath) {
  return fs.readdirSync(folderPath);
}

/**
 * Rename the given files with the given mapping.
 * @param {string} folderPath
 * @param {string} extension
 * @param {Object} mapping - e.g. { 'oldFileName1.jpg': 'newFileName1.jpg' }
 */
function renameFilesWithMapping(folderPath, extension, mapping) {
  Object.entries(mapping).forEach(([oldFileName, newFileName]) => {
    if (oldFileName !== newFileName) {
      console.debug(`Renaming ${oldFileName}.${extension} to ${newFileName}.${extension}`);
      fs.renameSync(
        `${folderPath}/${oldFileName}.${extension}`,
        `${folderPath}/${newFileName}-tmp`,
      );
    }
  });

  Object.entries(mapping).forEach(([oldFileName, newFileName]) => {
    if (oldFileName !== newFileName) {
      fs.renameSync(
        `${folderPath}/${newFileName}-tmp`,
        `${folderPath}/${newFileName}.${extension}`,
      );
    }
  });
}

/**
 * Shuffle all file names in the given folder.
 * Only files with the given extensions will be shuffled.
 * e.g. renameFiles('./hey', 'txt')
 * @param {string} folderPath
 * The path to the folder in which files will be shuffled (not recursively).
 * @param {string} extension - The extension of the files to be shuffled.
 *
 * @returns {Object|null} - The mapping of the old file names to the new file names (no extension).
 */
function shuffleFiles(folderPath, extension) {
  const fileNames = listFolderContents(folderPath)
    .filter((fileName) => extension === fileName.split('.').pop());

  if (fileNames.length === 0) {
    console.log('No files to rename');
    return null;
  }
  if (fileNames.length === 1) {
    console.log('Only 1 file found. Cannot shuffle.');
    return null;
  }

  const fileNamesWithoutExt = fileNames.map((fileName) => fileName.replace(`.${extension}`, ''));

  const mapping = getShuffleMapping(fileNamesWithoutExt);
  renameFilesWithMapping(folderPath, extension, mapping);

  return mapping;
}

module.exports = {
  shuffleFiles,
  renameFilesWithMapping,
};
