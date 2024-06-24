import React from 'react';
import "./style.css";

export default function Company() {
  return (
    <div id='company-wrapper'>
      <div className='company-container'>
        <div className='company-img-box'></div>
        <div className='company-title-box'>
          <div className='company-title'>Food Insight와 함께하는 맛집탐방</div>
          <div className='company-title-detail-box'>
            <div className='company-title-detail-first'>Food Insight's restaurant tour</div>
            <div className='company-title-detail-second'>Food Insight는 언제나 여러분과 함께 합니다.</div>
          </div>
        </div>
      </div>
    </div>
  )
}