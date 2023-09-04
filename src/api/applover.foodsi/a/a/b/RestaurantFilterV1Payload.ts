
/**
    // search preferences
    searchStartTime: <default: 0>
    searchEndTime: <default: 1440>
    searchRange: <allowed: <0, 50)>
    searchSoldOut: <default: true>

    // sorting options (?)
    searchNear: closest
    searchCheap: cheapest
    searchClosing: fastest

    // restaurant type
    searchTypeVegan: vegan
    searchTypeBakery: bakery
    searchTypeRestaurant: restaurant
    searchTypeShop: shop
 */

type RestaurantFilterV1Payload = {
    per_page: number,
    page: number,
    sort: "closest" | "cheapest" | "fastest",
    user_favourites: 0 | 1,
    query: {
        name: string | null,
        types: Array<"vegan" | "bakery" | "restaurant" | "shop">,
        open: {
            from: string,
            until: string,
        },
        distance: {
            lat: string,
            lng: string,
            range: number, // <0, 50)
        },
        sold_out: 0 | 1,
    }
}

export default RestaurantFilterV1Payload;
