import { useState } from "react";
import Admin from "./component/Admin";
import Verify from "./component/Verify";
function App() {
  const [dashboard,setdashboard] = useState(true)
  const [verification_tab,set_verification_tab]=useState(false)

  function opendashboard()
  {
    setdashboard(true);
    set_verification_tab(false);
  }

  function open_verification_tab()
  {
      setdashboard(false);
      set_verification_tab(true);
  }
  
  return (
    <div>
      
      <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
      {
        dashboard ?
        <><input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked  onClick={opendashboard}/>
      <label class="btn btn-outline-primary" for="btnradio1">dashboard</label></>
        : 
        <><input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off"   onClick={opendashboard}/>
      <label class="btn btn-outline-primary" for="btnradio1">dashboard</label></>
      }

      { verification_tab ? 
      <><input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" onClick={open_verification_tab}/>
      <label class="btn btn-outline-primary" for="btnradio2" checked>Verification Tab</label></> : <><input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" onClick={open_verification_tab}/>
      <label class="btn btn-outline-primary" for="btnradio2" >Verification Tab</label></> }
      

      

      <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" />
      <label class="btn btn-outline-primary" for="btnradio3">Radio 3</label>
    </div>
      {
        dashboard ? <Admin></Admin> : ""
      }
      {
        verification_tab ? <Verify></Verify> : ""
      }
    </div>
  );
}

export default App;
