import { useEffect, useState } from 'react';

interface Props {
    children: React.ReactNode;
}

const ClientOnly: React.FC<Props> = ({ children }) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return <div>{children}</div>;
};
export default ClientOnly;
