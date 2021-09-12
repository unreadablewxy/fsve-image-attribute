# fs-viewer-attribute-editor

Filesystem attribute editor for fs-viewer

## How to install

For now there's no UI experience for managing extensions in the `fs-viewer` project. So all installations must be done manually.

1. Build this extension & generate symblinks
```bash
npm install && npm run link
```

2. Open the application level preferences in your favorite text editor
  * `~/.config/fs-viewer/config.json` (for linux users)
  * `%APPDATA%/fs-viewer/config.json` (for windows users)
  
3. Add the following property to the JSON file
```json
{
  "extensions":["fs-viewer-attribute-editor"]
}
```

Note: Assume pre-alpha, "it works on my box", level of quality. Unlike other extensions, this one has destructive potential. If in doubt, do not use
