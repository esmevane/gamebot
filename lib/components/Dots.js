import React from 'react'

const scale = 16

const dotStyle = {
  backgroundColor: 'white',
  borderRadius: `${scale}px`,
  border: `1px solid black`,
  display: 'inline-block',
  height: `${scale}px`,
  width: `${scale}px`
}

const listStyle = {
  alignItems: 'center',
  justifyContent: 'space-around',
  backgroundColor: 'white',
  boxShadow: `0 0 ${scale * 1.5}px -${scale * 0.25}px rgba(0, 0, 0, 0.5)`,
  cursor: 'pointer',
  display: 'flex',
  padding: `0 ${scale * 0.5}px`,
  textAlign: 'center',
  height: `${scale * 2}px`,
  minWidth: `${scale * 10}px`,
  maxWidth: `${scale * 30}px`
}

const times = number => Array.apply(null, Array(number))
const Dot = ({ filled = false }) => {
  const fillStyle = filled ? { backgroundColor: 'black' } : {}
  const style = { ...dotStyle, ...fillStyle }

  return <div style={ style } />
}

const Dots = ({ level = 0, max = 5 }) =>
  <div style={ listStyle }>
    {
      times(max).map((item, index) => (
        <Dot key={ index } filled={ (index + 1) <= level } />
      ))
    }
  </div>

export default Dots
