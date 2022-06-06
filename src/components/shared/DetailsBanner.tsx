export default function DetailsBanner() {
    return (
        <div className="absolute inset-0 z-0 h-[35%] w-full lg:h-[45%] ">
            <figure
                style={{
                    backgroundImage: `url(https://st.nettruyenco.com/data/comics/209/dao-hai-tac.jpg)`,
                }}
                className="deslide-cover h-full w-full bg-cover bg-top bg-no-repeat blur"
            ></figure>
        </div>
    );
}
