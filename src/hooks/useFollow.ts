import axios from 'axios';
import { FollowState } from '~/types';

export default function useFollow() {
    const add = async (
        userId: string,
        mangaSlug: string,
        source: string,
        status: FollowState,
    ) => {
        try {
            await axios.post(`/api/follow/${mangaSlug}`, {
                userId,
                source,
                status,
            });

            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const get = async (userId: string, mangaSlug: string) => {
        try {
            const response = await axios.get(
                `/api/follow/${mangaSlug}?userId=${userId}`,
            );
            return response.data;
        } catch (err) {
            console.error(err);
        }
    };

    const _delete = async (userId: string, mangaSlug: string) => {
        try {
            await axios.delete(`/api/follow/${mangaSlug}?userId=${userId}`);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    return { add, get, _delete };
}
