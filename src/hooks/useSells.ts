import { useSQLiteContext } from "expo-sqlite";

export interface ISell {
    id: string;
    product: string;
    price: number;
    quantity: number;
    createdAt: Date;
    userId: string
}

export default function useSells() {
    const database = useSQLiteContext();

    async function createSell(data: Omit<ISell, 'id' | 'createdAt'>) {
        const statement = await database.prepareAsync(`
            INSERT INTO sells (userId, product, price, quantity)
            VALUES (?, ?, ?, ?);
        `);

        try {
            const result = await statement.executeAsync([
                data.userId, data.product,
                data.price, data.quantity])

            const insertedRowId = result.lastInsertRowId.toLocaleString()

            console.log('[useSells]: Venda criada com sucesso.', insertedRowId);

            return { insertedRowId }

        } catch (error) {
            console.warn('[useSells]: Erro ao criar venda.', error);
            return null;
        } finally {
            await statement.finalizeAsync();
        }

    }

    async function searchByName(name: string, userId: number): Promise<ISell[]> {
        try {
            const statement = await database.getAllAsync(
                `SELECT * FROM sells WHERE product LIKE ? AND userId = ?;`,
                [`%${name}%`, userId]
            );

            return statement as ISell[];
        } catch (error) {
            console.warn('[useSells]: Erro ao buscar vendas por nome.', error);
            return [];
        }
    }

    return {
        createSell,
        searchByName
    }
}
