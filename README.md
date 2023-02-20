

# NextJS NFT Marketplace with TheGraph

## 1. Git clone the contracts repo

In it's own terminal / command line, run: 

```
git clone https://github.com/KwasiKK/nextjs-nft-marketplace-thegraph
cd hardhat-nextjs-nft-marketplace-fcc
yarn
```

## 2. Deploy to rinkeby 

After installing dependencies, deploy your contracts to rinkeby:

```
yarn hardhat deploy --network rinkeby
```

## 3. Deploy your subgraph

```
cd ..
git clone https://github.com/KwasiKK/graph-nft-marketplace-fcc
cd graph-nft-marketplace-fcc
yarn
```

Follow the instructions of the [README](https://github.com/KwasiKK/graph-nft-marketplace-fcc/blob/main/README.md) of that repo. 

Then, make a `.env` file and place your temporary query URL into it as `NEXT_PUBLIC_SUBGRAPH_URL`.


## 4. Start your UI

Make sure that:
- In your `networkMapping.json` you have an entry for `NftMarketplace` on the rinkeby network. 
- You have a `NEXT_PUBLIC_SUBGRAPH_URL` in your `.env` file. 

```
yarn dev
```

## Contact

Kwasi Kgwete - kabelokwasi@gmail.com

[![Kwasi Kabelo Kgwete Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/Kay7_Kwasi)
[![Kwasi Kabelo Kgwete Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kwasi-kgwete-b5711472//)
