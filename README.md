## What is it?

This module synchronously shuffles the names of files in the given directory.
It only shuffles the names of files, not the contents of the files.
It only shuffles the files with the given extensions.
Sometimes, some files won't be renamed.

## Example of usage

```js
const { shuffleFiles } = require('shuffle-files');
shuffleFiles('./files', ['txt']);
```
