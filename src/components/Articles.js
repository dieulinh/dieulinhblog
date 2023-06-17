import React, { useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

import {

  loadCurrentArticle, selectCurrentArticle
} from '../features/currentArticle/currentArticleSlice';
import Article from './Article';
import { selectArticles, loadArticles, isLoadingArticles } from "../features/articles/articlesSlice";
import Search from "./Search";

// Import Link and useSearchParams from React Router
// const loadArticles = async () => {
//     const response = await axios(`https://myclassr00m.herokuapp.com/api/articles`);
//
//     return response.data;
// }

export default function Articles () {
  const dispatch = useDispatch();

  const isLoading = useSelector(isLoadingArticles);
  const articles = useSelector(selectArticles);

  const [selectedArticleId, setSelectedArticleId] = useState()
  const selectedArticle = useSelector(selectCurrentArticle)
  const scrollUp = (event) => {
    console.log(event)
    window.scrollTo(0, 200)
  }

  useEffect(() => {
    dispatch(loadArticles());

  }, [dispatch]);

  useEffect(() => {
    if(!selectedArticleId) return;

    dispatch(loadCurrentArticle(selectedArticleId));
    scrollUp()

  }, [selectedArticleId]);

  if(isLoading) {
    return (<p>Articles are loading</p>)
  }
  return (
    <div>

      {selectedArticle && (<Article article={selectedArticle} />) }
      <section>
        <h1>Articles</h1>

        <ul className="article-list">

          { articles.length > 0 && articles.map(article => (

            <li key={article.id} onClick={(e) => {setSelectedArticleId(article.id);}}>
              {article.title}

            </li>

          ))}
        </ul>
        <button onClick={scrollUp}>Scroll to Top</button>
        <Search />

      </section>

    </div>
  )
}
