import { useContext, useState } from 'react'
import '../css/Profile.css'
import {useAxios} from '../hooks/useAxios'
import { NavLink } from 'react-router-dom'
import { context } from '../component/Context'

export default function Profile() {
  const [none, setNone] = useState([false, true, true])
  const {name} = useContext(context) 
  const {data} = useAxios('https://smartgit2831.github.io/file_json_instagram/profile-All.json')
  function noning(e){
    setNone(prev=>{
      const newItem = [...prev];
      for(let i=0; i<none.length; i++){
        newItem[i] = true
      }
      newItem[e] = !none[e];
      return newItem;
    })
  }
  return (
    <div>
        <div className='row' style={{marginTop:'7px'}}>
            <div className='col-6'>
                <h3>{name.split('@')[0]}</h3>
            </div>
            <div className='col-6 icon_top'>
                <span><i className='fa fa-lastfm'></i></span>
                <span><i className='fa fa-plus-square-o'></i></span>
                <span><i className='fa fa-reorder'></i></span>
            </div>
            <div className='scroll_bar' style={{justifyContent:'space-between'}}>
              <div className='view-story'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfHdjOS--xlgmDeTTgvkfKUYrv2BJaYOLdzQ&s" alt="" /> 
                <span>+</span>
                <p>Mahdi</p>
              </div>
              <div className='info'>
                <p>12 <span>posts</span></p>
                <p>1332 <span>followers</span></p>
                <p>141 <span>following</span></p>
              </div>
            </div>
        </div>
        <div className='btns'>
          <button className='btn btn-outline-white'>Edit profile</button>
          <button className='btn btn-outline-white'>Share profile</button>
          <span><i className='fa fa-user-o'>+</i></span>
        </div>
        <div className='row profile_font_icon'>
          <div className="col-4" onClick={()=>{noning(0)}}><i className={none[0] ? 'fa fa-th ' : 'fa fa-th border_bottom'}></i></div>
          <div className="col-4" onClick={()=>{noning(1)}}><i className={none[1] ? 'fa fa-film' : 'fa fa-film border_bottom'}></i></div>
          <div className="col-4" onClick={()=>{noning(2)}}><i className={none[2] ?'fa fa-address-book-o': 'fa fa-address-book-o border_bottom'}></i></div>
        </div>
        <div className={none[0] ? "display_none" : "row cursore"}>
          {data && data.profile_All.map((e)=>(
            <>
              {e.image &&<div className="col-4" key={e.id}>
                <NavLink to={`Post/${e.id}`}><img src={e.image} alt="" className='img-fluid small-img'/></NavLink>
              </div>}
              {e.video && <div className='col-4' style={{height:"150px"}}>
                <NavLink to={`Post/${e.id}`}><video className='img-fluid large-video' style={{height: "150px"}}>
                  <source src={e.video} type='video/mp4'/>
                </video></NavLink>
              </div>}
            </>
          ))}
        </div>
        <div className={none[1] ? "display_none" : "row cursore"}>
          {data && data.profile_All.map((e)=>(
            <>
              {e.video && <div className='col-4' style={{height:"100%"}} key={e.id}>
                <NavLink to={`Post/${e.id}`}><video className='img-fluid large-video' >
                  <source src={e.video} type='video/mp4'/>
                </video></NavLink>
              </div>}
            </>
          ))}
        </div>
        <div className={none[2] ? "display_none" : "row cursore"}>
          {data && data.profile_All.map((e)=>(
            <>
              {e.tag && <div className="col-4">
              <NavLink to={`Post/${e.id}`}><img src={e.tag} alt="" className='img-fluid small-img'/></NavLink>
              </div>}
            </>
          ))}
        </div>
    </div>
  )
}
