# Electron File Converter App - Setup Guide

This guide shows how to create a production-ready Electron app for file conversion using the Vedic UI Kit's `FileConverter` component.

## Project Structure

```
electron-file-converter/
├── src/
│   ├── main/
│   │   ├── main.ts           # Electron main process
│   │   ├── ipc-handlers.ts   # IPC handlers for file operations
│   │   └── preload.ts        # Preload script with security context
│   ├── renderer/
│   │   ├── App.tsx           # React app with FileConverter
│   │   ├── main.tsx          # Entry point
│   │   └── styles.css        # App styles
│   └── types/
│       └── index.ts          # Shared TypeScript types
├── package.json
├── vite.config.ts            # Vite + Electron config
├── tsconfig.json
└── electron-builder.json     # Build config for packaging
```

## Setup Steps

### 1. Initialize Project

```bash
npm create vite@latest electron-file-converter -- --template react-ts
cd electron-file-converter
npm install
npm install -D electron electron-builder @types/electron
npm install @vedic/ui-kit
```

### 2. Update package.json

```json
{
  "name": "electron-file-converter",
  "version": "1.0.0",
  "main": "dist/main/main.js",
  "homepage": "./",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "electron": "electron .",
    "electron-dev": "concurrently \"npm run dev\" \"wait-on http://localhost:5173 && electron .\"",
    "electron-build": "npm run build && electron-builder",
    "preview": "vite preview"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "concurrently": "^8.0.0",
    "electron": "^latest",
    "electron-builder": "^24.0.0",
    "typescript": "^5.0.0",
    "vite": "^latest",
    "wait-on": "^7.0.0"
  },
  "build": {
    "appId": "com.vedic.fileconverter",
    "productName": "Vedic File Converter",
    "files": ["dist/**/*", "node_modules/**/*"],
    "directories": {
      "buildResources": "assets",
      "output": "release"
    },
    "win": {
      "target": ["nsis", "portable"]
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true
    }
  }
}
```

### 3. Create Main Process (src/main/main.ts)

```typescript
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { handleFileConversion } from './ipc-handlers';

let mainWindow: BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    minWidth: 600,
    minHeight: 500,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const startUrl =
    process.env.ELECTRON_START_URL ||
    `file://${path.join(__dirname, '../renderer/index.html')}`;

  mainWindow.loadURL(startUrl);

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null as any;
  });
}

// Register IPC handlers
ipcMain.handle('file:convert', handleFileConversion);

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
```

### 4. Create IPC Handlers (src/main/ipc-handlers.ts)

```typescript
import { ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';

export async function handleFileConversion(
  event: any,
  { filePath, fromFormat, toFormat }: { filePath: string; fromFormat: string; toFormat: string }
) {
  try {
    // Read the source file
    const buffer = fs.readFileSync(filePath);

    // Mock conversion - implement actual conversion logic here
    // For real conversion, integrate libraries like:
    // - ffmpeg-fluent (video/audio)
    // - pdf-lib (PDF operations)
    // - xlsx (spreadsheets)
    // - sharp (images)

    const fileName = path.basename(filePath, path.extname(filePath));
    const outputPath = path.join(
      path.dirname(filePath),
      `${fileName}_converted.${toFormat.toLowerCase()}`
    );

    // Write the converted file
    fs.writeFileSync(outputPath, buffer);

    return {
      success: true,
      outputPath,
      message: `File converted to ${toFormat}`,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
```

### 5. Create Preload Script (src/main/preload.ts)

```typescript
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  convertFile: (filePath: string, fromFormat: string, toFormat: string) =>
    ipcRenderer.invoke('file:convert', { filePath, fromFormat, toFormat }),
});

// TypeScript declaration
declare global {
  interface Window {
    electron: {
      convertFile: (filePath: string, fromFormat: string, toFormat: string) => Promise<any>;
    };
  }
}
```

### 6. Create React App (src/renderer/App.tsx)

```typescript
import { useState } from 'react';
import { FileConverter } from '@vedic/ui-kit';
import '@vedic/ui-kit/css';
import './styles.css';

function App() {
  const supportedFormats = [
    'PDF', 'DOCX', 'XLSX', 'PPTX',
    'PNG', 'JPG', 'GIF', 'WEBP', 'BMP',
    'MP4', 'AVI', 'MOV', 'MP3', 'WAV',
    'ZIP', 'RAR', '7Z', 'TAR'
  ];

  const handleConvert = async (file: File, fromFormat: string, toFormat: string) => {
    try {
      const result = await window.electron.convertFile(
        file.path,
        fromFormat,
        toFormat
      );

      if (result.success) {
        // Return the converted file as a Blob
        return new Blob([result.data]);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📄 Vedic File Converter</h1>
        <p>Convert files between multiple formats</p>
      </header>

      <main className="app-main">
        <FileConverter
          supportedFormats={supportedFormats}
          onConvert={handleConvert}
          maxFileSize={1073741824} // 1GB
        />
      </main>
    </div>
  );
}

export default App;
```

### 7. Configure Vite (vite.config.ts)

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist/renderer',
    emptyOutDir: true,
  },
  base: './',
  server: {
    port: 5173,
  },
});
```

### 8. Build Configuration (electron-builder.json)

```json
{
  "appId": "com.vedic.fileconverter",
  "productName": "Vedic File Converter",
  "files": [
    "dist/**/*",
    "node_modules/**/*",
    "!**/*.ts",
    "!**/*.tsx"
  ],
  "directories": {
    "buildResources": "assets",
    "output": "release"
  },
  "win": {
    "target": ["nsis", "portable"]
  },
  "nsis": {
    "oneClick": false,
    "allowToChangeInstallationDirectory": true
  },
  "mac": {
    "target": ["dmg", "zip"]
  },
  "linux": {
    "target": ["AppImage", "deb"]
  }
}
```

## Development Commands

```bash
# Development with hot reload
npm run electron-dev

# Build for production
npm run electron-build

# Package as installer
npm run electron-build -- --publish=never
```

## Integration Libraries

### Video/Audio Conversion
```bash
npm install ffmpeg-fluent
```

### PDF Operations
```bash
npm install pdf-lib
```

### Spreadsheet Conversion
```bash
npm install xlsx
```

### Image Processing
```bash
npm install sharp
```

### Archive Operations
```bash
npm install archiver unzipper
```

## Example Conversion Implementation

```typescript
import ffmpeg from 'ffmpeg-fluent';
import { PDFDocument } from 'pdf-lib';
import XLSX from 'xlsx';
import sharp from 'sharp';

export async function convertFile(
  inputPath: string,
  fromFormat: string,
  toFormat: string
): Promise<Buffer> {
  const format = fromFormat.toUpperCase();

  if (['MP4', 'AVI', 'MOV'].includes(format)) {
    // Video conversion with FFmpeg
    return await ffmpeg()
      .input(inputPath)
      .output(toFormat.toLowerCase())
      .run();
  }

  if (format === 'PDF') {
    // PDF operations
    const pdfDoc = PDFDocument.load(inputPath);
    // ... manipulation logic
  }

  if (['XLSX', 'XLS', 'CSV'].includes(format)) {
    // Spreadsheet conversion
    const workbook = XLSX.readFile(inputPath);
    // ... conversion logic
  }

  if (['PNG', 'JPG', 'GIF'].includes(format)) {
    // Image conversion with sharp
    return await sharp(inputPath)
      .toFormat(toFormat.toLowerCase())
      .toBuffer();
  }

  throw new Error(`Conversion from ${fromFormat} to ${toFormat} not supported`);
}
```

## Security Best Practices

1. **Validate File Types**: Check MIME types and file signatures
2. **Sandbox Conversion**: Run conversions in worker threads
3. **Limit File Size**: Prevent large file attacks
4. **Use IPC Handlers**: Never expose fs module directly
5. **Update Dependencies**: Keep Electron and libs current
6. **Code Signing**: Sign Windows/Mac builds

## Distribution

### Windows
```bash
npm run electron-build -- --win
```

### macOS
```bash
npm run electron-build -- --mac
```

### Linux
```bash
npm run electron-build -- --linux
```

## Performance Tips

- Use Web Workers for file processing
- Implement streaming for large files
- Cache conversion results
- Use efficient compression algorithms
- Monitor memory usage during conversion

---

For more details on Vedic UI Kit components, see the main [README.md](./README.md)
