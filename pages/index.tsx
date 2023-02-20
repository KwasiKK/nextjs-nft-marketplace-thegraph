import { Inter } from "@next/font/google"
import GET_ACTIVE_ITEMS from "@/constants/subgraphQueries"
import { useQuery } from "@apollo/client"
import NFTBox from "@/components/NFTBox"
import { useMoralis } from "react-moralis"
import { contractAddresses } from "@/constants"

// useQuery in here
const inter = Inter({ subsets: ["latin"] })

export default function Home() {
    const { loading: fetchingListedNfts, error, data: ListedNfts } = useQuery(GET_ACTIVE_ITEMS)
    const { isWeb3Enabled, chainId } = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : "31337"
    const marketplaceAddress = contractAddresses[chainString][0]
    console.log(ListedNfts)
    return (
        <div className="container mx-auto">
            <h1 className="py-4 px-4 font-bold text-2xl">Recently listed</h1>
            <div className="flex flex-wrap">
                {isWeb3Enabled ? (
                    fetchingListedNfts ? (
                        <div>Loading NFTs...</div>
                    ) : ListedNfts ? (
                        ListedNfts.activeItems.map((nft) => {
                            console.log(nft)
                            const { price, nftAddress, tokenId, buyer, seller } = nft
                            return (
                                <NFTBox
                                    price={price}
                                    nftAddress={nftAddress}
                                    tokenId={tokenId}
                                    buyer={buyer}
                                    seller={seller}
                                    key={`${nftAddress}${tokenId}`}
                                    marketplaceAddress={marketplaceAddress}
                                />
                            )
                        })
                    ) : (
                        <div>Error fetching active NFTs</div>
                    )
                ) : (
                    <div>Please connect wallet</div>
                )}
            </div>
        </div>
    )
}
