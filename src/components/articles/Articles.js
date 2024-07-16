import React, {  useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  loadCurrentArticle, selectCurrentArticle
} from '../../features/currentArticle/currentArticleSlice';
import Article from './Article';
import { selectArticles, loadArticles, isLoadingArticles } from "../../features/articles/articlesSlice";
import Search from "./Search";
import { Link, useLocation, useParams } from "react-router-dom";
import Loader from "../Loader";

export default function Articles() {
  const dispatch = useDispatch();
  const location = useLocation();

  const isLoading = useSelector(isLoadingArticles);
  const articles = useSelector(selectArticles);

  const selectedArticleId = useParams().articleId
  const selectedArticle = useSelector(selectCurrentArticle)

  const scrollUp = (event) => {
    console.log(event)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    dispatch(loadArticles(queryParams));
    if (!selectedArticleId) return;
    dispatch(loadCurrentArticle(selectedArticleId));
  }, [dispatch, selectedArticleId]);

  // useEffect(() => {
  //   if (!selectedArticleId) return;

  //   scrollUp()
  //   dispatch(loadCurrentArticle(selectedArticleId));

  // }, [selectedArticleId]);

  if (isLoading) {
    return (<Loader />)
  }
  return (
    <div className="container-center">
      <div className="article-list-container">
        {selectedArticle && (<Article article={selectedArticle} />)}
        <section>
          <div className="article-list">
            {articles.length > 0 && articles.map(article => (
              <Link to={`/articles/${article.slug||article.id}`} key={article.id}>
                {article.title}
              </Link>
            ))}
          </div>

        </section>
        <Search />
      </div>
    </div>
  )
}
