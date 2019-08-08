import React, { Component } from 'react'
import ReactCompareImage from 'react-compare-image'; 
import apiManager from '../../utils/apiManager';
import '../../../public/styles/slider.scss';
import  '../../../public/styles/static-pages/kitchens.scss'

import {
  beforeAfterApi,
  imagePrefix,
  storeId,
  accessToken,
} from '../../../public/constants/constants';
class BeforeAfter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beforeImage: '',
      afterImage: '',
      isLoading: false,
      error: null,
      title: '',
      imageDescription: '',
      type: '',
imageHeading: ""
    };
  }

  beforeAfterDataCall() {
    apiManager
      .get(beforeAfterApi)
      .then(response => {
        console.log('response of whatgoes banner', response)
        const {data} = response || {}
        this.setState({
          beforeImage: data && data.data.BeforeImg.imageSrc,
          afterImage: data && data.data.AfterImg.imageSrc,
          imageDescription: data && data.data.imgDesc,
          type: data && data.data.type,
          isLoading: false,
          imageHeading:  data && data.data.imgHeading
        });
        console.log('b4after Data',  data.data.BeforeImg.imageSrc);
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false,
        });
        console.log('SLider Data Error');
      });
    console.log('SLider Data Error');
  }
  

  componentDidMount() {
    this.beforeAfterDataCall();
  }

beforeSlide = () => {
  if (!error){
    }
}


  render () {
    const beforeImg = imagePrefix + this.state.beforeImage
    const afterImg = imagePrefix + this.state.afterImage
console.log('iamges check', afterImg)
    const before = {beforeImg}
    const after = {afterImg}
 
    return (
      <>

<ReactCompareImage leftImage={imagePrefix + this.state.beforeImage} rightImage={imagePrefix + this.state.afterImage} />
      </>
     
    )
  }
}

export default BeforeAfter;