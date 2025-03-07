import { useRef, useState } from 'react';
import '../css/Body.css'
import { useEffect } from 'react';
import { useAxios } from '../hooks/useAxios';

export default function Body() {
    const [index , setIndex] = useState(0)
    const [fade, setFade] = useState(true)
    const [array_mark, setArray_mark] = useState([])
    const [array_heart, setArray_heart] = useState([])
    const [menuOpen, setMenuOpen] = useState(false)
    const [startY, setStartY] = useState(null)
    const [currentY, setCurrentY] = useState(null)
    const [isMore, setIsMore] = useState([])
    const [n, setN] = useState(0)
    const [array_sound, setArray_sound] = useState([])
    const [currentVideo, setCurrentVideo] = useState(null)
    const{data} = useAxios('https://smartgit2831.github.io/file_json_instagram/post_home.json')
    const videoRef = useRef([])
    
    const handelscroll = ()=>{
        let foundVisibleVideo = false;
        videoRef.current.forEach((videoElement, index)=>{
            if(videoElement){
                const rect = videoElement.getBoundingClientRect()
                const isvisible = rect.top >= 0 && rect.bottom <= window.innerHeight
                if(isvisible && !foundVisibleVideo){
                    setCurrentVideo(index)
                    foundVisibleVideo=true
                }
            }
        })
        if(!foundVisibleVideo){
            setCurrentVideo(null)
        }
    }

    useEffect(()=>{
        window.addEventListener('scroll', handelscroll)
        return() =>{
            window.removeEventListener('scroll', handelscroll)
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

    useEffect(()=>{
        const interval = setInterval(()=>{
            setFade(false)
            setTimeout(() => {
                setIndex((prevent) => (prevent+1) % 2);
                setFade(true)
            }, 500);
        }, 4000)
        return () =>clearInterval(interval);
    },[index])

    useEffect(()=>{
        if(data && data){
            if(n < 1){
                for (let i = 0; i < data.length; i++) {
                    setIsMore(prevItem => [...prevItem,data[i].isMore])
                    setArray_sound(prev => [...prev, true]) 
                    setArray_heart(prev => [...prev, true])
                    setArray_mark(prev=> [...prev, true])           
                }
                setN(n+1)
            }
        }
    },[n ,data]) 
    
    function sound(e){

        setArray_sound(prev =>{
            for(let i=0; i<array_sound.length; i++){
                if(array_sound[i] !== array_sound[e]){
                    array_sound[i] = true
                }
            }
            const newitem = [...prev];
            newitem[e] = !newitem[e];
            return newitem;
        })
    }
    function bookmark(e){
        setArray_mark((prev)=>{
            const newitem = [...prev];
            newitem[e] = !newitem[e];
            return newitem;
        })
    }
    function Heart(e){
        setArray_heart((pre)=>{
            const newitem = [...pre];
            newitem[e] = !newitem[e];
            return newitem;
        })
    }

    const More =(e)=>{
        setIsMore(prev=>{
            const newItem = [...prev];
            newItem[e] = !newItem[e];
            return newItem;
        })
    }
    function openMenu(){
        setMenuOpen(!menuOpen)
    }
    function handelTouchStart(event){
        setStartY(event.touches[0].clientY)
    }
    function handelTouchMove(event){
        setCurrentY(event.touches[0].clientY)
    }
    function handelTouchEnd(){
        if(currentY - startY > 50){
            setMenuOpen(false)
        }
        setStartY(null)
        setCurrentY(null)
    }

  return (
      <div>
        {menuOpen && (
            <div className='overlay' id='overlay'
                onClick={()=>{openMenu()}}
                onTouchStart={handelTouchStart}
                onTouchMove={handelTouchMove}
                onTouchEnd={handelTouchEnd}
                style={{
                    transform: currentY && startY ? `translateY(${currentY - startY}px)` : 'translateY(0)',
                    transition: 'transform 0.3s ease'
                }}
            >
                <div className="menu">
                    <div className="menu-handel"></div>
                    <div className='row more'>
                        <div className="col-4 size">
                            <span><i className='fa fa-bookmark-o'></i></span>
                            <p>Save</p>  
                        </div>
                        <div className="col-4 size">
                            <span><i className='fa fa-plus-square-o'></i></span>
                            <p>Remix</p>  
                        </div>
                        <div className="col-4 size">
                            <span><i className='fa fa-qrcode'></i></span>
                            <p>QR code</p>  
                        </div>
                    </div>
                    <div className='body_matn border'>
                        <p><i className='fa fa-star-o'></i>Add to favorites</p>
                        <p><i className='fa fa-user-o'></i>Unfollow</p>
                    </div>
                    <div className='body_matn'>
                        <p><i className='fa fa-exclamation-circle'></i>Add to favorites</p>
                        <p><i className='fa fa-eye-slash'></i>Hide</p>
                    </div>
                    <div className='body_matn'>
                        <p><i className='fa fa-user-circle'></i>About this account</p>
                        <p style={{color:'red'}}><i className='fa fa-warning'></i>Report</p>
                    </div>
                </div>   
            </div>
        )}
        {data && data.post_home.map((e, idex)=>(
        <div key={e.id}>
        <div className='row'>
            <div className='body_post' key={e.id}>
                <div className='col-6 icon'>
                    <div className='icon'>
                        <img src={e.profile} alt="" />
                        <div className='text'>
                            <p>{e.name}</p>
                            <p className={`effect ${fade ? "fade-in" : "fade-out"}`}>{e.action[index]}</p>
                        </div>
                    </div>
                </div>
                <div className='col-6 follow'>
                    <div className='follow'>
                        <button className='btn btn-outline-white'>Follow</button>
                        <span onClick={()=>{openMenu()}}><i className='fa fa-ellipsis-v'></i></span>
                    </div>
                </div>
            </div>
            <div className='image_org'>
                <div className='parde'></div>
                {e.image && <img src={e.image} alt="" />}
                {e.video && 
                    <div className={`video-${idex}`}>
                        <video ref={(el)=>{videoRef.current[idex] = el}} autoPlay muted={array_sound[idex]} style={{height:"400px", width:"367px"}}>
                            <source src={e.video} type='video/mp4'/>
                        </video>
                    </div>
                }
            </div>
            <div className='body_post'>
                <div className='col-6 icon_bottom_one'>
                    <div>
                        <div className=' icon_bottom_body'>
                            <i className='fa fa-user user'></i>
                        </div>
                    </div>
                </div>
                <div className='col-6 icon_bottom_two'>
                    <div className='follow icon_bottom_body'>
                        {e.video && <i onClick={()=>{sound(idex)}} className={ array_sound[idex] ? 'fa fa-volume-off sound' : 'fa fa-volume-up sound'}></i>}
                    </div>
                </div>
            </div>
        </div>
        <div className='row items' >
            <div className='col-8 item_left'>
                <span onClick={()=>{Heart(idex)}}><i className={array_heart[idex] ? "fa fa-heart" : "fa fa-heart-o"}></i><span>{e.like}k</span></span>
                <span><i className='fa fa-comment-o'></i><span>{e.comment}k</span></span>
                <span><i className='fa fa-paper-plane-o'></i><span>{e.send}k</span></span>
            </div>
            <div className='col-4 item_right'>
                <span onClick={()=>{bookmark(idex)}}><i className={array_mark[idex] ? 'fa fa-bookmark' : 'fa fa-bookmark-o'}></i></span>
            </div>
        </div>
        <div className='text' >
            <span className='title'>{e.name}</span>
            <span>{isMore[idex] ? e.detail.slice(0,e.detail.length) : e.detail.slice(0,18)}</span><span className={isMore[idex] ? 'display_none' : 'word_more'} onClick={()=>{More(e.id)}}>more...</span>
            <p>{e.date}<span>See translation</span></p>
        </div>
        </div>))}
    </div>
  )
}
