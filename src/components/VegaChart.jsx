import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import embed from 'vega-embed'

function VegaChart({ spec }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    let view
    embed(ref.current, spec, { actions: false })
      .then((res) => {
        view = res.view
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('Vega render error', err)
      })
    return () => {
      if (view) {
        view.finalize()
      }
    }
  }, [spec])

  return <div ref={ref} />
}

VegaChart.propTypes = {
  spec: PropTypes.object.isRequired
}

export default VegaChart
