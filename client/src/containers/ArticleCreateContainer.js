import React, { useState } from 'react';
import axios from 'axios';
import ArticleCreate from '../components/ArticleCreate';
import { withRouter } from 'react-router-dom';
import { withSnackbar, useSnackbar } from 'notistack';


const ArticleCreateContainer = (props) => {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const createArticle = async () => {
    try {
      const res = await axios.post('/articles', { title, description });

      if (!res) return alert('Not found.');

      return res.data;
    } catch (e) {
      alert('Something wrong.');
    }
  }

  const uploadArticleFile = async (id) => {
    const formData = new FormData();
    formData.append('file', file);

    await axios.put(`/articles/file/${id}`, formData);
  }

  const uploadArticleImage = async (id) => {
    const formData = new FormData();
    formData.append('file', image);

    await axios.put(`/articles/image/${id}`, formData);
  }

  const handleSubmit = async () => {
    try {
      const article = await createArticle();
      await uploadArticleFile(article.id);
      await uploadArticleImage(article.id);
    } catch(e) {
      enqueueSnackbar(e, { variant: 'error' });
    }
    props.history.push('/');
  }

  return <ArticleCreate
      setDescription={setDescription}
      setTitle={setTitle}
      setFile={setFile}
      setImage={setImage}
      onSubmit={handleSubmit}
    />
}

export default withRouter(withSnackbar(ArticleCreateContainer));