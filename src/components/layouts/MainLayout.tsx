import { useAtomValue } from 'jotai';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { searchModalState } from '~/atoms/searchModelAtom';

import Sidebar from '../partials/Sidebar';
import SearchModal from '../shared/SearchModal';

interface MainLayoutProps {
    children: ReactNode;
    customStyleHeader?: string;
    showHeader?: boolean;
    showFooter?: boolean;
}

const Header = dynamic(() => import('../partials/Header'));
const Footer = dynamic(() => import('../partials/Footer'));

export default function MainLayout({
    customStyleHeader,
    children,
    showHeader,
    showFooter,
}: MainLayoutProps) {
    const matches = useMediaQuery('(max-width: 1024px)');
    const showModal = useAtomValue(searchModalState);

    return (
        <>
            {showHeader && (
                <Header style={customStyleHeader || 'h-40 bg-background'} />
            )}
            {matches && <Sidebar />}
            {showModal && <SearchModal />}
            <main className="overflow-x-hidden">{children}</main>
            {showFooter && <Footer />}
        </>
    );
}
