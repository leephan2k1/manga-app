import { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
    return <div className="flex h-fit min-h-screen flex-col">{children}</div>;
}
