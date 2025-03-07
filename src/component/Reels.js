import React, { useCallback, useEffect, useRef, useState } from 'react'
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../css/Reels.css'
import { Pagination } from 'swiper/modules';
import { useAxios } from '../hooks/useAxios';

export default function ViewStory() {
  const [index , setIndex] = useState(0)
  const [fade, setFade] = useState(true)
  const [n, setN] = useState(0)
  const [array_sound, setArray_sound] = useState([])
  const [array_heart, setArray_heart] = useState([])
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState([]);
  
  const {data} = useAxios('https://smartgit2831.github.io/file_json_instagram/post_home.json')
  const swiperRef = useRef(null)
  const videoRefs = useRef([])
  

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
          setArray_sound(prev => [...prev, true]) 
          setArray_heart(prev => [...prev, true])  
          setProgress(prev =>[...prev, 0]);         
        }
        setN(n+1)
      }
    }
  },[n ,data])

  
  const sendimageid = useCallback((id)=>{
    setArray_sound(prev =>{
      const updateedArray = [...prev]
      for(let i=0; i<updateedArray.length; i++){
        if(updateedArray[i] !== updateedArray[id]){
          updateedArray[i] = true
        }
      }
      updateedArray[id] = !updateedArray[id]
      return updateedArray;
    })
  },[]) 
 
  const handleSlideChangeTransitionStart = useCallback(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
      }
    });
  }, []);
  const handelslidechange = useCallback((swiper) => {
    const activeIndex = swiper.activeIndex;
    const videoElement = videoRefs.current[activeIndex];
    if (videoElement) {
      videoElement.currentTime = 0;
      setDuration(0)
      setTimeout(() => {
        videoElement.play();
      }, 100); 
      setDuration(videoElement.duration);
    }
    sendimageid(activeIndex)
  },[sendimageid])


  const Heart = useCallback((id)=>{
    setArray_heart((pre)=>{
    const updateedArray = [...pre];
    updateedArray[id] = !updateedArray[id];
    return updateedArray;
  })},[])


  const handleLoadedMetadata = (id) =>{
    // setDuration(0)
    const videoElement = videoRefs.current[id]
    // console.log(videoElement) 
    setDuration(videoElement && videoElement.duration)
    if (videoElement) {
      setProgress((prevProgress) => {
        const updatedProgress = [...prevProgress];
        updatedProgress[id] = (videoElement.currentTime / videoElement.duration) * 100;
        return updatedProgress;
      });
    }
  }
  const handelTimeUpdate = useCallback((id) =>{
    const videoElement = videoRefs.current[id];
    if (videoElement) {
      setProgress((prevProgress) => {
        const updatedProgress = [...prevProgress];
        updatedProgress[id] = (videoElement.currentTime / videoElement.duration) * 100;
        return updatedProgress;
      });
    } 
  },[])
  useEffect(()=>{
    const interval = setInterval(() => {
      setDuration((prev)=>(prev <= 0 ? 0 : prev-1))
    }, 1000)
    return () => clearInterval(interval)
  },[])

  return (
    <div>
      <Swiper
        direction={'vertical'}
        ref={swiperRef}
        onSlideChange={(swiper)=>handelslidechange(swiper)}
        onSlideChangeTransitionStart={handleSlideChangeTransitionStart}
        pagination={false}
        modules={[Pagination]}
        className="mySwiper"
        style={{height:'80vh'}}
      >
        {data && data.post_home.map((e, idex)=>(
          <SwiperSlide data-id = {`${idex}`} key={e.id}>
            <div className='row' >
              <div className='body_post'>
                <div className='col-6 icon'>
                  <div className='dropdown'>
                    <button className='btn btn-primery dropdown-toggle m-auto' data-bs-toggle='dropdown'>Reels</button>
                    <ul className='dropdown-menu'>
                      <li><i className='fa fa-users'></i>Following</li>
                      <li><i className='fa fa-map-marker'></i>Nearby</li>
                      <li><i className='fa fa-commenting'></i>Notes</li>
                    </ul>
                  </div> 
                </div>
                <div className='col-6 follow'>
                  <div className='follow' style={{right:'71px'}}>
                    <span><i className='fa fa-camera'></i></span>
                  </div>
                </div>
              </div>
                <div className='image_org'>
                    <div className='parde'></div>
                    {e.image && <img className='image_reels' src={e.image} alt="" />}
                    {e.video && 
                      <div>
                        <video ref={el => videoRefs.current[idex] = el} onLoadedMetadata={()=>handleLoadedMetadata(idex)} onTimeUpdate={()=> handelTimeUpdate(idex)} muted={array_sound[idex]} style={{height:"557px", width:"367px"}}>
                          <source src={`${e.video}`} type='video/mp4'/>
                        </video>
                        <div style={{width : `${progress[idex]}%`, height:'10px', background:'#9c9595', maxWidth:'97%'}}></div> 
                        <div style={{position:'absolute', color:'#3e3e3e', right:'0', bottom:'0'}}>{Math.round(duration)}</div>
                      </div>
                    }
                </div>
                <div className='body_post'>
                  <div className='col-8 icon_bottom_one'>
                    <div>
                      <div className=' icon_bottom_body'>
                        <div className='icon' style={{top:'-77px'}}>
                          <img src={e.profile} alt="" />
                          <div className='text col-8'>
                            <p>{e.name}</p>
                            <p className={`effect ${fade ? "fade-in" : "fade-out"}`}>{e.action[index]}</p>
                          </div>
                          <div className='follow col-4'>
                            <button className='btn btn-outline-white' style={{left:'100px'}}>Follow</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-4 icon_bottom_two' style={{marginTop:'-44%', left:'58%'}}>
                    <div className='follow icon_bottom_body'>
                      <div className='col-8 item_left item_left_reels'>
                        <p onClick={()=>{Heart(idex)}}><i className={array_heart[idex] ? "fa fa-heart fontP" : "fa fa-heart-o fontP"} style={{paddingLeft: '0px'}}></i></p><p>{e.like}k</p>
                        <p><i className='fa fa-comment-o fontP'></i></p><p>{e.comment}k</p>
                        <p><i className='fa fa-paper-plane-o fontP'></i></p><p>{e.send}k</p>
                        <p><i className='fa fa-ellipsis-v fontP' style={{marginLeft:'59%'}}></i></p>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </SwiperSlide>
        ))} 
      </Swiper>
    </div>
  )
}
