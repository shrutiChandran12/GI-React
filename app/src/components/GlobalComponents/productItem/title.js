import React from 'react';
import { productTitleCharLimit, productDescriptionCharLimit } from '../../../../public/constants/constants';
import { trimTheSentence } from '../../../utils/utilityManager';

class Promotions extends React.Component {
  render() {
    return (
      <p className="heading text">
        <span className="name">{this.props.titlePro.length > productTitleCharLimit ? trimTheSentence(this.props.titlePro, productTitleCharLimit) : this.props.titlePro } </span>
        {this.props.descriptionPro ? (
          <span className="description">
            ({this.props.descriptionPro.length > productDescriptionCharLimit ? trimTheSentence(this.props.descriptionPro, productDescriptionCharLimit) : this.props.descriptionPro})
              </span>
        ) : null}
      </p>
    );
  }
}

export default Promotions;
