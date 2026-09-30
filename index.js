const { sumTokens2 } = require('../helper/unwrapLPs');

const BSC_CONTRACT = '0x1851302297e318D658829fD94B89D5aE6528CB9e';
const BSC_AAVE_V3_HOLDER = '0x5d72a9d9a9510cd8cbdba12ac62593a58930a948';
const SOLANA_OWNER = 'BWjm6LzrTgY5paissScuXVWifWCt2YXYiuZYMez6PXJk';
const BERA_OWNER = '0x12edd10a11fd9c94f9ac1b085a627f3745730899';
const KODIAK_LP_TOKEN = '0xFE5E8C83FFE4d9627A75EaA7Fee864768dB989bD';
const BYUSD_TOKEN = '0x688e72142674041f8f6Af4c808a4045cA1D6aC82';

const USDT_BSC = '0x55d398326f99059fF775485246999027B3197955';
const AUSDT_BSC = '0x959E795461acCD6d6C63897C33D41666eA4A8165';

async function bscTvl(api) {
  return sumTokens2({
    api,
    owners: [BSC_CONTRACT, BSC_AAVE_V3_HOLDER],
    tokens: [USDT_BSC, AUSDT_BSC]
  });
}

async function solanaTvl() {
  return sumTokens2({
    owner: SOLANA_OWNER,
    tokens: [
      'So11111111111111111111111111111111111111112', // SOL
      'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC
      '8HoQnePLqPj4M7PUDzfw8e3Ymdwgc7NLGnaTUapubyvu'  // Raydium LP
    ],
    chain: 'solana'
  });
}

async function berachainTvl(api) {
  return sumTokens2({
    api,
    owners: [BERA_OWNER],
    tokens: [BYUSD_TOKEN, KODIAK_LP_TOKEN]
  });
}

module.exports = {
  methodology: 'TVL includes USDT collateral on BSC, Aave v3 positions, Raydium SOL-USDC LP on Solana, and Kodiak/Dolomite positions on Berachain.',
  bsc: { tvl: bscTvl },
  solana: { tvl: solanaTvl },
  berachain: { tvl: berachainTvl }
};