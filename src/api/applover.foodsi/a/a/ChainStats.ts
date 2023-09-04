

type ChainStats = {
    meals: Map<string, number>,
    clients: Map<string, number>,
    income: Map<string, number>,
    total_meals: number,
    total_clients: number,
    total_income: number,
}

export default ChainStats;
