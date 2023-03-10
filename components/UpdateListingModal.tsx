import { useMoralis, useWeb3Contract } from "react-moralis"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import basicNftAbi from "../constants/BasicNft.json"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Input, Modal, useNotification } from "web3uikit"
import { ethers } from "ethers"

function UpdateListingModal({ nftAddress, tokenId, isVisible, marketplaceAddress, onClose }) {
    const [priceToUpdateListingWith, setPriceToUpdateListingWith] = useState(0)
    const dispatch = useNotification()

    const { runContractFunction: updateListing } = useWeb3Contract({
        abi: nftMarketplaceAbi,
        contractAddress: marketplaceAddress,
        functionName: "updateListing",
        params: {
            tokenId: tokenId,
            nftAddress: nftAddress,
            price: ethers.utils.parseEther(priceToUpdateListingWith.toString() || "0"),
        },
    })

    console.log({ priceToUpdateListingWith })

    const handleUpdateListingSuccess = async (tx) => {
        await tx.wait(1)
        dispatch({
            type: "success",
            message: "Listing updated - please refresh (and move blocks)",
            title: "Listing updated",
            position: "topR",
        })
        onClose && onClose()
        setPriceToUpdateListingWith(0)
    }

    return (
        <Modal
            cancelText="Discard Changes"
            id="regular"
            isVisible={isVisible}
            okText="Save Changes"
            onCancel={onClose}
            onCloseButtonPressed={onClose}
            onOk={() => {
                updateListing({
                    onError: (error) => {
                        console.log(error)
                    },
                    onSuccess: handleUpdateListingSuccess,
                })
            }}
            title={<div style={{ display: "flex", gap: 10 }}>Update Listing</div>}
        >
            <Input
                label="Update listing price L1 Currency (ETH)"
                name="New listing price"
                type="number"
                onChange={(event) => {
                    setPriceToUpdateListingWith(event.target.value)
                }}
            />
        </Modal>
    )
}

export default UpdateListingModal
