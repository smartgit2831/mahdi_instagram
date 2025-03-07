import axios from "axios"
import { useEffect, useState } from "react"

export const useAxios = (url)=> {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)    

    useEffect(()=>{
      async function sendData(){
        await axios.get(url)
          // .then((response)=>{setLoading(true); setData(response.data); setLoading(false)})
          .then((response)=>{
            setLoading(true);
            // let sortedData = response.data.sort(() => Math.random() - 0.5)
            // console.log(sortedData) 
            setData(response.data);
            setLoading(false)})
          .catch((er)=>{setError(er.message)})
      }
      sendData()
    },[url,data])
          
    function postAxios(id, title, price, src, length, width, height, detail, name){
      axios.post(url,{
        id: id,
        title: title,
        price: price, 
        src: src, 
        length: length, 
        width: width, 
        height: height, 
        detail: detail, 
        name: name
      }) 
    }

    function deleteAxios(url){
      axios.delete(url)
    }
    function EditAxios(title, price, src, length, width, height, detail, name){
      axios.put(url,{
        title: title,
        price: price, 
        src: src, 
        length: length, 
        width: width, 
        height: height, 
        detail: detail, 
        name: name
      })
    }

  return {data, error, loading, postAxios, deleteAxios, EditAxios}
}