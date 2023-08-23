import ad from "./d";
import aj from "./j";
import al from "./l";
import an from "./n";
import ar from "./r";

type Order = {
    id: number,
    provider: string,
    uid: string,
    email: string,
    created_at: string,
    updated_at: string,
    name: string,
    phone: string,
    meal: ad,
    image: al,
    logo: an,
    latitude: string,
    longitude: string,
    description: string,
    address: string,
    url: string,
    favourite: boolean,
    schedule: ar,
    types: Array<string>,
    chain: Array<aj>,
}

export default Order;
