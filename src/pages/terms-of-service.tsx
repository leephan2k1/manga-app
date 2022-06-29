import { NextPage } from 'next';
import Container from '~/components/shared/Container';
import Section from '~/components/shared/Section';

const ToSPage: NextPage = () => {
    return (
        <Container>
            <Section
                style="px-4 mx-auto h-full w-full md:max-w-[644px] lg:max-w-[1200px] text-white space-y-6"
                title="Điều khoản dịch vụ"
            >
                <h1 className="text-4xl">1. Điều khoản</h1>
                <p className="lg:w-1/2">
                    Bằng cách truy cập trang web tại Kyoto Manga, bạn đồng ý bị
                    ràng buộc bởi các điều khoản dịch vụ này, tất cả các luật và
                    quy định hiện hành, đồng thời đồng ý rằng bạn chịu trách
                    nhiệm tuân thủ mọi luật hiện hành của địa phương. Nếu bạn
                    không đồng ý với bất kỳ điều khoản nào trong số này, bạn sẽ
                    bị cấm sử dụng hoặc truy cập trang web này.
                </p>
                <h1 className="text-4xl">
                    2. Sửa đổi điều khoản sử dụng trang web
                </h1>
                <p className="lg:w-1/2">
                    Kyoto Manga có thể sửa đổi các Điều khoản sử dụng này cho
                    trang web của mình bất cứ lúc nào mà không cần thông báo
                    trước. Bằng cách sử dụng trang web này, bạn đồng ý bị ràng
                    buộc bởi phiên bản hiện tại của các Điều khoản và Điều kiện
                    sử dụng này.
                </p>
                <h1 className="text-4xl">3. Luật quản lý</h1>
                <p className="lg:w-1/2">
                    Bất kỳ khiếu nại nào liên quan đến Kyoto Manga sẽ được điều
                    chỉnh bởi luật của BQ mà không liên quan đến xung đột của
                    các quy định pháp luật.
                </p>
                <h1 className="text-4xl">4. Quyền riêng tư của bạn</h1>
                <p className="lg:w-1/2">
                    Vui lòng đọc chính sách bảo mật của chúng tôi.
                </p>
            </Section>
        </Container>
    );
};

export default ToSPage;
