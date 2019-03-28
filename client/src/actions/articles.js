import axios from 'axios';

import { 
  FETCH_ARTICLES, 
  FETCH_ARTICLES_SUCCESS, 
  FETCH_ARTICLES_FAILURE, 
  FETCH_ARTICLE,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_FAILURE,
  CREATE_ARTICLE, 
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAILURE,
  UPDATE_ARTICLE,
  UPDATE_ARTICLE_SUCCESS,
  UPDATE_ARTICLE_FAILURE,
  DELETE_ARTICLE,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAILURE,
  RESET_NEW_ARTICLE,
  RESET_ACTIVE_ARTICLE,
  RESET_ARTICLES,
  RESET_DELETED_ARTICLE,
  RESET_UPDATED_ARTICLE
} from '../constants/articles';

export function fetchArticles() {
  const request = axios.get('/articles');

  return {
    type: FETCH_ARTICLES,
    payload: request
  };
}

export function fetchArticlesSuccess(articles) {
  return {
    TYPE: FETCH_ARTICLES_SUCCESS,
    payload: articles
  };
}

export function fetchArticlesFailure(error) {
  return {
    type: FETCH_ARTICLES_FAILURE,
    payload: error,
  };
}




export function createArticle(props, token) {
  const request = axios.post('/articles', props, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  return {
    type: CREATE_ARTICLE,
    payload: request,
  }
}

export function createArticleSuccess(newArticle) {
  return {
    type: CREATE_ARTICLE_SUCCESS,
    payload: newArticle,
  }
}

export function createArticleFailure(error) {
  return {
    type: CREATE_ARTICLE_FAILURE,
    payload: error,
  }
}




export function fetchArticle(id) {
  const request = axios.get(`/articles/${id}`);

  return {
    type: FETCH_ARTICLE,
    payload: request,
  }
}

export function fetchArticleSuccess(activeArticle) {
  return {
    type: FETCH_ARTICLE_SUCCESS,
    payload: activeArticle,
  }
}

export function fetchArticleFailure(error) {
  return {
    type: FETCH_ARTICLE_FAILURE,
    payload: error,
  }
} 



export function updateArticle(id, props, token) {
  const request = axios.put(`/articles/${id}`, props, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return {
    type: UPDATE_ARTICLE,
    payload: request,
  }
}

export function updateArticleSuccess(updatedArticle) {
  return {
    type: UPDATE_ARTICLE_SUCCESS,
    payload: updatedArticle,
  }
}

export function updateArticleFailure(error) {
  return {
    type: UPDATE_ARTICLE_FAILURE,
    payload: error,
  }
}



export function deleteArticle(id, token) {
  const request = axios.delete(`/article/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return {
    type: DELETE_ARTICLE,
    payload: request
  }
}

export function deleteArticleSuccess(deletedArticle) {
  return {
    type: DELETE_ARTICLE_SUCCESS,
    payload: deletedArticle,
  }
}

export function deleteArticleFailure(error) {
  return {
    type: DELETE_ARTICLE_FAILURE,
    payload: error,
  }
}



export function resetNewArticle() {
  return {
    type: RESET_NEW_ARTICLE,
  }
}

export function resetActiveArticle() {
  return {
    type: RESET_ACTIVE_ARTICLE,
  }
}

export function resetArticles() {
  return {
    type: RESET_ARTICLES,
  }
}

export function resetDeletedArticle() {
  return {
    type: RESET_DELETED_ARTICLE,
  }
}

export function resetUpdatedArticle() {
  return {
    type: RESET_UPDATED_ARTICLE,
  }
}