import axios from 'axios';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import TabSelect from '~/components/features/TabSelect';
import withDbScroll from '~/components/hoc/withDbScroll';
import ClientOnly from '~/components/shared/ClientOnly';
import Container from '~/components/shared/Container';
import Head from '~/components/shared/Head';
import ListView from '~/components/shared/ListView';
import Section from '~/components/shared/Section';
import { FOLLOW_STATE, MANGA_PATH_FOLLOW } from '~/constants';
import { ComicFollowed } from '~/types';
import dynamic from 'next/dynamic';

const AuthorList = dynamic(
    () =>
        import('~/components/shared/AuthorList', {
            ssr: false,
        } as ImportCallOptions),
);

const FollowPage: NextPage = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [qrStatus, setQrStatus] = useState('reading');

    const { data } = useSWR<ComicFollowed[]>(
        qrStatus !== 'author' ? `/api/users/follows?status=${qrStatus}` : null,
        async (url) => {
            return await (
                await axios.get(url, {
                    headers: {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        userId: session?.user.id,
                    },
                })
            ).data;
        },
    );

    useEffect(() => {
        const { status } = router.query;

        if (status) setQrStatus(status as string);
    }, [router.query]);

    const handleSelectValue = useCallback((value: string) => {
        const statusId = FOLLOW_STATE.find((stt) => stt.title === value)?.id;

        if (statusId) {
            router.replace(
                `${MANGA_PATH_FOLLOW}?status=${statusId}`,
                undefined,
                { shallow: true },
            );
        }
    }, []);

    return (
        <>
            <Head title={`Theo dõi - ${session?.user?.name} | Kyoto Manga`} />
            <ClientOnly>
                <Container>
                    <Section
                        title="Danh sách theo dõi"
                        backLink="/"
                        style="w-max-[1300px] mx-auto mt-6 w-[90%] text-white"
                    >
                        <TabSelect
                            selections={FOLLOW_STATE.map((e) => e.title)}
                            selectAction={handleSelectValue}
                        />
                    </Section>

                    <Section style="w-max-[1300px] mx-auto mt-6 w-[90%] text-white">
                        {qrStatus !== 'author' ? (
                            <ListView
                                isLoading={!data ? true : false}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                comicList={data?.data.map(
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    (item) => item.details,
                                )}
                            />
                        ) : (
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            <AuthorList />
                        )}
                    </Section>
                </Container>
            </ClientOnly>
        </>
    );
};

export default withDbScroll(FollowPage);
