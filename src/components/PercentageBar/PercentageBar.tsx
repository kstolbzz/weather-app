import React from 'react';

import './PercentageBar.css';

interface PercentageBarProps {
  xStart: number,
  xEnd: number,
  xValue: number,
  format: 'degreesF' | 'percentRain'
}

const PercentageBar: React.FC<PercentageBarProps> = ({ xStart, xEnd, xValue, format }) => {
  // Formula for fill percent is
  // ((x - Vmin) / (Vmax - Vmin)) * 100
  const percentage = `${((xValue - xStart) / (xEnd - xStart)) * 100}%`

  // Set the fill width variable to the percent fill calculated above
  const fillWidth = `${percentage}`
  
  return (
    <div className="percentage-bar-container">
        <div className="percentage-bar-item">
          {xStart}{format === "degreesF" && "°F"}{format === "percentRain" && "%"}
        </div>
      <div className="percentage-bar">
        <div className="percentage-fill" aria-label={format + "percentage bar, " + fillWidth + "% filled"} style={{ width: fillWidth }} />
      </div>
      <div className="percentage-bar-item">
        {xEnd}{format === "degreesF" && "°F"}{format === "percentRain" && "%"}
      </div>
    </div>
  )
}

export default PercentageBar