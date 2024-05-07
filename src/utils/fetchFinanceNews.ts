import axios from 'axios';

const fetchFinanceNews = axios.create({
    baseURL: 'https://newsapi.org/v2',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default fetchFinanceNews;
