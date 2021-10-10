import React from 'react'
import coronavirus from '../../../assets/coronavirus.svg'
import './Header.css'

export default function Header() {
    return (
        <header className="header" id="header">
            <div className="header_toggle"> <i className='bx bx-menu' id="header-toggle"></i> </div>
            <div> Ministry of Health X UTech COVID-19 ES</div>
            <div className="header_img"> <img src={coronavirus} alt=""/></div>
        </header>
    )
}
