import axios from 'axios';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import TabSelect from '~/components/features/TabSelect';
import withDbScroll from '~/components/hoc/withDbScroll';
import ClientOnly from '~/components/shared/ClientOnly';
import Container from '~/components/shared/Container';
import Head from '~/components/shared/Head';
import ListView from '~/components/shared/ListView';
import Section from '~/components/shared/Section';
import { ComicFollowed } from '~/types';

const FollowPage: NextPage = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [qrStatus, setQrStatus] = useState('reading');

    const { data } = useSWR<ComicFollowed[]>(
        `/api/users/follows?status=${qrStatus}`,
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

    return (
        <ClientOnly>
            <Head title={`Theo dõi - ${session?.user?.name} | Kyoto Manga`} />

            <Container>
                <Section
                    title="Danh sách theo dõi"
                    backLink="/"
                    style="w-max-[1300px] mx-auto mt-6 w-[90%] text-white"
                >
                    <TabSelect />
                </Section>

                <Section style="w-max-[1300px] mx-auto mt-6 w-[90%] text-white">
                    <ListView
                        isLoading={!data ? true : false}
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        comicList={data?.data.map((item) => item.details)}
                    />
                </Section>
            </Container>
        </ClientOnly>
    );
};

export default withDbScroll(FollowPage);
