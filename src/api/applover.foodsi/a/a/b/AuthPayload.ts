
interface AuthPayload {
    email: string,
    password: string,
    name?: string,
    phone?: string,
    referral_code?: string,
}

export default AuthPayload;
