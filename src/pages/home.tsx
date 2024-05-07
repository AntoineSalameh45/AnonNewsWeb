import { useState, useEffect } from 'react';
import AppHeader from '../components/AppHeader';
import BreakingNews from '../components/BreakingNews';
import NavBar from '../components/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { getNews } from '../store/news/newsSlice';

const Home = () => {
  const bgimg = 'src/assets/bg/img4.jpg';
  const [page] = useState(Math.floor(Math.random() * 10) + 1);
  const [pageSize] = useState(3);
  
  const news = useSelector((state: any) => state.news.news);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getNews({page: page, pageSize: pageSize}));
  }, [page, pageSize]);

  const isArabic = news && news.language === "arabic";

  const shortenDescription = (description, maxLength) => {
    if (description && description.length > maxLength) {
      return description.substring(0, maxLength) + "Read more...";
    } else {
      return description;
    }
  };

  return (
    <>
      <div className="bg-local min-h-[100vh] min-w-[100vw] bg-cover bg-center" style={{ backgroundImage: `url(${bgimg})` }}>
        <AppHeader />
        <NavBar />
        <BreakingNews />
        <div className="px-2 md:flex md:flex-wrap md:justify-around">
          {news?.map((item: any, index: number) => (
            <div key={item.id ? item.id : index} className={`flex flex-col w-full md:w-[40%] bg-[#E5E7EB] my-4 rounded-bl-[16px] md:rounded-[16px] red-shadow ${isArabic ? 'rtl' : 'ltr'}`}>
              <div className="p-4 text-[#000] font-bold text-right bg-[#950101] flex justify-between">
                <p>{item.country}</p>
                <p>{item.pubDate}</p>
              </div>
              <div className="p-4 flex-grow">
                <p className="text-[#000] font-bold">{item.title}</p>
                <p className="text-[#000]">{shortenDescription(item.description, 90)}</p>
              </div>
            </div>          
          ))}
          <div className='relative w-full md:w-[40%] bg-[#E5E7EB] my-4 rounded-bl-[16px] h-[120px] md:h-[180px]'>
            <a href='/explore' className="block w-full h-full">
              <img src='src/assets/bg/img4.jpg' className='absolute inset-0 w-full h-full object-cover rounded-bl-[16px]' alt="Background Image" />
              <div className='absolute inset-0 flex flex-row justify-center items-center px-4 py-2'>
                <div className="relative z-10 text-center">
                  <p className="text-[#950101] font-bold text-[24px]">Explore</p>
                  <p className="text-[#950101] text-[16px]">more news</p>
                </div>
                <div className="flex items-center justify-center">
                  <img src="src/assets/ExploreSvg.svg" alt="SVG Icon" className="w-12 h-12 ml-2" />
                </div>
              </div>
              <div className="absolute inset-0 bg-black opacity-50 rounded-bl-[16px]"></div>
            </a>
          </div>
         </div>
      </div>
    </>
  );
  
};

export default Home;
