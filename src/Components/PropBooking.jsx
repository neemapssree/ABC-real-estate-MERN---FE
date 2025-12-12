import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import AxiosInstance from '../Config/AxiosInstance';
import { BOOKING_CHARGE, TIMINGS } from '../Constants/constants';
import ModalView from './ModalView';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';


const PropBooking = () => {
  const {userDetails} = useSelector(state=>state.user);

  const {id}=useParams()
  const[singlePropData, setSinglePropData] = useState({});   //object 
  const[showModal, setShowModal]= useState(false);
  const[todayDate, setTodayDate]= useState();
  const[tomorrowDate, setTomorrowDate]= useState();
  const[dateSlotData, setDateSlotData] = useState({
    startDate:'', 
    endDate:''
  });  
  const[dropDownShow,setDropDownShow] = useState(false);    //time drop Down
  const[selectedTimings,setSelectedTimings] = useState([]);      //Array
  const[filterTimes, setFilterTimes] = useState(TIMINGS);
  const[inputDate, setInputDate] = useState();
  const[inputDate2, setInputDate2] = useState();
  const[displaySlotData, setDisplaySlotData]=useState([]);
  const[bookingModal,setBookingModal]=useState(false);
  const[selectedSlot, setSelectedSlot]=useState(null);
  const[deleteSlotShowModal,setDeleteSlotShowModal]=useState(false);
  const[displaySlotsToDelete, setDisplaySlotsToDelete]=useState([]);
  const[editPropModal,setEditPropModal] = useState(false);
  const[editPropData,setEditPropData] = useState({});
  // const[editPropImage,setEditPropImage] = useState('');
  // const [epropImg, setEPropImg] = useState('');
  // const [imgSrc,setImgSrc] = useState('');
  // const[slotUpcoming,setSlotUpcoming] = useState();

  
  // Check if any slot is selected
  const areAnySlotsSelected = displaySlotsToDelete.some((slot) => slot.selected);

  const getTodayDate = () => {
    const today = new Date();
    const tommorow = new Date();
    tommorow.setDate(today.getDate()+1);   //Function for this day plus one day
    const formattedDate = today.toISOString().split('T')[0];
    const formattedTomorrowDate = tommorow.toISOString().split('T')[0];
    setTodayDate(formattedDate);  
    setTomorrowDate(formattedTomorrowDate);    
  };  

  const getTimeSlotData = useCallback((date=new Date()) => {
    const oneHourLater = new Date(date);
    oneHourLater.setHours(oneHourLater.getHours() + 1);

    AxiosInstance.get('/user/dayWiseTimeSlot',{params:{propId:id,date:oneHourLater}})
    .then((res) => setDisplaySlotData(res.data))      
    .catch(console.error);
  }, [id]);

  // Delete Functions

  const getTimeSlotDataAdmin = (date=new Date()) => {
    AxiosInstance.get('/user/dayWiseTimeSlot',{params:{propId:id,date:date}}).then((res)=>{
      const updatedSoltData = res.data.map((slot) => ({
        ...slot,
        selected:false
      }));
      setDisplaySlotsToDelete(updatedSoltData);
      
    }).catch((err)=>{

    });
  }

  const toggleSlotSelection = (slotId) => {
    const updatedSlots = displaySlotsToDelete.map((slot) => {
      if (slot._id === slotId) {
        return { ...slot, selected: !slot.selected };
      }
      return slot;
    });
    setDisplaySlotsToDelete(updatedSlots);
  };

  const deleteSelectedSlots = () => {
    const seletedSlotstoDelete= displaySlotsToDelete.filter((slot)=> slot.selected);
    const selectedSlotIds= seletedSlotstoDelete.map((slot)=> slot._id);
    try{
      AxiosInstance.post('/admin/deleteTimeSlot', {selectedSlotIds}).then((res) => {
        
        if(res.data==="Slots deleted successfully"){
          setDeleteSlotShowModal(false);
          setDisplaySlotsToDelete([]);
          setInputDate2();       
          toast.success("Slots deleted successfully"); 
        } 
        else{
          toast.error("Slots couldn't be deleted"); 
        }  
      })
    }catch(err){
      console.log(err);
    }
  }
  //End  Delete Functions

  const getLatestFilterSlots = useCallback(() => {
    if(selectedTimings.length===0){
      setFilterTimes(TIMINGS);
    }else {
      const tempArray = [];
      for(let slot of TIMINGS){
        let flag = false;
        for(let Sslot of selectedTimings){
          if(slot.id === Sslot.id){
            flag=true;
          }
        }
        if(!flag) {
          tempArray.push(slot);
        }
      }
      setFilterTimes(tempArray);
    }
  }, [selectedTimings]);

  useEffect(()=> {
    getLatestFilterSlots();
  }, [getLatestFilterSlots]);
  
  const removeSelectedTiming = (index) => {
    const updatedSelectedTiming = [...selectedTimings];
    updatedSelectedTiming.splice(index,1);
    setSelectedTimings(updatedSelectedTiming);
  }

  const createTimeSlot = () => {
    try{
      AxiosInstance.post('/admin/addTimeSlotData', {...dateSlotData,selectedTimings,propId:id}).then((res) => {
        setShowModal(false);
        setDateSlotData({
          startDate:'', 
          endDate:''
        });
        setSelectedTimings([]);
        if(res.data==="Time slots created Successfully"){
          toast.success("Slot added successfully"); 
        }
        if(res.data==="These slots are already added"){
          toast.warning("These slots exist"); 
        }
        if(res.data==="These slot is already added"){
          toast.warning("This slot already exist"); 
        }
        if(res.data==="Internal Server Error"){
          toast.error("Server Error"); 
        }       
      })
    }catch(err){

    }
  }  

  const getSinglePropData = useCallback(() => {
    AxiosInstance.get('/user/single-prop',{params:{propId:id}}).then((res) => {
        // console.log(res);
        setSinglePropData(res.data); 
        setEditPropData(res.data); 
        //setEditPropImage(res.data.propImg);
        //setImgSrc(`${BASE_URL}/properties/${res.data.propImg}`);
        //setEPropImg(res.data.propImg);        
       
    }).catch((error) => {
        console.log(error);
    })
  }, [id]);

  const handleChangeDate = (e) => {
    setDateSlotData({...dateSlotData,[e.target.name]:e.target.value});
    console.log(dateSlotData);
  }

  const resetModal = () => {
    //slot add modal
    setDateSlotData({
      startDate:'', 
      endDate:''
    });
    setSelectedTimings([]);

    //slot delete modal
    setDisplaySlotsToDelete([]);
    setInputDate2(); 
  }


  const startBooking = async (selectedSlot,bookingCharge) => {
    try {      
      await AxiosInstance.post('/payment/orders', {        
        ...selectedSlot,
        bookingcharge: bookingCharge,        
        date:new Date(selectedSlot?.date).toString().slice(0,15),
        propid: selectedSlot.property._id,
        
      }).then((res) => {
        if(res.data.url){
          window.location.href=res.data.url;
        }
      }).catch((err)=>{
        console.log(err.message);
      })
    } catch (error) {
      console.error(error);
    }
    
  };

  const slotBookedWarning = () => {
    toast.warning('Slot already Booked');
  }

  const[errors,setErrors] = useState();

  const changePropValue = (e) => {
    setEditPropData({...editPropData, [e.target.name]:e.target.value});
  }
  
//   const editFileData = (e) => {    
//     setEditPropImage(null);
//     const newImageFile = e.target.files[0];
//     setEditPropImage(null);
//     setEPropImg(newImageFile);

//     const newImageSrc = URL?.createObjectURL(newImageFile) ?? null;
//     setEditPropImage(newImageSrc);
//     setImgSrc(newImageSrc);        
// }

const updatePropData = async (e) => { 
  e.preventDefault();
  const validationErrors = {}
  if(!editPropData.propname.trim()) {
      validationErrors.propname = "Property Name is required";            
    }
  if(!editPropData.state.trim()) {
      validationErrors.state = "State is required";            
    }
  if(!editPropData.type.trim()) {
      validationErrors.type = "Unit type is required";            
    }
    if (isNaN(editPropData.propcount) || editPropData.propcount === "") {
      validationErrors.propcount = "Number of units is required and must be a number";
    }
  // if(!epropImg) {
  //     validationErrors.epropImg = "Property image is required";            
  //   }

  setErrors(validationErrors);        
  // let editedFileData = new FormData();
  // editedFileData.append('image', epropImg);

  // console.log('edit PropData:', editPropData);
  // console.log('edited FileData:', editedFileData);
  
  if(Object.keys(validationErrors).length === 0) {
    try{
      AxiosInstance.post('/admin/updatePropData',editPropData).then((res)=>{
        if(res.status === 200){
          toast.success('Updated successfully');        
          setEditPropModal(false);
          // setSinglePropData(editPropData);    //If there is no image files
          getSinglePropData();    //If there is images
        }
      })
    } catch (err) {
      console.error(err);
      toast.error("Property couldn't be Added");
    }
  }  
}

useEffect(()=> {
    getSinglePropData();
    getTodayDate();
    getTimeSlotData(new Date());    
  },[getSinglePropData, getTimeSlotData]);

  return (
    <>    
    <div className='container-fluid propBanner'>
        <div className='row text-center align-content-center text-light singleProp' style={{backgroundImage:`URL(${singlePropData?.propImg})`}}>
            <div className='bannerText'>
                <h1>{singlePropData.propname}</h1>
                <h3 className='text-capitalize'>{singlePropData.state}</h3>
                {userDetails.role===1 && <div className='d-flex justify-content-center' style={{gap:"40px"}}>
                  <button className='btn primaryBtn mt-5 py-3 px-5 w-20' onClick={()=>setShowModal(true)}>Add Time Slot for Booking Views</button>
                  <button className='btn primaryBtn mt-5 py-3 px-5 w-20' onClick={()=>setDeleteSlotShowModal(true)}>Delete Time Slots</button>
                  <button className='btn primaryBtn mt-5 py-3 px-5 w-20' onClick={()=>setEditPropModal(true)}>Edit Property</button>
                </div> }                
            </div>                               
        </div>
        <div className='row justify-content-center'>
            <div className='propDetails d-flex mx-auto px-5 py-4 text-center'>
              <div>       
                <h4 className='text-capitalize'>Location:</h4>
                <p>{singlePropData.propaddress}</p>
              </div>
              <div> 
                <h4 className='text-capitalize'>Type:</h4>
                <p>{singlePropData.type}</p>
              </div>
              <div> 
                <h4 className='text-capitalize'>No of units:</h4>
                <p>{singlePropData.propcount}</p>
              </div>                       
            </div>
        </div>        
    </div>

    <div className='container-fluid'>         
      <div className='w-50 mx-auto my-5 px-5 pt-3 pb-5' style={{border:"2px solid #000",borderRadius:"20px",background:"#04004d"}}>
        <h2 className='mb-5 text-light'>View Available Slots</h2>
        <div className='d-flex mb-4' style={{gap:"30px"}}>
          <button className='btn nullBtn w-50' onClick={()=>{
             const today = new Date(todayDate);
             today.setHours(today.getHours() + 1);
             getTimeSlotData(today);
          }}>Get Today's Slots</button>
          <button className='btn nullBtn w-50' onClick={()=>getTimeSlotData(tomorrowDate)}>Get Tomorrow's Slots</button>
        </div>
        <h5 className='mt-5 mb-4 text-light'>Get Day Wise Time Slots</h5>
        <div className='d-flex mb-4' style={{gap:"30px"}}>
          <input type="text" className="w-50 dateStyle" placeholder="Select a Date"  value={inputDate} onChange={(e)=>setInputDate(e.target.value)} onFocus={(e)=>(e.target.type="date")} onBlur={(e)=>(e.target.type="text")}/>
          <button className="btn btn-light w-50" onClick={()=>inputDate && getTimeSlotData(new Date(inputDate))}>Search Time Slots</button>
        </div>
        <div className='slotView mt-5'>
        { displaySlotData.length > 0 ? ( 
          displaySlotData.map((slot)=>(
            <span className={`slots ${slot.bookedBy? 'bg-danger' : 'bg-success'}`} key={slot.id} onClick={()=>{!slot.bookedBy ? setBookingModal(true) : slotBookedWarning(); !slot.bookedBy && setSelectedSlot(slot)}}>{slot.slot.name}</span> 
          ))
          ) : (
            <p style={{color:"red"}}>No available slots</p>
        )}

        </div>
        {/* {displaySlotData && displaySlotData.length > 0 && (
          <button className="btn primaryBtn mt-4">Book Now</button>   //show button only if theres slots
        )} */}
      </div>
    </div>

    {/* Booking Modal */}
    <ModalView showModal={bookingModal} setShowModal={setBookingModal} propname={singlePropData.propname} title={"Book Viewing for"}>
      <div className='modalProp mb-3' style={{backgroundImage:`URL(${selectedSlot?.property?.propImg})`,height:"250px",width:"100%"}}></div>    
          <div><strong>Property Name:</strong> {selectedSlot?.property?.propname}</div>          
          <div><strong>State:</strong> {selectedSlot?.property?.state}</div>
          <div><strong>Location:</strong> {selectedSlot?.property?.propaddress}</div>
          <div><strong>Date:</strong> {new Date(selectedSlot?.date).toString().slice(0,15)}</div>
          <div><strong>Time:</strong> {selectedSlot?.slot?.name}</div>
          <div><strong>Booking Charge:</strong> {BOOKING_CHARGE} AED</div>
          <button className="btn primaryBtn mt-4" onClick={() => startBooking(selectedSlot,BOOKING_CHARGE)}>Book Now</button>
    </ModalView>  

    {/* Admin only */}
    <ModalView showModal={showModal} setShowModal={setShowModal} propname={singlePropData.propname} resetmodal={resetModal} title={"Set Time Slots for Viewing"}>
      <p className='fw-bold'>Select Start Date</p>
      <input type='date' value={dateSlotData.startDate} min={todayDate} name='startDate' onChange={handleChangeDate} />
      <p className='mt-3 fw-bold'>Select End Date</p>
      <input type='date' value={dateSlotData.endDate} min={dateSlotData.startDate} name='endDate' onChange={handleChangeDate}  />
      <p className='mt-3 fw-bold'>Add Time Slots</p>
      <div className='cus-dropDown' onClick={()=>setDropDownShow(true)}>
        Select Timings
        {dropDownShow && (
          <div className='cus-options' onMouseLeave={() => setDropDownShow(false)}>
            <ul>
            {filterTimes.map((element, index)=>(
              <li onClick={(e)=>setSelectedTimings([...selectedTimings,element])}>{element.name}</li>              
            ))}
            </ul>
          </div>
        )}
      </div>
      <div className='selectedTimes'>
        {selectedTimings.length>0 ? (
          selectedTimings.map((element,index) => (
            <span  key={index} style={{margin:'5px',padding:'10px', border:'1px solid #000', borderRadius:'10px', backgroundColor:'#a5dbef'}}>
              {element.name}
              <button onClick={() => removeSelectedTiming(index)}>X</button>
            </span> 
          ))
          ) : (
          <span className='w-100'>No selected timings</span>
        )}
      </div>                                            

      <input type='submit' className='btn primaryBtn mt-4' value="Submit" onClick={createTimeSlot} />
    </ModalView>

    {/* Delete slot modal */}
    <ModalView showModal={deleteSlotShowModal} setShowModal={setDeleteSlotShowModal} propname={singlePropData.propname} resetmodal={resetModal} title={"Delete Time Slots for "}>
      <div className='d-flex mb-4' style={{gap:"30px"}}>
        <input type="text" className="w-50" placeholder="Select a Date"  value={inputDate2} onChange={(e)=>setInputDate2(e.target.value)} onFocus={(e)=>(e.target.type="date")} onBlur={(e)=>(e.target.type="text")}/>
        <button className="btn btn-light w-50" onClick={()=>inputDate2 && getTimeSlotDataAdmin(new Date(inputDate2))}>Search Time Slots</button>
      </div>
      <div className='slotView mt-5'>
        { displaySlotsToDelete.map((slot)=>
          <span className={slot.selected ? 'slots selected' : 'slots'} style={{color:"#000"}} key={slot._id} onClick={()=>{toggleSlotSelection(slot._id)
          }}>{slot.slot.name}</span> ) }
      </div>
      { areAnySlotsSelected && (<button className='btn primaryBtn mt-4' onClick={deleteSelectedSlots}>Delete Selected Slots</button> )}
    
    </ModalView>

    {/* Edit Property */}
    <ModalView showModal={editPropModal} setShowModal={setEditPropModal} propname={singlePropData.propname} resetmodal={resetModal} title={"Edit "}>
      <div className="editProp">
        <div className='input-group mb-4' style={{gap:"15px"}}>
          <label>Property Name: </label><input type='text' name="propname" id="propname" value={editPropData.propname} onChange={changePropValue}/>
          {errors && errors.propname && <span className='errors'>{errors.propname}</span>}
        </div>
        <div className='input-group mb-4' style={{gap:"15px"}}>
          <label>State:  </label>
          <select value={editPropData.state} onChange={changePropValue} className="form-select" id="state" name="state">
            <option selected value="">Choose the state</option>
            <option value="dubai">Dubai</option>
            <option value="abu dhabi">Abu Dhabi</option>
            <option value="sharjah">Sharjah</option>
          </select>
          {errors && errors.state && <span className='errors'>{errors.state}</span>}
        </div>
        <div className='input-group mb-4' style={{gap:"15px"}}>
          <label>Type: </label>
          <select value={editPropData.type} onChange={changePropValue} className="form-select" id="type" name="type">
            <option selected value="">Choose the type</option>
            <option value="apartments">Apartments</option>
            <option value="villa">Villa</option>
            <option value="townhouse">Townhouse</option>
          </select>
          {errors && errors.type && <span className='errors'>{errors.type}</span>}
        </div>
        <div className='input-group mb-4' style={{gap:"15px"}}>
          <label>Number of units: </label><input type='number' name="propcount" id="propcount" value={editPropData.propcount} onChange={changePropValue}/>
          {errors && errors.propcount && <span className='errors'>{errors.propcount}</span>}
        </div>
        <div className='input-group mb-4' style={{gap:"15px"}}>
          <label>Address: </label><textarea name="propaddress" id="propaddress" value={editPropData.propaddress} onChange={changePropValue}/>
          {errors && errors.propaddress && <span className='errors'>{errors.propaddress}</span>}
        </div>

        {/* <div className='input-group mb-4' style={{gap:"15px"}}>
          <label htmlFor="propimage" className='my-3'>Property Image</label>
          <input type="file" onChange={editFileData} className="form-control" id="propimage" name="propimage" placeholder="Upload Property Featured Image" />
          {errors && errors.epropImg && <span className='errors'>{errors.epropImg}</span>}
          {editPropImage && (
            <img src={imgSrc}
              style={{ height: 'auto', width: '300px', marginTop: '30px' }}
              alt="Property Image"
            />
          )}
        </div> */}

        <button className='btn primaryBtn' onClick={updatePropData}>Update</button>
      </div>
    </ModalView>

    {/*End of Admin only */}
    
    </>
  )
}

export default PropBooking