

type PostRatePayload = {
    rate: {
        order_id: number,
        overall: number,
        content: number,
        collection: number,
        content_reason_id: number,
        collection_reason_id: number,
    },
}

export default PostRatePayload;
