import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { getNews } from "../store/news/newsSlice";
import AppHeader from "../components/Organisms/AppHeader";
import NavBar from "../components/Organisms/NavBar";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

const Explore = () => {
  const bgimg = 'src/assets/bg/img4.jpg';
  const initialPage = Math.floor(Math.random() * 10) + 1;
  const [page, setPage] = useState(initialPage);
  const [pageSize] = useState(10);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const news = useSelector((state: any) => state.news.news);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getNews({ page, pageSize }));
      } catch (error) {
        if (error.response && error.response.status === 403) {
          alert("Token has expired. Please login again.");
        } else {
          console.error("Error fetching news:", error);
        }
      }
    };

    fetchData();
  }, [page, pageSize, dispatch]);

  const handleNext = () => {
    if (currentNewsIndex === news.length - 1) {
      setPage((page) => page + 1);
      setCurrentNewsIndex(0);
    } else {
      setCurrentNewsIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentNewsIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 11) {
      setPage(11);
    } else if (pageNumber < 1) {
      setPage(1);
    } else {
      setPage(pageNumber);
    }
    setCurrentNewsIndex(0);
  };
  

  return (
    <>
      <div className="bg-local min-h-[100vh] min-w-[100vw] bg-cover bg-center" style={{ backgroundImage: `url(${bgimg})` }}>
        <AppHeader showLogoutButton={true} />
        <NavBar />
        <div className="bg-[#ccccccc4]">
          {news.length > 0 && (
            <div className={`news-item ${
              news[currentNewsIndex].language === "arabic"
                ? "text-right horiz-reverse"
                : "text-left"
              } ${news[currentNewsIndex].image_url ? 'md:columns-2' : ''}`}
            style={{ maxWidth: "100vw", wordWrap: "break-word" }}>
              <div className="">
                <h2 className="bg-[#950101] text-[#fff]">{news[currentNewsIndex].title}</h2>
                {news[currentNewsIndex].image_url && (
                  <img
                    src={news[currentNewsIndex].image_url}
                    alt="News Image"
                    className={`w-[100vw]  md:w-[50vw] md:h-[50vh] md:self-center`}
                  />
                )}
              </div>
              <div className=" w-full p-4 text-[#222] md:relative">
                <p>{news[currentNewsIndex].video_url}</p>
                <p>{news[currentNewsIndex].description}</p>
                <div className="text-left">
                  <p>Source: <a href={news[currentNewsIndex].source_url}>{news[currentNewsIndex].source_url}</a></p>
                  <p>Country: {news[currentNewsIndex].country.join(", ")}</p>
                  <p>Published on {news[currentNewsIndex].pubDate}</p>
                </div>
              </div>
          </div>
          )}
          <div className="fixed flex justify-around bottom-5 w-full">
            <div className="bg-[#eeeeeecc] text-[#222] p-2 rounded-full">
              <button onClick={handlePrevious} disabled={currentNewsIndex === 0}>
                <ArrowCircleLeftIcon fontSize="medium" />
              </button>
              <span>
                &nbsp;{currentNewsIndex + 1} /{news.length}&nbsp;
              </span>
              <button
                onClick={handleNext}
                disabled={currentNewsIndex === news.length - 1}
                className="text-[#950101] font-bold"
              >
                <ArrowCircleRightIcon fontSize="medium" />
              </button>
              <div className="flex">
                <ul className="flex mx-2 gap-2 text-center">
                  {page > 2 && <li><button onClick={() => handlePageChange(page - 2)}>{page - 2}</button></li>}
                  {page > 1 && <li><button onClick={() => handlePageChange(page - 1)}>{page - 1}</button></li>}
                  <li className="text-[#950101] font-bold">{page}</li>
                  {page < 11 && <li><button onClick={() => handlePageChange(page + 1)}>{page + 1}</button></li>}
                  {page < 10 && <li><button onClick={() => handlePageChange(page + 2)}>{page + 2}</button></li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
