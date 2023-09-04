
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

type RestaurantesFilterV2Payload = {
    page: number,
    per_page: number,
    distance: {
        lat: number,
        long: number,
        range: number,
    },
    hide_unavailable: boolean,
    food_type: string[],
    collection_time: {
        from: string,
        to: string
    }
}

export default RestaurantesFilterV2Payload;
