import { NextPage } from 'next';
import Container from '~/components/shared/Container';
import Section from '~/components/shared/Section';

const ContactPage: NextPage = () => {
    return (
        <Container>
            <Section
                style="px-4 mx-auto h-full w-full md:max-w-[644px] lg:max-w-[1200px] text-white space-y-6"
                title="Liên hệ"
            >
                <h1 className="text-4xl">Email:</h1>
                <a
                    href="mailto:lee.phan.2k1@gmail.com"
                    className="my-4 text-blue-500 lg:w-1/2"
                >
                    lee.phan.2k1@gmail.com
                </a>
                <h1 className="text-4xl">Discord:</h1>
                <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://discord.com/users/lee2001#9563"
                    className="my-4 text-blue-500 lg:w-1/2"
                >
                    lee2001#9563
                </a>
            </Section>
        </Container>
    );
};

export default ContactPage;
