const BreakingNews = () => {
    return (
        <>
            <div className="w-full relative">
                <div className="bg-[#950101] text-white overflow-hidden">
                    <div className="breaking-news-text">
                        <p className="inline-block whitespace-nowrap px-4 py-2">Breaking News! &nbsp;&nbsp;&nbsp; Breaking News! &nbsp;&nbsp;&nbsp; Breaking News!</p>
                    </div>
                </div>
                <div className="relative flex flex-col md:flex-row md:bg-[#950101aa]">
                    <p className="bg-[#950101aa] text-[#fff] absolute bottom-0 w-full border md:w-[full] md:relative md:m-10 md:p-4 md:bg-[#fff] md:text-[#222] md:rounded-xl md:border-[#950101] order-2 md:order-1">
                        The final assignment deadline might be sooner than you think
                    </p>
                    <img src="src/assets/bg/img4.jpg" className="w-full md:w-[50vw] order-1 md:order-2" />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-2 bg-[#950101aa] red-shadow"></div>
            </div>
        </>
  );
};
export default BreakingNews;
