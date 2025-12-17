import prisma, { Classification, Shopping, ShoppingStore } from '../Lib/Database/Prisma';
import type { AnalyticClassification, ShoppingRead } from '../Types/Shopping';
import type { Shopping as ShoppingData } from '../Types/Shopping';

class ShoppingRepository {

    public getAll = async (): Promise<ShoppingRead[]> => {
        return await Shopping.findMany();
    }

    public getById = async (id: number): Promise<ShoppingRead | null> => {
        return await Shopping.findUnique({
            where: { id: id }
        })
    }

    public async getAnalyticsClassification(shoppingId: number): Promise<AnalyticClassification> {

        const classificacoes = await Classification.findMany({
            select: { id: true, name: true },
            orderBy: { id: "asc" }
        });

        const contagens = await prisma.$queryRaw<
            { classification_id: number; total: bigint }[]
        >`
        SELECT
            s.classification_id,
            COUNT(*) AS total
        FROM shopping_store ss
        JOIN store s ON s.id = ss.store_id
        WHERE ss.shopping_id = ${shoppingId}
        GROUP BY s.classification_id
    `;

        const resultado: Record<string, number> = {};

        for (const c of classificacoes) {
            resultado[c.name] = 0;
        }

        for (const row of contagens) {
            const classificacao = classificacoes.find(c => c.id === row.classification_id);
            if (classificacao) {
                resultado[classificacao.name] = Number(row.total);
            }
        }

        resultado["TOTAL"] = Object.values(resultado).reduce((acc, v) => acc + v, 0);

        const MAP = {
            "LOJAS ÂNCORA": "LOJAS_ANCORA",
            "SEMI-ÂNCORA": "SEMI_ANCORA",
            "MEGALOJAS": "MEGALOJAS",
            "LOJAS SATÉLITE": "LOJAS_SATELITE",
            "CONVENIÊNCIA / SERVIÇOS": "CONVENIENCIA_SERVICOS",
            "ENTRETENIMENTO": "ENTRETENIMENTO",
            "MALL E MERCHANDISING": "MALL_E_MERCHANDISING",
            "TOTAL": "TOTAL",
        } as const;

        const formatted: AnalyticClassification = Object.entries(resultado).reduce(
            (acc, [key, value]) => {
                const newKey = MAP[key as keyof typeof MAP];
                if (newKey) acc[newKey] = value;
                return acc;
            },
            {} as AnalyticClassification
        );

        return formatted;

    }

    public create = async (shoppingData: ShoppingData): Promise<number> => {
        const shopping = await Shopping.create({
            data: shoppingData,
            select: { id: true }
        })
        return shopping.id
    }

    public update = async (id: number, updatedData: ShoppingData): Promise<boolean> => {
        const updated = await Shopping.update({
            data: updatedData,
            where: { id: id }
        })
        return !!updated;
    }

    public deleteById = async (id: number): Promise<boolean> => {
        const deleted = await Shopping.delete({
            where: { id: id }
        })
        return !!deleted;
    }

    public exists = async (zip_code: number) => {
        return await Shopping.count({
            where: { zip_code: zip_code }
        })
    }

    public getCepById = async (id: number): Promise<number> => {
        const resultado = await Shopping.findUnique({
            where: { id: id },
            select: {
                zip_code: true
            }
        });
        return resultado!.zip_code;
    }

    public existsById = async (id: number): Promise<number> => {
        return await Shopping.count({
            where: {
                id: id
            }
        });
    }
}

export default ShoppingRepository;