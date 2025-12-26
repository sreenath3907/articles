import PropTypes from 'prop-types'

function SearchForm({
  filters,
  selectedFilterKey,
  searchTerm,
  setSearchTerm,
  onSelectFilter,
  onSubmit,
  loading
}) {
  return (
    <form className="panel" onSubmit={onSubmit}>
      <div className="panel-header">
        <div>
          <p className="label">Search</p>
          <h2>Find articles</h2>
          <p className="subtle">Search by keyword or pick a quick preset.</p>
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

      {filters?.length > 0 && (
        <div className="filter-grid">
          {filters.map((filter) => {
            const isActive = filter.key === selectedFilterKey
            return (
              <button
                key={filter.key}
                type="button"
                className={`filter-card ${isActive ? 'active' : ''}`}
                onClick={() => onSelectFilter?.(filter.key)}
              >
                <div className="filter-title">
                  <span>{filter.label}</span>
                  {isActive && <span className="dot" aria-hidden />}
                </div>
                <p className="example">{filter.example}</p>
                <p className="description">{filter.description}</p>
              </button>
            )
          })}
        </div>
      )}
    </form>
  )
}

SearchForm.propTypes = {
  filters: PropTypes.array,
  selectedFilterKey: PropTypes.string,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  onSelectFilter: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}

export default SearchForm
