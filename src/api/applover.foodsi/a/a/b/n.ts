

type abn = {
    per_page: number,
    page: number,
    sort: string,
    user_favourites: number,
    query: {
        name: string,
        types: Array<string>,
        open: {
            from: string,
            until: string,
        },
        distance: {
            lat: string,
            lng: string,
            range: number,
        },
        sold_out: number,
    }
}

export default abn;
