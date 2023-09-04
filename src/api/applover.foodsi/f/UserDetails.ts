import PictureDetails from "../api.model.response/PictureDetails";

type UserDetails = {
    id: number | null,
    email: string,
    picture?: PictureDetails,
    provider: 'email' | string,
    uid: string,
    created_at?: string | null,
    updated_at?: string | null,
    name: string | null,
    phone: string | null,
    pin?: string, // ?todo: doesn't appear anywhere
    phone_validation: string | null, // ?todo: type may be wrong
    phone_validated_at: string | null,
    allow_password_change: boolean,
    last_notified_at?: string,
    last_payment_method?: 'no_payment' | string,

    referral_code?: string,
    referral_points?: number,
    referred_by?: number,

    latitude: number,
    longitude: number,
    search_range: number,

    favourite_restaurants: Array<unknown>,
}

export default UserDetails;
