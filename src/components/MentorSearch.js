import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setCountry,
  setSearchTerm,
  selectCountry,
  selectSearchTerm
} from '../features/mentors/search-form'
import { useNavigate } from 'react-router-dom'

function MentorSearchForm() {
  const dispatch = useDispatch()
  const country = useSelector(selectCountry)
  const searchTerm = useSelector(selectSearchTerm)
  const navigate = useNavigate()

  const handleCountryChange = (event) => {
    dispatch(setCountry(event.target.value))
  }

  const handleSearchTermChange = (event) => {
    dispatch(setSearchTerm(event.target.value))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate(`/mentors?country=${country}&searchTerm=${searchTerm}`)
  }

  return (
    <form onSubmit={handleSubmit}>
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

        <button type="submit">Search</button>
      </div>
    </form>
  )
}

export default MentorSearchForm