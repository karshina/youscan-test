import React from 'react'
import { Link } from 'react-router'

import './MainNav.css'

export default function MainNav({ active }) {
  return (
    <div className='App-main-navigation'>
      <ul>
        <li className={active === 'movies' ? 'active' : ''}><Link to="/movies">All Movies</Link></li>
        <li className={active === 'favorites' ? 'active' : ''}><Link to="/favorites">Favorites</Link></li>
      </ul>
      <div className='App-main-navigation'>
      </div>
    </div>
  )
}
