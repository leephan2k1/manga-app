import { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';

interface ToggleProps {
    styles?: string;
    defaultState?: boolean;
    handleToggle: (state: boolean) => void;
}

function Toggle({ styles, handleToggle, defaultState }: ToggleProps) {
    const [enabled, setEnabled] = useState(defaultState ?? false);

    useEffect(() => {
        handleToggle(enabled);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enabled]);

    return (
        <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
                enabled ? 'bg-primary' : 'bg-gray-200'
            } relative mx-4 inline-flex h-8 w-14 items-center rounded-full ${styles}`}
        >
            <span
                className={`${
                    enabled ? 'translate-x-9' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out`}
            />
        </Switch>
    );
}

export default Toggle;
