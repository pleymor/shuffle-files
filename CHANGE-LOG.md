## 2.0.0

* Breaking change:

Before:
```js
shuffleFiles('./files', ['txt']);
```
Now:
```js
shuffleFiles('./files', 'txt');
```

* features

`shuffleFiles` returns the mapping applied.

new function: `renameFilesWithMapping` to rename files with the given mapping.
