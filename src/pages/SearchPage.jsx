import { useMemo, useState } from 'react'
import '../App.css'
import SearchForm from '../components/SearchForm.jsx'
import ParamsPanel from '../components/ParamsPanel.jsx'
import ResultsList from '../components/ResultsList.jsx'
import { searchOpoint } from '../services/opointApi.js'

const DEFAULT_TOKEN = '3e52a70ccd7bfa2984dd9e7ad7f55944e9ddb183'
const FILTERS = [
  { key: 'basic', label: 'Basic', example: 'spotify', description: 'Match anywhere in article.' },
  { key: 'header', label: 'Header-only', example: 'header:spotify', description: 'Focus on headlines.' },
  { key: 'boolean', label: 'Boolean combo', example: 'spotify AND football', description: 'Use AND/OR/NOT.' },
  { key: 'frequency', label: 'Frequency', example: 'spotify[3..] AND header:spotify', description: 'Require repetitions.' },
  { key: 'language', label: 'Language', example: 'spotify AND lang:en', description: 'Filter by lang.' },
  { key: 'proximity', label: 'Proximity', example: 'SPAN/5(spotify, football)', description: 'Words near each other.' }
]

const stripHtml = (text = '') => text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

const classifyDocument = (summary, body) => {
  const text = `${summary || ''} ${body || ''}`.toLowerCase()
  if (text.includes('newspaper')) return 'newspaper'
  if (text.includes('broadcast') || text.includes('tv') || text.includes('radio')) return 'broadcast'
  if (text.includes('magazine') || text.includes('magazines')) return 'magazine'
  if (text.includes('newsletter')) return 'newsletter'
  if (text.includes('podcast')) return 'podcast'
  return 'unclassified'
}

const normalizeDocuments = (data) => {
  if (!data) return []
  const searchResult = data.searchresult || data.searchResult || {}
  const possible = [
    searchResult.document,
    searchResult.documents,
    data.documents,
    data.document,
    data.results
  ]
  const found = possible.find((entry) => Array.isArray(entry))
  if (!Array.isArray(found)) return []

  return found.map((item, index) => {
    const header =
      item?.header?.text ||
      item?.header ||
      item?.title ||
      item?.headline ||
      item?.url_common ||
      `Untitled #${index + 1}`

    const summary = item?.summary?.text || item?.summary || item?.caption?.text || ''
    const body = stripHtml(item?.body?.text || item?.text || item?.main?.text || '')
    const url = item?.url || item?.orig_url || item?.first_source?.url || ''
    const published =
      item?.local_rcf822_time?.text ||
      item?.local_time?.text ||
      item?.publicationdate ||
      item?.unix_timestamp ||
      ''
    const source = item?.first_source?.sitename || item?.first_source?.name || item?.url_common || ''
    const language = item?.language?.text || item?.language?.encoding || ''
    const country = item?.countryname || item?.countrycode || ''
    const classification = classifyDocument(summary, body)

    return {
      header,
      summary: summary || body.slice(0, 200),
      body,
      url,
      published,
      source,
      language,
      country,
      classification
    }
  })
}

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState(FILTERS[0].example)
  const [selectedFilterKey, setSelectedFilterKey] = useState(FILTERS[0].key)
  const [requestedArticles, setRequestedArticles] = useState(20)
  const [sourceType, setSourceType] = useState('all')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [apiToken] = useState(import.meta.env.VITE_OPOINT_TOKEN || DEFAULT_TOKEN)
  const [rawOpen, setRawOpen] = useState(true)
  const [expandedIndex, setExpandedIndex] = useState(null)

  const effectiveSearchTerm = useMemo(() => (searchTerm || '').trim(), [searchTerm])

  const requestBody = useMemo(
    () => ({
      searchterm: effectiveSearchTerm,
      params: {
        requestedarticles: Math.max(1, Number(requestedArticles) || 1),
        main: {
          matches: true,
          header: 2,
          summary: 2,
          text: 1
        },
        textrazor: 15
      }
    }),
    [effectiveSearchTerm, requestedArticles]
  )

  const documents = useMemo(() => normalizeDocuments(result), [result])
  const filteredDocuments = useMemo(() => {
    if (sourceType === 'all') return documents
    return documents.filter(
      (doc) => doc.classification && doc.classification.toLowerCase() === sourceType
    )
  }, [documents, sourceType])

  const stats = useMemo(() => {
    const searchResult = result?.searchresult || result?.searchResult
    if (!searchResult) return null
    return {
      documents: searchResult.documents ?? searchResult.document?.length ?? null,
      count: searchResult.count ?? null,
      rangeCount: searchResult.range_count ?? null,
      rangeId: searchResult.range_id ?? '',
      host: searchResult.host ?? '',
      context: searchResult.context ?? '',
      timeMs: searchResult.cputime ?? null
    }
  }, [result])

  const handleFilterSelect = (filterKey) => {
    const filter = FILTERS.find((item) => item.key === filterKey)
    setSelectedFilterKey(filterKey)
    if (filter) setSearchTerm(filter.example)
  }

  const handleSearch = async (event) => {
    event.preventDefault()
    setError('')
    setResult(null)

    const trimmedTerm = effectiveSearchTerm.trim()
    if (!trimmedTerm) {
      setError('Please enter a search term before sending.')
      return
    }

    const trimmedToken = (apiToken || '').trim()
    if (!trimmedToken) {
      setError('Please add a valid API token before sending.')
      return
    }

    setLoading(true)
    try {
      const data = await searchOpoint({
        token: trimmedToken,
        body: { ...requestBody, searchterm: trimmedTerm }
      })
      setResult(data)
    } catch (fetchError) {
      setError(fetchError.message || 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <header className="hero">
        <div className="eyebrow">Search explorer</div>
        <h1>Opoint search</h1>
        <p className="lede">Use presets, adjust params, and inspect results with raw JSON.</p>
      </header>

      <SearchForm
        filters={FILTERS}
        selectedFilterKey={selectedFilterKey}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSelectFilter={handleFilterSelect}
        onSubmit={handleSearch}
        loading={loading}
      />

      <ParamsPanel
        requestedArticles={requestedArticles}
        setRequestedArticles={setRequestedArticles}
        sourceType={sourceType}
        setSourceType={setSourceType}
      />

      <ResultsList
        documents={filteredDocuments}
        stats={stats}
        error={error}
        expandedIndex={expandedIndex}
        setExpandedIndex={setExpandedIndex}
        rawOpen={rawOpen}
        setRawOpen={setRawOpen}
        result={result}
      />
    </div>
  )
}

export default SearchPage
