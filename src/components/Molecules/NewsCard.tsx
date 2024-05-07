import { useSelector } from 'react-redux';

export interface iCardProps {
  newsId: string;
  maxTextLength?: number;
  title: string;
  description: string;
}

const NewsCard = ({ newsId, maxTextLength = 100 }: iCardProps) => {
  const newsItem = useSelector((state: any) =>
    state.news.news.find((item) => item.id === newsId)
  );

  if (!newsItem) {
    return <div className="flex w-full items-center justify-between bg-[#E5E7EB] my-5 rounded-bl-[16px] h-[100px]">
                Loading...
            </div>;
  }

  const shortDescription = newsItem.description && newsItem.description.length > maxTextLength ?
    `${newsItem.description.substring(0, maxTextLength)}...` :
    newsItem.description;

  const isArabic = newsItem.language === "arabic";

  return (
    <div className={`flex w-full items-center justify-between bg-[#E5E7EB] my-5 rounded-bl-[16px] h-[120px] news-item ${isArabic ? 'text-right' : 'text-left'}`}>
      <div>
        <p className="text-[#000] font-bold">{newsItem.title}</p>
        <p className="text-[#000]">{shortDescription}</p>
        <p className="text-[#000] font-bold">{newsItem.pubDate}</p>
      </div>
    </div>
  );
};

export default NewsCard;
