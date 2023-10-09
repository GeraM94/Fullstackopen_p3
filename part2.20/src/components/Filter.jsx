import React from 'react'
import PropTypes from 'prop-types'

const Filter = ({filter, handleFilter}) => {
  return (
    <div>filkter shown with <input value={filter} onChange={handleFilter} /></div>
  )
}

Filter.propTypes = {}

export default Filter

