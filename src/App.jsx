import { useState } from 'react'
import './App.css'
import copyIcon from './assets/copy-link.png'


function App() {

  const[ticketSummary, setTicketSummary] = useState("")
  const[application, setApp] = useState("")
  const[flags, setFlag] = useState("")
  const[devices, setDevices] = useState("")
  const[platform, setPlatform] = useState("")
  const[env, setEnv] = useState("")
  const[ac, setAc] = useState("")
  const[generatedTicket, setSubmittedTicket] = useState("")
  const copy = async () => {

  try {
    await navigator.clipboard.writeText(generatedTicket);

    alert("Copied!");

  } catch (err) {
    alert("Failed to copy ticket :(");
  }
};

  return( 

    <div className='page'>

      <div className='header-section'>
        <h1>Ticket Sign Off Maker!</h1>
        <h2>Please enter the following information, click submit and copy your generated ticket</h2>
      </div>

      <div className='main-section'>

        <div className='form-section'>
          <h3>Ticket Information</h3>
        <div className='form-group'>
          <label>
            Ticket Summary:
            <textarea
                className='box'
                value={ticketSummary}
                onChange={(e) => setTicketSummary(e.target.value)}
            />
          </label>
        </div>

        <div className='form-group'>
          <label>
            Application and Build:
            <textarea
                className='box'
                value={application}
                onChange={(e) => setApp(e.target.value)}
            />
          </label>
        </div>

        <div className='form-group'>
          <label>
            Flags? (Y/N):
            <input
                type="text"
                className='box'
                value={flags}
                onChange={(e) => setFlag(e.target.value)}
            />
          </label>
        </div>

        <div className='form-group'>
          <label>
            Devices (iOS, Android, Web):
            <input
                type="text"
                className='box'
                value={devices}
                onChange={(e) => setDevices(e.target.value)}
            />
          </label>
        </div>

        <div className='form-group'>
          <label>
            Platform:
            <input
                type="text"
                className='box'
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
            />
          </label>
        </div>

        <div className='form-group'>
          <label>
            Environment:
            <input
                type="text"
                className='box'
                value={env}
                onChange={(e) => setEnv(e.target.value)}
            />
          </label>
        </div>

        <div className='form-group'>
          <label>
            Additional Comments:
            <textarea
                className='box'
                value={ac}
                onChange={(e) => setAc(e.target.value)}
            />
          </label>
        </div>

        <div className='button-group'>
          <button onClick={() => {
            const generatedTicket = `
    
            Ticket Summary: ${ticketSummary}
            Application and Build: ${application}
            Flags? (Y/N): ${flags}
            Devices (iOS, Android, Web): ${devices}
            Platform: ${platform}
            Environment: ${env}
            Additional Comments: ${ac}`;

            setSubmittedTicket(generatedTicket);

            fetch("http://localhost:8080/tickets", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
            ticketSummary,
            application,
            flags,
            devices,
            platform,
            env,
            ac
          })
          })
          .then((response) => response.text())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });}}> Submit</button>


          <button onClick={() => {
            setTicketSummary("")
            setApp("")
            setFlag("")
            setDevices("")
            setPlatform("")
            setEnv("")
            setAc("")
            setSubmittedTicket("")}}> Clear </button>
        </div>

      </div>

      <div className='ticketLayout'>
        <div className='ticketSubmission'>
          <h3>Sign Off Ticket</h3>

          <div className='ticketOutput'>
            <pre>{generatedTicket}</pre>
          </div> 

          {generatedTicket &&(
          <button onClick={copy} className="copy-btn">
                <img src={copyIcon} alt="Copy Icon" /></button>
          )}

          
        </div>
      </div>

      </div>
      
      
    </div>  
  );  
}


export default App;
