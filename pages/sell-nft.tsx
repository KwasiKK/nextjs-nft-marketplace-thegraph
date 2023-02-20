import Head from "next/head"
import Image from "next/image"
import { Inter } from "@next/font/google"
import styles from "@/styles/Home.module.css"
import basicNftAbi from "../constants/BasicNft.json"
import { Form, useNotification } from "web3uikit"
import { ethers } from "ethers"
import { contractAddresses } from "@/constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"

const inter = Inter({ subsets: ["latin"] })

export default function SellNft() {
    const { chainId } = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : "31337"
    const marketplaceAddress = contractAddresses[chainString][0]
    const { runContractFunction } = useWeb3Contract()
    const dispatch = useNotification()

    const approveAndList = async (data) => {
        console.log("Approving...")
        const nftAddress = data.data[0].inputResult
        const tokenId = data.data[1].inputResult
        const price = ethers.utils.parseUnits(data.data[2].inputResult, "ether").toString()

        const approveOptions = {
            abi: basicNftAbi,
            contractAddress: nftAddress,
            functionName: "approve",
            params: {
                to: marketplaceAddress,
                tokenId: tokenId,
            },
        }

        await runContractFunction({
            params: approveOptions,
            onSuccess: () => handleApproveSuccess(nftAddress, tokenId, price),
            onError: (error) => console.log(error),
        })
    }

    const handleApproveSuccess = async (nftAddress: string, tokenId: string, price: string) => {
        console.log("Approved, time to list!")
        const listOptions = {
            abi: nftMarketplaceAbi,
            contractAddress: marketplaceAddress,
            functionName: "listItem",
            params: {
                nftAddress: nftAddress,
                price: price,
                tokenId: tokenId,
            },
        }

        await runContractFunction({
            params: listOptions,
            onSuccess: handleListSuccess,
            onError: (error) => console.log(error),
        })
    }

    const handleListSuccess = async (tx) => {
        await tx.wait(1)
        dispatch({
            type: "success",
            message: "NFT Listed - please refresh (and move blocks)",
            title: "NFT Listed",
            position: "topR",
        })
    }

    return (
        <div>
            <Form
                onSubmit={approveAndList}
                data={[
                    {
                        name: "NFT Address",
                        type: "text",
                        value: "",
                        inputWidth: "50%",
                        key: "nftAddress",
                    },
                    {
                        name: "Token ID",
                        type: "number",
                        value: "",
                        inputWidth: "50%",
                        key: "tokenId",
                    },
                    {
                        name: "Price (in ETH)",
                        type: "number",
                        value: "",
                        inputWidth: "50%",
                        key: "price",
                    },
                ]}
                title="Sell your NFT!"
                id="MainForm"
            />
        </div>
    )
}
