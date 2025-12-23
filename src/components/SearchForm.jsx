import PropTypes from 'prop-types'

function SearchForm({
  selectedFilter,
  searchTerm,
  setSearchTerm,
  onSubmit,
  loading
}) {
  return (
    <form className="panel" onSubmit={onSubmit}>
      <div className="panel-header">
        <div>
          <p className="label">Search</p>
          <h2>Find articles</h2>
          <p className="subtle">Search by keyword.</p>
        </div>
      </div>

      <div className="search-area">
        <input
          className="search-input"
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <div className="actions">
        <button className="primary-btn" type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search articles'}
        </button>
      </div>
    </form>
  )
}

SearchForm.propTypes = {
  selectedFilter: PropTypes.object.isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}

export default SearchForm
