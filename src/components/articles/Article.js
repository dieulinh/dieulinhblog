import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Parser } from 'html-to-react'
export default function Article (props) {

  const {article} = props

  return (
    <div className='article-container'>
      <h1 className='article-title'>{article.title}</h1>

      <div>
        {Parser().parse(article.content)}

      </div>
    </div>
  )
}
