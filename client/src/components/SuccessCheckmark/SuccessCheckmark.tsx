import React from 'react'

import './SuccessCheckmark.scss'

const SuccessCheckmark = () => {
    return (
        <div className='success-checkmark'>
            <svg
                version='1.1'
                id='Layer_1'
                xmlns='http://www.w3.org/2000/svg'
                xmlnsXlink='http://www.w3.org/1999/xlink'
                x='0px'
                y='0px'
                viewBox='0 0 161.2 161.2'
                enableBackground='new 0 0 161.2 161.2'
                xmlSpace='preserve'
            >
                <circle
                    className='success-checkmark__circle'
                    fill='none'
                    stroke='#33b057'
                    strokeWidth='7'
                    strokeMiterlimit='10'
                    cx='80.6'
                    cy='80.6'
                    r='62.1'
                />
                <polyline
                    className='success-checkmark__icon'
                    fill='none'
                    stroke='#33b057'
                    strokeWidth='7'
                    strokeLinecap='round'
                    strokeMiterlimit='10'
                    points='113,52.8 74.1,108.4 48.2,86.4'
                />
            </svg>
        </div>
    )
}

export default SuccessCheckmark