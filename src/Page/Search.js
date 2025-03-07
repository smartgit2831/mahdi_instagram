import { NavLink } from 'react-router-dom'
import '../css/Search.css'
import { useAxios } from '../hooks/useAxios'
import { useEffect, useRef, useState } from 'react'

export default function Search() {
    const [currentVideo, setCurrentVideo] = useState()
    const videoRef = useRef([])
    const {data} = useAxios('https://smartgit2831.github.io/file_json_instagram/search.json') 
    
    function handlescroll(){
        let foundvideovisible = false;
        videoRef.current.forEach((videoElement, index)=>{
            if(videoElement){
                const rect = videoElement.getBoundingClientRect();
                const visible =  rect.top < window.innerHeight && rect.bottom > 0;
                if(visible && !foundvideovisible){
                    setCurrentVideo(index)
                    foundvideovisible = true
                }
            }
        })
        if(!foundvideovisible){
            setCurrentVideo(null)
        }
    }
    useEffect(()=>{
        window.addEventListener('scroll', handlescroll)
        return()=>{
            window.removeEventListener('scroll', handlescroll)
        }
    },[])

    useEffect(()=>{
        videoRef.current.forEach((videoElement, index)=>{
            if(videoElement){
                
                if(currentVideo === index){
                    videoElement.play()
                }else{
                    videoElement.pause()
                }
            }
        })
    },[currentVideo])
    return ( 
    <div className='container row'>
        <div className='input-group search'>
            <span className='input-group-text'><i className='fa fa-search'></i></span>
            <input type="text" className='form-control' placeholder='Search'/>
        </div>
        {data && data.Search.map((e, idex)=>(
            <div className={`row ${idex % 2 === 0 ? 'direction' : ''}`} key={e.id}>
                <div className='col-6'>
                    {e.image && <NavLink to={`/Explor/${e.id}`}><img src={e.image} alt="" className='img-fluid large-img'/></NavLink>}
                    {e.video && 
                    <div>
                        <NavLink to={`/Explor/${e.id}`}><video ref={(el)=>videoRef.current[idex] = el} autoPlay muted className='img-fluid large-video' style={{height:'300px'}}>
                            <source src={e.video} type='video/mp4'/>
                        </video></NavLink>
                    </div>
                    }
                </div>
                <div className='col-6'>
                    <div className='row'>
                        {e.array_image.map((f)=>(
                            <div className='col-6' key={f.id}>
                                <NavLink to={`/Explor/${f.id}`}><img src={f.image} alt="" className='img-fluid small-img'/></NavLink>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ))}
    </div> 
  )
}
