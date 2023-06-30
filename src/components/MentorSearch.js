  import React from 'react'
  import { useDispatch, useSelector } from 'react-redux'
  import {
    setCountry,
    setSearchTerm,
    selectCountry,
    selectSearchTerm
  } from '../features/mentors/search-form'

  function MentorSearchForm() {
    const dispatch = useDispatch()
    const country = useSelector(selectCountry)
    const searchTerm = useSelector(selectSearchTerm)

    const handleCountryChange = (event) => {
      dispatch(setCountry(event.target.value))
    }

    const handleSearchTermChange = (event) => {
      dispatch(setSearchTerm(event.target.value))
    }

    return (
      <div>
        <label htmlFor="searchTerm">Search Term:</label>
        <input
          type="text"
          id="searchTerm"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <label htmlFor="country">Country:</label>
        <select id="country" value={country} onChange={handleCountryChange}>
          <option value="all">All</option>
          <option value="usa">USA</option>
          <option value="uk">UK</option>
          <option value="canada">Canada</option>
        </select>
      </div>
    )
  }

  export default MentorSearchForm