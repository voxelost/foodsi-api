import response_a from "./a";

type response_m = {
    id: number,
    code: string,
    created_at: string,
    amount: number,
    user: response_a,
}

export default response_m;
