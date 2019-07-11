import React from 'react';
import apiManager from '../../../../utils/apiManager';
import { espotAPI } from '../../../../../public/constants/constants';
import '../../../../../public/styles/myAccount/trackMyOrder.scss';
import OrderItem from '../orderItem';
import OrderStatusBar from '../orderStatusBar';

class TrackOrderProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerCareDetail: null,
      dsNameTag: null,
      dsDateTag: null,
    };
  }

  componentDidMount() {
    this.filterDeliveryInstallationTags();
  }

  getCustomerCareDetails() {
    apiManager.get(`${espotAPI}GI_TRACK_ORD_CONTACT`)
      .then(response => {
        const { data } = response || {};
        this.setState({
          customerCareDetail: data && data.data,
        });
      })
      .catch(error => { });
  }

  filterDeliveryInstallationTags() {
    const shipmentData = this.props.shipmentDataPro;
    console.log('ddkdkd -- ', shipmentData.expectedDeliveryDate, shipmentData.expectedInstallationDate);
    if (shipmentData.expectedDeliveryDate !== '') {
      console.log('Delivery -- ', this.props.prodctDataPro.expectedDeliveryDate)
      this.setState({
        dsNameTag: 'DELIVERY ON',
        dsDateTag: shipmentData.expectedDeliveryDate.split(',')[1]
      })
    }
    else if (shipmentData.expectedInstallationDate !== '') {
      console.log('Installation -- ', shipmentData.installationDate)
      // if (shipmentData.installationDate === '') {
        this.setState({
          dsNameTag: 'INSTALLATION ON',
          dsDateTag: shipmentData.expectedInstallationDate.split(',')[1]
        })
      // }

    }

  }

  render() {
    const productData = this.props.prodctDataPro;
    return (
      <>
        <div className="clearfix" />
        <div className="orderProduct clearfix">
          <div className="orderimgbox clearfix">
            <div className="imgBox">
              <img src={productData.thumbnail !== '' ? `${imagePrefix}${this.props.dataPro.thumbnail}` : require('../../../../../public/images/plpAssests/placeholder-image.png')} className="imgfullwidth" />
            </div>

            <div className="product-text">
              <p className="heading">{productData.productName}</p>
              <p className="description">({productData.shortDescription})</p>
              <p className="price">
                <span className="discount-price">₹{productData.offerPrice}</span>
              </p>
              <p className="quantity-shipping clearfix">
                <span className="quantity">
                  Quantity
                  <br />
                  <span className="textval">{this.props.shipmentDataPro.quantity}</span>
                </span>
              </p>
              <div className="delivery quantity">
                <span className="heading">{this.state.dsNameTag}</span>
                <span className="textval">{this.state.dsDateTag}</span>
              </div>
            </div>
          </div>
          <OrderStatusBar shipmentDataPro={this.props.shipmentDataPro} customClassPro='trackorder-wrap' />
        </div>
      </>
    );
  }
}

export default TrackOrderProduct;
