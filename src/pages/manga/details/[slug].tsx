import { NextPage } from 'next';
import { ReactNode } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import MainLayout from '~/components/layouts/MainLayout';
import DetailsBanner from '~/components/shared/DetailsBanner';
import DetailsChapterList from '~/components/shared/DetailsChapterList';
import DetailsDescription from '~/components/shared/DetailsDescription';
import DetailsInfo from '~/components/shared/DetailsInfo';
import Section from '~/components/shared/Section';

const DetailsPage: NextPage = () => {
    const matchesMobile = useMediaQuery('(max-width: 640px)');

    return (
        <div className="flex h-fit min-h-screen flex-col ">
            <DetailsBanner />

            <div className="z-10 mx-auto min-h-screen w-[85%] pt-32">
                <Section style="h-fit w-full">
                    <DetailsInfo />
                </Section>

                <Section style="h-fit w-full">
                    <DetailsDescription mobileUI={matchesMobile} />
                </Section>

                <Section title="Danh sách chương" style="h-fit w-full">
                    <DetailsChapterList />
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
