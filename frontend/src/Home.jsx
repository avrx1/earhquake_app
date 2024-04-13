import { useEffect,useState } from "react"
import { useNavigate ,useSearchParams, Link } from "react-router-dom";


const Home = () => {

  const [features, setFeatures] = useState([])
  const [pages, setPages] = useState(0)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams(); 
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);
 
  
  useEffect(()=>{
    setCurrentPage(Number(searchParams.get("page")) || 1)
    fetch(`http://127.0.0.1:3000/api/features?page=${currentPage}`).then(res => {
      return res.json()
    })
      .then(data => {
        setFeatures(data.data)
        setPages(data.total_pages)
      })
  }, [currentPage])

  return <div className="w-full">
    <div >

    <h1 className="text-center text-[2.3rem] py-4 font-bold" >
      Earthquakes
    </h1>
    <table className="max-w-[900px] w-[95%] mx-auto table-fixed">
      <thead className="border text-left h-[64px]">
        <tr>
        <th className="px-2 w-[15%]">Feature ID</th>
        <th  className="hidden lg:table-cell py-2 w-[12%]">Magnitude</th>
        <th className="hidden md:table-cell w-[10%]">Latitude</th>
        <th className="hidden md:table-cell w-[10%]">Longitude</th>
        <th className="w-[40%] px-4">Title</th>
        <th className="w-[15%]">Magnitude Type</th>
        </tr>
      </thead>
      
      <tbody>
      {features.map(feature => 
      <tr 
        key={feature.external_id}
        className="border text-left hover:bg-gray-200/40 cursor-pointer h-[2.5rem]"
        onClick={(e) => {
          navigate(`/${e.currentTarget.firstChild.innerHTML}`)
        }}
      >
          <td className="px-2">{feature.external_id}</td>
          <td className="hidden lg:table-cell">{Math.round(feature.magnitude*100)/100}</td>
          <td className="hidden md:table-cell">{Math.round(feature.latitude*100)/100}</td>
          <td className="hidden md:table-cell">{Math.round(feature.longitude*100)/100}</td>
          <td className="px-4 truncate">{feature.title}</td>
          <td>{feature.mag_type}</td>
        </tr>
      )}
      </tbody>
    </table>

    <div className=" mt-4 w-fit mx-auto border border-gray-300 rounded py-2 mb-5">
      
      <Link to={`/?page=${currentPage-1}`}  onClick={()=>{setCurrentPage(p=>p-1)}} className="p-2 border-r border-gray-300 hover:bg-gray-200/40 ">Previous</Link>
      <Link to="#" className="p-2 border-r border-gray-300 bg-blue-300/40 hover:bg-gray-200/40 ">{currentPage}</Link>
      <Link to={`/?page=${currentPage+1}`}  onClick={()=>{setCurrentPage(p=>p+1)}} className="p-2 border-r border-gray-300 hover:bg-gray-200/40 ">{currentPage+1}</Link>
      <Link to={`/?page=${currentPage+2}`}  onClick={()=>{setCurrentPage(p=>p+2)}} className="p-2 border-r border-gray-300 hover:bg-gray-200/40 ">{currentPage+2}</Link>
      <Link to={`/?page=${currentPage+1}`}  onClick={()=>{setCurrentPage(p=>p+1)}} className="p-2  border-gray-300 hover:bg-gray-200/40 ">Next</Link>
    </div>
    
    </div>
    
  </div>
}

export default Home
