import RestaurantDetails from "../a/a/RestaurantDetails";


type OrderPickupDetails = {
    restaurant_id: number,
    id: number,
    code: string,
    user_id: number,
    promocode: boolean,
    collection_time: string,
    transaction_time: string,
    processing: boolean,
    rate: number,
    total_price: number,
    created_at: string,
    for_date: string,
    updated_at: string,
    amount: number,
    status: string,
    can_be_collected_at: string,
    restaurant: RestaurantDetails,
}

export default OrderPickupDetails;
