## DeltaUSD on-chain TVL adapter

Adds `projects/deltausd/index.js` to measure the configured on-chain backing portfolio of DeltaUSD. Balances and strategy positions are read from chain; the adapter does not use DeBank or a project API to obtain TVL.

##### Name (to be shown on DefiLlama):
DeltaUSD

##### Twitter Link:
https://x.com/deltaausd

##### List of audit links if any:
No independent audit report is linked in the project documentation. Source verification is not presented as an audit.

##### Website Link:
https://deltausd.com/
Documentation: https://deltausd.com/documentation

##### Logo (High resolution, will be shown with rounded borders):
https://deltausd.com/delta-logo.png

##### Current TVL:
Approximately **$173,990**, measured on 2026-11-12 by this adapter using DefiLlama token prices. This is configured on-chain backing only, not the website's supply-times-contract-price figure or an assertion of total reserves.

##### Treasury Addresses (if the protocol has treasury):
- Disclosed strategy/reserve wallet: `0x12edd10a11fd9c94f9ac1b085a627f3745730899`.
- Configured BSC operator/staging address: `0x929c98a6e23721f379b5e27cc694744a2b6d46c2`.
- BSC token and mint/redeem contract: `0x1851302297e318d658829fd94b89d5ae6528cb9e`.

##### Chain:
Measured reserve portfolio: BSC, Base, Berachain, Plasma, XLayer, Polygon and Optimism. The Solana network is excluded. SOL-denominated tokens on supported EVM chains remain part of their respective chain positions.

##### Coingecko ID:
Not provided; no unverified ID is claimed.

##### Coinmarketcap ID:
Not provided; no unverified ID is claimed.

##### Short Description (to be shown on DefiLlama):
DeltaUSD is a yield-accruing synthetic dollar with operator-managed backing deployed in DeFi strategies. Its stated strategy includes delta-neutral funding, basis and spread opportunities.

##### Token address and ticker if any:
- BSC dUSD: `0x1851302297e318d658829fd94b89d5ae6528cb9e`.
- XLayer dUSD deployment documented by the project: `0x450fb16f202bdbd4f3ebfc2a82f179dd8c1ce8d4`.

##### Category:
Basis Trading (proposed classification for maintainer review).

##### Oracle Provider(s):
The dUSD price-accrual formula is configured by the owner; it is not an external oracle of realized strategy profits. This adapter returns underlying token amounts and leaves USD pricing to DefiLlama.

##### Implementation Details:
The adapter reads proportional AMM/vault positions, lending balances and debts. For the configured Base Morpho market it accrues interest to the measured block using Morpho's published accounting, including virtual shares and upward rounding of debt. No contract-reported dUSD price is used as proof of backing.

##### Documentation/Proof:
- Project documentation: https://deltausd.com/documentation
- Reserve wallet: https://debank.com/profile/0x12edd10a11fd9c94f9ac1b085a627f3745730899
- BSC token source: https://bscscan.com/address/0x1851302297e318d658829fd94b89d5ae6528cb9e#code
- Morpho accounting: https://github.com/morpho-org/morpho-blue/blob/main/src/libraries/periphery/MorphoBalancesLib.sol

##### forkedFrom:
Not independently established; this submission makes no protocol-fork provenance claim.

##### methodology:
- Counts BSC USDT at the configured mint/redeem contract, operator staging address and reserve wallet.
- Counts the owner's proportional QuickSwap V2 and Aerodrome LP positions, including the configured Aerodrome gauge, and the configured Beefy vault/CLM position.
- Counts configured Dolomite accounts, Kodiak Island/farm shares and owner-held Kodiak V3 NFT liquidity on Berachain.
- Counts configured Aave pools on BSC, Base and XLayer, Extra Finance Xlend pools on Base and Optimism, the configured Plasma aToken and the Base Morpho SOL/JitoSOL market.
- Deducts lending debt in the borrowed assets; free tracked-token balances are deduplicated. Plasma currently deducts variable debt in the configured reserve only.
- Excludes issued dUSD, Binance balances/futures, GoMining NFTs, unclaimed rewards/fees and unconfigured positions. Mantle and Arbitrum positions are not covered by this submission.

Reserve-wallet attribution and the manual flow from mint collateral through the operator to strategy positions are project-operator disclosures. The mint contract does not automatically allocate funds to, or enforce replenishment from, the strategy wallet. The adapter is a partial on-chain backing measure, not a solvency attestation.

`doublecounted: true` identifies overlap with Aave, Morpho, Extra Finance Xlend, Beefy, Aerodrome, QuickSwap, Dolomite and Kodiak. `timetravel: false` reflects a curated current portfolio rather than a historical allocation reconstruction.

##### Github org/user:
Public adapter repository: https://github.com/sasnes2000/DefiLlama-Adapters

##### Does this project have a referral program?
Yes.

### Validation

- Validated against upstream `cec5157069824d4da81b603ac6e0a47ce578beb1`, using its declared `@defillama/sdk` version 5.0.250.
- `node --check projects/deltausd/index.js` and repository ESLint passed.
- Repository-native `node test.js projects/deltausd/index.js` harness passed for all seven chains. This environment used public RPC overrides and a local HTTP/HTTPS tunnel-timeout preload; the preload changes neither adapter balances nor pricing and is not included in the PR.
- Approximate chain breakdown: Base $82.33k, XLayer $58.87k, Berachain $32.04k, Plasma $751, Optimism $2, BSC $0.05, Polygon dust.
- Morpho interest-accounting results were independently compared with a read-only `eth_call` simulation of on-chain accrual at the same block and matched.
- No package manifests or lockfiles are changed.

### Valuation and coverage notes

The owner's DeBank screenshot showed approximately $40.2k for XLayer, while this adapter's DefiLlama-priced net exposure is higher. Independent Aave-oracle valuation also gave a net value around $60k at the earlier diagnostic block. The source of DeBank's difference has not been established; its total has not been hardcoded or used as a target. New strategies require configuration updates.

Please allow edits by maintainers.
