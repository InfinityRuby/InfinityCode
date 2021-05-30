import React from 'react'
import Lottie from 'react-lottie'
import * as loading from '../animation/loading.json'

const defaultOption = {
  loop: true,
  autoplay: true,
  animationData: loading.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

export default function Loading(){
  return(
    <div className="loading">
      <Lottie options={ defaultOption } speed={ 0.8 } height={ 350 } width={ 350 }/>
    </div>
  )
}