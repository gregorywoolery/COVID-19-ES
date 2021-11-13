import React from 'react'
import Lottie from 'react-lottie'
import * as loading from '../../../../assets/loading.json'

// Displays loading icon when request are being made

const loadingOptions = {
  loop: true,
  autoplay: true,
  animationData: loading.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

export default function Loading({ height, width }) {
  return (
    <div>
      <Lottie options={loadingOptions} height={height || 120} width={width || 120} />
    </div>
  )
}
