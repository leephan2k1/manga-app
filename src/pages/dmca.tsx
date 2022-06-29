import { NextPage } from 'next';
import Container from '~/components/shared/Container';
import Section from '~/components/shared/Section';

const DMCAPage: NextPage = () => {
    return (
        <Container>
            <Section
                style="px-4 mx-auto h-full w-full md:max-w-[644px] lg:max-w-[1200px] text-white space-y-6"
                title="DMCA - Digital Millennium Copyright Act"
            >
                <h1 className="text-4xl">Yêu cầu gỡ xuống theo DMCA</h1>
                <p className="lg:w-1/2">
                    Chúng tôi tôn trọng quyền sở hữu trí tuệ của người khác và
                    yêu cầu. Người dùng của chúng tôi cũng làm như vậy. Đạo luật
                    Bản quyền Thiên niên kỷ Kỹ thuật số (DMCA) đã thiết lập một
                    quy trình để giải quyết các khiếu nại về vi phạm bản quyền.
                    Nếu bạn sở hữu bản quyền hoặc có quyền thay mặt chủ sở hữu
                    bản quyền và muốn báo cáo khiếu nại rằng bên thứ ba đang vi
                    phạm tài liệu đó, vui lòng gửi báo cáo DMCA trên trang Liên
                    hệ của chúng tôi và chúng tôi sẽ xử lý hành động thích hợp
                </p>
                <h1 className="text-4xl">Yêu cầu đối với Báo cáo DMCA</h1>

                <ul className="list-inside list-disc lg:w-1/2">
                    <li>
                        Mô tả về tác phẩm có bản quyền mà bạn cho rằng đang bị
                        vi phạm.
                    </li>
                    <li>
                        Mô tả về tài liệu bạn cho là vi phạm và bạn muốn xóa
                        hoặc quyền truy cập mà bạn muốn vô hiệu hóa và URL hoặc
                        vị trí khác của tài liệu đó.
                    </li>
                    <li>
                        Tên, chức danh (nếu là đại lý), địa chỉ, số điện thoại
                        và địa chỉ email của bạn.
                    </li>
                    <li>
                        Một tuyên bố rằng bạn đồng ý với thẩm quyền: &quot;Tôi
                        thực sự tin tưởng rằng việc sử dụng tài liệu có bản
                        quyền mà tôi đang khiếu nại không được chủ sở hữu bản
                        quyền, người đại diện của chủ sở hữu bản quyền hoặc luật
                        pháp cho phép (ví dụ: sử dụng hợp pháp)&quot;
                    </li>
                    <li>
                        Một tuyên bố rằng bạn không khai man: &quot;Thông tin
                        trong thông báo này là chính xác và, dưới hình phạt khai
                        man, tôi là chủ sở hữu, hoặc được ủy quyền hành động
                        thay mặt cho chủ sở hữu, bản quyền hoặc quyền độc quyền
                        bị cáo buộc vi phạm&quot;.
                    </li>
                    <li>
                        Chữ ký điện tử hoặc vật lý của chủ sở hữu bản quyền hoặc
                        người được ủy quyền hành động thay mặt chủ sở hữu.
                    </li>
                </ul>
                <p className="lg:w-1/2">
                    Yêu cầu gỡ xuống DMCA của bạn phải được gửi tới email:
                    lee.phan.2k1@gmail.com. Sau đó, chúng tôi sẽ xem xét yêu cầu
                    DMCA của bạn và thực hiện các hành động thích hợp, bao gồm
                    cả việc xóa nội dung khỏi trang web.
                </p>
            </Section>
        </Container>
    );
};

export default DMCAPage;
