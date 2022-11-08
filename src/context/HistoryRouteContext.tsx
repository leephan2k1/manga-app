import { createContext, ReactNode, useContext, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

interface HsRouteContextType {
    url: string | null;
}
interface HsRouteContextProps {
    children: ReactNode;
}

const HsRouteContext = createContext<HsRouteContextType | null>(null);

export const HistoryRouteContextProvider = ({
    children,
}: HsRouteContextProps) => {
    const { asPath } = useRouter();

    const ref = useRef<string | null>(null);

    useEffect(() => {
        ref.current = asPath;
    }, [asPath]);

    const value = {
        url: ref.current,
    };

    return (
        <HsRouteContext.Provider value={value}>
            {children}
        </HsRouteContext.Provider>
    );
};

export default function usePreviousRoute() {
    return useContext(HsRouteContext);
}
