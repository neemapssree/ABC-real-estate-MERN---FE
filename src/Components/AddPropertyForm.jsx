import { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '../Config/AxiosInstance';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { propertySchema } from '../Schemas/PropertySchema';
import { bedrooms, bathrooms, types } from './Constants/PropertyOptions';

const AddPropertyForm = () => {    

    const navigate = useNavigate();
    const [propImg, setPropImg] = useState('');    
    
   const [selectedImage, setSelectedImage] = useState('');   

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(propertySchema),
        defaultValues: {
            propname: '',
            state: '',
            type: '',
            beds: [],
            baths: [],
            price: '',
            area: '',
            handover: '',
            propaddress: '',
            isFeatured: false,
            isStock: true,
        }
    });

    const addFileData = (e) => {        
        setPropImg(e.target.files[0]);
        e.target?.files[0]? setSelectedImage(URL?.createObjectURL(e.target?.files[0]) ?? null):setSelectedImage(null);        
    }
    
    const addProperty = async (data) => { 
        console.log(data);      
        
        let fileData = new FormData();                            //changing the data into formdata format
        fileData.append('image', propImg);
        fileData.append('propname', data.propname);
        fileData.append('state', data.state);
        fileData.append('type', data.type);
        fileData.append('beds', data.beds);
        fileData.append('baths', data.baths);
        fileData.append('price', data.price);
        fileData.append('area', data.area);
        fileData.append('handover', data.handover);
        fileData.append('propaddress', data.propaddress);
        fileData.append('isFeatured', data.isFeatured);

       try{           
                await AxiosInstance.post(
                    '/admin/addProperty', 
                    fileData, 
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
                toast.success("Property added");
                navigate('/home');                
            }catch(err) {
                console.log(err);
                toast.error("Couldn't add property");
            }
     };

  return (
    <div className='container my-5'>
        <form className="row gx-3 gy-2 align-items-center" onSubmit={handleSubmit(addProperty)}>
            <div className="col-sm-6">
                <label htmlFor="propname" className='mb-3'>Property Name</label>
                <input type="text" className="form-control" id="propname" placeholder="Enter Property Name"
                {...register('propname')} />
                {errors.propname && <span className='errors'>{errors.propname.message}</span>}
            </div>
            <div className="col-sm-6">
                <label htmlFor="state" className='mb-3'>State</label>
                <select className="form-select" id="state"
                {...register('state')}>
                    <option selected value="">Choose the state</option>
                    <option value="dubai">Dubai</option>
                    <option value="abu dhabi">Abu Dhabi</option>
                    <option value="sharjah">Sharjah</option>
                </select>
                {errors.state && <span className='errors'>{errors.state.message}</span>}
            </div>            
            <div className="col-sm-4">
                <label htmlFor="price" className='my-3'>Price in Dirhams</label>
                <input type="text" className="form-control" id="price" placeholder="Price in Dirhams"
                {...register('price')} />
                { errors.price && <span className='errors'>{errors.price.message}</span> }
            </div>
            <div className="col-sm-4">
                <label htmlFor="area" className='my-3'>Area in sqft</label>
                <input type="text" className="form-control" id="area" placeholder="Area in sqft"
                {...register('area')} />
                { errors.area && <span className='errors'>{errors.area.message}</span> }
            </div>
            <div className="col-sm-4">
                <label htmlFor="handover" className='my-3'>Handover year</label>
                <input type="text" className="form-control" id="handover" placeholder="handover in sqft"
                {...register('handover')} />
                { errors.handover && <span className='errors'>{errors.handover.message}</span> }
            </div>
            
            <div className="col-sm-6">
                <h3 className='my-3'>Available number of bedrooms</h3>
                {bedrooms.map((beds) => (
                    <div key={beds} style={{ marginBottom: '10px' }}>
                        <label>
                            <input type="checkbox"
                            id="beds"
                            {...register('beds')} />
                            <span style={{ marginLeft: '8px' }}>{beds}</span>
                        </label>
                    </div>
                ))}
                { errors.beds && <span className='errors'>{errors.beds.message}</span>}
            </div>
            <div className="col-sm-6">
                <h3 className='my-3'>Available number of bathrooms</h3>
                {bathrooms.map((baths) => (
                    <div key={baths} style={{ marginBottom: '10px' }}>
                        <label>
                            <input type="checkbox"
                            id="baths"
                            {...register('baths')} />
                            <span style={{ marginLeft: '8px' }}>{baths}</span>
                        </label>
                    </div>
                ))}
                { errors.baths && <span className='errors'>{errors.baths.message}</span>}
            </div>
            <div className="col-sm-6">
                <label htmlFor="type" className='my-3'>Unit Type</label>
                <select className="form-select" id="type"
                {...register('type')}>
                    <option selected value="">Choose the type</option>
                    {types.map((type, idx)=> (
                        <option key={idx} value={type}>{type}</option>
                    ))}           
                </select>
                { errors.type && <span className='errors'>{errors.type.message}</span>}
            </div>
            
            
            <div className="col-12">
                <label htmlFor="propaddress" className='my-3'>Location Address</label>
                <textarea className="form-control" id="propaddress" placeholder="Enter Property Address"
                {...register('propaddress')} />
            </div>
            <div className="col-12">
                <label htmlFor="propimage" className='my-3'>Property Featured Image</label>
                <input type="file" onChange={addFileData} className="form-control" id="propimage" name="propimage" placeholder="Upload Property Featured Image" />
                {errors && errors.propImg && <span className='errors'>{errors.propImg}</span>}
                {selectedImage && <img src={selectedImage} style={{height: 'auto',width: '300px', marginTop:'30px'}} alt='prop'></img>}            
            </div>
            <div className="col-12">
                <label htmlFor="isFeatured" className='my-3'>is featured</label>
                <input type="checkbox" id="isFeatured" 
                {...register('isFeatured')} />
            </div>
            <div className="col-12">
                <label htmlFor="isStock" className='my-3'>is stock</label>
                <input type="checkbox" id="isFeatured" 
                {...register('isStock')} />
            </div>
            
            {/* <div className="col-12">    
                <label className='my-3'>Budget</label>
                <div className='inputGroup'>
                    <input type="number" className="form-control" id="minbudget" name="minbudget" placeholder="Min Budget" />
                    <input type="number" className="form-control" id="maxbudget" name="maxbudget" placeholder="Max Budget" />
                </div>    
            </div> */}
            <div className="col-auto d-flex" style={{gap:'30px'}}>
                <button type="submit" className="btn primaryBtn mt-4"> Submit</button>
                <button type="reset" className="btn btn-primary mt-4"  onClick={()=> reset()}>Reset</button>
            </div>
        </form>        
    </div>
    
  )
}

export default AddPropertyForm