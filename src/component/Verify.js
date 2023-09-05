import { useRef, useState } from "react";
import Gun from 'gun';
function Verify(probs)
{
    const index="init1234"
    const [userob,setuserob]=useState("")
    const gun = Gun({
    peers: ['http://localhost:5000/gun']
    })
    const inputData = useRef(null)
    const center_data = {
        margin: 'auto',
        width: '50%',
        padding: '10px',
        'flex-direction': 'column', /* To center vertically */
        'align-items': 'center'
        };
    function getdata()
    {
        console.log(inputData.current.value);
        gun.get(index+'/'+inputData.current.value).once((node) => { // Is called whenever text is updated
            if (node === undefined)
            {
                alert("Undefined")
                console.log(node)
                set_visibility_data(false)
            }
            else
            {
                console.log(node.Name)
                set_visibility_data(true)
                setuserob(
                    {
                      Name: node.Name,
                      Institution: node.Institution,
                      Email: node.Email,
                      Phone: node.Phone,
                      Verified: node.Verified
                    }
                  )
            }
            
          })
          gun.get(index+'/'+inputData.current.value).on((node) => { // Is called whenever text is updated
            
              if(node.Verified)
              {
                setuserob(
                  {
                    Name: node.Name,
                    Institution: node.Institution,
                    Email: node.Email,
                    Phone: node.Phone,
                    Verified: node.Verified
                  }
                )
              }
          })
    }
    const [visibility_data,set_visibility_data] = useState(false)
    const hidden = {
        "visibility": visibility_data ? 'visible' : 'hidden' ,
      };
      function verifyuser()
      {
        console.log(gun.get(index+'/'+inputData.current.value).put({"Verified":true}))
    
      }
 return (
   
    <div className="container h2" style={center_data}>
        <input ref={inputData} className="form-control form-control-lg" type="text" placeholder="User ID" aria-label=".form-control-lg example"/>
        <button onClick={getdata} type="button" className="btn btn-primary">Search</button>
      
        <div className="card card-body" style={hidden}>
            
            <div className="row">
                <div className="col ">
                    Name :
                </div>
                <div className="col">
                    {userob.Name}
                </div>

            </div>
            <div className="row">
                <div className="col">
                    Email :
                </div>
                <div className="col">
                    {userob.Email}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    Phone :
                </div>
                <div className="col">
                    {userob.Phone}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    Institution :
                </div>
                <div className="col-6">
                    {userob.Institution}
                </div>
            </div>
            <div className="row">
                {userob.Verified ? 
                <h2><span class="badge bg-success">User Verified</span></h2>
                : 
                <button className="btn btn-success btn-lg" onClick={verifyuser}>
                verify
                </button>
                }
                
            </div>
        </div>
    </div>
 
   
 );
}

export default Verify;