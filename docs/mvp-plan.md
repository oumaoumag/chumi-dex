# MVP Plan

For an MVP of **ChumiDEX** (Lisk L2–powered, NSE-stock tokenization DEX).
We want to strip to the absolute essentials that prove our core value proposition—tokenized Kenyan stocks traded peer-to-peer. 

lean feature set to focus on:

### 1. Tokenized NSE Stocks

* **Asset Minting Module**

  * A simple command to mint an ERC-20 token representing a single NSE stock (e.g. `mintsafcomToken`)
  * On-chain metadata for stock ticker, decimals, and total supply
* **Registry**

  * A whitelist of approved stock tokens; only these can be traded on your DEX

### 2. AMM-Style DEX Functionality

* **Swap Command**

  * Users can swap between any two approved stock tokens or between stock tokens and a stablecoin (USDC)
* **Add/Remove Liquidity**

  * Commands to deposit token pairs into liquidity pools and mint LP shares
  * Simple 50/50 constant-product model (x·y = k) to start

### 3. Wallet Integration & UX

* **MetaMask / WalletConnect Support**

  * Connect to Lisk L2 through an EVM-compatible wallet
* **Basic Swap UI**

  * A single “Swap” page: select tokens, enter amount in/out, confirm transaction
* **Liquidity UI**

  * Minimal “Add Liquidity” and “Remove Liquidity” flows

### 4. On-Chain Governance (Light)

* **Governance Token Setup**

  * Distribute a small batch of “CHD” tokens to early testers
* **Proposal & Vote Commands**

  * A stub command for “createProposal” and “castVote” so you can demo governance in action
  * No on-chain execution—just vote tallying in your MVP

### 5. Basic Analytics Dashboard

* **Pool Metrics**

  * Display TVL and 24-hr volume for each liquidity pool
* **Price Quotes**

  * Live “price” and “slippage” calculations for swap pairs

### 6. Testnet Deployment & Faucet

* **Testnet Chain**

  * Spin up your local Lisk L2 testnet with the above modules
* **Faucet**

  * A simple web-endpoint to dispense test USDC and stock tokens so testers can play without real funds

---

#### Why These and Why First?

* Token minting + AMM swap covers the **core exchange mechanic**.
* Wallet support + UI proves **real users can trade**.
* A governance stub validates your **community-owned vision**.
* Analytics and a faucet make it **testable, demo-ready, and data-driven**.

Once these are solid, we can layer in cross-chain bridges, gasless transactions, advanced lending, and full DAO execution in subsequent releases.
