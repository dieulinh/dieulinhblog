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

// Import Link and useSearchParams from React Router
// const loadArticles = async () => {
//     const response = await axios(`https://myclassr00m.herokuapp.com/api/articles`);
//
//     return response.data;
// }

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
  }, [dispatch, location]);

  useEffect(() => {
    if (!selectedArticleId) return;

    scrollUp()
    dispatch(loadCurrentArticle(selectedArticleId));

  }, [selectedArticleId]);

  if (isLoading) {
    return (<Loader />)
  }
  return (
    <div>

      {selectedArticle && (<Article article={selectedArticle} />)}
      <section>
        <h1>Articles</h1>

        <ul className="article-list">

          {articles.length > 0 && articles.map(article => (

            <Link to={`/articles/${article.id}`}>
              <li key={article.id}>
                {article.title}
              </li>
            </Link>
          ))}
        </ul>
        <button onClick={scrollUp}>Scroll to Top</button>
        <Search />

      </section>

    </div>
  )
}
