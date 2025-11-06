const fs = require('fs');
const path = require('path');

// Copy built SDK to node_modules
const sdkSource = path.join(__dirname, '../../fhevm-sdk/dist');
const sdkDest = path.join(__dirname, '../node_modules/@fhevm-sdk');

// Create @fhevm-sdk directory
if (!fs.existsSync(path.dirname(sdkDest))) {
  fs.mkdirSync(path.dirname(sdkDest), { recursive: true });
}

// Copy dist directory
function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (fs.existsSync(sdkSource)) {
  copyRecursiveSync(sdkSource, sdkDest);
  console.log('✅ SDK copied to node_modules');
} else {
  console.error('❌ SDK dist directory not found');
  process.exit(1);
}

