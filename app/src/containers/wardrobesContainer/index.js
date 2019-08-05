import React, { Component } from 'react'
import  '../../../public/styles/static-pages/warobes.scss'
import DreamKitchens from '../../components/KitchensComp/DreamKitchens'
import InsCrousel from '../../components/Primitives/crousel'
import AlwaysRemember from '../../components/KitchensComp/AlwaysRemember';
import WardrobesHAll from '../../components/wardrobesComponent/wardrobeHall.js';
import WhyPeopleLove from '../../components/KitchensComp/whyPeople';
import WhatGoes from '../../components/KitchensComp/WhatGoes';
import BeforeAfter from '../../components/KitchensComp/beforeAfterSlider';
import WardrobeBanner from '../../components/wardrobesComponent/wardrobesBanner';
import WardrobesTypes from '../../components/wardrobesComponent/wadrobesTypes';
import WhatGoesward from '../../components/wardrobesComponent/whatgoesWard.js'
import ConsultationForm from '../../components/Primitives/ConsultForm'
import {Link} from 'react-router-dom'
import WbEspots from '../../components/wardrobesComponent/wardrobesBenefits';
import WIEspots from '../../components/wardrobesComponent/wardrobesInterio';


export default class WardrobesContainer extends React.Component {
    constructor(props){
        super(props);
        const scatchImg1 =  require('../../../public/images/scatch1.png')
        const scatchImg2 =  require('../../../public/images/btnsch2.jpg')
        const scatchImg3 =  require('../../../public/images/btnsch3.jpg') 

        this.state = {
            imgList: [scatchImg1,scatchImg2,scatchImg3],
index: 0
        }
    }

    onHandleClickFirst= () => {
        if (this.state.index === 0 || this.state.index === 2){
          this.setState({index:1})
        } 
      };
      onHandleClickSecond(){
        if (this.state.index === 0 || this.state.index === 1){
          this.setState({index:2})
        } 
      }
      onHandleClickThird(){
        if (this.state.index === 1 || this.state.index === 2){
          this.setState({index:0})
        }
      }


    render(){
        return (
            <div className="wardrobes1">
              <div className="wardroBanner">
                <WardrobeBanner />
                <div className="bannerTextcontainer">
                  <div className="wardroBannertext">
                    {/* <h4 className="heading">Modular Wardrobe Ardra</h4>
                    <p className="subText">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                      eiusmod<br /> tempor incididunt ut labore et dolore magna aliqua. <br />
                      the home you've always wanted</p> */}
                      <a  href= "#form_consult">
                        <button className="btn-book">Book A Consultation</button></a>
                   
                  </div>
                </div>
                
              </div>
              <WbEspots/>
              {/* <div className="BenefitedWardrobes">
                <div className="container">
                  <h1 className="Benefits-of-Modular">Benefits of Modular Wardrobes</h1>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="WardrowsBefits clearfix">
                        <div className="col-sm-3">
                          <img className="Combined-Shape" src='https://192.168.0.57/imagestore/B2C/56101502SD00616/56101502SD00616_01_500x500.png'
                            alt="rectangle" />
                          <h3 className="titlesss">modular</h3>
                        </div>
                        <div className="col-sm-3">
                          <img className="Combined-Shape" src='https://192.168.0.57/imagestore/B2C/56101502SD00616/56101502SD00616_01_500x500.png'
                            alt="rectangle" />
                          <h3 className="titlesss">modular</h3>

                        </div>
                        <div className="col-sm-3">
                          <img className="Combined-Shape" src='https://192.168.0.57/imagestore/B2C/56101502SD00616/56101502SD00616_01_500x500.png'
                            alt="rectangle" />
                          <h3 className="titlesss">modular</h3>

                        </div>
                        <div className="col-sm-3">
                          <img className="Combined-Shape" src='https://192.168.0.57/imagestore/B2C/56101502SD00616/56101502SD00616_01_500x500.png'
                            alt="rectangle" />
                          <h3 className="titlesss">modular</h3>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="WardrowsBefits column2 clearfix">
                        <div className="col-sm-6">
                          <img className="Combined-Shape" src='https://192.168.0.57/imagestore/B2C/56101502SD00616/56101502SD00616_01_500x500.png'
                            alt="rectangle" />
                          <h3 className="titlesss">modular</h3>

                        </div>
                        <div className="col-sm-6">
                          <img className="Combined-Shape" src='https://192.168.0.57/imagestore/B2C/56101502SD00616/56101502SD00616_01_500x500.png'
                            alt="rectangle" />
                          <h3 className="titlesss">modular</h3>
 </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="crouselBAckgrounding">
                <h1 className="Types-of-Modular-War">Types of Modular Wardrobes</h1>
                <WardrobesTypes />
              </div>
              <div className='whatGoesContainer'>
              <div className="container">
                <div className="row">
                  <h1 className="What-goes-into-a-Mod ">What goes into a Modular wardrobe</h1>
                  <p className="whatgoessubhead">Choose from a vast range of acessories. Consectetur adipisicing
                    elit, sed do eiusmod tempor incididunt ut labore<br /> et dolore magna aliquat enim ad minim veniam,
                    quis nostrud exercitation Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                  <div className="col-md-6">
                    <h1 className="AccessoriesText">Accessories</h1>
                    <p className="whatGoesPara">Choose from a vast range of acessories. Consectetur
                      adipisicing elit,<br /> sed do eiusmod tempor incididunt ut labore et dolore magna aliquat<br />
                      enim ad minim veniam, quis nostrud exercitation Lorem ipsum dolor<br /> sit amet, consectetur
                      adipisicing elit.<br /> </p>
<ul className="moved">
  <li> <a className="Materials-and-Finish">Materials and Finishes</a>
  </li>
  <li> <a className="Materials-and-Finish">Element</a>
  </li>
  <li> <a className="Materials-and-Finish">Add-ones</a>
  </li>

</ul>
                  </div>
                  <div className="col-md-6">
                    <WhatGoesward />

                  </div>
                </div>
              </div>
              </div>
              <div className='wardroHallCont'>
              <WardrobesHAll />
              </div>
              <div id="form_consult" className="formwardrobeContainer">
              <div className="container">
                <img className="formBackGroundCover" src={require('../../../public/images/inspi9.jpg')} alt="Snow" />
                <div  className="Form-bakground">
                  {/* <h2 className="Book-a-consultation">Book a consultation</h2>
                  <p className="Answer">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor. </p> */}
                  <ConsultationForm />
                </div>
                </div>
              </div>
              <div className="frequesntly">
                <div className="container">
                <h className="Frequently-Asked-Que">Frequently asked questions</h>
                <div className="panel-group" id="accordion">
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h4>
                        <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion"
                          href="#collapseTwo">What do I need to start my project?</a>
                      </h4>
                    </div>
                    <div id="collapseTwo" className="panel-collapse collapse">
                      <div className="panel-body">
                        Any registed user, who presents a work, which is genuine and appealing, can post it on
                        <strong>PrepBootstrap</strong>.
                      </div>
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h4>
                        <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion"
                          href="#collapseThree">What warranty does Godrej Interio have for its products?</a>
                      </h4>
                    </div>
                    <div id="collapseThree" className="panel-collapse collapse">
                      <div className="panel-body">
                        I want to customize one of your products, can I do that?:
                        <ul>
                          <li>Register an account</li>
                          <li>Activate your account</li>
                          <li>Go to the <strong>Themes</strong> section and upload your theme</li>
                          <li>The next step is the approval step, which usually takes about 72 hours.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h4>
                        <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion"
                          href="#collapseFive">Want to customize one of your products, can I do that?</a>
                      </h4>
                    </div>
                    <div id="collapseFive" className="panel-collapse collapse">
                      <div className="panel-body">
                        Here, at <strong>PrepBootstrap</strong>, we offer a great, 70% rate for each seller, regardless
                        of any restrictions, such as volume, date of entry, etc.
                        <br />
                      </div>
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h4>
                        <a className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion"
                          href="#collapseSix">Are there any delivery charges or installation charges?</a>
                      </h4>
                      <br></br>
                    </div>
                    <div id="collapseSix" className="panel-collapse collapse">
                      <div className="panel-body">
                        There are a number of reasons why you should join us:
                        <ul>
                          <li>A great 70% flat rate for your items.</li>
                          <li>Fast response/approval times. Many sites take weeks to process a theme or template. And if
                            it gets rejected, there is another iteration. We have aliminated this, and made the process
                            very fast. It only takes up to 72 hours for a template/theme to get reviewed.</li>
                          <li>We are not an exclusive marketplace. This means that you can sell your items on
                            <strong>PrepBootstrap</strong>, as well as on any other marketplate, and thus increase your
                            earning potential.</li>
                          <li>A great 70% flat rate for your items.</li>
                          <li>Fast response/approval times. Many sites take weeks to process a theme or template. And if
                            it gets rejected, there is another iteration. We have aliminated this, and made the process
                            very fast. It only takes up to 72 hours for a template/theme to get reviewed.</li>
                          <li>We are not an exclusive marketplace. This means that you can sell your items on
                            <strong>PrepBootstrap</strong>, as well as on any other marketplate, and thus increase your
                            earning potential.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              {/* <div className="container">
                <img className="bigSofa" src={require('../../../public/images/inspi9.jpg')} alt="rectangle" />
                <div className="text-blocks">
                  <h1 className="Image-gallery-Copy-3">Our store</h1>
                  <h4 className="Image-gallery-Copy-3 ">Experience our store facilities</h4>
                  <p2 className="A-one-stop-shop-inte">Experience our wardrobe at <span className="spanish">Vikroli
                      Godrej Store (1.6 km away)</span><br />
                    You can find more stores around you.<br />
                    the home you've always wanted</p2> <br />
                  <button className="seeMored">Find More Stores</button>
                </div>
              </div> */}
              <div className="exp-our-kitchen">
              <div className="container">
                <div className="mainImg">
                <img className="bigSofa" src={require('../../../public/images/inspi9.jpg')} alt="rectangle" />
                <div className="ourStores">
                  <h3 className="h3Css">Our store</h3>
                  <h2 className="h2Css">Experience our Store facilities</h2>
                  <p className="paragraphcss">Experience our wardrobes at <span className="spanish">Vikroli
                      Godrej Store (1.6 km away) </span>
                    You can find more stores around you.</p> 
                    <Link to='/storelocator'>
                    <button className="storeButton">Find More Stores</button>
                    </Link>
                  
                </div>
                </div>
                
                </div>
              </div>
              <WIEspots/>
              <div className="modularWardrobes">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <h3 className="heading">Modular Wardrobes</h3>
                      <p className="subText">Godrej Interio is India’s largest furniture brand. From
                        manufacturing the humble Storwel cupboard 80 years back to being a vibrant, innovative brand
                        with a
                        diverse portfolio<br /> – it’s been a brilliant, exciting journey for us.<br />

                        We love bringing alive your dream space. We emphasize comfort and aesthetics while delivering
                        well
                        designed, fun and functional furniture solutions to you.<br />

                        True to the Godrej mission to conserve the environment, we design products, set up processes and
                        use
                        raw materials that are eco-friendly to do our bit to preserve natural<br /> resources.<br />

                        We offer our customers home and office furniture, along with solutions for laboratories,
                        hospitals
                        and healthcare establishments, education and training institutes, shipyards<br /> and navy,
                        auditoriums and stadiums. We are present across India through our 50 exclusive showrooms in 18
                        cities
                        and through 800 dealer outlets.<br />

                        Godrej Interio is a business unit of Godrej & Boyce Mfg. Co. Ltd. - part of the Godrej Group,
                        one of
                        India’s largest engineering and consumer product groups.</p>
                      <button className="Read-More">Read More</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}
