const fs = require('fs');
const path = require('path');

// Copy built SDK to node_modules
const sdkSource = path.join(__dirname, '../../fhevm-sdk/dist');
const sdkDest = path.join(__dirname, '../node_modules/@fhevm-sdk');

// Create @fhevm-sdk directory
const nodeModulesDir = path.join(__dirname, '../node_modules');
if (!fs.existsSync(nodeModulesDir)) {
  fs.mkdirSync(nodeModulesDir, { recursive: true });
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

// Also copy package.json for proper module resolution
const sdkPackageJson = path.join(__dirname, '../../fhevm-sdk/package.json');
const destPackageJson = path.join(sdkDest, 'package.json');

if (fs.existsSync(sdkSource)) {
  copyRecursiveSync(sdkSource, sdkDest);
  if (fs.existsSync(sdkPackageJson)) {
    fs.copyFileSync(sdkPackageJson, destPackageJson);
  }
  console.log('✅ SDK copied to node_modules/@fhevm-sdk');
} else {
  console.error('❌ SDK dist directory not found at:', sdkSource);
  console.log('This is expected if SDK is not built yet. Continuing...');
}

