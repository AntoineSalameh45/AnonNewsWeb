import { useState, useEffect } from 'react';
import AppHeader from '../components/Organisms/AppHeader';
import NavBar from '../components/Organisms/NavBar';
import fetchFinanceNews from '../utils/fetchFinanceNews';

const FinanceNewsPage = () => {
    const bgimg = 'src/assets/bg/img4.jpg';
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const newsResponse = await fetchFinanceNews.get('/everything', {
                params: {
                    q: 'finance',
                    sortBy: 'publishedAt',
                    apiKey: import.meta.env.VITE_FINANCE_API,
                },
            });
            const shuffledNews = newsResponse.data.articles.sort(() => 0.5 - Math.random());
            const selectedNews = shuffledNews.slice(0, 10);
            setNews(selectedNews);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    return (
        <>
            <div className="bg-local min-h-[100vh] min-w-[100vw] bg-cover bg-center" style={{ backgroundImage: `url(${bgimg})` }}>
                <AppHeader showLogoutButton={true} />
                <NavBar />
                <div className="container mx-auto px-4 py-8">
                    <h2 className="text-2xl font-bold mb-4">Latest News</h2>
                    {news.length > 0 ? (
                        <ul>
                            {news.map((article, index) => (
                                <li key={index} className="mb-4 bg-white p-2 red-shadow">
                                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{article.title}</h3>
                                    <hr />
                                    <p className="text-gray-600 mb-2">{article.description}</p>
                                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-[#950101] hover:underline">Read more</a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Loading news...</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default FinanceNewsPage;
