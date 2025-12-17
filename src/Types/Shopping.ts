export type Shopping = {
    name: string,
    zip_code: number,
    zip_number: number,
    observation: string | null
}
export type ShoppingRead = Shopping & {
    id: number;
};

export type AnalyticClassification = {
    LOJAS_ANCORA: number,
    SEMI_ANCORA:number,
    MEGALOJAS:number,
    LOJAS_SATELITE:number,
    CONVENIENCIA_SERVICOS:number,
    ENTRETENIMENTO:number,
    MALL_E_MERCHANDISING: number,
    TOTAL: number
}