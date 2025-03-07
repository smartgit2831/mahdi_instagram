import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function Post() {
    const [index , setIndex] = useState(0)    
    const [fade, setFade] = useState(true)
    const [data, setData] = useState()
    const [mark, setMark] = useState(true)
    const [heart, setArray_heart] = useState(true)
    const [menuOpen, setMenuOpen] = useState(false)
    const [oniMore, setOniMore] = useState(true)
    const [sounding, setSounding] = useState(true)
    const [error, setError] = useState()
    

    const {id} = useParams()
    useEffect(()=>{
        async function getdata(){
            await axios.get('https://smartgit2831.github.io/file_json_instagram/profile-All.json')
                .then((respon)=>{setData(respon.data)})
                .catch((er)=>{setError(er.message)})
        }
        getdata()
    },[id])
    console.log(data && data.profile_All[id])
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
 

    function sound_post(){
        setSounding(!sounding)
    }
    function bookmark(){
        if(mark === true){
            setMark(false)
        }else{
            setMark(true)
        } 
    }
    function Heart(e){
        setArray_heart(!heart)
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
        {data && 
        <><div className='row'>
            <div className='body_post'>
                <div className='col-6 icon'>
                    <div className='icon'>
                        <img src={data.profile_All[id].profile} alt="" />
                        <div className='text'>
                            <p>{data.profile_All[id].name}</p>
                            <p className={`effect ${fade ? "fade-in" : "fade-out"}`}>{data.profile_All[id].action[0]}</p>
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
                {data.profile_All[id].image && <img src={data.profile_All[id].image} alt="" />}
                {data.profile_All[id].video && 
                    <div>
                        <video autoPlay muted={sounding} style={{height:"400px", width:"367px"}}>
                            <source src={data.profile_All[id].video} type='video/mp4'/>
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
                        {data.video && <i onClick={()=>{sound_post()}} className={ sounding ? 'fa fa-volume-off sound' : 'fa fa-volume-up sound'}></i>}
                    </div>
                </div>
            </div>
        </div>
        <div className='row items'>
            <div className='col-8 item_left'>
                <span onClick={()=>{Heart()}}><i className={heart ? 'fa fa-heart-o' : 'fa fa-heart'}></i><span>{data.profile_All[id].like}k</span></span>
                <span><i className='fa fa-comment-o'></i><span>{data.profile_All[id].comment}k</span></span>
                <span><i className='fa fa-paper-plane-o'></i><span>{data.profile_All[id].send}k</span></span>
            </div>
            <div className='col-4 item_right'>
                <span onClick={()=>{bookmark()}}><i className={mark ? 'fa fa-bookmark-o' : 'fa fa-bookmark'}></i></span>
            </div>
        </div>
        <div className='text'>
            <span className='title'>{data.profile_All[id].name}</span>
            <span>{oniMore ? data.profile_All[id].detail.slice(0,18) : data.profile_All[id].detail.slice(0,data.profile_All[id].detail.length)}</span><span className={oniMore ? 'word_more' : 'display_none'} onClick={()=>{onMore(data.profile_All[id].id)}}>more...</span>
            <p>{data.profile_All[id].date}<span>See translation</span></p>
        </div>
        </>}
    </div>
  )
}
