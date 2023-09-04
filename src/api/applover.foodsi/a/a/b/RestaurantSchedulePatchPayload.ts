import RestaurantStats from "../RestaurantStats";


/**
 * @PATCH("/api/v1/restaurants/{id}/schedule")
    g<D<h>> a(@Path("id") Integer paramInteger, @Body k paramk);
 */
type RestaurantSchedulePatchPayload = {
    days_attributes: Array<RestaurantStats>,
}

export default RestaurantSchedulePatchPayload;
