import { useMemo, useState } from 'react'
import '../App.css'
import VegaChart from '../components/VegaChart.jsx'

const AGENCIES = [
  {
    id: 'bea',
    name: 'Bureau of Economic Analysis',
    description: 'Measures U.S. economic activity with data on GDP, personal income, trade, and industries.'
  },
  {
    id: 'bls',
    name: 'Bureau of Labor Statistics',
    description: 'Delivers employment, wages, inflation, and productivity statistics for the U.S. economy.'
  },
  {
    id: 'ncses',
    name: 'National Center for Science and Engineering Statistics',
    description: 'Tracks R&D, STEM workforce, and innovation indicators across sectors.'
  },
  {
    id: 'oecd',
    name: 'Organisation for Economic Co-Operation and Development',
    description: 'International policy organization covering economies, trade, education, and innovation.'
  },
  {
    id: 'ca-data',
    name: 'California Open Data Portal',
    description: 'Statewide open data across environment, transportation, health, and public services.'
  }
]

const MOCK_USAGE = {
  bea: {
    summary: {
      opoint: 120,
      openalex: 80,
      sentiment: 0.12,
      topSource: 'Reuters',
      lastUpdated: '2025-01-10'
    },
    ops: { latencyMs: 420, successRate: 0.985, new24h: 14 },
    timeline: [
      { source: 'Opoint', month: '2024-09', value: 20 },
      { source: 'Opoint', month: '2024-10', value: 24 },
      { source: 'Opoint', month: '2024-11', value: 28 },
      { source: 'Opoint', month: '2024-12', value: 30 },
      { source: 'Opoint', month: '2025-01', value: 18 },
      { source: 'OpenAlex', month: '2024-09', value: 12 },
      { source: 'OpenAlex', month: '2024-10', value: 15 },
      { source: 'OpenAlex', month: '2024-11', value: 20 },
      { source: 'OpenAlex', month: '2024-12', value: 18 },
      { source: 'OpenAlex', month: '2025-01', value: 15 }
    ],
    split: [
      { source: 'Opoint (news)', value: 120 },
      { source: 'OpenAlex (publications)', value: 80 }
    ],
    sources: [
      { source: 'Reuters', value: 26 },
      { source: 'Bloomberg', value: 21 },
      { source: 'AP News', value: 18 },
      { source: 'CNBC', value: 14 },
      { source: 'WSJ', value: 12 }
    ],
    countries: [
      { country: 'United States', value: 140 },
      { country: 'Canada', value: 18 },
      { country: 'United Kingdom', value: 16 },
      { country: 'Germany', value: 14 },
      { country: 'France', value: 12 }
    ],
    languages: [
      { language: 'en', value: 180 },
      { language: 'fr', value: 12 },
      { language: 'de', value: 10 },
      { language: 'es', value: 8 },
      { language: 'other', value: 6 }
    ]
  },
  bls: {
    summary: {
      opoint: 90,
      openalex: 50,
      sentiment: 0.05,
      topSource: 'AP News',
      lastUpdated: '2025-01-10'
    },
    ops: { latencyMs: 510, successRate: 0.972, new24h: 9 },
    timeline: [
      { source: 'Opoint', month: '2024-09', value: 14 },
      { source: 'Opoint', month: '2024-10', value: 18 },
      { source: 'Opoint', month: '2024-11', value: 20 },
      { source: 'Opoint', month: '2024-12', value: 22 },
      { source: 'Opoint', month: '2025-01', value: 16 },
      { source: 'OpenAlex', month: '2024-09', value: 10 },
      { source: 'OpenAlex', month: '2024-10', value: 12 },
      { source: 'OpenAlex', month: '2024-11', value: 14 },
      { source: 'OpenAlex', month: '2024-12', value: 8 },
      { source: 'OpenAlex', month: '2025-01', value: 6 }
    ],
    split: [
      { source: 'Opoint (news)', value: 90 },
      { source: 'OpenAlex (publications)', value: 50 }
    ],
    sources: [
      { source: 'AP News', value: 20 },
      { source: 'Reuters', value: 18 },
      { source: 'NYTimes', value: 12 },
      { source: 'CNBC', value: 10 },
      { source: 'CNN', value: 8 }
    ],
    countries: [
      { country: 'United States', value: 96 },
      { country: 'Canada', value: 12 },
      { country: 'Mexico', value: 10 },
      { country: 'United Kingdom', value: 8 },
      { country: 'Australia', value: 6 }
    ],
    languages: [
      { language: 'en', value: 150 },
      { language: 'es', value: 12 },
      { language: 'fr', value: 8 },
      { language: 'other', value: 6 }
    ]
  },
  ncses: {
    summary: {
      opoint: 60,
      openalex: 65,
      sentiment: 0.18,
      topSource: 'ScienceDaily',
      lastUpdated: '2025-01-10'
    },
    ops: { latencyMs: 460, successRate: 0.989, new24h: 7 },
    timeline: [
      { source: 'Opoint', month: '2024-09', value: 10 },
      { source: 'Opoint', month: '2024-10', value: 12 },
      { source: 'Opoint', month: '2024-11', value: 14 },
      { source: 'Opoint', month: '2024-12', value: 16 },
      { source: 'Opoint', month: '2025-01', value: 8 },
      { source: 'OpenAlex', month: '2024-09', value: 12 },
      { source: 'OpenAlex', month: '2024-10', value: 14 },
      { source: 'OpenAlex', month: '2024-11', value: 16 },
      { source: 'OpenAlex', month: '2024-12', value: 14 },
      { source: 'OpenAlex', month: '2025-01', value: 9 }
    ],
    split: [
      { source: 'Opoint (news)', value: 60 },
      { source: 'OpenAlex (publications)', value: 65 }
    ],
    sources: [
      { source: 'ScienceDaily', value: 16 },
      { source: 'Nature', value: 14 },
      { source: 'Reuters', value: 11 },
      { source: 'The Verge', value: 10 },
      { source: 'AP News', value: 9 }
    ],
    countries: [
      { country: 'United States', value: 78 },
      { country: 'Canada', value: 12 },
      { country: 'United Kingdom', value: 10 },
      { country: 'India', value: 8 },
      { country: 'Germany', value: 7 }
    ],
    languages: [
      { language: 'en', value: 120 },
      { language: 'hi', value: 8 },
      { language: 'de', value: 7 },
      { language: 'other', value: 6 }
    ]
  },
  oecd: {
    summary: {
      opoint: 180,
      openalex: 140,
      sentiment: 0.22,
      topSource: 'OECD Newsroom',
      lastUpdated: '2025-01-10'
    },
    ops: { latencyMs: 390, successRate: 0.993, new24h: 18 },
    timeline: [
      { source: 'Opoint', month: '2024-09', value: 32 },
      { source: 'Opoint', month: '2024-10', value: 36 },
      { source: 'Opoint', month: '2024-11', value: 40 },
      { source: 'Opoint', month: '2024-12', value: 38 },
      { source: 'Opoint', month: '2025-01', value: 34 },
      { source: 'OpenAlex', month: '2024-09', value: 24 },
      { source: 'OpenAlex', month: '2024-10', value: 28 },
      { source: 'OpenAlex', month: '2024-11', value: 32 },
      { source: 'OpenAlex', month: '2024-12', value: 30 },
      { source: 'OpenAlex', month: '2025-01', value: 26 }
    ],
    split: [
      { source: 'Opoint (news)', value: 180 },
      { source: 'OpenAlex (publications)', value: 140 }
    ],
    sources: [
      { source: 'OECD Newsroom', value: 30 },
      { source: 'Reuters', value: 28 },
      { source: 'Bloomberg', value: 24 },
      { source: 'FT', value: 22 },
      { source: 'AP News', value: 18 }
    ],
    countries: [
      { country: 'France', value: 60 },
      { country: 'Germany', value: 55 },
      { country: 'United Kingdom', value: 50 },
      { country: 'United States', value: 45 },
      { country: 'Canada', value: 30 }
    ],
    languages: [
      { language: 'en', value: 120 },
      { language: 'fr', value: 70 },
      { language: 'de', value: 65 },
      { language: 'es', value: 30 },
      { language: 'other', value: 35 }
    ]
  },
  'ca-data': {
    summary: {
      opoint: 70,
      openalex: 30,
      sentiment: -0.04,
      topSource: 'CalMatters',
      lastUpdated: '2025-01-10'
    },
    ops: { latencyMs: 540, successRate: 0.968, new24h: 6 },
    timeline: [
      { source: 'Opoint', month: '2024-09', value: 12 },
      { source: 'Opoint', month: '2024-10', value: 16 },
      { source: 'Opoint', month: '2024-11', value: 18 },
      { source: 'Opoint', month: '2024-12', value: 14 },
      { source: 'Opoint', month: '2025-01', value: 10 },
      { source: 'OpenAlex', month: '2024-09', value: 6 },
      { source: 'OpenAlex', month: '2024-10', value: 8 },
      { source: 'OpenAlex', month: '2024-11', value: 9 },
      { source: 'OpenAlex', month: '2024-12', value: 5 },
      { source: 'OpenAlex', month: '2025-01', value: 2 }
    ],
    split: [
      { source: 'Opoint (news)', value: 70 },
      { source: 'OpenAlex (publications)', value: 30 }
    ],
    sources: [
      { source: 'CalMatters', value: 14 },
      { source: 'LA Times', value: 12 },
      { source: 'SacBee', value: 11 },
      { source: 'AP News', value: 10 },
      { source: 'Reuters', value: 8 }
    ],
    countries: [
      { country: 'United States', value: 82 },
      { country: 'Canada', value: 12 },
      { country: 'Mexico', value: 6 },
      { country: 'United Kingdom', value: 4 },
      { country: 'Australia', value: 3 }
    ],
    languages: [
      { language: 'en', value: 95 },
      { language: 'es', value: 10 },
      { language: 'fr', value: 6 },
      { language: 'other', value: 4 }
    ]
  }
}

function UsagePage() {
  const [selectedAgencyId, setSelectedAgencyId] = useState(AGENCIES[0].id)

  const selectedAgency = useMemo(
    () => AGENCIES.find((agency) => agency.id === selectedAgencyId),
    [selectedAgencyId]
  )
  const usage = MOCK_USAGE[selectedAgencyId]

  const pieSpec = useMemo(
    () => ({
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      data: { values: usage?.split || [] },
      encoding: {
        theta: { field: 'value', type: 'quantitative' },
        color: { field: 'source', type: 'nominal' }
      },
      layer: [
        { mark: { type: 'arc', outerRadius: 120, innerRadius: 50 } },
        {
          mark: { type: 'text', radius: 80 },
          encoding: { text: { field: 'value', type: 'quantitative' } }
        }
      ],
      view: { stroke: null }
    }),
    [usage]
  )

  const timelineSpec = useMemo(
    () => ({
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      data: { values: usage?.timeline || [] },
      mark: 'line',
      encoding: {
        x: { field: 'month', type: 'ordinal', sort: null, axis: { title: 'Month' } },
        y: { field: 'value', type: 'quantitative', axis: { title: 'Articles / publications' } },
        color: { field: 'source', type: 'nominal', legend: { title: 'Source' } }
      },
      view: { stroke: null }
    }),
    [usage]
  )

  const countriesSpec = useMemo(
    () => ({
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      data: { values: usage?.countries || [] },
      mark: 'bar',
      encoding: {
        x: { field: 'value', type: 'quantitative', axis: { title: 'Articles/publications' } },
        y: {
          field: 'country',
          type: 'ordinal',
          sort: '-x',
          axis: { title: 'Country' }
        },
        color: { field: 'country', type: 'nominal', legend: null }
      },
      view: { stroke: null }
    }),
    [usage]
  )

  const languagesSpec = useMemo(
    () => ({
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      data: { values: usage?.languages || [] },
      mark: 'bar',
      encoding: {
        x: { field: 'value', type: 'quantitative', axis: { title: 'Articles/publications' } },
        y: {
          field: 'language',
          type: 'ordinal',
          sort: '-x',
          axis: { title: 'Language' }
        },
        color: { field: 'language', type: 'nominal', legend: null }
      },
      view: { stroke: null }
    }),
    [usage]
  )

  return (
    <div className="page">
      <header className="hero">
        <div className="eyebrow">Usage dashboard</div>
        <h1>Agency usage</h1>
        <p className="lede">
          Preview usage from Opoint (news) and OpenAlex (publications). Click Usage to show charts
          and stats per agency.
        </p>
      </header>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="label">Agencies</p>
            <h2>Select an agency</h2>
          </div>
        </div>
        <div className="agency-grid">
          {AGENCIES.map((agency) => (
            <article key={agency.id} className="agency-card">
            <p className="source">{agency.name}</p>
            <p className="subtle">{agency.description}</p>
            <button
              type="button"
              className="primary-btn small"
              onClick={() => setSelectedAgencyId(agency.id)}
            >
                Usage
              </button>
            </article>
          ))}
        </div>
      </section>

      {usage && selectedAgency && (
        <section className="panel">
          <div className="panel-header">
            <div>
              <p className="label">Usage</p>
              <h2>{selectedAgency.name}</h2>
              <p className="subtle">
                Data from Opoint (news) and OpenAlex (publications). Last updated:{' '}
                {usage.summary.lastUpdated}
              </p>
            </div>
            <div className="pill">Agency: {selectedAgency.name}</div>
          </div>

          <div className="usage-stats">
            <div className="stat-card">
              <p className="stat-label">Opoint (news)</p>
              <p className="stat-value">{usage.summary.opoint}</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">OpenAlex (publications)</p>
              <p className="stat-value">{usage.summary.openalex}</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Total</p>
              <p className="stat-value">{usage.summary.opoint + usage.summary.openalex}</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Avg sentiment</p>
              <p className="stat-value">{usage.summary.sentiment}</p>
            </div>
            <div className="stat-card">
              <p className="stat-label">Top source</p>
              <p className="stat-value">{usage.summary.topSource}</p>
            </div>
          </div>

          <div className="chart-grid two-col">
            <div className="chart-card">
              <p className="label">Split</p>
              <VegaChart spec={pieSpec} />
            </div>
            <div className="chart-card">
              <p className="label">Top sources (news)</p>
              <VegaChart
                spec={{
                  $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
                  data: { values: usage?.sources || [] },
                  mark: 'bar',
                  encoding: {
                    x: { field: 'value', type: 'quantitative', axis: { title: 'Articles' } },
                    y: {
                      field: 'source',
                      type: 'ordinal',
                      sort: '-x',
                      axis: { title: 'Source' }
                    },
                    color: { field: 'source', type: 'nominal', legend: null }
                  },
                  view: { stroke: null }
                }}
              />
            </div>
            <div className="chart-card">
              <p className="label">Trend (5 months)</p>
              <VegaChart spec={timelineSpec} />
            </div>
            <div className="chart-card">
              <p className="label">By country</p>
              <VegaChart spec={countriesSpec} />
            </div>
            <div className="chart-card">
              <p className="label">By language</p>
              <VegaChart spec={languagesSpec} />
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default UsagePage
