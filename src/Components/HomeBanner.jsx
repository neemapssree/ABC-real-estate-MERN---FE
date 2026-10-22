import { faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const HomeBanner = () => {
  return (
    <div className='mainBanner bg-cover bg-no-repeat' style={{backgroundColor: '#0B1628'}}>
      <div className='text-center mx-auto' style={{width: "max-content"}}>
        <div className="mainBannerText">
          <h1 className="text-capitalize lh-base">
            Sovereign Spaces, <br />Built to Remain.
          </h1>
          <p>Maison curates singular architectural monuments and modern sanctuaries for those who measure legacy by the space they inhabit.</p>
          <a href="/projects" className="btn linkBtn">Explore the Collection <FontAwesomeIcon size="20" color="#C5A880" icon={faArrowRight} /></a>
        </div>
      </div>
      <div className="container mx-auto mt-5 mb-7" style={{height: "600px", overflow: "hidden"}}>
          <img src={'../images/abc-real-estate-banner.webp'} alt="banner"
          fluid 
          className="w-100 h-100 shadow-xl rounded-4 shadow-light" 
          style={{ objectFit: 'cover', objectPosition: '50% 40%' }}  />
        </div>
    </div>
  )
}

export default HomeBanner