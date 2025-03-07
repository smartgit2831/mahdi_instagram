import { NavLink } from 'react-router-dom'
import '../css/Footer.css'

export default function Footer() {

  return ( 
    <div className='footer'>
        <NavLink to={'/Page'}><span><i className='glyphicon glyphicon-home'></i></span></NavLink>
        <NavLink to={'/search'}><span><i className='fa fa-search'></i></span></NavLink>
        <span><i className='fa fa-plus-square-o'></i></span>
        <NavLink to={'/Reels'}><span><i className='fa fa-film'></i></span></NavLink>
        <NavLink to={'/Profile'}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfHdjOS--xlgmDeTTgvkfKUYrv2BJaYOLdzQ&s" alt="" /></NavLink>
    </div>
  )
}
