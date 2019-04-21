import React, { useState, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { dateFormat } from '../utils';
import { withSnackbar, useSnackbar } from 'notistack';
import {
  Card,
  CardHeader,
  CardActions,
  CardMedia,
  CardContent,
  Avatar,
  Typography,
  IconButton,
  Grid,
  Badge,
  Button
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { Delete, Edit } from '@material-ui/icons';
import FavoriteIcon from "@material-ui/icons/Favorite";

const CustomCard = styled(Card)`
  margin: 10px;
`;

const CustomCardMedia = styled(CardMedia)`
  height: 0;
  padding-top: 56.25%;
`;

const CustomAvatar = styled(Avatar)`
  background-color: #f44336 !important;
`;

const CustomCardActions = styled(CardActions)`
  display: flex;
  justify-content: space-around;
`;

const ArticleItem = ({ article }) => {
  const auth = useContext(AuthContext);
  const [likes, setLikes] = useState(article.likes | 0);
  const { enqueueSnackbar } = useSnackbar();
  const onLikeClick = async () => {
    setLikes(likes + 1);
    try {
      await axios.put(`/articles/likes/${article.id}`);
    } catch (e) {
      enqueueSnackbar(e, { variant: 'error' });
    }
  }

  const handleDeleteClick = async () => {
    try {
      const deletedArticle = await axios.delete(`/articles/${article.id}`, {
        headers: {
          authorization: auth.token
        }
      });

      if (!deletedArticle) enqueueSnackbar('Article not deleted.', { variant: 'error' });
    } catch(e) {
      enqueueSnackbar('Something wrong on server.', { variant: 'error' });
    }
  }

  const checkAuth = () => {
    return auth.user ? auth.user.id !== article.authorId : true;
  }

  return (
    <Grid item md={3} sm={6} xs={12}>
      <CustomCard>
        <CardHeader
          avatar={
            <CustomAvatar aria-label="Recipe">
              {article.author[0].toUpperCase()}
            </CustomAvatar>
          }
          title={article.author}
          subheader={dateFormat(article.updatedAt)}
        />
        <CustomCardMedia
          image={`/files/${article.image}`}
          title="Paella dish"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {article.title}
          </Typography>
          <Typography component="p">
            {article.description}
          </Typography>
        </CardContent>
        <CustomCardActions>
          <IconButton onClick={onLikeClick} aria-label="Add to favorites">
            <Badge badgeContent={likes} color="primary">
              <FavoriteIcon />
            </Badge>
          </IconButton>
          <Button href={`/files/${article.file}`} download variant="contained" size="small">
            <SaveIcon />
            Save
          </Button>
          <Button disabled={checkAuth()} to={`/articles/${article.id}`} component={Link} color='primary' variant="contained" size="small">
            <Edit />
            Edit
          </Button>
          <Button onClick={handleDeleteClick} disabled={checkAuth()} color='secondary' variant="contained" size="small">
            <Delete />
            Delete
          </Button>
        </CustomCardActions>
      </CustomCard>
    </Grid>
  )
}


export default withSnackbar(ArticleItem);