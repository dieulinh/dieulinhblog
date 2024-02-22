import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setCountry,
  setSearchTerm,
  selectCountry,
  selectSearchTerm
} from '../../features/mentors/search-form'
import { useNavigate } from 'react-router-dom'
import { CountryDropdown } from 'react-country-region-selector'

function MentorSearchForm() {
  const dispatch = useDispatch()
  const country = useSelector(selectCountry)
  const searchTerm = useSelector(selectSearchTerm)
  const navigate = useNavigate()

  const handleCountryChange = (val) => {
    dispatch(setCountry(val))
  }
  const handleSearchTermChange = (event) => {
    dispatch(setSearchTerm(event.target.value))
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    navigate(`/mentors?country=${country}&q=${searchTerm}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={"mentor-search-form"}>
        <div className="form-group half-screen">
          <label htmlFor="searchTerm">Search Term:</label>
          <input
            type="text"
            id="searchTerm"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </div>
        <div  className="form-group half-screen">
          <label htmlFor="country">Country:</label>
          <CountryDropdown
            classes='country-dropdown'
            defaultOptionLabel="Any Country"
            value={country}
            valueType='short'
            onChange={(val) => handleCountryChange(val)} />
        </div>

      </div>
      <div className={"form-group left-side"}>
        <button type="submit" className="btn">Search</button>
      </div>

    </form>
  )
}

export default MentorSearchForm