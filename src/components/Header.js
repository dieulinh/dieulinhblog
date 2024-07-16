import React, { useContext, useState,useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../context/UserContext";
import { logOut } from "../features/session/sessionSlice"

// Import the NavLink component.
import { NavLink, Outlet } from 'react-router-dom';

export default function Header() {  
  const [searchVisible, setSearchVisible] = useState(false);
  const { currentUser } = useContext(UserContext);
  useEffect(() => {
    if(searchVisible){
      document.querySelector(".search-input").focus();
    }
  },[searchVisible]);
  const dispatch = useDispatch();

  const handleLogout = e => {
    dispatch(logOut())
  }
  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  }

  return (
    <div className="header">
      <div className={"brand"}>
        <div className={"left-nav-bar"}>
          <NavLink to="/" height={70} alt="">
          <svg width="186" height="98" viewBox="0 0 186 98" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="186" height="98" fill="white"/>
            <rect x="9" y="9" width="65" height="74" fill="#D9D9D9"/>
            <path d="M57.2241 59V39.3636H62.6701V59H57.2241ZM59.9599 36.8324C59.1502 36.8324 58.4556 36.5639 57.8761 36.027C57.305 35.4815 57.0195 34.8295 57.0195 34.071C57.0195 33.321 57.305 32.6776 57.8761 32.1406C58.4556 31.5952 59.1502 31.3224 59.9599 31.3224C60.7695 31.3224 61.4599 31.5952 62.0309 32.1406C62.6104 32.6776 62.9002 33.321 62.9002 34.071C62.9002 34.8295 62.6104 35.4815 62.0309 36.027C61.4599 36.5639 60.7695 36.8324 59.9599 36.8324ZM79.267 46.0881V50.4091H67.3267V46.0881H79.267ZM89.1651 59L81.6737 32.8182H87.7205L92.0543 51.0099H92.2717L97.0529 32.8182H102.23L106.999 51.0483H107.229L111.563 32.8182H117.61L110.118 59H104.723L99.7376 41.8821H99.533L94.56 59H89.1651ZM127.233 59.3835C125.247 59.3835 123.53 58.9616 122.081 58.1179C120.641 57.2656 119.528 56.081 118.744 54.5639C117.96 53.0384 117.568 51.2699 117.568 49.2585C117.568 47.2301 117.96 45.4574 118.744 43.9403C119.528 42.4148 120.641 41.2301 122.081 40.3864C123.53 39.5341 125.247 39.108 127.233 39.108C129.219 39.108 130.932 39.5341 132.372 40.3864C133.821 41.2301 134.938 42.4148 135.722 43.9403C136.506 45.4574 136.898 47.2301 136.898 49.2585C136.898 51.2699 136.506 53.0384 135.722 54.5639C134.938 56.081 133.821 57.2656 132.372 58.1179C130.932 58.9616 129.219 59.3835 127.233 59.3835ZM127.259 55.1648C128.162 55.1648 128.916 54.9091 129.521 54.3977C130.126 53.8778 130.582 53.1705 130.889 52.2756C131.205 51.3807 131.362 50.3622 131.362 49.2202C131.362 48.0781 131.205 47.0597 130.889 46.1648C130.582 45.2699 130.126 44.5625 129.521 44.0426C128.916 43.5227 128.162 43.2628 127.259 43.2628C126.347 43.2628 125.58 43.5227 124.957 44.0426C124.344 44.5625 123.879 45.2699 123.564 46.1648C123.257 47.0597 123.104 48.0781 123.104 49.2202C123.104 50.3622 123.257 51.3807 123.564 52.2756C123.879 53.1705 124.344 53.8778 124.957 54.3977C125.58 54.9091 126.347 55.1648 127.259 55.1648ZM140.439 59V39.3636H145.719V42.7898H145.923C146.281 41.571 146.882 40.6506 147.726 40.0284C148.57 39.3977 149.541 39.0824 150.641 39.0824C150.913 39.0824 151.207 39.0994 151.523 39.1335C151.838 39.1676 152.115 39.2145 152.354 39.2741V44.1065C152.098 44.0298 151.744 43.9616 151.293 43.902C150.841 43.8423 150.428 43.8125 150.053 43.8125C149.251 43.8125 148.536 43.9872 147.905 44.3366C147.283 44.6776 146.788 45.1548 146.422 45.7685C146.064 46.3821 145.885 47.0895 145.885 47.8906V59H140.439ZM160.104 53.3494L160.117 46.8168H160.909L167.199 39.3636H173.451L165 49.233H163.709L160.104 53.3494ZM155.169 59V32.8182H160.615V59H155.169ZM167.442 59L161.664 50.4474L165.294 46.5994L173.821 59H167.442Z" fill="#17AAE9"/>
          </svg>
          </NavLink>
          <NavLink to="/mentors">Mentors</NavLink>
          <NavLink to="/courses">Courses</NavLink>
          <NavLink to="/articles">Articles</NavLink>
          <NavLink to="/app/design">app</NavLink>
          
        </div>
        <div className="search-tool">
          {searchVisible && (<div><input type="text" placeholder="Search" className="search-input" /></div>)}
          <div className="search-bar">
            <button class="search-btn" onClick={toggleSearch}> 
              <svg className="h-3 w-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.4145 20.5913L18.7695 15.9463C20.1838 13.8291 20.7601 11.2616 20.3862 8.74311C20.0123 6.22462 18.715 3.93524 16.7466 2.32029C14.7782 0.705331 12.2795 -0.119724 9.73651 0.00560621C7.19351 0.130936 4.78803 1.19769 2.98799 2.99837C1.18795 4.79905 0.122047 7.2049 -0.00238424 9.74795C-0.126815 12.291 0.699123 14.7894 2.31477 16.7572C3.93042 18.725 6.22026 20.0215 8.73889 20.3945C11.2575 20.7675 13.8248 20.1903 15.9415 18.7753L20.5865 23.4193C20.9647 23.7882 21.4721 23.9947 22.0005 23.9947C22.5288 23.9947 23.0363 23.7882 23.4145 23.4193C23.7894 23.0442 24 22.5356 24 22.0053C24 21.4749 23.7894 20.9663 23.4145 20.5913ZM10.2505 3.00527C11.6844 3.00527 13.0861 3.43047 14.2784 4.22711C15.4706 5.02375 16.3999 6.15605 16.9486 7.48081C17.4973 8.80558 17.6409 10.2633 17.3612 11.6697C17.0814 13.076 16.3909 14.3679 15.377 15.3818C14.3631 16.3957 13.0712 17.0862 11.6649 17.366C10.2585 17.6457 8.80078 17.5021 7.47602 16.9534C6.15125 16.4047 5.01896 15.4754 4.22232 14.2832C3.42568 13.0909 3.00047 11.6892 3.00047 10.2553C3.00259 8.3331 3.7671 6.49026 5.12628 5.13108C6.48546 3.7719 8.3283 3.00739 10.2505 3.00527Z" fill="currentColor"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className={"right-nav-bar"}>
          {
            currentUser && currentUser.email
              ?
              (
                <>
                  <NavLink to="/profile" className="profile-link">profile</NavLink>
                  <NavLink to="/mycourses" className="profile-link">my courses</NavLink>
                  <NavLink to="/mybookings" className="profile-link">my bookings</NavLink>
                  <button onClick={handleLogout} className="btn user-btn"> Log Out </button>
                </>
              )
              : <NavLink to="/login" className="user-btn">Login</NavLink>
          }
        </div>
      </div>
      <main className="flex-half flex-right">
        {currentUser && !currentUser.mentor_id && <NavLink to="/signup-mentor" className={"btn signup-mentor"}>Become a mentor</NavLink> }
      </main>
      
    </div>
  )
}
