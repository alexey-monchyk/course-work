import React, { useEffect, useState } from 'react';
import Articles from '../components/Articles';
import axios from 'axios';

export default () => {
  const [articles, setArticles] = useState([]);
  
  useEffect(() => {
    getArticlesList();
  }, []);

  const getArticlesList = async () => {
    let res;

    try {
      res = await axios.get('/articles');
    } catch(e) {
      alert('Something wrong.');
    }
    
    if (!res) return alert('Not found.');
    
    setArticles(res.data);
  }
  
  return <Articles articles={articles}/>;
}
