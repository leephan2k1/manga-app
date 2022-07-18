import { createContext, ReactNode, useContext } from 'react';
import { Subscription } from '~/types';

interface SubscriptionContextProps {
    children: ReactNode;
    value: Subscription | null;
}

const SubscriptionContext = createContext<Subscription | null>(null);

export const SubscriptionContextProvider = ({
    children,
    value,
}: SubscriptionContextProps) => {
    return (
        <SubscriptionContext.Provider value={value}>
            {children}
        </SubscriptionContext.Provider>
    );
};

export default function useSubscription() {
    return useContext(SubscriptionContext);
}
