import React from 'react'
import {Link, useParams} from  'react-router-dom';
import { useEffect,useState } from "react"
import roundTo from "./helpers.js"


const Feature = () => {

    const [feature, setfeature] = useState()
    const [comments, setComments] = useState()
    const {featureId} = useParams()
    const [text, setText] = useState("")

    
    const onFormSubmit = (e) => {
      e.preventDefault()    

      fetch(`http://localhost:3000/api/features/${featureId}/comments`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({feature_id: featureId, 
          body: text})
      }).then(res => {res.json()
        
        fetch(`http://127.0.0.1:3000/api/features/${featureId}`).then(res => {
          
          setText("")
      return res.json()
    })
      .then(data => {
        setComments(data.comments)
      })}
    )
        .then(res => {
          
        });

        //Clear text area
        e.target.reset()     
    }



    useEffect(()=>{
      fetch(`http://127.0.0.1:3000/api/features/${featureId}`).then(res => {
        
        return res.json()
      })
        .then(data => {
          setComments(data.comments)
          setfeature(data.data)
        })
    }, [])

  const EarthquakeRows = feature && [
      ["Feature ID",  featureId],
      ["Type", feature.type1],
      ["Magnitude", roundTo(feature.magnitude, 2)],
      ["Latitude", roundTo(feature.latitude, 2)],
      ["Longitude", roundTo(feature.longitude, 2)],
      ["Magnitude Type", feature.mag_type]
  ]    

  return (
    <div className='max-w-[1000px]  mx-auto mt-4 '>

      <h1 className='py-4 text-2xl font-bold mx-4 text-center'>Earthquake</h1>
        {feature &&
        <div className=''>
              <table className=' text-left mx-auto md:mx-4 '>
                <tbody>
              {EarthquakeRows.map((row, index) => (
                <tr key={index} className="border [&>*]:p-4"><td className='font-bold w-[200px]'>{row[0]}</td><td>{row[1]}</td></tr>
    
              ))}
                </tbody>
            </table>
            <hr className='mx-auto mt-16 w-[80%]'></hr>
        </div>
    }
      <br/> <br/>
      <div className='text-left p-3 '>
        <h2 className='font-bold text-2xl text-center sm:text-left'>Comments: </h2>
        {comments && comments.map((comment, index) => <div className='mt-4 py-2 '>
          <div key={index}>
            <p>{comment.body}</p>
            <span className='italic ml-auto text-[0.8rem]'> 
            {(comment.created_at)}</span>
            
          </div>
        </div>
        ) }</div> 
        
      <form className='text-center lg:text-left px-2'
        onSubmit={(e) => onFormSubmit(e)
        }
        
      >
        <textarea required className='border border-gray-400 mt-5 w-[380px] h-[130px] p-1'
         
          onChange={(e)=>setText(e.target.value)}
         ></textarea>

          <div>
            <button className='bg-blue-700 text-white w-[380px] py-2 mt-2 border rounded-md'>
                Comment</button>
          </div>
      </form>
    
      <br/>
      
    </div>
  )
}

export default Feature