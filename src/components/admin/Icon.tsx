'use client'

import React, { useEffect, useRef } from 'react'

export default function Icon() {
  const pathRef = useRef<SVGPolylineElement>(null)
  const lineRef = useRef<SVGLineElement>(null)

  useEffect(() => {
    const path = pathRef.current
    const line = lineRef.current
    if (!path || !line) return

    const pathLength = path.getTotalLength?.() || 1800
    const lineLength = line.getTotalLength?.() || 500

    path.style.strokeDasharray = `${pathLength}`
    path.style.strokeDashoffset = `${pathLength}`
    line.style.strokeDasharray = `${lineLength}`
    line.style.strokeDashoffset = `${lineLength}`

    requestAnimationFrame(() => {
      path.style.transition = 'stroke-dashoffset 1.2s ease-in-out'
      path.style.strokeDashoffset = '0'
      setTimeout(() => {
        line.style.transition = 'stroke-dashoffset 0.6s ease-in-out'
        line.style.strokeDashoffset = '0'
      }, 400)
    })
  }, [])

  return (
    <svg viewBox="0 0 1200 1200" style={{ width: 28, height: 28 }}>
      <g>
        <path
          fill="#0C130B"
          d="M1065.5,1178H140.5C73.4,1178,19,1123.6,19,1056.5V138.5C19,71.4,73.4,17,140.5,17h924.9c67.1,0,121.5,54.4,121.5,121.5v917.9C1187,1123.6,1132.6,1178,1065.5,1178z"
        />
        <path
          fill="none"
          stroke="rgba(167,210,109,0.25)"
          strokeWidth="24"
          d="M1065.5,1178H140.5C73.4,1178,19,1123.6,19,1056.5V138.5C19,71.4,73.4,17,140.5,17h924.9c67.1,0,121.5,54.4,121.5,121.5v917.9C1187,1123.6,1132.6,1178,1065.5,1178z"
        />
      </g>
      <g>
        <polyline
          ref={pathRef}
          fill="none"
          stroke="#A7D26D"
          strokeWidth="40"
          strokeLinecap="round"
          strokeLinejoin="round"
          points="-5,1200 673,255 159,255"
        />
        <circle fill="#A7D26D" cx="168" cy="253" r="65" opacity="0.9" />
        <line
          ref={lineRef}
          fill="none"
          stroke="#A7D26D"
          strokeWidth="40"
          strokeLinecap="round"
          x1="-63"
          y1="845"
          x2="183"
          y2="516"
        />
        <circle fill="#A7D26D" cx="183" cy="516" r="65" opacity="0.9" />
      </g>
    </svg>
  )
}
