import { useEffect, useState } from "react";
import Gun from "gun";
import jsonData from './../datagh.json';

function Admin()
{
  const [verified_count,updatecount] = useState(0)
    const index="init1234"
    const gun = Gun({
        peers: ['http://localhost:5000/gun']
      })
  
  function putdata()
  {
    gun.get(index).put(jsonData)
    console.log("uploaded")
    //getkey()
    getdata()
  }
  function getcount()
  {
    var verifedlength=0
    for (let i=1;i<=3000;i++)
      {
        console.log(i)
        gun.get(index+'/'+pad(i,3)).on((node) => { 
            if(node.Verified)
            {
              verifedlength=verifedlength+1;
            }
          
          
        })
      }
      updatecount(verifedlength)
  }
  function getjson() {
    // Now you can work with the imported jsonData object
    console.log(jsonData);
  
    // For example, accessing a specific record
    const recordId = '001';
    if (jsonData.hasOwnProperty(recordId)) {
      console.log('Record:', jsonData[recordId]);
    } else {
      console.log('Record not found.');
    }
  }
  function getdata()
  {
    setUser([])
    function getkeys()
    {
      
      gun.get(index).once((data) =>{
          var keys=Object.keys(data).filter(function (letter)
          {
              return letter !== '_';

          })
          keys.forEach(fetchdata)
      })
      
    }
    
    function fetchdata(item , ind)
    {
     
      setUser([])
      gun.get(index+'/'+item).once((node) =>{
        setUser(data => data.concat({"Name":node.Name,"ID":item,"Institution":node.Institution,"Email":node.Email,"Phone":node.Phone,"Verified":node.Verified}));
      })    
    }
    
    getkeys()
    getcount()
    }
    
    function pad(n, length) {
      var len = length - (''+n).length;
      return (len > 0 ? new Array(++len).join('0') : '') + n
    }
    useEffect(() => {
      for (let i=1;i<=3000;i++)
      {
        gun.get(index+'/'+pad(i,3)).on((node) => { 
          
            if(node.Verified)
            { 
              if (!(users===[]))
                change_status(pad(i,3))
              
            }
            
          
          
        })
      }
    
  
    }, [])
    const [users,setUser] = useState([])
    function change_status(id)
    {
      const lastCell = document.querySelector(`[id-ref="${id}"]`);
      if (lastCell) {
        
        lastCell.innerHTML = '<span class="badge bg-success">verifed</span>';
        getcount();
      }
  }
 
    return(
        <div className="container" onLoad={getdata}>
            <div className="row">
            
                <div className="col">
                    <div className="card text-white bg-primary" style={{marginTop:"10px","marginBottom":"10px"}}>
                        
                        <div className="card-title">
                            <h4 style={{marginLeft:"30%","marginBottom":"0px"}}>
                                Counts:
                            </h4>
                        </div>
                    </div>
                    
                </div>
                <div className="col">
                <div className="card text-white bg-primary" style={{marginTop:"10px","marginBottom":"10px"}}>
                        
                        <div className="card-title">
                            <h4 style={{marginLeft:"30%","marginBottom":"0px"}}>
                                {verified_count}
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
            <button className="btn btn-primary" onClick={putdata}>Upload</button>
             <button className="btn btn-primary" onClick={getdata}>Get</button>
             <button className="btn btn-primary" onClick={getjson}>get json</button>
            
            <div className="container">
                <div className="row">
                    <div className="col">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Institution</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {users.map(da => 
                                <tr>
                                  <th >
                                  {da.ID}
                                  </th>
                                  <td>
                                  {da.Name}
                                  </td>
                                  <td>
                                  {da.Institution}
                                  </td>
                                  <td>
                                  {da.Email}
                                  </td>
                                  <td>
                                  {da.Phone}
                                  </td>
                                  <td id-ref={da.ID}>
                                  {da.Verified ? <span class="badge bg-success">verifed</span>:<span class="badge bg-danger">not verifed</span>}
                                  </td>
                                </tr>
                                  
                                  )}
                                </tbody>
                                
                            
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Admin;