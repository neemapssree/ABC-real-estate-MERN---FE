
import { useNavigate } from 'react-router-dom'

const PropsCard = ({data, isDark}) => {
  const navigate = useNavigate(); 
  // const imageUrl = `${BASE_URL}/properties/${decodeURIComponent(data.propImg)}`; 
  return (
    <div className='col-md-4 mb-3'>
      <div className="card propsCard" onClick={()=>navigate(`/view-prop/${data._id}`)}>
        <div style={{backgroundImage:`URL(${data.propImg})`,backgroundSize:'cover'}} className="card-img-top" />
        <div className={`card-body ${isDark === 'true' ? 'text-dark' : ''}`}>
          <h3 className="card-title mb-3">{data?.propname}</h3>
          <p className='fw-bold'>{data?.propaddress}, {data?.state}</p>
          <hr className='my-5' style={{borderTop: "1px solid #1E3248"}} />
          <div className="d-flex justify-space-between">
            <p>{data.beds} beds</p>
            <p>{data.baths} baths</p>
            <p>{data.baths} baths</p>
          </div>          
          {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
          <button className="btn primaryBtn" onClick={()=>navigate(`/view-prop/${data._id}`)}>More Details</button>
        </div>
      </div>
    </div>
  )
}

export default PropsCard