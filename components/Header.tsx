import Link from "next/link"
import { ConnectButton } from "web3uikit"

function Header() {
    return (
        <nav className="p-5 border-b-2 flex flex-row justify-between">
            <h1 className="py-4 px-4 font-extrabold text-3xl">NFT Marketplace</h1>
            <div className="flex flex-row py-4 items-center">
                <Link href="/" className="mr-4">
                    Home
                </Link>
                <Link href="/sell-nft" className="mr-4">
                    Sell NFT
                </Link>
                <div className="ml-auto px-4">
                    <ConnectButton moralisAuth={false} />
                </div>
            </div>
        </nav>
    )
}

export default Header
