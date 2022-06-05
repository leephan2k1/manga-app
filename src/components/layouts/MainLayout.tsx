import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import { useMediaQuery } from 'usehooks-ts';
import { searchModalState } from '~/atoms/searchModelAtom';

import Footer from '../partials/Footer';
import Header from '../partials/Header';

interface MainLayoutProps {
    children: ReactNode;
}

const Sidebar = dynamic(() => import('../partials/Sidebar'));
const SearchModal = dynamic(() => import('../shared/SearchModal'));

export default function MainLayout({ children }: MainLayoutProps) {
    const matches = useMediaQuery('(max-width: 1024px)');
    const showModal = useRecoilValue(searchModalState);

    return (
        <>
            <Header />
            {matches && <Sidebar />}
            {showModal && <SearchModal />}
            <main>{children}</main>
            <Footer />
        </>
    );
}
