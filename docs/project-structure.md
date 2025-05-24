# Project Structure

This file structure  integrates the backend (smart contracts in Foundry) and frontend (Next.js client) components, incorporating the requirements for tokenization, AMM-style DEX functionality, governance, and wallet integration. The structure reflects the minimal setup for the MVP as described in `docs/mvp-plan.md` and `docs/project-tooling.md`, ensuring a clear separation between the smart contract backend (`chumidex/`) and the frontend (`client/`). Below is the detailed file structure, followed by explanations of key components.

---

### File Structure

```
project-root/
├── chumidex/                               # Foundry project for smart contracts
│   ├── src/                                # Smart contract source files
│   │   ├── tokens/                         # Token-related contracts
│   │   │   └── RegionalAssetToken.sol      # ERC-20 token for NSE stocks
│   │   ├── dex/                            # DEX-related contracts
│   │   │   └── Pair.sol                    # AMM pool contract for swaps and liquidity
│   │   ├── governance/                     # Governance-related contracts
│   │   │   └── Governance.sol              # Governance stub for proposals and voting
│   │   └── Registry.sol                    # Registry for whitelisted tokens
│   ├── test/                               # Test files for smart contracts
│   │   ├── tokens/                         # Token contract tests
│   │   │   └── RegionalAssetToken.t.sol    # Tests for RegionalAssetToken
│   │   ├── dex/                            # DEX contract tests
│   │   │   └── Pair.t.sol                  # Tests for Pair
│   │   ├── governance/                     # Governance contract tests
│   │   │   └── Governance.t.sol            # Tests for Governance
│   │   └── Registry.t.sol                  # Tests for Registry
│   ├── script/                             # Deployment scripts
│   │   └── Deploy.s.sol                    # Script to deploy all contracts
│   ├── lib/                                # External libraries (e.g., OpenZeppelin)
│   │   └── openzeppelin-contracts/         # OpenZeppelin dependency
│   ├── foundry.toml                        # Foundry configuration
│   └── README.md                           # Backend project documentation
├── client/                                 # Next.js frontend project
│   ├── src/                                # Source files for Next.js
│   │   ├── app/                            # Next.js app directory
│   │   │   ├── globals.css                 # Global styles with Tailwind
│   │   │   ├── layout.tsx                  # Root layout for the app
│   │   │   ├── page.tsx                    # Home page
│   │   │   ├── swap/                       # Swap page
│   │   │   │   └── page.tsx                # Swap UI
│   │   │   ├── liquidity/                  # Liquidity management page
│   │   │   │   └── page.tsx                # Add/remove liquidity UI
│   │   │   ├── governance/                 # Governance page
│   │   │   │   └── page.tsx                # Proposal and voting UI
│   │   │   └── dashboard/                  # Analytics dashboard
│   │   │       └── page.tsx                # Pool metrics and price charts
│   │   ├── components/                     # Reusable React components
│   │   │   ├── WalletConnect.tsx           # Web3Modal wallet integration
│   │   │   └── ChartComponent.tsx          # Chart.js component for metrics
│   │   └── utils/                          # Utility scripts
│   │       └── web3.ts                     # Ethers.js configuration and contract interactions
│   ├── public/                             # Static assets
│   │   ├── favicon.ico                     # Favicon
│   │   └── images/                         # Images (e.g., logo)
│   ├── abis/                               # Contract ABIs from Foundry
│   │   ├── RegionalAssetToken.json         # ABI for RegionalAssetToken
│   │   ├── Pair.json                       # ABI for Pair
│   │   ├── Governance.json                 # ABI for Governance
│   │   └── Registry.json                   # ABI for Registry
│   ├── eslint.config.mjs                   # ESLint configuration
│   ├── next-env.d.ts                      # TypeScript declarations for Next.js
│   ├── next.config.ts                     # Next.js configuration
│   ├── postcss.config.mjs                 # PostCSS/Tailwind configuration
│   ├── tailwind.config.ts                 # Tailwind CSS configuration
│   ├── package.json                        # Frontend dependencies
│   └── README.md                           # Frontend project documentation
├── docs/                                   # Project documentation
│   ├── core-value-proposition.md           # Core value proposition
│   ├── mvp-plan.md                        # MVP plan
│   └── project-tooling.md                  # Tooling details
├── LICENSE                                 # MIT License
└── README.md                               # Project overview
```

---

### Explanation of Key Components

#### 1. Backend (`chumidex/`)
This directory contains the Foundry project for smart contracts, as outlined in `docs/mvp-plan.md` and `docs/project-tooling.md`. It aligns with the requirements for tokenization, AMM swaps, and governance.

- **src/**:
  - **`tokens/RegionalAssetToken.sol`**: Implements an ERC-20 token for NSE stocks (e.g., Safaricom shares), with minting and burning restricted to an admin role, as specified in `core-value-proposition.md`. Uses OpenZeppelin’s `ERC20` and `AccessControl`.
  - **`dex/Pair.sol`**: The AMM pool contract for swaps and liquidity, implementing `addLiquidity`, `removeLiquidity`, and `swap` functions with a constant-product formula (x * y = k), as described in `core-value-proposition.md`.
  - **`governance/Governance.sol`**: A stub contract for creating proposals and voting, using a governance token (e.g., CHD or LP shares), as outlined in `mvp-plan.md`.
  - **`Registry.sol`**: A contract to whitelist approved stock tokens and a stablecoin (e.g., USDC), ensuring only authorized tokens are traded, per `core-value-proposition.md`.

- **test/**:
  - Contains test files for each contract (e.g., `RegionalAssetToken.t.sol`, `Pair.t.sol`) using Foundry’s testing framework (`forge test`), as recommended in `project-tooling.md`.

- **script/**:
  - **`Deploy.s.sol`**: A deployment script to deploy all contracts to Lisk L2 testnet, replacing the example `Counter.s.sol`.

- **foundry.toml**:
  - Configured with the Lisk L2 RPC endpoint (e.g., `https://lisk-l2-rpc.com`) for testing and deployment, as mentioned in the previous response.

- **README.md**:
  - Based on `backed/README.md`, it includes Foundry usage instructions tailored for ChumiDEX.

#### 2. Frontend (`client/`)
This directory contains the Next.js application, as described in `client/README.md` and `project-tooling.md`. It supports wallet integration, swap/liquidity/governance UIs, and a dashboard.

- **src/app/**:
  - **`globals.css`**: Configures Tailwind CSS for styling, as per `project-tooling.md`.
  - **`layout.tsx`**: The root layout, updated to include a consistent header/footer for ChumiDEX branding.
  - **`page.tsx`**: The homepage, modified to introduce ChumiDEX and link to swap/liquidity/governance pages.
  - **`swap/page.tsx`**: A page for token swaps, allowing users to select tokens and amounts, using Ethers.js to call `Pair.swap`.
  - **`liquidity/page.tsx`**: A page for adding/removing liquidity, interacting with `Pair.addLiquidity` and `Pair.removeLiquidity`.
  - **`governance/page.tsx`**: A page for creating proposals and voting, interacting with `Governance.propose` and `Governance.vote`.
  - **`dashboard/page.tsx`**: Displays pool metrics (TVL, volume) and price quotes using Chart.js, pulling data via Ethers.js, as specified in `mvp-plan.md`.

- **src/components/**:
  - **`WalletConnect.tsx`**: Integrates Web3Modal for MetaMask/WalletConnect, enabling users to connect to Lisk L2, per `project-tooling.md`.
  - **`ChartComponent.tsx`**: A Chart.js component for visualizing pool metrics and price quotes, as outlined in `mvp-plan.md`.

- **src/utils/**:
  - **`web3.ts`**: Configures Ethers.js with the Lisk L2 provider and provides functions to interact with contract ABIs (e.g., `swapTokens`, `createProposal`).

- **abis/**:
  - Stores JSON ABIs generated by Foundry (`forge build`) for `RegionalAssetToken`, `Pair`, `Governance`, and `Registry`. These are used by Ethers.js in the frontend.

- **Configuration Files**:
  - `eslint.config.mjs`, `next-env.d.ts`, `next.config.ts`, `postcss.config.mjs`, `tailwind.config.ts`: Retained from the provided `client/` files, ensuring proper Next.js and Tailwind setup.
  - `package.json`: Includes dependencies like `ethers`, `web3modal`, and `chart.js`, as recommended in `project-tooling.md`.

#### 3. Documentation (`docs/`)
- Contains the provided documentation files (`core-value-proposition.md`, `mvp-plan.md`, `project-tooling.md`) to guide development and outline the MVP’s scope.

#### 4. Root Files
- **`LICENSE`**: The MIT License, as provided, applied to the entire project.
- **`README.md`**: A top-level overview of ChumiDEX, based on the provided `README.md`, summarizing the project’s purpose and linking to backend/frontend documentation.

---

### How It Fits Together
- **Backend (`chumidex/`)**: The smart contracts define the core logic for tokenization (`RegionalAssetToken.sol`), AMM trading (`Pair.sol`), governance (`Governance.sol`), and token whitelisting (`Registry.sol`). They are deployed to Lisk L2 using Foundry’s `forge script`.
- **Frontend (`client/`)**: The Next.js app provides a user interface for interacting with the smart contracts via Ethers.js. Pages like `/swap`, `/liquidity`, `/governance`, and `/dashboard` correspond to the MVP features in `mvp-plan.md`. Web3Modal enables wallet integration, and Chart.js powers the dashboard.
- **Integration**: The frontend uses contract ABIs (in `client/abis/`) and Ethers.js (in `client/src/utils/web3.ts`) to call functions on the deployed contracts. Events emitted by the contracts (e.g., `SwapExecuted`, `ProposalCreated`) are queried for the dashboard.
- **Testing and Deployment**: Foundry’s `forge test` ensures contract reliability, and `forge script` deploys to Lisk L2 testnet. A faucet (implemented as a simple contract or script) can dispense test tokens, as suggested in `mvp-plan.md`.
