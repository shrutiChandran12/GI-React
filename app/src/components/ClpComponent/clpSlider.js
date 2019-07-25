import React from 'react';
import Slider from 'react-slick';
import apiManager from '../../utils/apiManager';
import '../../../public/styles/slider.scss';
import {
    espotAPI,
} from '../../../public/constants/constants';

class CLPFullBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heroSlider: null,
      isLoading: false,
      error: null,
    };
  }

  getSliderData() {
    apiManager
      .get(espotAPI+'GI_Clp_Sample_Hero_Banner')
      .then(response => {
        const {data} = response || {}
        this.setState({
          heroSlider: data && data.data.bannerList,
          isLoading: false,
        });
        console.log('Slider Data', data.data.bannerList);
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
    this.getSliderData();
  }

  render() {
    const { heroSlider } = this.state;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div className="fsBanner">
        <Slider {...settings}>
          {!!heroSlider &&
            heroSlider.map((sliderData, index) => (
              <a href={sliderData.onClickUrl} key={index}>
                <img src={sliderData.imageSrc} alt={sliderData.alt} />
              </a>
            ))}
        </Slider>
      </div>
    );
  }
}

export default CLPFullBanner;