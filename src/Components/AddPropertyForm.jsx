import React, { useState } from 'react'
import AxiosInstance from '../Config/AxiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddPropertyForm = () => {    

    const navigate = useNavigate();
    const [propImg, setPropImg] = useState('');    
    
   const [selectedImage, setSelectedImage] = useState('');   

    const onChangeField = (e) => {        
        setFormValue({...formValue, [e.target.name]:e.target.value });        
    }

    const [formValue, setFormValue] = useState({
        propname:'',
        state:'',
        type:'',
        propcount:'',
        propaddress:'',
    });

    const[errors,setErrors] = useState();

    const addFileData = (e) => {        
        setPropImg(e.target.files[0]);
        e.target?.files[0]? setSelectedImage(URL?.createObjectURL(e.target?.files[0]) ?? null):setSelectedImage(null);        
    }
    
    const addProperty = (e) => { 
        e.preventDefault();
        const validationErrors = {}
        if(!formValue.propname.trim()) {
            validationErrors.propname = "Property Name is required";            
          }
        if(!formValue.state.trim()) {
            validationErrors.state = "State is required";            
          }
        if(!formValue.type.trim()) {
            validationErrors.type = "Unit type is required";            
          }
        if(!formValue.propcount.trim()) {
            validationErrors.propcount = "Number of unit is required";            
          }
        if(!propImg) {
            validationErrors.propImg = "Property image is required";            
          }

        setErrors(validationErrors);        
        let fileData = new FormData();                            //changing the data into formdata format
        fileData.append('image', propImg);
        fileData.append('propname', formValue.propname);
        fileData.append('state', formValue.state);
        fileData.append('type', formValue.type);
        fileData.append('propcount', formValue.propcount);
        fileData.append('propaddress', formValue.propaddress);

        if(Object.keys(validationErrors).length === 0) {            
            try{            
                const res = AxiosInstance.post('/admin/addProperty',fileData, {
                    headers:{'Content-Type' : 'multipart/form-data'}
                });
                toast.success("Property added");
                navigate('/home');                
            }catch(err) {
                console.log(err);
                toast.error("Couldn't add property");
            }
        }
        
     }

     const clearForm = () => {
        setFormValue({
            propname: '',
            state: '',
            type: '',
            propcount: '',
            propaddress: '',
        });
        setPropImg(null);
        setSelectedImage(null);
        setErrors('');
     }


  return (
    <div className='container my-5'>
        <form className="row gx-3 gy-2 align-items-center">
        <div className="col-sm-6">
            <label htmlFor="propname" className='mb-3'>Property Name</label>
            <input type="text" value={formValue.propname} onChange={onChangeField} className="form-control" id="propname" name="propname" placeholder="Enter Property Name"/>
            {errors && errors.propname && <span className='errors'>{errors.propname}</span>}
        </div>
        <div className="col-sm-6">
            <label htmlFor="state" className='mb-3'>State</label>
            <select value={formValue.state} onChange={onChangeField} className="form-select" id="state" name="state">
            <option selected value="">Choose the state</option>
            <option value="dubai">Dubai</option>
            <option value="abu dhabi">Abu Dhabi</option>
            <option value="sharjah">Sharjah</option>
            </select>
            {errors && errors.state && <span className='errors'>{errors.state}</span>}
        </div>
        <div className="col-sm-6">
            <label htmlFor="type" className='my-3'>Unit Type</label>
            <select value={formValue.type} onChange={onChangeField} className="form-select" id="type" name="type">
            <option selected value="">Choose the type</option>
            <option value="apartments">Apartments</option>
            <option value="villa">Villa</option>
            <option value="townhouse">Townhouse</option>
            </select>
            {errors && errors.type && <span className='errors'>{errors.type}</span>}
        </div>
        <div className="col-sm-6">
            <label htmlFor="propcount" className='my-3'>Available Number of Units</label>
            <input type="number" onChange={onChangeField} value={formValue.propcount} className="form-control" id="propcount" name="propcount" placeholder="Available Number of Units" />
            {errors && errors.propcount && <span className='errors'>{errors.propcount}</span>}
        </div>
        <div className="col-12">
            <label htmlFor="propaddress" className='my-3'>Location Address</label>
            <textarea className="form-control" onChange={onChangeField} value={formValue.propaddress} id="propaddress" name="propaddress" placeholder="Enter Property Address" />
        </div>
        <div className="col-12">
            <label htmlFor="propimage" className='my-3'>Property Featured Image</label>
            <input type="file" onChange={addFileData} className="form-control" id="propimage" name="propimage" placeholder="Upload Property Featured Image" />
            {errors && errors.propImg && <span className='errors'>{errors.propImg}</span>}
            {selectedImage && <img src={selectedImage} style={{height: 'auto',width: '300px', marginTop:'30px'}} alt='prop'></img>}            
        </div>
        
        {/* <div className="col-12">    
            <label className='my-3'>Budget</label>
            <div className='inputGroup'>
                <input type="number" className="form-control" id="minbudget" name="minbudget" placeholder="Min Budget" />
                <input type="number" className="form-control" id="maxbudget" name="maxbudget" placeholder="Max Budget" />
            </div>    
        </div> */}
        <div className="col-auto d-flex" style={{gap:'30px'}}>
            <button type="submit" className="btn primaryBtn mt-4" onClick={addProperty}>Submit</button>
            <button type="reset" className="btn btn-primary mt-4"  onClick={clearForm}>Reset</button>
        </div>
        </form>        
    </div>
    
  )
}

export default AddPropertyForm