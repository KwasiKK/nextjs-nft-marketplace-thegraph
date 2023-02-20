import { gql } from "@apollo/client"

const GET_ACTIVE_ITEMS = gql`
    {
        activeItems(first: 10) {
            id
            seller
            buyer
            nftAddress
            tokenId
            price
        }
    }
`
export default GET_ACTIVE_ITEMS
