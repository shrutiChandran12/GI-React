/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import apiManager from '../../utils/apiManager';
import { registerGuestUser, getCurrentTime } from '../../utils/initialManager';
import { getCookie,isMobile,isTab } from '../../utils/utilityManager';
import LoadingIndicator from '../../utils/loadingIndicator';
import {createBrowserHistory} from 'history';

import {
  accessTokenCookie,
  getTheAccessToken,
  newsletterTokenCookie,
  newsletterStatusAPI,
  ipDataApi,
  mapKey
} from '../../../public/constants/constants';

import {
 validatePindcode
} from '../../utils/validationManager';

import appCookie from '../../utils/cookie';

// import HomePageContainer from '../HomePageContainer/index';
import HomePageContainer from '../HomePageContainer/homepage';
import HeaderContainer from '../HeaderContainer/index';
import ClpContainer from '../ClpContainer/index';
import PlpContainer from '../PlpContainer/index';
import PdpContainer from '../PdpContainer/pdp';
import FooterContainer from '../FooterContainer/footer';
import RegisterNow from '../../components/RegisterComponent/registerModalData';
import ForgotpassContainer from '../ForgotPasswordContainer/forgotpassword';
import NewsletterModel from '../../components/NewsletterModel/newsletterModel';
import CompareContainer from '../comparePageContainer/index';
import CheckoutContainer from '../checkoutContainer/index';
import '../../../public/styles/app.scss';
import MyWishlist from '../../components/MyWishlist/myWishlist';
import client from '../../utils/apiManager';
import AboutUsContainer from '../aboutUsContainer/index';
import Inspiration from '../InspirationCont/index';
import Kitchens from '../KitchensContainer';
import SteelChefKitchen from '../KitchensContainer/kitchen2';
import WillowKitchen from '../KitchensContainer/willowKitchen';

import InspirationDetails from '../InspirationDetailsContainer/index';
import WardrobesContainer from '../wardrobesContainer';
import privacyPolicy from '../privacyPolicy/index';
import HelpSupport from '../serviceSupportContainer/index';
import TermsConditions from '../termsAndConditions/index';
import CookiePolicy from '../CookiePolicy/index';
import MyAccount from '../MyAccountContainer/index';
import GuestTrackOrder from '../../components/MyAccountComponents/GuestTrackOrder/guestTrackOrder';
import SearchContainer from '../Search Container/searchContainer';
import OrderConformtion from '../orderConfirmation/index'
import CartDetail from '../CartContainer/cartContainer';
import StoreLocator from '../../components/StoreLocator/storeLocator';
import Directions from '../../components/StoreLocator/index';
import LightHeader from '../../components/HeaderComponent/headerL1/lightHeader';
import Invoice from '../../components/MyAccountComponents/MyOrder/invoice';
import paymentWait from '../../components/checkout/paymentWait';
import Geocode from "react-geocode";
import NotFound from '../HomePageContainer/notfound';
import Maintenance from '../HomePageContainer/Maintenance';

// import  {createBrowserHistory} from 'history';
// export const history =createBrowserHistory();
// alert(history,'history');

// history.listen(({pathname}) => {
//   shouldScrollLogin && window.scrollTo(0,0)
// });


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isMobile: window.innerWidth <= 760,
      accessToken: '',
      showNewsLetter: false,
      loading: true
    };
    this.resize = this.resize.bind(this);
    this.guestLoginCallback = this.guestLoginCallback.bind(this);
  }

  componentDidMount() {
    this.initialLoginHandling();
    this.newsletterPopupHandling();
    this.cookiePolicyPopup();
    window.addEventListener('resize', this.resize);
    this.resize();
    this.getCurrentLocation();
    this.getIPData();

  }

  componentWillUpdate() {
    let header = document.getElementById("header");
    let pathurl=window.location.href;
    if(header) {
      header.classList.remove("sticky");
    } 
	
    if(pathurl.includes("sort")){
       $('html, body').stop().animate();
    }
    else if(pathurl.includes("filter")){
       $('html, body').stop().animate();
    }
	else {
	   $('html, body').animate({ scrollTop: 0 }, 'fast');
	}
    
  }

  initialLoginHandling() {
    const token = getCookie(accessTokenCookie);
    if (token != '') {
      this.setState({ accessToken: token });
    } else {
      /* Check if User is logged-in or Guest */
      // if (isLoggedIn) {
      // } else {
      registerGuestUser(this.guestLoginCallback);
      // }
    }
  }

  newsletterPopupHandling() {
    if (
      getCookie(newsletterTokenCookie) &&
      getCookie(newsletterTokenCookie) != null
    ) {
      this.setState({ showNewsLetter: false });
    } else {
      // this.setState({ showNewsLetter: true });
      // Hit api if NewsletterCookie is null/Empty
      // If yes -> Don't show the Popup
      // If No -> Show the Pop UP
      this.getNewsletterSubscriptionStatus();
      // this.setState({ showNewsLetter: true });
    }
  }

  cookiePolicyPopup() {
    if (appCookie.get('isCookiePolicy') !== 'false') {
      appCookie.set('isCookiePolicy', true, 365 * 24 * 60 * 60 * 1000);
    }
  }

  getNewsletterSubscriptionStatus() {
    apiManager
      .get(newsletterStatusAPI)
      .then(response => {
        if (!response.data.data.alreadySubscribed) {
          this.setState({ showNewsLetter: true });
        }
      })
      .catch(error => {});
  }

  guestLoginCallback(token) {
    if (token != '') {
      getTheAccessToken(token);
      this.setState({ accessToken: token });
      this.getNewsletterSubscriptionStatus();
    } else {
    }
  }

  resize() {
    this.setState({ isMobile: window.innerWidth <= 760 });
  }

  // IP Data Call.
	getIPData() {
		if( appCookie.get('pincode') === null && appCookie.get('pincodeUpdated') !== true) {
			var request = new XMLHttpRequest();
			request.onreadystatechange = function () {
				if (this.readyState === 4 && this.status == 200) {
					var ipData = JSON.parse(this.responseText);
					var ipDataPostCode = ipData.postal;
					appCookie.set('pincode', ipDataPostCode, 365 * 24 * 60 * 60 * 1000);
				}
				else {
					appCookie.set('pincode', '400079', 365 * 24 * 60 * 60 * 1000);
				}
			};
			request.open('GET', ipDataApi);
			request.setRequestHeader('Accept', 'application/json');
			request.send();
		}
		
  	}
  
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }

    function showPosition(position) {
      Geocode.setApiKey(mapKey);
      Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
        response => {
          const address = response.results[0].formatted_address;
          const data = address.replace(', India', '');
          const postalCode = data.substr(data.length -6);
          if (validatePindcode(postalCode) === true && !appCookie.get('pincodeUpdated')) {
            appCookie.set('pincode', postalCode, 365 * 24 * 60 * 60 * 1000);
            this.setState({
              loading: false
            })
          }          
        },
        error => {
        }
      );
     }
    }

  checkCookiePolicyPopup() {
    if (appCookie.get('isCookiePolicy') === 'true' && window.location.pathname !== '/') {
      appCookie.set('isCookiePolicy', false, 365 * 24 * 60 * 60 * 1000);
    } 
  }

  checkSearchInput() {
    if (window.location.pathname !== '/search' && document.getElementById("searchInput")) {
      document.getElementById("searchInput").value='';     
      const crossbtn = document.getElementById('clearField');
      if (crossbtn) {
        crossbtn.style.display='none';
      }
    }
  }
  
  

  render() {
    if (this.state.accessToken === '') {
      return <LoadingIndicator />;
    }
    this.checkCookiePolicyPopup();
    this.checkSearchInput();
    
    let newsletterItem;
    if (this.state.showNewsLetter) {
      newsletterItem = <NewsletterModel />;
    } else {
      newsletterItem = null;
    }

    const { isMobile } = this.state;
    return (
      <div>
        {newsletterItem}
        {window.location.pathname.includes('/check/payment/') ? '' : window.location.pathname === '/cart' || window.location.pathname === '/checkout'  ? (
          <LightHeader />
        ) : (
          <HeaderContainer />
        ) }
        {/* {window.location.pathname === '/cart' || window.location.pathname === '/checkout'  ? (
          <LightHeader />
        ) : (
          <HeaderContainer />
        )} */}
        
        {/* <HeaderContainer /> */}
		<div id="mainContainer">
        <Switch>
          <Route exact path="/" component={HomePageContainer} />
          <Route path="/rooms-:category/:id" component={ClpContainer} />
          <Route path="/furniture:id" component={PlpContainer} />
          <Route path="/pdp/:productId/:skuId" component={PdpContainer} />
          <Route path="/forgotpassword" component={ForgotpassContainer} />
          <Route path="/register" component={RegisterNow} />
          <Route path="/compare" component={CompareContainer} />
          <Route path="/wishlist" component={MyWishlist} />
          <Route path="/myAccount" component={MyAccount} />
          <Route path="/checkout" component={CheckoutContainer} />
          <Route path="/guestTrackOrder" component={GuestTrackOrder} />
          <Route path="/search" component={PlpContainer} />
          <Route path="/order/confirm/:orderId" component={OrderConformtion} />
          <Route path="/cart" component={CartDetail} />
          <Route path="/storelocator" component={StoreLocator} />
          <Route path="/direction/:originLat/:originLng/:destinationLat/:destinationLng" component={Directions} />
          <Route path="/termsconditions" component={TermsConditions} />
          <Route path="/cookie-policy" component={CookiePolicy} />
          <Route path="/inspiration" component={Inspiration} />
          <Route path="/kitchens" component={Kitchens} />
          <Route path="/chef-kitchen" component={SteelChefKitchen} />
          <Route path="/willow-kitchen" component={WillowKitchen} />

      
          <Route path="/lookbook" component={InspirationDetails} />
          <Route path="/wardrobes" component={WardrobesContainer} />
          <Route path="/privacy-policy" component={privacyPolicy} />
          <Route path="/about-us" component={AboutUsContainer} />
          <Route path="/support" component={HelpSupport} />
          <Route path="/invoice/:invoiceId" component={Invoice} />
          <Route path="/check/payment/:orderId" component={paymentWait} />

          <Route path="*" component={NotFound} />
          <Route path="/502" component={Maintenance} />
          
          
        </Switch>
		</div>
        {window.location.pathname === '/cart' || window.location.pathname === '/checkout' || window.location.pathname === '/myAccount'|| window.location.pathname.includes('/check/payment/') || window.location.pathname.includes('/order/confirm/') ? '' : <FooterContainer /> }
      </div>
    );
  }
}

export const history = createBrowserHistory();	