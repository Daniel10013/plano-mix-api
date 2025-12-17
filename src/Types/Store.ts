export type Store = {
    name: string,
    classification_id: number,
    segment_id: number,
    activity_id: number | null
}

export type StoreRead = Store & {
    id: number
}

export type StoreList = {
    id: number
    name: string,
    classification_id: number,
    classification: string,
    segment_id: number,
    segment: string,
    activity_id?: number,
    activity?: string
}

export type StoreInShopping = {
    id: number
    store_id: number,
    name: string,
    classification_id: number,
    classification: string,
    segment_id: number,
    segment: string,
    activity_id: number | null,
    activity: string | null,
    store_left_name: string | null,
    store_left_id: number | null,
    store_right_name: string | null,
    store_right_id: number | null,
    status: 'active' | 'deleted'
}

export type StoreWithClassification = {
    name: string,
    classification: string,
    segment: string,
    activity: string | null
    status: 'active' | 'deleted'
}