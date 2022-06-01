import { ReactNode } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import Footer from '../partials/Footer';
import Header from '../partials/Header';
import Sidebar from '../partials/Sidebar';
import SearchModal from '../shared/SearchModal';

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const matches = useMediaQuery('(max-width: 1024px)');

    return (
        <>
            <Header />
            {matches && <Sidebar />}
            <SearchModal />
            {children}
            <Footer />
        </>
    );
}
