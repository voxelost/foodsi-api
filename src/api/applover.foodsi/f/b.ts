import response_d from "../api.model.response/d";

type fb = {
    id: number,
    email: string,
    picture: response_d,
    provider: string,
    uid: string,
    created_at: string,
    updated_at: string,
    name: string,
    phone: string,
    pin: string,
    phone_validated_at: string,
    referral_code: string,
    referral_points: number,
    referred_by: number,
}

export default fb;
