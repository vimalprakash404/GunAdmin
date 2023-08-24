import { useEffect, useState } from "react";
import Gun from "gun";
import jsonData from './../datagh.json';
const users_variable = {
    "001": {
      Name: "Emily Johnson",
      Institution: "St. Teresa's College, Ernakulam",
      Email: "emily.johnson@example.com",
      Phone: "123-456-7890",
      Verified: false
    },
    "002": {
      Name: "Michael Smith",
      Institution: "St. Xavier's College, Thiruvananthapuram",
      Email: "michael.smith@example.com",
      Phone: "987-654-3210",
      Verified: false
    },
    "003": {
      Name: "Sophia Williams",
      Institution: "Sacred Heart College, Kochi",
      Email: "sophia.williams@example.com",
      Phone: "456-789-0123",
      Verified: false
    },
    "004": {
      Name: "Ethan Brown",
      Institution: "Maharaja's College, Kochi",
      Email: "ethan.brown@example.com",
      Phone: "789-012-3456",
      Verified: false
    },
    "005": {
      Name: "Olivia Davis",
      Institution: "Government Brennen College, Thalassery",
      Email: "olivia.davis@example.com",
      Phone: "234-567-8901",
      Verified: false
    },
    "006": {
      Name: "Daniel Jones",
      Institution: "Christ College, Irinjalakuda",
      Email: "daniel.jones@example.com",
      Phone: "890-123-4567",
      Verified: false
    },
    "007": {
      Name: "Ava Martinez",
      Institution: "St. Berchmans College, Changanassery",
      Email: "ava.martinez@example.com",
      Phone: "567-890-1234",
      Verified: false
    },
    "008": {
      Name: "Liam Anderson",
      Institution: "Farook College, Kozhikode",
      Email: "liam.anderson@example.com",
      Phone: "901-234-5678",
      Verified: false
    },
    "009": {
      Name: "Isabella Thomas",
      Institution: "St. Joseph's College, Devagiri",
      Email: "isabella.thomas@example.com",
      Phone: "123-456-7890",
      Verified: false
    },
    "010": {
      Name: "Noah Wilson",
      Institution: "Mar Ivanios College, Thiruvananthapuram",
      Email: "noah.wilson@example.com",
      Phone: "987-654-3210",
      Verified: false
    },
    "011": {
      Name: "Mia Taylor",
      Institution: "Baselius College, Kottayam",
      Email: "mia.taylor@example.com",
      Phone: "456-789-0123",
      Verified: false
    },
    "012": {
      Name: "Lucas Martinez",
      Institution: "Bishop Moore College, Mavelikara",
      Email: "lucas.martinez@example.com",
      Phone: "789-012-3456",
      Verified: false
    },
    "013": {
      Name: "Amelia White",
      Institution: "Providence Women's College, Calicut",
      Email: "amelia.white@example.com",
      Phone: "234-567-8901",
      Verified: false
    },
    "014": {
      Name: "Henry Lee",
      Institution: "St. Thomas College, Thrissur",
      Email: "henry.lee@example.com",
      Phone: "890-123-4567",
      Verified: false
    },
    "015": {
      Name: "Harper Johnson",
      Institution: "Government College for Women, Thiruvananthapuram",
      Email: "harper.johnson@example.com",
      Phone: "567-890-1234",
      Verified: false
    },
    "016": {
      Name: "Aiden Kim",
      Institution: "Malabar Christian College, Kozhikode",
      Email: "aiden.kim@example.com",
      Phone: "901-234-5678",
      Verified: false
    },
    "017": {
      Name: "Elizabeth Wang",
      Institution: "Sree Narayana College, Kollam",
      Email: "elizabeth.wang@example.com",
      Phone: "123-456-7890",
      Verified: false
    },
    "018": {
      Name: "Benjamin Nguyen",
      Institution: "St. Albert's College, Kochi",
      Email: "benjamin.nguyen@example.com",
      Phone: "987-654-3210",
      Verified: false
    },
    "019": {
      Name: "Chloe Garcia",
      Institution: "Nirmala College, Muvattupuzha",
      Email: "chloe.garcia@example.com",
      Phone: "456-789-0123",
      Verified: false
    },
    "020": {
      Name: "Alexander Hernandez",
      Institution: "College of Engineering Vadakara",
      Email: "alexander.hernandez@example.com",
      Phone: "789-012-3456",
      Verified: false
    }
  };
function Admin()
{
  const [verified_count,updatecount] = useState(0)
    const index="init123"
    const gun = Gun({
        peers: ['http:192.168.1.126:5000/gun']
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
      var userdata ={};
      setUser([])
      gun.get(index+'/'+item).once((node) =>{
        userdata=node;
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
    //   gun.get(index).on((node) => { // Is called whenever text is updated
    //     console.log(node)
    //   })
    //   gun.get(index+'/'+"init").on((node) => { // Is called whenever text is update
    //     getdata()
    // })
    //   gun.get(index+'/'+'001')
      
  
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
                                  <th scope="row">
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