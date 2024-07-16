import React, { useEffect, useContext, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadVocabs, selectVocabs } from '../../features/learns/vocabSlice';
import { Parser } from 'html-to-react';
import './app.css';

// mentor search initialState

export default function DesignApp () {
  const [content, setContent] = useState([]);
  const [noCount, setNoCount] = useState(0);
  const [shapeMap,setShapeMap] = useState({})
  const dispatch = useDispatch();
  const [currentScreen, setCurrentScreen] = useState('');
  const [selectedObject, setSelectedObject] = useState();
  const vocabs = useSelector(selectVocabs);
  const searchInputRef = useRef();
  
  const calculateContent = () => {
  }
  useEffect(() => {
    console.log(content)
    console.log(shapeMap)
  }, [content])
  const allowDrop = (ev) => {
    ev.preventDefault();
  }
  const moveSelectedObject = () => {
    console.log('move', selectedObject);
  }
  const handleMove = (ev) => {
  console.log('move', ev.target.id)

  let currentTarget = ev.target.id;
  // ev.dataTransfer.setData("text", ev.target.id);
  setSelectedObject(ev.target.id);
  let shiftX = ev.clientX - ev.target.getBoundingClientRect().left;
  let shiftY = ev.clientY - ev.target.getBoundingClientRect().top;
  // let posY = ev.clientY
  let posX = ev.pageX - ev.target.offsetLeft;
  let posY = ev.pageY - ev.target.offsetTop;
  shapeMap[ev.target.id] = {top: posY, left: posX}

  let targetIndex = currentTarget.split('_')[1];

  let myShapeMap = {...shapeMap};
   myShapeMap[currentTarget] = {transform: `translate(${posX}px, ${posY}px)`}
   setShapeMap(myShapeMap)

  }
  const renderContent = (obj, id) => {
   
    let objectId = 'obj_'+id;
    switch(obj) {
      case 'design':
        return <div className='design-content' id={objectId} draggable="true" style={shapeMap[objectId]} onDragStart={handleMove}>Design content</div>
      case 'text':
        return <div className='text-content' draggable="true" id={objectId} onDragStart={handleMove} style={shapeMap[objectId]}> Text content</div>
      case 'image':
        return <div className='image-content' draggable="true" id={objectId} onDragStart={handleMove} style={shapeMap[objectId]}> Image  content</div>
    }
  }
  const handleDrop = (evnt) => {
    evnt.preventDefault();
    let data = evnt.dataTransfer.getData("text");
    if (data) {
      let addedContent = data
      setContent([...content, addedContent]);
      setNoCount(noCount + 1);
      setSelectedObject(null)
    } else {
      console.log(evnt)
      moveSelectedObject();
    }
    
  }
  const handleDragStart = (evnt) => {
    evnt.dataTransfer.clearData();
    evnt.dataTransfer.setData("text", evnt.target.id);
    console.log('id',evnt.target.id)
  }
  const handleLearn = () => {
    
    let prompt = searchInputRef.current.value
    dispatch(loadVocabs(prompt))
  }

  return (
    <div> 
      <div className='app-input'>
        <input type='text' ref={searchInputRef} placeholder='Give me a list of words to learn for today' />
        <button className='btn btn-primary' onClick={handleLearn}>Submit</button>
      </div>
   <div className='app-container'>
   
    <div className='app-toolbar'>
      <button role='tab' draggable="true" id="design" onDragStart={handleDragStart} aria-selected='true'><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M25.333 4H6.667A2.667 2.667 0 0 0 4 6.667v18.666A2.667 2.667 0 0 0 6.667 28h18.666A2.667 2.667 0 0 0 28 25.333V6.667A2.667 2.667 0 0 0 25.333 4ZM6 6.667C6 6.298 6.298 6 6.667 6h10.666v20H6.667A.667.667 0 0 1 6 25.333V6.667Zm13.333 6.666V6h6c.369 0 .667.298.667.667v6.666h-6.667Zm0 2V26h6a.667.667 0 0 0 .667-.667v-10h-6.667Z" fill="currentColor"></path></svg>Design</button>
      <button role='tab' draggable="true" id="text" onDragStart={handleDragStart} aria-selected='true'>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M18 5.5h-5.25V18c0 .28.22.5.5.5h2a.75.75 0 1 1 0 1.5h-6.5a.75.75 0 1 1 0-1.5h2a.5.5 0 0 0 .5-.5V5.5H6a.5.5 0 0 0-.5.5v1.25a.75.75 0 0 1-1.5 0V5.5C4 4.67 4.67 4 5.5 4h13c.83 0 1.5.67 1.5 1.5v1.75a.75.75 0 1 1-1.5 0V6a.5.5 0 0 0-.5-.5z"></path></svg>Text</button>
      <button role='tab' draggable="true" id="image" onDragStart={handleDragStart} aria-selected='true'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" d="m6.5 4.25.75-.75a2.121 2.121 0 0 1 3 3L6.5 10.25 2.75 6.5a2.121 2.121 0 0 1 3-3l.75.75zm7 6 4-7.5 4 7.5h-8zm-10.75 3.5h7.5v7.5h-7.5v-7.5zm14.75-.25a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path></svg>Image</button>
     
    </div>
    <div className='toolbar-content'>
      tools
    </div>
    
    <div className='design-canvas' onDrop={handleDrop} onDragOver={allowDrop}>{content.map((ob,idx) => (
      renderContent(ob,idx)
    ))}</div>
     {vocabs && <div className='learn-box'>{Parser().parse(vocabs.replace(/\n/g,"<br/>"))}</div>}
   </div>
   </div>
  )
}


