import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addNewPost } from '../../features/articles/newPostSlice';
export default function Article (props) {
  const navigate = useNavigate()
  const [content, setContent] = useState();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(f => ({
      ...f,
      [name]: value,
    }));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitting form');
    const {title, short_description} = formData;
    console.log('title', title);
    dispatch(addNewPost({content,title,short_description,content}))
    navigate('/articles')
  }

  return (
    <div className='article-container'>
      <h1 className='article-title'>Create a post</h1>
  
      <form onSubmit={handleSubmit}>
        <label>
          title
          <div className='flex-full'>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
        </label>
        <label>
          short description
          <div className='flex-full'>
            <input
              id="short_description"
              name="short_description"
              value={formData.short_description}
              onChange={handleChange}
            />
          </div>
        </label>
        <ReactQuill theme="snow" value={content} onChange={setContent} rows="5" />

        <button type="submit" className='btn btn-primary'>Create post</button>
      </form>
    </div>
  )
}
