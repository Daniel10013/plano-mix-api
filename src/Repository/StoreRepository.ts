import type { Store as StoreData, StoreList } from '../Types/Store';
import prisma, { ShoppingStore, Store } from '../Lib/Database/Prisma';
import type { VisitHistoryStore, VisitStoreCreate, VisitStoreUpdate } from '../Types/Visit';
import type { StoreRead, StoreInShopping, StoreWithClassification } from '../Types/Store';

class StoreRepository {

    public getAll = async (): Promise<StoreList[]> => {
        const data = await Store.findMany({
            select: {
                id: true,
                name: true,
                classification: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                segment: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                activity: {
                    select: {
                        id: true,
                        name: true
                    }
                },
            }
        });
        return data.map(s => ({
            id: s.id,
            name: s.name,
            classification_id: s.classification.id,
            classification: s.classification.name,
            segment_id: s.segment.id,
            segment: s.segment.name,
            ...(s.activity && {
                activity_id: s.activity.id,
                activity: s.activity.name
            })
        }));
    }

    public getById = async (id: number): Promise<StoreRead | null> => {
        return await Store.findUnique({
            where: { id: id }
        })
    }

    public getManyByIds = async (ids: number[], history: VisitHistoryStore[]): Promise<StoreWithClassification[]> => {
        const stores = await Store.findMany({
            where: {
                id: { in: ids },
            },
            select: {
                name: true,
                id: true,
                activity: {
                    select: { name: true }
                },
                classification: {
                    select: { name: true }
                },
                segment: {
                    select: { name: true }
                }
            }
        });

        return stores.map(s => ({
            name: s.name,
            classification: s.classification!.name,
            segment: s.segment!.name,
            activity: s.activity?.name ?? null,
            status: history.find((h)=> h.store_id == s.id)?.status ?? 'deleted'
        }));
    }

    public exist = async (storeName: string, storeClassification: number): Promise<number> => {
        return await Store.count({
            where: {
                name: storeName,
                classification_id: storeClassification
            }
        })
    }

    public getNameById = async (id: number): Promise<string> => {
        const resultado = await Store.findUnique({
            where: { id: id },
            select: { name: true }
        })
        return resultado!.name
    }

    public getStoresByShoppingId = async (id: number): Promise<StoreInShopping[]> => {
        const resultado = await prisma.$queryRaw<StoreInShopping[]>`
            SELECT 
                CAST(p.id AS UNSIGNED)  AS id,
                CAST(s.id AS UNSIGNED)  AS store_id,
                s.name                  AS name,
                c.name                  AS classification,
                CAST(c.id AS UNSIGNED)  AS classification_id,
                sg.name                 AS segment,
                CAST(sg.id AS UNSIGNED) AS segment_id,
                a.name                  AS activity,
                CAST(a.id AS UNSIGNED)  AS activity_id,
                sl.name                 AS store_left_name,
                CAST(sl.id AS UNSIGNED) AS store_left_id,
                sr.name                 AS store_right_name,
                CAST(sr.id AS UNSIGNED) AS store_right_id,
                p.status                AS status
            FROM store s
            JOIN shopping_store p 
                ON p.store_id = s.id
            JOIN classification c 
                ON c.id = s.classification_id
            JOIN segment sg
                ON sg.id = s.segment_id
            LEFT JOIN activity a 
                ON a.id = s.activity_id
            LEFT JOIN store sl
                ON sl.id = p.store_id_left
            LEFT JOIN store sr
                ON sr.id = p.store_id_right
            WHERE p.shopping_id = ${id};
        `;

        const data: StoreInShopping[] = resultado.map(r => ({
            id: Number(r.id),
            store_id: Number(r.store_id),
            name: r.name,
            classification: r.classification,
            classification_id: Number(r.classification_id),
            segment: r.segment,
            segment_id: Number(r.segment_id),
            activity: r.activity ?? null,
            activity_id: r.activity_id ? Number(r.activity_id) : null,
            store_left_name: r.store_left_name,
            store_left_id: r.store_left_id ? Number(r.store_left_id) : null,
            store_right_name: r.store_right_name,
            store_right_id: r.store_right_id ? Number(r.store_right_id) : null,
            status: r.status
        }));

        return data;
    }


    public create = async (storeData: StoreData): Promise<number> => {
        const store = await Store.create({
            data: storeData,
            select: { id: true }
        })
        return store.id;
    }

    public createMany = async (storeData: StoreData[]): Promise<number> => {
        const store = await Store.createMany({
            data: storeData
        })
        return store.count;
    }

    public update = async (id: number, storeData: StoreData) => {
        const updated = await Store.update({
            data: storeData,
            where: { id: id }
        })
        return !!updated
    }

    public deleteById = async (id: number): Promise<boolean> => {
        const deleted = await Store.delete({
            where: { id: id }
        })
        return !!deleted
    }

    public visitStoresExists = async (ids: number[]): Promise<number> => {
        return await Store.count({
            where: {
                id: {in: ids} 
            }
        })
    }

    public createShoppingStore = async (data: VisitStoreCreate) => {
        return await ShoppingStore.create({
            data: data
        })
    }

    public updateShoppingStore = async (shoppingStore: VisitStoreUpdate, id: number) => {
        return await ShoppingStore.update({
            data: shoppingStore,
            where: { id: id }
        })
    }

    public deleteShoppingStore = async (id: number) => {
        return await ShoppingStore.update({
            data: { status: 'deleted' },
            where: { id: id }
        })
    }

}
export default StoreRepository;