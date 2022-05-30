import { ReactNode } from 'react';
import Sidebar from '../partials/Sidebar';
import SearchModal from '../shared/SearchModal';
import Header from '../partials/Header';
import Footer from '../partials/Footer';

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
