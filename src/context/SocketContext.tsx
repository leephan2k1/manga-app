import { useSession } from 'next-auth/react';
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import { io, Socket } from 'socket.io-client';
import { useEffectOnce } from 'usehooks-ts';
import { API_DOMAIN } from '~/services/axiosClient';
import { SERVER_SUB_PATH } from '~/constants';

interface SocketContextType {
    signal: boolean;
    setSignal: (state: boolean) => void;
}
interface SocketContextProps {
    children: ReactNode;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketContextProvider = ({ children }: SocketContextProps) => {
    const { data } = useSession();
    const isEmitted = useRef(false);
    const [signal, setSignal] = useState(false);
    const [socket, setSocket] = useState<Socket | null>(null);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userId = data?.user?.id;

    useEffectOnce(() => {
        setSocket(io(API_DOMAIN, { path: `${SERVER_SUB_PATH}/socket.io` }));
    });

    useEffect(() => {
        // eslint-disable-next-line no-console
        console.log('socket:: ', socket);

        if (socket?.connected && userId && !isEmitted.current) {
            socket?.emit('online-emitter', { userId });

            isEmitted.current = true;

            socket?.on('hasReply', () => {
                setSignal(true);
            });
        }
    }, [socket, data]);

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
