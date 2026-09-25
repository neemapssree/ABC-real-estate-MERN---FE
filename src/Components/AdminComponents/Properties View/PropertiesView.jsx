import { useCallback, useEffect, useState } from "react";
import AxiosInstance from "../../../Config/AxiosInstance"
import { useNavigate } from "react-router-dom";

const PropertiesView = () => {
  const [props, setProps] = useState([]);
  const navigate = useNavigate();  

   const getAllProps = useCallback(() => {
    AxiosInstance.get('/user/getAllProperties')
    .then((response) => {
      setProps(response.data);
    })
    .catch((error) => {
      if(
        error.response && 
        error.response.data.message === "unauthorized user"
      ) {
        localStorage.clear();
        navigate('/login');
      }
    });
  }, [navigate]);

  useEffect(() => {
    getAllProps();
  },[getAllProps]);

 

    return(
        <div className="w-full">
            <table width="100%" cellPadding="10" cellSpacing="10">
                <thead bgcolor="#333" className="text-light">
                    <th>
                      Sl.No  
                    </th>
                    <th>
                      Property Name  
                    </th>
                    <th>
                      Status  
                    </th>
                    <th>
                      Date Created
                    </th>
                    <th>
                      Last Updated
                    </th>
                    <th>
                      Author 
                    </th>
                    <th>
                      Actions
                    </th>
                </thead>
                {props?.map((prop, index) => {                  
                  const date = new Date(prop.timestamp);
                  const options = { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    hour:'numeric',
                    minute: 'numeric',
                    hour12: false,
                  }
                  const updatedDate = new Date(prop.updatedAt ? prop.updatedAt : date);
                  const formatedDate = date.toLocaleDateString('en-US', options);
                  const updatedAt = updatedDate.toLocaleDateString('en-US', options);

                  return(                    
                    <>
                      <tr key={index}>
                        <td>
                            {index + 1}
                        </td>
                        <td>
                            {prop?.propname}
                        </td>
                        <td>
                            1
                        </td>
                        <td>
                            {formatedDate}
                        </td>
                        <td>
                            {updatedAt}
                        </td>
                        <td>
                            1
                        </td>
                        <td>
                            <div className="d-flex gap-3">
                              <a href={`/view-prop/${prop._id}`} target="blank" className="bg-primary text-light px-2 py-1" >View</a>
                              <a href="http://" className="bg-success text-light px-2 py-1">Edit</a>
                              <a href="http://" className="bg-danger text-light px-2 py-1">Delete</a>
                            </div>
                        </td>
                      </tr>
                    </>
                  )
                })}
                
            </table>
        </div>

    )

}

export default PropertiesView