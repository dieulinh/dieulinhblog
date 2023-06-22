import React, { useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectMentors, loadMentors, isLoadingMentors } from "../features/mentors/mentorsSlice";
import Search from "./Search";

export default function Mentors() {
  const dispatch = useDispatch();

  const isLoading = useSelector(isLoadingMentors);
  const mentors = useSelector(selectMentors);

  const scrollUp = (event) => {
    console.log(event)
    window.scrollTo(0, 200)
  }

  useEffect(() => {
    dispatch(loadMentors());

  }, [dispatch]);


  if(isLoading) {
    return (<p>Articles are loading</p>)
  }
  return (
    <div>

      <section>
        <h1>Mentors</h1>

        <div className="article-list">

          { mentors.length > 0 && mentors.map(article => (

            <div className="profile-card__overview">

              <div className="profile-card__organization">
                <div className="community-org-label label success">
                  <i className="fad fa-users" aria-hidden="true"></i>&nbsp;


                </div>

              </div>

              <div className="profile-card__image">

                <a href="/mentor/1553462" aria-labelledby="profile_Grace_1553462">


                  <div className="default-avatar avatar--small">
                    GC
                  </div>


                </a>

              </div>

              <div className="profile-card__about">
                <h2 className="h3" id="profile_Grace_1553462">

                  <a href="/mentor/1553462" className="text-tertiary">

                    Grace Chiza

                  </a>


                  <span className="label alert">Verizon Digital Ready</span>


                </h2>


                <span className="h5">
        <ul className="list--comma-separated">
          <p>
            <span>Beaverton</span>
            <span>Oregon</span>
            <span>United States of America</span>
          </p>
        </ul>
      </span>


                <span className="h5 no-bold text-sottovoce">Agriculture/Farming/Ranching</span>


                <div className="profile-card__extras">


                  <div className="profile-details__detail">
                    <span className="detail__label"><strong>Recent Activity</strong></span>
                    <span className="detail__value">
      <span className="activity-widget">

            <span data-tooltip="r6kjwa-tooltip" title="" role="img" aria-label="Active in the last week"
                  aria-describedby="i9leb9-tooltip" data-yeti-box="i9leb9-tooltip" data-toggle="i9leb9-tooltip"
                  data-resize="i9leb9-tooltip" className="has-tip" data-events="resize">
              <i className="fas fa-comment text-tertiary" aria-hidden="true"></i>
              <i className="fas fa-comment text-tertiary " aria-hidden="true"></i>
              <i className="fas fa-comment text-tertiary " aria-hidden="true"></i>
            </span>

      </span>
    </span>
                  </div>


                </div>
              </div>
            </div>

          ))}
        </div>
        <button onClick={scrollUp}>Scroll to Top</button>
        <Search />

      </section>

    </div>
  )
}
