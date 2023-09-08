import axios from "axios";
import { useState } from "react";


function ServerList()
{
    const [ipaddress,setdataset]=useState(
        [
            {ip:"192.168.1.104:5000",
             active : false,
            id : 0 },
             {ip : "192.168.0.104:5000",
            active : false,
            id : 1
        }
         ]
    )
    const center_data = {
        margin: 'auto',
        width: '50%',
        padding: '10px',
        'flex-direction': 'column', /* To center vertically */
        'align-items': 'center'
        };
    function checkonline( data, index )
    {
        const gunServerURL = 'http://'+data+'/gun/'
        var return_data=false
        axios
        .get(gunServerURL)
        .then(() => {
            updatedata(index,true)
            return_data= true;
        })
        .catch(() => {
            updatedata(index,false)
          return_data= false;
        });
      return return_data;
    }
    
    const changedatato = (taskId, status) => {
        const address= ipaddress[taskId].ip
      const ad_status= checkonline(address,taskId)
      alert(address)
        
      };
    
      const updatedata = (taskId,status) =>{
        const updatedTasks = ipaddress.map((ipadd) =>
          ipadd.id === taskId ? { ...ipadd, active: status } : ipadd
        );
        setdataset(updatedTasks);
      }
    
    return(
        <div style={center_data} > 
        <h1 >
            Server List
        </h1>
        <input  className="form-control form-control-lg" type="text" placeholder="User ID" aria-label=".form-control-lg example"/>
        <button  type="button" className="btn btn-primary" >add</button>
        <div className="container">
                <div className="row">
                    <div className="col">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">IP and Port</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">delect</th>
                
                                </tr>
                              </thead>
                              <tbody>
                                {
                                    ipaddress.map(da => 
                                        <><tr>
        
                                  <td>{da.ip}</td>
                                  <td>{
                                    da.active ? <span class="badge bg-success">online</span> : <span class="badge bg-danger">offline</span>
                                    }
                                  </td>
                                  <td><button  type="button" className="btn btn-danger" onClick={ () => {changedatato(da.id,true)}}>remove</button></td>
                                  
                                </tr>
                                </>  
                                    )
                                }
                                                
                                </tbody>
                                
                            
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ServerList;