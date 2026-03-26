import React from 'react'

export default function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <svg viewBox="0 0 1200 1200" style={{ width: 40, height: 40 }}>
        <g>
          <path
            fill="#0C130B"
            d="M1065.5,1178H140.5C73.4,1178,19,1123.6,19,1056.5V138.5C19,71.4,73.4,17,140.5,17h924.9c67.1,0,121.5,54.4,121.5,121.5v917.9C1187,1123.6,1132.6,1178,1065.5,1178z"
          />
          <path
            fill="none"
            stroke="rgba(167,210,109,0.3)"
            strokeWidth="20"
            d="M1065.5,1178H140.5C73.4,1178,19,1123.6,19,1056.5V138.5C19,71.4,73.4,17,140.5,17h924.9c67.1,0,121.5,54.4,121.5,121.5v917.9C1187,1123.6,1132.6,1178,1065.5,1178z"
          />
        </g>
        <g opacity="0.9">
          <polyline
            fill="none"
            stroke="#A7D26D"
            strokeWidth="30"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="-5,1200 673,255 159,255"
          />
          <circle fill="#A7D26D" cx="168" cy="253" r="55" />
          <line
            fill="none"
            stroke="#A7D26D"
            strokeWidth="30"
            strokeLinecap="round"
            x1="-63"
            y1="845"
            x2="183"
            y2="516"
          />
          <circle fill="#A7D26D" cx="183" cy="516" r="55" />
        </g>
      </svg>
      <span
        style={{
          color: 'rgba(255,255,255,0.8)',
          fontWeight: 400,
          fontSize: '1.375rem',
          letterSpacing: '0.05em',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        Zonemation
      </span>
    </div>
  )
}
