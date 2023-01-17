import { NextPage } from 'next';
import MainLayout from '~/components/layouts/MainLayout';
import AuthorPageBanner from '~/components/partials/AuthorPageBanner';
import AuthorContainer from '~/components/shared/AuthorContainer';

const AuthorPage: NextPage = () => {
    return (
        <div className="relative h-fit pt-[15rem] text-white md:pt-[20rem]">
            <AuthorPageBanner />

            <AuthorContainer />
        </div>
    );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
AuthorPage.getLayout = (page: ReactNode) => {
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

export default AuthorPage;
