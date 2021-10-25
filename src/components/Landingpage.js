import React from "react";
import "../style/style.css";
import { Button } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import TopNavigation from "./TopNavigation.js";
import uiBanner from "../images/ui-oms.png";
import work from "../images/Work.gif"
import seat from "../images/Seat.gif"
import gift from "../images/Gift.gif"
import {useHistory} from "react-router-dom";

function Landingpage() {

  const history = useHistory();
  const redirectToLogin = () => history.push('/login');
  return (
    <div>
      <header className="primary-gradient padding-sm position-relative ">

        <Container maxWidth="lg" className="overflow-hidden-x pad-yb-md position-relative">
              <img className="bannner-offset" src={uiBanner} alt="church banner"></img>

          <nav className="pad-y-sm flex-space-between">
            <div className="logo flex-default">
                <div className="icon"></div>
                <div className="app-name">
                    <h3>Hesoyam</h3>
                </div>
            </div>
            <div className="nav-desktop-active">
              <ul className="flex-default">
                
                <li><a href="#features">Features</a></li>
                <li><a href="#aboutUs">About Us</a></li>
            </ul>
            </div>
            <div className="nav-desktop-active">
              <Button
                  onClick={redirectToLogin}
                  variant="outlined"
                  className="btn-large primary-color"
                  color="secondary"
                  size="large"
                  id="btn-large-primary-outline"
                  >
                  Sign in
                  
                  </Button>
            </div>
            <div className="burger-nav">
              <TopNavigation></TopNavigation>
            </div>
          </nav>
          <section className="flex-default pad-y-md">
            <div className="header-banner">
              <h1>Generate Faith Instantly</h1>
              <p className="pad-y-sm">
                How awesome would it be to generate a website and automate the church operation system within seconds?.  We are mirrored to your church activities, but here we take it to another step. 
              </p>
              <Button
                onClick={redirectToLogin}
                variant="contained"
                className="btn-large primary-color"
                color="secondary"
                size="large"
                id = "btn-large-primary"
              >
                Explore
              </Button>
            </div>
            {/* <div className="banner-graphics">
            </div> */}
          </section>
        </Container>
      </header>

      <Container>

      <main className="pad-y-lg " id="features">
         <div className="title-section ">
           <h4 className="primary-color-text ">Features</h4>
            <h2>So here's what we promise to deliver</h2>
            <p>
              Here we prioritize and lay out what you expect an operation management system does.
            </p>
          </div>
          <section className="">
            <Container>
                <div className="flex-no-wrap">
                  <div className="box-md graphics">
                    <img src={work} alt="church banner"></img>
                  </div>
                  <div className="subtitle box-sm">
                    <h1 >Indulge in a <span className="primary-color-text">virtual appointment system</span></h1>
                    <p className="pad-y-sm">Here we let church goers and church service users to conveniently arrange their appointments with the help of properly managed virtual calendars. </p>
                   
                  </div>
                </div>
            </Container>
        </section>
        {/* className="bg-secondary-opacity" */}
          <section className="pad-y-lg ">
            <Container >
              <div className="move-left-right">
                  <div className="subtitle box-sm move-left">
                    <h1 >Searching for your <span className="primary-color-text">comfort place </span> is made Easy</h1>
                    <p className="pad-y-sm">Introducing the seat arrangement reservation where in admins could customize the seat plans mirrored to the church's arrangement and let church goers reserve them.</p>
                   
                  </div>
                  <div className="box-md graphics move-right">
                    <img src={seat} alt="church banner"></img>
                    
                  </div>
                  
                </div>
            </Container>
        </section>
        <section className="">
            <Container>
                <div className="flex-no-wrap">
                  <div className="box-md graphics">
                    <img src={gift} alt="church banner"></img>
                  </div>
                  <div className="subtitle box-sm">
                    <h1 >The gift of God which lets us hear the<span className="primary-color-text"> words of sermons </span> is here</h1>
                    <p className="pad-y-sm">Upload the sessions in a podcast method and let those words be heard to the unreachable ones.</p>
                
                  </div>
                </div>
            </Container>
          </section>
      </main>
      </Container>

      <main className="secondary-color pad-xy-sm">
        <div className="title-section light-fonts">
          <h2>You write it, We build it</h2>
          <p>
            What does it take to generate your church online? Literally a few
            clicks away
          </p>
        </div>
      </main>
      {/* egistration sections */}
      <main className="secondary-gradient pad-xy-sm " id="aboutUs">
        <div className="title-section text-align-center ">
          <h2>Ready to get Started?</h2>
          <p>
            Explore us or contact and seek for an advince and we will be more than happy to serve you, you know the drill. 
          </p>
          <div className="flex-default-center-xy">
            <div className="pad-xy-sm">
            <Button
                      variant="contained"
                      className="btn-large primary-color"
                      color="secondary"
                      size="large"
                      id = "btn-large-primary"
                    >
                      Yes, Let's go!
            </Button>
            </div>
            
          </div>
        </div>
      </main> 
      
      <footer >
        <div className="grid-template-col">
          <div className="logo flex-default">
                  <div className="icon"></div>
                  <div className="app-name">
                      <h3>Hesoyam</h3>
                  </div>
          </div>
          <div className="pd-xy-md">
            <ul>
              <li><b>Social media</b></li>
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Twitter</li>
              
            </ul>
          </div>
          <div className="pd-xy-md">
            <ul>
              <li><b>Company</b></li>
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Twitter</li>
              
            </ul>
          </div>
          <div className="pd-xy-sm">
            <ul>
              <li><b>Suport</b></li>
              <li>Report a Bug</li>
              <li>Guides</li>
              
            </ul>
            </div>
        </div>
      </footer>

      </div>
  );
}

export default Landingpage;
