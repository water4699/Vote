# Private Salary Comparison DApp (FHE)

An MVP DApp where employees privately submit their monthly salary (encrypted with Zama FHEVM). The contract aggregates
an encrypted sum and a public participant count. Only the HR admin can decrypt the aggregated sum; the average salary
is computed client-side by HR as sum / count. Individual salaries remain private at all times.

## Quick Start

For detailed instructions see:
[FHEVM Hardhat Quick Start Tutorial](https://docs.zama.ai/protocol/solidity-guides/getting-started/quick-start-tutorial)

### Prerequisites

- **Node.js**: Version 20 or higher
- **npm or yarn/pnpm**: Package manager

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   ```bash
   npx hardhat vars set MNEMONIC

   # Set your Infura API key for network access
   npx hardhat vars set INFURA_API_KEY

   # Optional: Set Etherscan API key for contract verification
   npx hardhat vars set ETHERSCAN_API_KEY
   ```

3. **Compile and test**

   ```bash
   npm run compile
   npm run test
   ```

4. **Deploy to local network**

   ```bash
   # Start a local FHEVM-ready node
   npx hardhat node
   # Deploy to local network
   npx hardhat deploy --network localhost
   ```

5. **Deploy to Sepolia Testnet**

   ```bash
   # Deploy to Sepolia
   npx hardhat deploy --network sepolia
   # Verify contract on Etherscan
   npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
   ```

6. **Test on Sepolia Testnet**

   ```bash
   # Once deployed, you can run a simple test on Sepolia.
   npx hardhat test --network sepolia
   ```

## 📁 Project Structure

```
fhevm-hardhat-template/
├── contracts/
│   ├── SalaryAggregator.sol   # Encrypted sum + public count; HR-restricted decryption
│   └── FHECounter.sol         # Example from template
├── deploy/
├── test/
│   ├── SalaryAggregator.ts        # Mock tests (localhost)
│   └── SalaryAggregatorSepolia.ts # On-chain flow (Sepolia)
├── ui/packages/nextjs/            # Next.js frontend
│   ├── app/_components/SalaryApp.tsx
│   ├── app/page.tsx               # Renders SalaryApp
│   ├── components/Header.tsx      # Logo + RainbowKit button
│   └── public/favicon.png         # Replace with your logo
└── hardhat.config.ts
```

## 🔐 Business Flow (MVP)

- Employee submits salary: encrypted client-side; contract adds to encrypted sum; increments public count.
- HR admin authorizes decryption and decrypts the encrypted sum handle.
- Frontend displays average only for HR as floor(sum / count).

Notes: Median can be added later; this MVP focuses on a closed loop for submit → aggregate → authorized decrypt.

## 📜 Available Scripts

| Script             | Description              |
| ------------------ | ------------------------ |
| `npm run compile`  | Compile all contracts    |
| `npm run test`     | Run all tests            |
| `npm run coverage` | Generate coverage report |
| `npm run lint`     | Run linting checks       |
| `npm run clean`    | Clean build artifacts    |

## 📚 Documentation

- [FHEVM Documentation](https://docs.zama.ai/fhevm)
- [FHEVM Hardhat Setup Guide](https://docs.zama.ai/protocol/solidity-guides/getting-started/setup)
- [FHEVM Testing Guide](https://docs.zama.ai/protocol/solidity-guides/development-guide/hardhat/write_test)
- [FHEVM Hardhat Plugin](https://docs.zama.ai/protocol/solidity-guides/development-guide/hardhat)

## 📄 License

This project is licensed under the BSD-3-Clause-Clear License. See the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/zama-ai/fhevm/issues)
- **Documentation**: [FHEVM Docs](https://docs.zama.ai)
- **Community**: [Zama Discord](https://discord.gg/zama)

---

Branding: replace `ui/packages/nextjs/public/favicon.png` with your project logo. The header displays this icon and the
title “Private Salary DApp”.
