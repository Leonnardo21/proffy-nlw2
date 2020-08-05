import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import landingImg from '../../assets/landing.svg';
import studyIcon from '../../assets/icons/study.svg';
import giveClassIcon from '../../assets/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/icons/purple-heart.svg';
import './styles.css';


function Landing(){
    return(
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy Logo"/>
                    <h2>Sua plataforma de estudos online.</h2>
                </div>
            
                <img src={landingImg} 
                    alt="Plataforma de Estudos" 
                    className="hero-image"
                />
                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="Estudar"/>
                        Estudar
                    </Link>
                    <Link to="give-classes" className="give-classes">
                        <img src={giveClassIcon} alt="Estudar"/>
                        Dar aula
                    </Link>
                </div>
                <span className="total-connections">
                    Total de 200 conexões já realizadas <img src={purpleHeartIcon} alt="Coração roxo"/>
                </span>
            </div>
        </div>
    );
}

export default Landing;