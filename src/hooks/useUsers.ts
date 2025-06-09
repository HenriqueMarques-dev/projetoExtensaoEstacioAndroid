import { useSQLiteContext } from "expo-sqlite";

export interface IUser {
    id: number;
    username: string;
    email: string;
    password: string;
}

export function useUsers() {
    const database = useSQLiteContext();

    async function createUser(user: Omit<IUser, 'id'>): Promise<void> {
        const statement = await database.prepareAsync(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        )

        try {

            const result = await statement.executeAsync([
                user.username,
                user.email,
                user.password,
            ])

            console.log('[useUsers]: Usuário criado com sucesso.', result);


        } catch (error) {
            console.error('[useUsers]: Erro ao criar usuário.', error);
            throw error;

        } finally {
            await statement.finalizeAsync();
        }
    }

    async function login(email: string, password: string) {
        const statement = await database.prepareAsync(
            'SELECT * FROM users WHERE email = ? AND password = ?',
        );

        try {
            const result = await statement.executeAsync([email, password]);

            const user = await result.getFirstAsync();

            if (!user) {
                console.warn('[useUsers]: Usuário não encontrado ou senha incorreta.');
                throw new Error('Usuário não encontrado ou senha incorreta.');
            }

            return { user: user as IUser };

        } catch (error) {
            console.warn('[useUsers]: Erro ao fazer login.', error);
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }

    async function getUser(email: string): Promise<IUser> {
        const statement = await database.prepareAsync(
            'SELECT * FROM users WHERE email = ?',
        );

        try {
            const result = await statement.executeAsync([email]);
            const user = await result.getFirstAsync();

            if (!user) {
                console.warn('[useUsers]: Usuário não encontrado.');
                throw new Error('Usuário não encontrado.');
            }

            return user as IUser;

        } catch (error) {
            console.warn('[useUsers]: Erro ao buscar usuário.', error);
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }


    return {
        createUser,
        login,
        getUser
    }
}