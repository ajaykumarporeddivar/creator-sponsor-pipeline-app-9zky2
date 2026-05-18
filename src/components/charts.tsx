'use client';

import React from 'react';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
}

export function Sparkline({
  data,
  width = 100,
  height = 30,
  strokeColor = '#0f172a', // zinc-900
  fillColor = 'none',
  strokeWidth = 1,
}: SparklineProps): JSX.Element {
  if (data.length < 2) {
    return (
      <svg width={width} height={height}>
        {data.length === 1 && <circle cx={width / 2} cy={height / 2} r={1} fill={strokeColor} />}
      </svg>
    );
  }

  const minVal = Math.min(...data);
  const maxVal = Math.max(...data);

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - minVal) / (maxVal - minVal)) * height;
      return `${x},${isNaN(y) ? height / 2 : y}`; // Handle case where minVal === maxVal
    })
    .join(' ');

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <polyline
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}