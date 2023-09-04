import MealDetails from "./MealDetails";
import PictureDetails from "./PictureDetails";
import LogoDetails from "./LogoDetails";
import RestaurantStatsSchedule from "./RestaurantStatsSchedule";
import ChainDetails from "./ChainDetails";

type RestaurantDetails = {
    id: number,
    provider: string,
    uid: string,
    email: string,
    created_at: string,
    updated_at: string,
    name: string,
    phone: string,
    meal: MealDetails,
    image: PictureDetails,
    logo: LogoDetails,
    latitude: string,
    longitude: string,
    description: string,
    address: string,
    url: string,
    favourite: boolean,
    schedule: RestaurantStatsSchedule,
    types: Array<string>,
    chain: Array<ChainDetails>,
}

export default RestaurantDetails;
