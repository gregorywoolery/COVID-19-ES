import React from 'react';
import { Link } from 'react-router-dom';
import './Sidenav.css';
import coronavirus from '../../../assets/coronavirus.svg'
import book from '../../../assets/book.svg';
import patient from '../../../assets/high-fever.svg';
import analytics from '../../../assets/analytics.svg';

export default function SideNav() {
    return (
        <div className="l-navbar" id="nav-bar">
            <nav className="nav">
                <div> 
                    <div href="#" className="nav_logo"></div>
                    <div className="nav_list"> 
                        <Link to='/' className="nav_link">
                            <img src={book} alt="" className="nav_icon"/>
                            <span className="nav_name">Add Facts</span>                             
                        </Link>
                        <Link to='/' className="nav_link">
                            <img src={coronavirus} alt="" className="nav_icon"/>
                            <span className="nav_name">Variant</span> 
                        </Link>
                        <Link to='/' className="nav_link">
                            <img src={patient} alt="" className="nav_icon"/>
                            <span className="nav_name">Diagnose Patient</span> 
                        </Link>
                        <Link to='/' className="nav_link">
                            <img src={analytics} alt="" className="nav_icon"/>
                            <span className="nav_name">Statistics</span> 
                        </Link>
                    </div>
                </div> 
            </nav>
        </div>
    )
}
