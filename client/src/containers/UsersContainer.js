import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Users from '../components/Users';
import AuthContext from '../contexts/AuthContext';


export default () => {
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await axios.get('/users', {
        headers : {
          authorization: auth.token
        }
      });

      if (!res.data) console.log('Users not found.');

      setUsers(res.data);
    } catch(e) {
      console.log(e);
    }
  }

  const getArticlesByUser = async (id) => {
    try {
      const res = await axios.get(`/articles/by-user/${id}`);

      if (!res.data) console.log('Articles not found.');

      setArticles(res.data);
    } catch(e) {
      console.log(e);
    }
  } 

  return <Users getArticlesByUser={getArticlesByUser} articles={articles} users={users}/>
};