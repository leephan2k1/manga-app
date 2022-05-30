import { ReactNode } from 'react';
import Header from '../partials/Header';
import Footer from '../partials/Footer';

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}
