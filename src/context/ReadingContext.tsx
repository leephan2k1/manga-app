import { createContext, ReactNode, useContext } from 'react';
import { Chapter, NavigateDirection, Page } from '~/types';

interface ReadingContextType {
    images: Page[];
    currentChapter?: Chapter;
    useProxy?: boolean;
    sourceId: string;
    navigateChapter: (type: NavigateDirection) => void;
}

interface ReadingContextProps {
    children: ReactNode;
    value: ReadingContextType;
}

const ReadingContext = createContext<ReadingContextType | null>(null);

export const ReadingContextProvider = ({
    children,
    value,
}: ReadingContextProps) => {
    return (
        <ReadingContext.Provider value={value}>
            {children}
        </ReadingContext.Provider>
    );
};

export default function useReading() {
    return useContext(ReadingContext);
}
