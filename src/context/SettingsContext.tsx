import { createContext, ReactNode, useContext, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import {
    ImageMode,
    ReadDirection,
    ReadMode,
    ReadModeSettings,
    NextDirection,
} from '~/types';

interface SettingsContextProps {
    children: ReactNode;
}

interface SettingsContextType {
    show: boolean;
    autoNext: boolean;
    readMode: ReadMode;
    imageMode: ImageMode;
    readDirection: ReadDirection;
    nextDirection: NextDirection;
    toggleSettings: () => void;
    turnOffSettings: () => void;
    turnOnSettings: () => void;
    setReadMode: (mode: ReadMode) => void;
    setAutoNext: (state: boolean) => void;
    setImageMode: (mode: ImageMode) => void;
    setReadDirection: (drt: ReadDirection) => void;
    setNextDirection: (drt: NextDirection) => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsContextProvider = ({ children }: SettingsContextProps) => {
    const [savedSettings, setSettingsLc] = useLocalStorage<ReadModeSettings>(
        'settings',
        {
            readDirection: 'rtl',
            readMode: 'vertical',
            nextDirection: 'right',
            autoNext: false,
        },
    );
    const [showSettings, setShowSettings] = useState(false);
    const [autoNext, setAutoNext] = useState(savedSettings?.autoNext || false);
    const [imageMode, setImageMode] = useState<ImageMode>('full');

    const [readMode, setReadMode] = useState<ReadMode>(
        savedSettings?.readMode || 'vertical',
    );

    const [readDrt, setReadDrt] = useState<ReadDirection>(
        savedSettings?.readDirection || 'rtl',
    );

    const [nextDirection, setNextDirection] = useState<NextDirection>(
        savedSettings?.nextDirection || 'right',
    );

    const handleSetAutoNext = (state: boolean) => {
        setAutoNext(state);

        setSettingsLc((prevState) => {
            return { ...prevState, autoNext: state };
        });
    };

    const turnOffSettings = () => {
        setShowSettings(false);
    };

    const turnOnSettings = () => {
        setShowSettings(true);
    };

    const toggleSettings = () => {
        setShowSettings((prevState) => !prevState);
    };

    const handleImageMode = (mode: ImageMode) => {
        setImageMode(mode);
    };

    const handleSetReadMode = (mode: ReadMode) => {
        setReadMode(mode);

        setSettingsLc((prevState) => {
            return { ...prevState, readMode: mode };
        });
    };

    const handleSetNextDirection = (drt: NextDirection) => {
        setNextDirection(drt);

        setSettingsLc((prevState) => {
            return { ...prevState, nextDirection: drt };
        });
    };

    const handleSetDirection = (direction: ReadDirection) => {
        setReadDrt(direction);

        setSettingsLc((prevState) => {
            return {
                ...prevState,
                readDirection: direction,
            };
        });
    };

    const values = {
        show: showSettings,
        autoNext,
        imageMode,
        readMode,
        readDirection: readDrt,
        nextDirection,
        turnOffSettings,
        turnOnSettings,
        toggleSettings,
        setImageMode: handleImageMode,
        setAutoNext: handleSetAutoNext,
        setReadMode: handleSetReadMode,
        setReadDirection: handleSetDirection,
        setNextDirection: handleSetNextDirection,
    } as const;

    return (
        <SettingsContext.Provider value={values}>
            {children}
        </SettingsContext.Provider>
    );
};

export default function useSettingsMode() {
    return useContext(SettingsContext);
}
