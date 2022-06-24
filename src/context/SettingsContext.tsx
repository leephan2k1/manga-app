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
    readMode: ReadMode;
    readDirection: ReadDirection;
    nextDirection: NextDirection;
    imageMode: ImageMode;
    toggleSettings: () => void;
    turnOffSettings: () => void;
    turnOnSettings: () => void;
    setReadDirection: (drt: ReadDirection) => void;
    setNextDirection: (drt: NextDirection) => void;
    setImageMode: (mode: ImageMode) => void;
    setReadMode: (mode: ReadMode) => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsContextProvider = ({ children }: SettingsContextProps) => {
    const [savedSettings, setSettingsLc] = useLocalStorage<ReadModeSettings>(
        'settings',
        { readDirection: 'rtl', readMode: 'vertical', nextDirection: 'right' },
    );
    const [showSettings, setShowSettings] = useState(false);
    const [imageMode, setImageMode] = useState<ImageMode>('full');
    const [readMode, setReadMode] = useState<ReadMode>(
        savedSettings?.readMode || 'vertical',
    );
    const [readDrt, setReadDrt] = useState<ReadDirection>(
        savedSettings?.readDirection || 'rtl',
    );
    const [nextDirection, setNextDirection] = useState<NextDirection>('right');

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
        imageMode,
        readMode,
        readDirection: readDrt,
        nextDirection,
        turnOffSettings,
        turnOnSettings,
        toggleSettings,
        setImageMode: handleImageMode,
        setNextDirection: handleSetNextDirection,
        setReadMode: handleSetReadMode,
        setReadDirection: handleSetDirection,
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
