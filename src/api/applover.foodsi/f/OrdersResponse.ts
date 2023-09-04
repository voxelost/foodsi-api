import OrderPickupDetails from "../api.model.response/OrderPickupDetails"

/**
 * @GET("/api/v1/users/orders")
 * g<D<fe>> c();
 */
type OrdersResponse = {
    orders: Array<OrderPickupDetails>,
}

export default OrdersResponse;
