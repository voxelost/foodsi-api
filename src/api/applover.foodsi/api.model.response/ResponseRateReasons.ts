import RateReason from "./RateReason";

type ResponseRateReasons = {
    content_reasons: Array<RateReason>,
    collection_reasons: Array<RateReason>,
}

export default ResponseRateReasons;
