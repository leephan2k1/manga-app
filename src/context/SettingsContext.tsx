import { createContext, ReactNode, useContext, useState } from 'react';
import { ImageMode, ReadMode } from '~/types';

interface SettingsContextProps {
    children: ReactNode;
}

interface SettingsContextType {
    show: boolean;
    readMode: ReadMode;
    imageMode: ImageMode;
    toggleSettings: () => void;
    turnOffSettings: () => void;
    turnOnSettings: () => void;
    setImageMode: (mode: ImageMode) => void;
    setReadMode: (mode: ReadMode) => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsContextProvider = ({ children }: SettingsContextProps) => {
    const [showSettings, setShowSettings] = useState(false);
    const [imageMode, setImageMode] = useState<ImageMode>('full');
    const [readMode, setReadMode] = useState<ReadMode>('vertical');

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
    };

    const values = {
        show: showSettings,
        imageMode,
        readMode,
        turnOffSettings,
        turnOnSettings,
        toggleSettings,
        setImageMode: handleImageMode,
        setReadMode: handleSetReadMode,
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
