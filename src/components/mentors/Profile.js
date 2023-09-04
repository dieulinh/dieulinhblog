import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hasError, isLoadingCurrentMentor, loadMentor, selectCurrentMentor } from '../../features/mentors/mentor';
import './Profile.css'
import Loader from '../Loader.js';
import { Link, useParams } from 'react-router-dom';
import {UserContext} from '../../context/UserContext'

// mentor search initialState

export default function Mentor () {
  const mentor = useSelector(selectCurrentMentor)
  const error = useSelector(hasError)
  const isLoading = useSelector(isLoadingCurrentMentor)
  const mentorId = useParams().mentorId
  const dispatch = useDispatch();
  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {    
    dispatch(loadMentor(mentorId));
  }, [dispatch, mentorId]);


  if (isLoading) {
    return (<Loader />)
  }
  if (error) {
    return <div>
      Error loading mentor.
    </div>
  }
  if (!mentor) {
    return
  }

  const {
    id,
    firstName,
    lastName,
    email,
    phone,
    address,
    specialization,
    experienceYears,
    bio,
    country,
    works,
    gallery_images
  } = mentor
  return (
    <div className='mentor-container'>
      <div className={"short-desc"}>
        <h1 className='mentor-title'>{firstName} {lastName}</h1>
        <div><p className='mentor-experience'>From: {address} {country}</p></div>
      </div>
      <div className="mentor-posts pull-left">
        { currentUser && currentUser.email && <Link to={`/mentors/${mentorId}/add_work`} className="btn">Add work</Link> }
        { currentUser && currentUser.email && <Link to={`/mentors/${mentorId}/add_gallery`} className="btn">Add gallery</Link> }
        <Link to={`/mentors/${mentorId}/book`} className="btn mentor-fxn">Schedule mentor</Link>
      </div>
      { currentUser && currentUser.email && ( <Link to={`/mentors/${mentorId}/edit`}>Edit</Link>)}
      <div className='mentor-info'>

        <p className='mentor-specialization'>Specialization: {specialization}</p>
        <p className='mentor-experience'>Experience: {experienceYears} years</p>
        <p className='mentor-email'>Email: {email}</p>
        <p className='mentor-phone'>Phone: {phone}</p>
        <p className='mentor-address'>Address: {address}</p>
      </div>
      {/* <div className="mentor-photo">                
        <img src="https://via.placeholder.com/300" alt="mentor" />
      </div> */}
      <div className="mentor-background">
        
      </div>
      {/* <div className="mentor-video">
        <video controls>
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          Your browser does not support HTML video.
        </video>
      </div> */
      }
      <div className='mentor-bio'>
        <h2>About Me</h2>
        <p>{bio}</p>
      </div>
      <div className="work-histories">
        { works.map(work => (
          <div key={work.id}>
            <p className={"work-company"} key={work.id}>
              {work.company_name} <span className="start-date"> {work.start_date} </span>
            </p>
            <p className="work-description"> {work.responsibilities}</p>
          </div>

          ))}

      </div>
      <h3> Previous work gallery</h3>
      <div className={"gallery-work"}>
        { gallery_images.length && gallery_images.map((image,idx) => (
            <img src={image.web.url} />
        ))}
      </div>

      <div className='mentor-timeline'>
        {/* <p>Joined: {createdAt}</p> */}
        {/* <p>Updated at: {updatedAt}</p> */}
      </div>
    </div>
  )
}


