# Core Value Proposition 

To **prove our core value proposition**—that **Kenyan stocks can be tokenized and traded peer-to-peer** on ChumiDEX—we need only the **absolute essentials**. These essentials break down into three pillars:

1. **Stock Tokenization**
2. **Peer-to-Peer Trading via an AMM**
3. **Lightweight Governance & Transparency**

Below is an in-depth exploration of what each pillar entails, the minimum we must build, and why it matters.

---

## 1. Stock Tokenization: On-Chain Digital Equivalents of NSE Shares

### a. ERC-20 StockToken Contract

* **Purpose:** Represent 1 NSE share (or fractional share) as 1 on-chain token.
* **Key Features:**

  * **Minting & Burning:**

    * **`mint(address to, uint256 amount)`** callable only by a privileged “Issuer” role.
    * **`burn(address from, uint256 amount)`** to retire tokens when off-chain shares are redeemed or corporate actions occur.
  * **Metadata:**

    * Embedded strings for the **ticker symbol** (`"SCOM"`), **company name**, and a **URI** pointing to on-chain audited documents (prospectus, regulatory filings).
  * **Supply Control:**

    * A hard cap equal to total outstanding shares.
    * Role-based access control (using OpenZeppelin’s `AccessControl`) to ensure only your backend or multisig DAO can mint.

### b. Registry of Approved StockTokens

* **Purpose:** Prevent unauthorized tokens—and malicious forks—from listing on ChumiDEX.
* **Implementation:**

  * A simple on-chain mapping in a **`Registry`** contract:

    ```solidity
    mapping(address => bool) public isWhitelisted;
    function whitelistToken(address token) external onlyAdmin { … }
    function removeToken(address token) external onlyAdmin { … }
    ```
  * **Frontend** pulls `Registry.getApprovedTokens()` to populate all trading pairs.

### c. Stablecoin Integration

* **Purpose:** Provide a price anchor and liquidity depth via a well‐trusted asset (e.g., USDC on Lisk L2).
* **Implementation:**

  * Detect a single stablecoin contract in the same registry.
  * Enforce 50/50 pools in the AMM (e.g., `SCOM/USDC`), ensuring every swap has a stable reference.

---

## 2. Peer-to-Peer Trading via a Minimal AMM

### a. Constant-Product Pool Contract

* **Purpose:** Enable trustless swaps between any two whitelisted tokens without order books.
* **Core Functions:**

  * **`addLiquidity(tokenA, tokenB, amountA, amountB)`**

    * Validates tokens are whitelisted.
    * Transfers user tokens in, updates internal reserves (`reserveA`, `reserveB`).
    * Mints **LP shares** proportional to deposit (using `totalShares` bookkeeping).
  * **`removeLiquidity(poolId, shareAmount)`**

    * Burns user’s LP shares.
    * Calculates and returns proportional amounts of `tokenA` and `tokenB`.
  * **`swap(inputToken, outputToken, inputAmount, minOutputAmount)`**

    * Applies the constant-product formula (`x * y = k`), subtracts a protocol fee (e.g., 0.3%).
    * Checks `outputAmount >= minOutputAmount` to protect against front-running/slippage.
    * Transfers tokens accordingly and updates reserves.

### b. LP Share Token

* A simple ERC-20 representing the user’s stake in that pool. Burning LP tokens redeems underlying assets.

### c. Security & Auditing

* **Reentrancy Guards:** Protect swap and liquidity functions.
* **Invariant Checks:** Post-state assertions to ensure `reserveA * reserveB` never decreases (minus fees).
* **Unit Tests:** Forge scripts simulating edge cases (tiny pools, extreme swap ratios).

---

## 3. Lightweight Governance & Transparency

### a. Governance Stub Contract

* **Purpose:** Show that token holders can influence key parameters—fees, new listings, market fees distribution.
* **Minimal Interface:**

  ```solidity
  struct Proposal { 
    uint256 id;
    address proposer;
    bytes callData;
    uint256 yesVotes;
    uint256 noVotes;
    bool executed;
  }
  function propose(bytes callData) external returns (uint256);
  function vote(uint256 proposalId, bool support) external;
  function execute(uint256 proposalId) external;
  ```
* **Voting Token:** Reuse **LP shares** or a dedicated **`CHD`** token distributed to early adopters.

### b. Events for Transparency

* Emit detailed events on every action:

  * `StockTokenMinted(issuer, token, amount)`
  * `SwapExecuted(user, inputToken, outputToken, inputAmt, outputAmt)`
  * `ProposalCreated(id, proposer, callData)`
  * `VoteCast(voter, proposalId, support)`

### c. Frontend Dashboard

* **Real-Time Feeds:**

  * **Swap & Liquidity Events:** List the latest on-chain events with timestamps.
  * **Proposal Status:** Show open proposals with vote tallies.
* **On-Chain Data Retrieval:**

  * Use **Ethers.js** to call contract views (`getReserves()`, `getProposal()`), ensuring the data is always live—no backend cache required for MVP.

---

## Why These Essentials?

* **Tokenization** proves you can map **real-world equity** into on-chain tokens.
* The **AMM** demonstrates **peer-to-peer trading** without intermediaries.
* The **Governance Stub** highlights **community control** and transparency.

With these three building blocks—**on-chain stocks**, **trustless swaps**, and **light governance**—you’ll have a **working MVP** that clearly shows ChumiDEX’s unique value: **enabling anyone in Kenya (and beyond) to trade actual NSE stocks directly, transparently, and permissionlessly**.
