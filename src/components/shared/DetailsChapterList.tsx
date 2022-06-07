import ChapterInput from './ChapterInput';

export default function DetailsChapterList() {
    return (
        <div className="my-6 flex h-fit w-full flex-col rounded-xl bg-hight-light">
            {/* chapter controls  */}
            <div className="flex h-[60px] w-full items-center gap-4     text-white">
                <ChapterInput
                    inputType="number"
                    style="mx-4 flex h-[32px] w-[50%] items-center justify-center rounded-xl bg-[#5f5f5f] px-2 hover:bg-white/25 md:w-[30%] lg:w-[20%]"
                />
                <ChapterInput inputType="select" />
            </div>

            {/* chapter list  */}
            <ul className="my-4 grid w-full grid-cols-2 gap-2 px-4 md:grid-cols-4 lg:grid-cols-7">
                <li className="h-[100px] rounded-lg bg-deep-black"></li>
                <li className="h-[100px] rounded-lg bg-deep-black"></li>
            </ul>
        </div>
    );
}
