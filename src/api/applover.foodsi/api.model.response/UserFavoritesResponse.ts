import RestaurantDetails from "../a/a/RestaurantDetails";
import UserDetails from "../f/UserDetails";


type UserFavoritesResponse = {
    data: UserDetails,
    favourites: Array<RestaurantDetails>,
    errors: Array<string>,
}

export default UserFavoritesResponse;
