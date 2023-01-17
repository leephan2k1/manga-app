import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import MainLayout from '~/components/layouts/MainLayout';
import AuthorPageBanner from '~/components/partials/AuthorPageBanner';
import AuthorContainer from '~/components/shared/AuthorContainer';
import AuthorModel from '~/serverless/models/Author.model';
import ComicModel from '~/serverless/models/Comic.model';
import { Author, Manga } from '~/types';

interface AuthorPageProps {
    author: Author;
    comicsByAuthor: Manga[];
}

const AuthorPage: NextPage<AuthorPageProps> = ({
    author,
    comicsByAuthor,
}: AuthorPageProps) => {
    return (
        <div className="relative h-fit pt-[15rem] text-white md:pt-[20rem]">
            <AuthorPageBanner />

            <AuthorContainer author={author} comics={comicsByAuthor} />
        </div>
    );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getStaticProps: GetStaticProps = async (ctx) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { author: authorName } = ctx.params;

    try {
        const [comicsByAuthor, author] = await Promise.allSettled([
            ComicModel.find({ author: authorName }),
            AuthorModel.findOne({ name: authorName }),
        ]);

        if (!author || !comicsByAuthor) throw new Error();

        return {
            props: JSON.parse(
                JSON.stringify({
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    author: author.value,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    comicsByAuthor: comicsByAuthor.value,
                }),
            ),
            revalidate: 24 * 60 * 60,
        };
    } catch (error) {
        return { notFound: true };
    }
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getStaticPaths: GetStaticPaths<Params> = async () => {
    return { paths: [], fallback: true };
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
