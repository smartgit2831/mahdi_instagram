import { NavLink } from 'react-router-dom'
import '../css/Story.css'
import {useAxios} from '../hooks/useAxios'
export default function Story() {
 
  const {data} = useAxios('https://smartgit2831.github.io/file_json_instagram/story.json') 
  
  
  return (
    <div>
        <div className='row' style={{marginTop:'7px'}}>
            <div className='col-6'>
                <p style={{fontSize: '16px', fontWeight: 'bold'}}>𝓘𝓷𝓼𝓽𝓪𝓰𝓻𝓪𝓶</p>
            </div>
            <div className='col-6 icon_top'>
                <NavLink to={'/Notification'}><span><i className='fa fa-heart-o'></i></span></NavLink>
                <NavLink to={'/Send'}><span><i className='fa fa-paper-plane-o'></i></span></NavLink>
            </div>
        </div>
        <div className='scroll_bar'>
          <div className='view-story'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfHdjOS--xlgmDeTTgvkfKUYrv2BJaYOLdzQ&s" alt="" /> 
            <span>+</span>
            <p>Your story</p>
          </div>
          {data && data.story.map((e)=>(
            <div className='view-story' key={e.id}>
              <div className={e.story ? "border_story" : ""}>
                {e.story ? (<NavLink to={'/ViewStory'}><img src={e.image} alt="1" /></NavLink>) : (<img src={e.image} alt="1" />)}
              </div>
              <p>{e.name}</p>
            </div>
          ))}
        </div>
    </div>
  )
}
