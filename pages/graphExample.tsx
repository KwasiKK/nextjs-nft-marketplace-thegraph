import { gql, useQuery } from "@apollo/client"

const GET_ACTIVE_ITEMS = gql`
    {
        activeItems(first: 5) {
            id
            seller
            buyer
            nftAddress
            tokenId
            price
        }
    }
`

export default function GraphExample() {
    const { loading, error, data } = useQuery(GET_ACTIVE_ITEMS)
    console.log({ data })
    if (loading) return "Loading..."
    if (error) return `Error! ${error.message}`
    return <div>H1 K</div>
}
