import { NavLink } from 'react-router-dom'
import '../css/Notification.css'
import { useAxios } from '../hooks/useAxios'

export default function Notification() {
    const {data} = useAxios('https://smartgit2831.github.io/file_json_instagram/notification.json')

  return ( 
    <div>
        <div className='flash-notification'>
            <NavLink to={'/Page'}><i className='fa fa-long-arrow-left'></i></NavLink><p>Notification</p>
        </div>
        <div className='new'>
            <p>New</p>
        </div>
        {data && data.notification.map((e)=>(
            <div className='notification'>
                <img className='img_prof' src={e.img} alt="" />
                <p><span>{e.name}</span> {e.detail}</p>
                {e.button && <button className='btn btn-primery'>{e.button}</button>}
                {e.image && <img className='img_notif' src={e.image} alt={e.name}/>}
            </div>
        ))}
    </div>
  )
}
