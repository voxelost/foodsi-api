
type PasswordUpdatePayload = {
    user: {
        password: string,
        password_confirmation: string,
    },
}

export default PasswordUpdatePayload;
