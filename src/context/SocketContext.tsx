// ref solution: https://github.com/feathersjs/feathers/issues/1149
//               https://socket.io/how-to/use-with-react-hooks

import { useSession } from 'next-auth/react';
import {
    createContext,
    ReactNode,
    useContext,
    useState,
    useEffect,
} from 'react';
import { io } from 'socket.io-client';
import { SERVER_SUB_PATH } from '~/constants';
import { API_DOMAIN } from '~/services/axiosClient';

interface SocketContextType {
    signal: boolean;
    setSignal: (state: boolean) => void;
}
interface SocketContextProps {
    children: ReactNode;
}

const SocketContext = createContext<SocketContextType | null>(null);

const socket = io(API_DOMAIN, {
    transports: ['websocket'],
    path: `${SERVER_SUB_PATH}/socket.io`,
});

export const SocketContextProvider = ({ children }: SocketContextProps) => {
    const { data } = useSession();
    const [signal, setSignal] = useState(false);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userId = data?.user?.id;

    useEffect(() => {
        socket?.on('hasReply', () => {
            setSignal(true);
        });
        // eslint-disable-next-line no-console
        console.log('socket ', socket);

        if (socket?.connected) {
            // eslint-disable-next-line no-console
            console.log('socket ne:: ', socket);

            socket?.emit('online-emitter', { userId });
        }

        return () => {
            socket?.off('connect');
            socket?.off('disconnect');
            socket?.off('hasReply');
        };
    }, [socket, userId]);

    const value = {
        signal,
        setSignal: (state: boolean) => {
            setSignal(state);
        },
    };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};

export default function useSocket() {
    return useContext(SocketContext);
}
