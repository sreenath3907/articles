import PropTypes from 'prop-types'

function ParamsPanel({ requestedArticles, setRequestedArticles, fields, toggleField }) {
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
        </div>

        <div className="control">
          <label>Field filters</label>
          <div className="toggle-row">
            {[
              { key: 'header', label: 'Header' },
              { key: 'summary', label: 'Summary' },
              { key: 'text', label: 'Body' }
            ].map(({ key, label }) => (
              <label key={key} className="toggle">
                <input type="checkbox" checked={fields[key]} onChange={() => toggleField(key)} />
                <span>{label}</span>
              </label>
            ))}
          </div>
          <p className="hint">If only one is checked, the search term must appear in that field.</p>
        </div>

      </div>
    </section>
  )
}

ParamsPanel.propTypes = {
  requestedArticles: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setRequestedArticles: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  toggleField: PropTypes.func.isRequired
}

export default ParamsPanel
