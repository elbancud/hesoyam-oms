import React, {useState } from 'react';
import "../style/style.css";
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import uiBanner from "../images/ui-oms.png";
import {   useHistory} from 'react-router-dom';
import ErrorIcon from '@material-ui/icons/Error';
import validator from 'validator';
import firebase from 'firebase';


const Login = (props) => {
  //variables
  const history = useHistory();
  const [error, setError] = useState('');

  const [emailInput, setEmailInput] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailErrorState, setEmailErrorState] = useState(false);
  
  function handleSubmitEmail(e) {
    e.preventDefault();

    if (emailInput === "") {
      setEmailError("Please enter your Email");
      setEmailErrorState(true);
      setError("Please complete the fields");
    } else if (!validator.isEmail(emailInput)) {
      setEmailError("Please enter a valid email");
      setEmailErrorState(true);
      setError("Please enter a valid email");
    } else {
        firebase.auth().sendPasswordResetEmail(emailInput)
        .then(() => {
            alert("success");
            
        })
        .catch((error) => {
        
        });

        setError("");
        setEmailErrorState("");
        setEmailErrorState(false);
        history.push("/login");
    }
   
       
    
  }
  return (
    <div>
  
      <main className="full-height flex-flow-wrap">
        <div className="pad-xy-md width-sm tertiary-gradient full-height left-banner position-relative">
            <nav className="pad-y-sm pad-y-md ">
              <div className=" align-text-left pad-xy-md ">
                  <div className="app-name align-text-center">
                        <h3 className="secondary-color-text">Hesoyam</h3>
                    </div>
                   <h2>Trouble remembering your password? Say less, We got you covered</h2>                    
                    
              </div>
            </nav>
            <div className="graphics">
              <img src={uiBanner} className="rotate" alt="church banners"></img>
            </div>
        </div>
        <div className="full-width">
          <div className="pad-xy-sm width-sm ">
              {error &&
                  <div className="flex-default">
                    <div className="m-r-sm">
                      <ErrorIcon className= "error-red" />
                    </div>
                    <p className= "error-red" ><b>{error}</b></p>
                  </div>
              }
              <div className="subtitle ">
                <h3>Forgot password</h3>     
              </div>
              <form autoComplete="off" onSubmit={handleSubmitEmail}>
                <div className="pad-y-sm">
                    <TextField error={emailErrorState} helperText={emailError} onChange={e => {setEmailInput(e.target.value)}} value={emailInput}   id="outlined-full-width" fullWidth label="Email" variant="outlined" className="text-input-deafult"/>
                </div>
                <div>
                  
                  
                  <div className="pad-y-sm">
                    <Button
                    variant="contained"
                    className="btn-large primary-color full-width"
                    color="secondary"
                    size="large"
                    id="btn-large-primary"
                    type="submit">
                        Send reset link
                    </Button>
                  </div>
                
                  </div>
                
              </form>
            </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
