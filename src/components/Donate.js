import React, {useState} from 'react';
import "../style/style.css";
import "../style/themes.css"
import { Button } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import uiBanner from "../images/ui-oms.png";
import {  Link, useHistory} from 'react-router-dom';
import ErrorIcon from '@material-ui/icons/Error';

import firebase from 'firebase';
import { useAuth } from "../context/AuthContext";
import NavUser from "./NavUser";

export default function Donate(){
  //variables
  const [error, setError] = useState('');
  const [showPasswordState, setShowPasswordState] = useState(false);

 
  const [usernameInput, setUsernameInput] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [usernameErrorState, setUsernameErrorState] = useState(false);

  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const [amountErrorState, setAmountErrorState] = useState(false);

 
  const { login } = useAuth();

  function showPassword(e) {
    e.preventDefault();
    setShowPasswordState(!showPasswordState);
  }
  function handleLoginSubmit(e) {
   
  }
  return (
    <div className = "position-relative">
      <div className="position-absolute full-width">
        <NavUser/>

      </div>
      <div className="">
        <main className="full-height flex-flow-wrap ">
          <div className="  pad-xy-md width-sm primary-bg-color-off-white full-height left-banner position-relative">
              <nav className="pad-y-sm pad-y-md ">
                <div className=" align-text-left pad-xy-md ">
                
                      <h2>Psalm 112:5</h2>
                    <p>Good will come to those who are generous and lend freely, who conduct their affairs with justice.</p>                    
                </div>
              </nav>
              <div className="graphics-offset">
                <img src={uiBanner} className="rotate" alt="Church"></img>
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
                  <h3>Donate</h3>     
                  <p>We are grateful for your donation, it will help us to further our goals</p>
                </div>
                <form autoComplete="off" onSubmit={handleLoginSubmit}>
                  <div className="pad-y-sm">
                       <TextField  error={usernameErrorState} helperText={usernameError} onChange={e => { setUsernameInput(e.target.value) }} value={usernameInput} id="outlined-full-width" fullWidth label="Name (optional)" variant="outlined" type="text" className="text-input-deafult" />

                  </div>
                  <div>
                  
                    <div>
                    <div className="pad-y-sm position-relative">
                        <TextField type="text" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} error={amountErrorState} helperText={amountError} onChange={e => { setAmount(e.target.value) }} value={amount} id="outlined-full-width" fullWidth label="Amount" variant="outlined" className="text-input-deafult" />
                      </div>
                    </div>
                    <div className="pad-y-sm">
                      <Button
                        variant="contained"
                        className="btn-large primary-color full-width"
                        color="secondary"
                        size="large"
                        id="btn-large-primary"
                        type="submit">
                        Donate
                      </Button>
                    </div>
                      
                  
                    </div>
                  
                </form>
              </div>
          </div>
        </main>
        </div>
    </div>
      
  );
}

