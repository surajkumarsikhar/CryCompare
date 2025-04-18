import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_NEWS_API;
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=${apiKey}`);
        setNews(response.data.articles);
      } catch (err) {
        setError('Error fetching news, please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchNews();
  }, []);

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden dark:bg-gray-800 dark:text-white animate-pulse">
      <div className="w-full h-48 bg-gray-300 dark:bg-gray-600"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
        <div className="w-1/4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800 dark:text-white">Latest Cryptocurrency News</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(8).fill(0).map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-lg text-red-500">{error}</span>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800 dark:text-white">Latest Cryptocurrency News</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {news.map((article, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden dark:bg-gray-800 dark:text-white">
            <img
              src={article.urlToImage || 'https://via.placeholder.com/150'}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white truncate">{article.title}</h2>
              <p className="text-gray-600 mt-2 text-sm dark:text-gray-400">{article.description}</p>
              <div className="mt-4">
                <Link
                  to={article.url}
                  target="_blank"
                  className="text-blue-500 hover:underline dark:text-blue-300"
                >
                  Read more
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
