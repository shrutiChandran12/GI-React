import React from 'react';
import {
  cartGetPromoAPI,
  cartApplyPromoAPI,
  cartRemovePromoAPI,
} from '../../../public/constants/constants';
import apiManager from '../../utils/apiManager';
import ViewAllPromo from './viewAllPromo';
import { COUPAN_CODE_NOT_VALID } from '../../constants/app/cartConstants';

class GetCartPromo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promo: null,
      isLoading: false,
      viewAll: false,
      error: null,
      isApplyDisable: false,
    };
  }

  componentDidMount() {
    this.handlePromotion();
  }

  handlePromotion() {
    apiManager
      .get(cartGetPromoAPI)
      .then(response => {
        this.setState({
          promo: response.data.data,
          isLoading: false,
        });
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false,
        });
      });
  }

  async applyPromoCode(promoCode) {
    const data = {
      orderId: this.props.orderID,
      promoCode,
    };
    try {
      this.setState({
        isApplyDisable: true,
      });
      if (this.props.appliedPromoCode[0]) {
        await apiManager.post(
          cartRemovePromoAPI + this.props.appliedPromoCode[0],
        );
      }
      const response = await apiManager.post(cartApplyPromoAPI, data);
      this.setState({
        promoCode: response.data.data,
        error: null,
        isApplyDisable: false,
      });
      this.props.getCartDetails();
    } catch (error) {
      this.setState({
        error,
        isLoading: false,
        isApplyDisable: false,
      });
    }
  }

  render() {
    const { promo, error } = this.state;
    return (
      <div className="promo">
        {!!error && <div className="promoError">{COUPAN_CODE_NOT_VALID}</div>}
        <ul className="promoList">
          {!!promo &&
            promo.slice(0, 3).map((sellerItemData, index) => {
              if (
                this.props.appliedPromoCode &&
                this.props.appliedPromoCode.length > 0 &&
                this.props.appliedPromoCode[0] === sellerItemData.promocode){
                return null;
              }
              return (
                <li className="promoListItem" key={index}>
                  <p className="promoCode">{sellerItemData.promocode}</p>
                  <p className="promoDesc">{sellerItemData.description}</p>
                  <button
                    disabled = {this.state.isApplyDisable}
                    className="applyPromo"
                    onClick={this.applyPromoCode.bind(
                      this,
                      sellerItemData.promocode,
                    )}
                  >
                    Apply
                  </button>
                </li>
              );
            })}
        </ul>
        <ViewAllPromo
          orderID={this.props.orderID}
          getCartDetails={this.props.getCartDetails}
          promo={promo}
          appliedPromoCode={this.props.appliedPromoCode}
        />
      </div>
    );
  }
}

export default GetCartPromo;
