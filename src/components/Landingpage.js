import React from "react";
import "../style/style.css";
import { Button } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import TopNavigation from "./TopNavigation.js";
import uiBanner from "../images/ui-oms.png";
import virtualCalendar from "../images/virtual-calendar.png";
import {useHistory} from "react-router-dom";

function Landingpage() {

  const history = useHistory();
  const redirectToLogin = () => history.push('/login');
  return (
    <div>
      <header className="primary-gradient padding-sm ">
        <Container maxWidth="lg" className="pad-yb-md ">
          <nav className="pad-y-sm flex-space-between">
            <div className="logo flex-default">
                <div className="icon"></div>
                <div className="app-name">
                    <h3>Hesoyam</h3>
                </div>
            </div>
            <div className="nav-desktop-active">
              <ul className="flex-default">
                
                <li><a href="#Features">Features</a></li>
                <li><a href="#AboutUs">About Us</a></li>

             
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
            <div className="banner-graphics">
              <img src={uiBanner} alt="cms banner"></img>
            </div>
          </section>
        </Container>
      </header>

      <main className="secondary-color pad-xy-sm">
        <div className="title-section light-fonts">
          <h2>You write it, We build it</h2>
          <p>
            What does it take to generate your church online? Literally a few
            clicks away
          </p>
        </div>
      </main>
      <main id="Features">
          <section className="pad-xy-sm">
            <Container>
                <div className="flex-no-wrap">
                  <div className="subtitle box-sm">
                    <h1 >Indulge in a virtual appointment system</h1>
                    <p className="pad-y-sm">Check in your available schedules in a particular service and mark it in the virtual calendar. We</p>
                    <Button
                      onClick={redirectToLogin}
                      variant="contained"
                      className="btn-large primary-color"
                      color="secondary"
                      size="large"
                      id = "btn-large-primary"
                    >
                      Start your website
                    </Button>
                  </div>
                  <div className="box-md graphics">
                    <img src={virtualCalendar} alt="virtual calendar"></img>
                  </div>
                </div>
            </Container>
          </section>
          <section className="bg-secondary-opacity">
            <Container >
              <div className="flex-no-wrap pad-xy-sm">
                <div className="box-md graphics">
                    <img src={virtualCalendar} alt="seat arrangement virtual"></img>
                    
                  </div>
                  <div className="subtitle box-sm">
                    <h1 >Comfort is at the tip of your finger</h1>
                    <p className="pad-y-sm">Here we let users pick the seat of your choice. Don’t worry QR will be generated for verification.</p>
                    <Button>
                      <b className="primary-color-text">Learn More ></b>
                    </Button>
                  </div>
                  
                </div>
            </Container>
        </section>
        <section className="pad-xy-sm">
            <Container>
                <div className="flex-no-wrap">
                  <div className="subtitle box-sm">
                    <h1 >Indulge in a virtual appointment system</h1>
                    <p className="pad-y-sm">Check in your available schedules in a particular service and mark it in the virtual calendar</p>
                    <Button
                      variant="outlined"
                      className="btn-large primary-color"
                      color="secondary"
                      size="large"
                      id="btn-large-primary-outline"
                    >
                      Start your website
                    </Button>
                  </div>
                  <div className="box-md graphics">
                    <img src={virtualCalendar} alt="start website"></img>
                  </div>
                </div>
            </Container>
          </section>
      </main>
      <main id="AboutUs">

      </main>
      {/* egistration sections */}
      <main className="secondary-gradient pad-xy-sm ">
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
            <div className="">
              <Button>
                        <b className="primary-color-text">Learn More ></b>
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
