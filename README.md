## What is it?

This module synchronously shuffles the names of files in the given directory.
It only shuffles the names of files, not the contents of the files.
It only shuffles the files with the given extension.
Sometimes, some files won't be renamed.

## Examples of usage

To shuffle the names of all .txt files in the current directory:

```js
const { shuffleFiles } = require('shuffle-files');
shuffleFiles('./files', 'txt');
```

To shuffle the names of all .jpg files in the current directory,
then rename .png files with the same mapping:

```js
const { shuffleFiles, renameFilesWithMapping } = require('shuffle-files');
const mapping = shuffleFiles('./jpg', 'jpg');
renameFilesWithMapping('./jpg', 'png', mapping);
```

