import React from 'react'
import PropsCard from './PropsCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'

const FeaturedProjects = ({ data: propData }) => {
  return (
    <div className="my-5 text-white">        
        <h2 className="my-4 fs-6 text-gold text-uppercase" style={{ letterSpacing: '0.2rem' }}><FontAwesomeIcon icon={faMinus} /> Featured Projects</h2>
        <h3 className="fs-large fw-light">Explore Projects</h3>
        <div className="row">
            {propData.map((prop) => (
            <PropsCard key={prop._id} data={prop} />
            ))}
        </div>
    </div>
  )
}

export default FeaturedProjects