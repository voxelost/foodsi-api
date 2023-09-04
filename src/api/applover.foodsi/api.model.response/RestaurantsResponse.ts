import RestaurantDetails from "../a/a/RestaurantDetails";
import PaginationDetails from "../a/a/PaginationDetails";

type RestaurantsResponse = {
    restaurants: Array<RestaurantDetails>,
    pagination: PaginationDetails,
}

export default RestaurantsResponse;
