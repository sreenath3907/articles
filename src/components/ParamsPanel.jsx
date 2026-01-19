import PropTypes from 'prop-types'

function ParamsPanel({
  requestedArticles,
  setRequestedArticles,
  sourceType,
  setSourceType
}) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="label">Result options</p>
          <h2>Tune how results return</h2>
        </div>
        <div className="pill">Field filters</div>
      </div>

      <div className="controls-grid">
        <div className="control">
          <label htmlFor="requested-articles">Requested articles</label>
          <input
            id="requested-articles"
            type="number"
            min="1"
            max="50"
            value={requestedArticles}
            onChange={(event) => setRequestedArticles(event.target.value)}
          />
          <p className="hint">Default is 20; adjust as needed.</p>
        </div>

        <div className="control">
          <label htmlFor="source-type">Source type</label>
          <select
            id="source-type"
            value={sourceType}
            onChange={(e) => setSourceType(e.target.value)}
            className="select"
          >
            <option value="all">All</option>
            <option value="newspaper">Newspaper</option>
            <option value="broadcast">Broadcast</option>
            <option value="magazine">Magazine</option>
            <option value="newsletter">Newsletter</option>
            <option value="podcast">Podcast</option>
            <option value="unclassified">Unclassified</option>
          </select>
          <p className="hint">Filter displayed results by classification.</p>
        </div>

      </div>
    </section>
  )
}

ParamsPanel.propTypes = {
  requestedArticles: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setRequestedArticles: PropTypes.func.isRequired,
  sourceType: PropTypes.string.isRequired,
  setSourceType: PropTypes.func.isRequired
}

export default ParamsPanel
