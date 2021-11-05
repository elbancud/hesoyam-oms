import React from 'react';
import "../style/style.css";
import { Link} from "react-router-dom";

export default function PageNotFound() {

    return (
        <div>
            <div className="page-not-found">
                <div>
                    <div className="app-name">
                        <Link to="/">
                                <h3 className="secondary-color-text">Hesoyam</h3>
                        </Link>
                    </div>
                    <h1 >Oopsiee! We can’t find that page.</h1>
                    <p className="pad-y-sm">While you're here. Might as well explore the site.</p>
                    <iframe src="https://giphy.com/embed/dvx3Oy3RXKAWQ4ZqJh" width="150" height="150" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/meme-yohammohammo-sassy-easter-dvx3Oy3RXKAWQ4ZqJh">via GIPHY</a></p>
                </div>
            </div>


        </div>


    );

};