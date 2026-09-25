
const HomeBanner = () => {
  return (
    <div className='mainBanner bg-cover bg-no-repeat' style={{backgroundImage: 'url(/images/abc-real-estate-banner.webp)', 
    backgroundSize: "cover", backgroundPosition: "top", backgroundRepeat: "no-repeat"}}>
      <div className='text-center mx-auto' style={{width: "max-content"}}>
        <div className="mainBannerText">
          <h1 className="text-capitalize lh-base">
            Exceptional<br />living starts here
          </h1>
          <p>Lorem ipsum doler sit amet...........lorem sit ipsum......<br/>
          Lorem ipsum doler sit amet.</p>
        </div>
        
      </div>
    </div>
  )
}

export default HomeBanner