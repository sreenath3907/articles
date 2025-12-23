import PropTypes from 'prop-types'

function ResultsList({
  documents,
  stats,
  error,
  expandedIndex,
  setExpandedIndex,
  rawOpen,
  setRawOpen,
  result
}) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <p className="label">Results</p>
          <h2>Browse and expand to read</h2>
          <p className="subtle">Click a row to see the full body. Tags highlight language and country; links open the source.</p>
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {result && (
        <div className="results-wrap">
          {stats && (
            <div className="stats-grid">
              {[
                { label: 'Documents', value: stats.documents },
                { label: 'Count', value: stats.count },
                { label: 'Range count', value: stats.rangeCount },
                { label: 'Range ID', value: stats.rangeId },
                { label: 'Host', value: stats.host },
                { label: 'Context', value: stats.context }
              ]
                .filter(({ value }) => value !== null && value !== undefined && value !== '')
                .map(({ label, value }) => (
                  <div key={label} className="stat-card">
                    <p className="stat-label">{label}</p>
                    <p className="stat-value">{value}</p>
                  </div>
                ))}
            </div>
          )}

          {documents.length > 0 ? (
            <div className="results-list">
              {documents.map((item, index) => {
                const expanded = expandedIndex === index
                const snippet = (item.summary || item.body || '').slice(0, 180)
                const hasMore = (item.summary || item.body || '').length > 180
                const sentences =
                  item.body
                    ?.split(/(?<=[.!?])\s+/)
                    .map((s) => s.trim())
                    .filter(Boolean) || []
                return (
                  <article
                    key={`${item.header}-${index}`}
                    className={`result-row ${expanded ? 'expanded' : ''}`}
                    onClick={() => setExpandedIndex(expanded ? null : index)}
                  >
                    <div className="row-top">
                      <div>
                        <p className="source">{item.source || 'Unknown source'}</p>
                        <h3>{item.header}</h3>
                      </div>
                      {item.published && <span className="time">{String(item.published).slice(0, 19)}</span>}
                    </div>

                    <p className="summary">
                      {expanded
                        ? item.summary || item.body || 'No body text'
                        : `${snippet}${hasMore ? '…' : ''}`}
                    </p>

                    <div className="row-meta">
                      <div className="tags">
                        {item.language && <span>{item.language}</span>}
                        {item.country && <span>{item.country}</span>}
                      </div>
                      {item.url && (
                        <a
                          className="link"
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Open source
                        </a>
                      )}
                    </div>

                    {expanded && item.body && (
                      <div className="body-text" onClick={(e) => e.stopPropagation()}>
                        <p className="body-label">Body</p>
                        {sentences.length > 1 ? (
                          <ul className="body-list">
                            {sentences.map((sentence, sentenceIndex) => (
                              <li key={sentenceIndex}>{sentence}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>{item.body}</p>
                        )}
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          ) : (
            <p className="subtle">No documents found in response.</p>
          )}

          {/* <div className="raw-section">
            <div className="raw-header">
              <div>
                <p className="label">Raw response</p>
                <p className="subtle">Full JSON payload returned by the API.</p>
              </div>
              <button
                type="button"
                className="ghost-button"
                onClick={() => setRawOpen((prev) => !prev)}
              >
                {rawOpen ? 'Hide' : 'Show'}
              </button>
            </div>
            {rawOpen && (
              <div className="raw-body">
                <pre>
                  <code>{JSON.stringify(result, null, 2)}</code>
                </pre>
              </div>
            )}
          </div> */}
        </div>
      )}
    </section>
  )
}

ResultsList.propTypes = {
  documents: PropTypes.array.isRequired,
  stats: PropTypes.object,
  error: PropTypes.string.isRequired,
  expandedIndex: PropTypes.number,
  setExpandedIndex: PropTypes.func.isRequired,
  rawOpen: PropTypes.bool.isRequired,
  setRawOpen: PropTypes.func.isRequired,
  result: PropTypes.any
}

export default ResultsList
