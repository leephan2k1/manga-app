import Image from 'next/image';

export default function SectionSwiperCard() {
    return (
        <div className="aspect-h-4 aspect-w-3 rounded-lg bg-cyan-500">
            <Image
                className="absolute inset-0 object-cover object-center"
                alt="manga-thumbnail z-50"
                src={
                    'https://st.nettruyenco.com/data/comics/5/ke-hoach-tu-cuu-cua-phan-phai-ma-nu.jpg'
                }
                layout="fill"
            />
        </div>
    );
}
