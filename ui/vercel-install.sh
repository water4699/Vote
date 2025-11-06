#!/bin/bash
set -e

# Install root dependencies
echo "Installing root dependencies..."
npm install

# Build fhevm-sdk first
echo "Building @fhevm-sdk..."
cd packages/fhevm-sdk
npm install
npm run build
cd ../..

# Install nextjs dependencies
echo "Installing nextjs dependencies..."
cd packages/nextjs
npm install --legacy-peer-deps

