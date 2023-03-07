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
  const articles = useSelector(selectArticles);
  const isLoading = useSelector(isLoadingArticles);

  const [selectedArticleId, setSelectedArticleId] = useState()
  const selectedArticle = useSelector(selectCurrentArticle)


  useEffect(() => {
    dispatch(loadArticles());


  }, [dispatch]);

  useEffect(() => {
    if(!selectedArticleId) return;
    dispatch(loadCurrentArticle(selectedArticleId))


  }, [selectedArticleId]);

  if(isLoading) {
    return (<p>Articles are loading</p>)
  }
  return (
    <main>
      {selectedArticle && (<Article article={selectedArticle} />) }

      <h1>Articles</h1>


      <ul>


        { articles.length > 0 && articles.map(article => (


            <li key={article.id} onClick={(e) => setSelectedArticleId(article.id)}>
              {article.title}

            </li>

        ))}
      </ul>

      <Search />
    </main>
  )
}
