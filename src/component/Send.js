import { NavLink } from 'react-router-dom'
import '../css/Notification.css'
import { useAxios } from '../hooks/useAxios'

export default function Send() {
    const {data} = useAxios('https://smartgit2831.github.io/file_json_instagram/notification.json')
  return (
    <div>
        <div className='flash-notification'>
            <NavLink to={'/Page'}><i className='fa fa-long-arrow-left'></i></NavLink><p>mahdikhashey246</p>
        </div>
        <div className='input-group search'>
            <span className='input-group-text'><i className='fa fa-search'></i></span>
            <input type="text" className='form-control' placeholder='Search'/>
        </div>
        <div className='view-story' style={{display: 'table-cell'}}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfHdjOS--xlgmDeTTgvkfKUYrv2BJaYOLdzQ&s" alt="" /> 
            <p>Your note</p>
        </div>
        <div className='head'>
            <span>Message</span>
            <span>Requests</span>
        </div>
        {data && data.notification.map((e)=>(
            <div className='notification'>
                <img className='img_prof' src={e.img} alt="" />
                <p>{e.send}</p>
                <i className='fa fa-camera'></i>
            </div>
        ))} 
    </div>
    )
}