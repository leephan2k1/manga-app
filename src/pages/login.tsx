import Head from '~/components/shared/Head';
import { GetServerSideProps, NextPage } from 'next';
import {
    ClientSafeProvider,
    getProviders,
    LiteralUnion,
    signIn,
} from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

interface LoginPageProps {
    providers: Record<
        LiteralUnion<BuiltInProviderType, string>,
        ClientSafeProvider
    > | null;
}

const LoginPage: NextPage<LoginPageProps> = ({ providers }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    console.log(Object.values(providers).map((provider) => provider.id));

    return (
        <div className="flex min-h-screen flex-col bg-background text-white">
            <Head />
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            {Object.values(providers).map((provider) => {
                return (
                    <button
                        onClick={() =>
                            signIn(provider.id, { callbackUrl: '/' })
                        }
                        key={provider.id}
                        className="border-2 border-white p-4"
                    >
                        Login with {provider.name}
                    </button>
                );
            })}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    };
};

export default LoginPage;
