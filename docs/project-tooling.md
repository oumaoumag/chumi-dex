# Project-Tooling

For Our **MVP**, we want the lightest possible tech stack that still lets us spin up:

1. **Tokenized NSE-stock minting**
2. **AMM swaps + liquidity pools**
3. **Basic MetaMask/WalletConnect UX**
4. **Stub governance (propose + vote)**
5. **A simple dashboard for TVL/price**

Here’s the minimal set on top of **Foundry**, **OpenZeppelin**, **Next.js**, and the **Lisk JS SDK**:

---

## 1. Smart-Contract Interaction

* **Ethers.js**
  – Connect your frontend to Lisk L2 (EVM-compatible)
  – Read/write calls for mint/swap/addLiquidity/removeLiquidity

## 2. Wallet Integration

* **Web3Modal** (or **wagmi** with Web3Modal)
  – Out-of-the-box MetaMask & WalletConnect picker
  – Easy setup in Next.js

## 3. UI / State

* **Next.js + plain CSS (or Tailwind)**
  – Tailwind is optional; for MVP we can get by with a handful of utility classes
* **React Context** (built-in)
  – Track user address, balances, selected pool; no heavy Redux/Zustand

## 4. Charts & Metrics

* **Chart.js**
  – Lightweight candlestick or line charts for pool TVL & price
  – No need for The Graph subgraph at MVP—just pull on-chain events via Ethers.js and your own small data-aggregator script

## 5. Testing & CI

* **Foundry’s Forge**
  – Write unit tests for our Solidity contracts
  – Spin up a local Anvil node for rapid iterating
* **GitHub Actions** (basic)
  – Run `forge test` on each PR

---

### 🚀 MVP Flow Summary

1. **Contracts:**

   * ERC-20 “StockToken” (minting whitelist)
   * AMM pool contract (swap / add / remove)
   * Stub “Governance” contract storing proposals & votes

2. **Frontend:**

   * Next.js pages: `/swap`, `/liquidity`, `/governance`, `/dashboard`
   * Web3Modal → Ethers.js calls to your contracts
   * Chart.js component on `/dashboard` pulling on-chain data

3. **Testing & Launch:**

   * Forge tests & local Anvil → GitHub Actions
   * Deploy to Lisk L2 testnet
   * Provide a minimal JSON-RPC faucet script for testers

This lean stack ensures we prove the **core exchange**, **minting**, **governance stub**, and **basic analytics**—and nothing more—so we can get feedback fast and iterate.
