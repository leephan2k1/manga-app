import { NextPage } from 'next';
import DetailsBanner from '~/components/shared/DetailsBanner';
import MainLayout from '~/components/layouts/MainLayout';
import { ReactNode } from 'react';

import Section from '~/components/shared/Section';
import DetailsInfo from '~/components/shared/DetailsInfo';

const DetailsPage: NextPage = () => {
    return (
        <div className="flex h-fit min-h-screen flex-col ">
            <DetailsBanner />

            <div className="z-10 mx-auto min-h-screen w-[85%]    pt-32">
                <Section style="  h-[400px] w-full">
                    <DetailsInfo />
                </Section>
            </div>
        </div>
    );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
DetailsPage.getLayout = (page: ReactNode) => {
    return (
        <MainLayout
            showHeader
            showFooter
            customStyleHeader={
                'w-full max-w-[1400px] h-40 absolute top-[-10px] z-50 left-1/2 -translate-x-1/2 bg-transparent'
            }
        >
            {page}
        </MainLayout>
    );
};

export default DetailsPage;
