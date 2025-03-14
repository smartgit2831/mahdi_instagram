import React, { useEffect, useRef, useState } from 'react'
import { useAxios } from '../hooks/useAxios'
import { useParams } from 'react-router-dom'
import axios from 'axios'
// import '../../public/aa.png'

export default function Explore() {
    const [index , setIndex] = useState(0)
    const [fade, setFade] = useState(true)
    const [mark, setMark] = useState([])
    const [mar, setMar] = useState(true)
    const [menuOpen, setMenuOpen] = useState(false)
    const [isMore, setIsMore] = useState([])
    const [oniMore, setOniMore] = useState(true)
    const [count, setCount] = useState(0)
    const [array_sound, setArray_sound] = useState([])
    const [post, setPost] = useState()
    const [array_heart, setArray_heart] = useState([])
    const [array_hear, setArray_hear] = useState(true)
    const [sounding, setSounding] = useState(true)
    const [currentVideo, setCurrentVideo] = useState(null)
    const [error, setError] = useState()

    const {id} = useParams()
    const videoRef = useRef([])

    useEffect(()=>{ 
        async function getdata(){
            await axios.get('https://smartgit2831.github.io/file_json_instagram/explor.json')
                .then((respon)=>{setPost(respon.data)})
                .catch((er)=>{setError(er.message)})
        }
        getdata()
    },[id])
    const {data} = useAxios('https://smartgit2831.github.io/file_json_instagram/post_home.json')
    
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
            if(count<1){
                for(let i=0; i<data.length; i++){
                    setIsMore(prevItem => [...prevItem,data[i].isMore])
                    setMark((prev) => [...prev, true])
                    setArray_heart(prev => [...prev, true])
                    setArray_sound(prev => [...prev, true])            
                }
                setCount(count +1)
            }
        }
    },[count ,data])
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
    function sound_post(){
        setSounding(!sounding)
    }
    function bookmark(id){
        if(id){
            setMark((prev)=>{
                const newArray = [...prev];
                newArray[id] = !newArray[id]
                return newArray;
            })
        }
    }
    function bookmar(){
        setMar(!mar)
    }
    function Heart(e){
        setArray_heart((pre)=>{
            const newitem = [...pre];
            newitem[e] = !newitem[e];
            return newitem;
        })
    }
    function Hear(){
        setArray_hear(!array_hear)
    }

    const More =(e)=>{
        setIsMore(prev=>{
            const newItem = [...prev];
            newItem[e] = !newItem[e];
            return newItem;
        })
    }
    const onMore =(e)=>{
        setOniMore(!oniMore)
    }

    function openMenu(){
        setMenuOpen(!menuOpen)
    }
  return (
    <div> 
        {error && error}
        {menuOpen && (
            <div className='overlay' id='overlay'  onClick={()=>{openMenu()}}>
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



        
        {post && 
        <><div className='row'>
            <div className='body_post'>
                <div className='col-6 icon'>
                    <div className='icon'>
                        <img src={post.explor[id].profile} alt="" />
                        <div className='text'>
                            <p>{post.explor[id].name}</p>
                            <p className={`effect ${fade ? "fade-in" : "fade-out"}`}>{post.explor[id].action[0]}</p>
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
                {post.explor[id].image && <img src={post.explor[id].image} alt="" />}
                {post.explor[id].video && 
                    <div>
                        <video autoPlay muted={sounding} style={{height:"400px", width:"367px"}}>
                            <source src={post.explor[id].video} type='video/mp4'/>
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
                        {post.video && <i onClick={()=>{sound_post()}} className={ sounding ? 'fa fa-volume-off sound' : 'fa fa-volume-up sound'}></i>}
                    </div>
                </div>
            </div>
        </div>
        <div className='row items'>
            <div className='col-8 item_left'>
                <span onClick={()=>{Hear()}}><i className={array_hear ? "fa fa-heart-o" : "fa fa-heart"}></i><span>{post.explor[id].like}k</span></span>
                <span><i className='fa fa-comment-o'></i><span>{post.explor[id].comment}k</span></span>
                <span><i className='fa fa-paper-plane-o'></i><span>{post.explor[id].send}k</span></span>
            </div>
            <div className='col-4 item_right'>
                <span onClick={()=>{bookmar()}}><i className={mar ? 'fa fa-bookmark-o' : 'fa fa-bookmark'}></i></span>
            </div>
        </div>
        <div className='text'>
            <span className='title'>{post.explor[id].name}</span>
            <span>{oniMore ? post.explor[id].detail.slice(0,18) : post.explor[id].detail.slice(0,post.explor[id].detail.length)}</span><span className={oniMore ? 'word_more' : 'display_none'} onClick={()=>{onMore(post.explor[id].id)}}>more...</span>
            <p>{post.explor[id].date}<span>See translation</span></p>
        </div>
        </>}


        {data && data.post_home.map((e, idex)=>(
        <>
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
                        <button className='btn btn-outline-white'>Follow</button>
                        <span onClick={()=>{openMenu()}}><i className='fa fa-ellipsis-v'></i></span>
                    </div>
                </div>
            </div>
            <div className='image_org'>
                <div className='parde'></div>
                {e.image && <img src={e.image} alt="" />}
                {e.video && 
                    <div>
                        <video ref={(el) => videoRef.current[idex] = el}  autoPlay muted={array_sound[idex]} style={{height:"400px", width:"367px"}}>
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
        <div className='row items'>
            <div className='col-8 item_left'>
                <span onClick={()=>{Heart(idex)}}><i className={array_heart[idex] ? "fa fa-heart" : "fa fa-heart-o"}></i><span>{e.like}k</span></span>
                <span><i className='fa fa-comment-o'></i><span>{e.comment}k</span></span>
                <span><i className='fa fa-paper-plane-o'></i><span>{e.send}k</span></span>
            </div>
            <div className='col-4 item_right'>
                <span onClick={()=>{bookmark(idex)}}><i className={mark[idex] ? 'fa fa-bookmark' : 'fa fa-bookmark-o'}></i></span>
            </div>
        </div>
        <div className='text'>
            <span className='title'>{e.name}</span>
            <span>{isMore[idex] ? e.detail.slice(0,e.detail.length) : e.detail.slice(0,18)}</span><span className={isMore[idex] ? 'display_none' : 'word_more'} onClick={()=>{More(e.id)}}>more...</span>
            <p>{e.date}<span>See translation</span></p>
        </div>
        </>))}
    </div>
  )
}
