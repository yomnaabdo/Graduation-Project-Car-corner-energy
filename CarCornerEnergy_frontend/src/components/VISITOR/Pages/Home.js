import React from 'react';
import VideoBackground from '../../videobackground/VideoBackground.js';
import '../css/Home.css';
import CarPhoto from '../../../assests/imges/eren-goldman-mfqj3ZSs_h0-unsplash-removebg-preview.png';

function Home() {
    return (
        <div>
            <VideoBackground showButtons={true} />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 d-flex flex-column justify-content-center">
                        <h2>Welcome to Car-Corner Energy</h2>
                        <p>Discover the future of sustainable transportation with Car-Corner Energy. Our comprehensive website empowers electric car owners to easily locate the nearest charging stations, access real-time pricing, and take advantage of exclusive offers.</p>
                    </div>
                    <div className="col-md-6 text-center">
                        <img src={CarPhoto} className="img-fluid" alt="Electric Car Charging at Car-Corner Energy" />
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12">
                        <h3>Services :</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <div className="card-body">
                                <p className="card-text">Detecting the Nearest Electric Charging Station</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <div className="card-body">
                                <p className="card-text">Exclusive Charging Offers and Discounts</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4">
                            <div className="card-body">
                                <p className="card-text">Integrated AI-Powered Consumption Prediction</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
