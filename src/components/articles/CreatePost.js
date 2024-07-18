import React, {useState, useRef, useMemo} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addNewPost } from '../../features/articles/newPostSlice';
export default function Article (props) {
  const quillRef = useRef();
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
  const imageHandler = (e) => {
    const editor = quillRef.current.getEditor();
    console.log(editor)
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (/^image\//.test(file.type)) {
        console.log(file);
        const formData = new FormData();
        formData.append("image", file);
        // const res = await ImageUpload(formData); // upload data into server or aws or cloudinary
        // const url = res?.data?.url;
        // editor.insertEmbed(editor.getSelection(), "image", url);
      } else {
        // ErrorToast('You could only upload images.');
      }
    };
  }
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', "strike"],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['image', "link",],
        [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }]
      ],
      handlers: {
        image: imageHandler
      }
    },
  }), [])

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
        <ReactQuill theme="snow" value={content} ref={quillRef} modules={modules} onChange={setContent} rows="5" />

        <button type="submit" className='btn btn-primary'>Create post</button>
      </form>
    </div>
  )
}
