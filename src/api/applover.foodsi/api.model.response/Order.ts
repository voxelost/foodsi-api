import UserProfile from "./UserProfile";

type Order = {
    id: number,
    code: string,
    created_at: string,
    amount: number,
    user: UserProfile,
}

export default Order;
