import { ReactNode } from 'react';

import Footer from '../partials/Footer';
import Header from '../partials/Header';
import Sidebar from '../partials/Sidebar';
import SearchModal from '../shared/SearchModal';

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <>
            <Header />
            <Sidebar />
            <SearchModal />
            {children}
            <Footer />
        </>
    );
}
