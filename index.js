const fs = require('fs');

function shuffle (values) {
  return values.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

function listFolderContents (folderPath) {
  return fs.readdirSync(folderPath)
}

/**
 * Shuffle all file names in the given folder.
 * Only files with the given extensions will be shuffled.
 * e.g. renameFiles('./hey', ['txt'])
 * @param {string} folderPath
 * The path to the folder in which files will be shuffled (not recursively).
 * @param {Array<string>} extensions - The extensions of the files to be shuffled.
 */
exports.shuffleFiles = function (folderPath, extensions) {
  const fileNames = listFolderContents(folderPath)
    .filter(fileName => extensions.includes(fileName.split('.').pop()))

  if (fileNames.length === 0) {
    console.log('No files to rename')
    return
  }

  if (fileNames.length === 1) {
    console.log('Only 1 file found. Cannot shuffle.')
    return
  }

  const shuffledFileNames = shuffle(fileNames)

  for (let i = 0; i < shuffledFileNames.length; i++) {
    const oldFileName = fileNames[i]
    const newFileName = shuffledFileNames[i]
    if (oldFileName !== newFileName) {
      console.debug(`Renaming ${oldFileName} to ${newFileName}`)
      fs.renameSync(`${folderPath}/${oldFileName}`, `${folderPath}/${newFileName}-tmp`)
    }
  }

  for (let i = 0; i < shuffledFileNames.length; i++) {
    const oldFileName = fileNames[i]
    const newFileName = shuffledFileNames[i]
    if (oldFileName !== newFileName) {
      fs.renameSync(`${folderPath}/${newFileName}-tmp`, `${folderPath}/${newFileName}`)
    }
  }
}
