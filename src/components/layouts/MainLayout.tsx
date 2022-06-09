import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import { useMediaQuery } from 'usehooks-ts';
import { searchModalState } from '~/atoms/searchModelAtom';

interface MainLayoutProps {
    children: ReactNode;
    customStyleHeader?: string;
    showHeader?: boolean;
    showFooter?: boolean;
}

const Header = dynamic(() => import('../partials/Header'));
const Footer = dynamic(() => import('../partials/Footer'));
const Sidebar = dynamic(() => import('../partials/Sidebar'));
const SearchModal = dynamic(() => import('../shared/SearchModal'));

export default function MainLayout({
    customStyleHeader,
    children,
    showHeader,
    showFooter,
}: MainLayoutProps) {
    const matches = useMediaQuery('(max-width: 1024px)');
    const showModal = useRecoilValue(searchModalState);

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
