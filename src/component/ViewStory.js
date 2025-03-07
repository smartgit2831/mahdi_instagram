import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import '../css/Reels.css'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../css/style.css';
import { Keyboard, Navigation, Pagination } from 'swiper/modules';
import { useAxios } from '../hooks/useAxios';

export default function Reels() {
  const [index , setIndex] = useState(0)
  const [fade, setFade] = useState(true)
  const [progress, setProgress] = useState(0)
  const swiperRef = useRef(null)
  const [n, setN] = useState(0)
  const [array_sound, setArray_sound] = useState([])
  const [array_heart, setArray_heart] = useState([])

  const {data} = useAxios('https://smartgit2831.github.io/file_json_instagram/post_home.json')

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
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 100 : prev+2))        
    }, 100);
    return ()=> clearInterval(interval)
  }, [progress])

  useEffect(()=>{
    if(progress >= 100){
      if(swiperRef.current && swiperRef.current.swiper){
        swiperRef.current.swiper.slideNext()
        setProgress(0)
      }
    }
  },[progress])


  useEffect(()=>{
    if(data && data){
      if(n < 1){
        for (let i = 0; i < data.length; i++) {
          setArray_sound(prev => [...prev, true]) 
          setArray_heart(prev => [...prev, true])           
        }
        setN(n+1)
      }
    }
  },[n, data])

  function handelslidechange(swiper) {
    const active = swiper.slides[swiper.activeIndex]
    const imageid = active.getAttribute('data-id')
    sendimageid(imageid)
  }
  function sendimageid(idex){
    setArray_sound(prev =>{
      for(let i=0; i<array_sound.length; i++){
          if(array_sound[i] !== array_sound[idex]){
              array_sound[i] = true
          }
      }
      const newitem = [...prev];
      newitem[idex] = !newitem[idex];
      return newitem;
    })
    setProgress(0)
  }
  function Heart(e){
    setArray_heart((pre)=>{
        const newitem = [...pre];
        newitem[e] = !newitem[e];
        return newitem;
    })
  }
  return (
    <div>
      <Swiper
        ref={swiperRef}
        onSlideChange={(swiper)=>handelslidechange(swiper)}
        slidesPerView={1}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        touchRatio={1} simulateTouch={true}
        pagination={false} navigation={false} modules={[Keyboard,Navigation,Pagination]}
        // pagination={{
        //   clickable: true,
        // }}
        // navigation={true}
        // modules={[Keyboard, Pagination, Navigation]}
        className="mySwiper"
      >
        {data && data.post_home.map((e, idex)=>(
          <SwiperSlide data-id = {`${idex}`} key={e.id}>
          <div className='row'>
            <div className='body_post'>
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
                        <span><i className='fa fa-ellipsis-v'></i></span>
                    </div>
                </div>
            </div>
            <div className='image_org'>
                <div className='progress-bar' style={{width:`${progress}%`}}></div>
                <div className='parde'></div>
                {e.image && <img className='image_reels' src={e.image} alt="" />}
                {e.video && 
                    <div>
                        <video autoPlay muted={array_sound[idex]} style={{height:"557px", width:"367px"}}>
                            <source src={e.video} type='video/mp4'/>
                        </video>
                    </div>
                }
            </div>
            <div className='div_bottom_Reels'>
              <span><i className='fa fa-comment-o'></i></span>
              <input type="text" placeholder='Message'/>
              <span onClick={()=>{Heart(idex)}}><i className={array_heart[idex] ? "fa fa-heart" : "fa fa-heart-o"}></i></span>
              <span><i className='fa fa-paper-plane-o'></i></span>
            </div>
        </div>

        </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
