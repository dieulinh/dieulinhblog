import React, { useEffect, useContext, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadVocabs, selectVocabs } from '../../features/learns/vocabSlice';
import { Parser } from 'html-to-react';
import './app.css';

// mentor search initialState

export default function DesignApp () {
  const dispatch = useDispatch();
  const vocabs = useSelector(selectVocabs);
  const searchInputRef = useRef();
  const [messages, setMessages] = useState([]);
  const [displayedMessages, setDisplayedMessages] = useState([]);
  

  useEffect(() => {
    searchInputRef.current.focus();
  }, [])
  useEffect(() => { 
    if(messages.length > 0) {
      let messageIndex = 0;
      const interval = setInterval(() => {
        setDisplayedMessages((prev) => [...prev, messages[messageIndex]]);
        messageIndex++;
        if (messageIndex >= messages.length) {
          clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);

    }
  },[messages])


  const handleDragStart = (evnt) => {
    evnt.dataTransfer.clearData();
    evnt.dataTransfer.setData("text", evnt.target.id);
    console.log('id',evnt.target.id)
  }
  const handleLearn = (e) => {
    e.preventDefault();
    let prompt = searchInputRef.current.value
    dispatch(loadVocabs(prompt))
    setMessages([...messages, vocabs])
    setTimeout(() => {
      searchInputRef.current.value = '';
    }, 500);
    
  }

  return (
    <form>
      <div className='app-input'>
        <input type='text flex-full' ref={searchInputRef} placeholder='Give me a list of words to learn for today' />
        <button className='btn btn-primary' onClick={handleLearn}>Submit</button>
      </div>
    <div className='app-container'>
      {vocabs && <div className='learn-box'>{Parser().parse(vocabs.replace(/\n/g,"<br/>"))}</div>}
      {displayedMessages.map((msg, index) => (
            <div key={index} className="chat-message">
              {msg && Parser().parse(msg.replace(/\n/g,"<br/>"))}
            </div>
          ))}
    </div>
   </form>
  )
}


