import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import apiManager from '../../../utils/apiManager';
import {
  changePasswordAPI
} from '../../../../public/constants/constants';
import {
  resolveTheWishlistData,
  getCookie,
  getReleventReduxState,
} from '../../../utils/utilityManager';
import '../../../../public/styles/myAccount/changePassword.scss';
import { regexPw, validateEmptyObject } from '../../../utils/validationManager';
import '../../../../public/styles/myAccount/myProfile.scss'
import Input from '../../Primitives/input';
import {
  validateFullName,
  validateMobileNo,
  validateEmailId,
} from '../../../utils/addressValidations';
import {  } from '../../../../public/constants/constants';

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText_name: '',
      inputText_number: '',
      inputText_email: '',

      error_name: false,
      error_number: false,
      error_email: false,

      errorMessage_name: '',
      errorMessage_number: '',
      errorMessage_email: '',
    };

    this.handleInput = this.handleInput.bind(this);
  }

  onSavebuttonClick(event) {
    event.preventDefault();
console.log('itt --- ',this.state.inputText_email)
    if (!validateFullName(this.state.inputText_name)) {
      this.setState({
        error_name: true,
        errorMessage_name: 'Please enter a valid Name. It should not exceed 100 characters',
      });
      return;
    }
    if (!validateMobileNo(this.state.inputText_number)) {
      this.setState({
        error_number: true,
        errorMessage_number: 'Please enter valid mobile number.',
      });
      return;
    }
    if (!validateEmailId(this.state.inputText_email) || this.state.inputText_email === '') {
      this.setState({
        error_email: true,
        errorMessage_email: 'Please enter valid Email ID.',
      });
      return;
    }

    //Update the data on server
  }

  handleInput(value) {
    this.setState({
      error_name: false,
      error_number: false,
      error_email: false,
    })
    switch (value.target.id) {
      case 'fullName':
        return (
          this.setState({
            inputText_name: value.target.value,
          })
        )
      case 'phoneNumber':
        return (
          this.setState({
            inputText_number: value.target.value,
          })
        )
      case 'emailId':
        return (
          this.setState({
            inputText_email: value.target.value,
          })
        )
      default:
        return null;
    }
  }

  render() {

    return (
      <form className='myProfileContainer'>
        <div className="form-div clearfix div-error">
          <Input inputType={'text'} title={'Full Name'} name={'name'} id={'fullName'} placeholder={'Enter your name'} value={this.state.inputText_name} handleChange={this.handleInput} />
          {this.state.error_name ? <p className="error-msg">{this.state.errorMessage_name}</p> : null}
        </div>
        <div className="form-div clearfix div-error">
          <Input inputType={'number'} title={'Phone Number'} name={'name'} id={'phoneNumber'} placeholder={'Enter Number'} value={this.state.inputText_number} handleChange={this.handleInput} />
          {this.state.error_number ? <p className="error-msg">{this.state.errorMessage_number}</p> : null}
        </div>
        <div className="form-div clearfix div-error">
          <Input inputType={'email'} title={'Email ID'} name={'name'} id={'emailId'} placeholder={'Enter EmailId'} value={this.state.inputText_email} handleChange={this.handleInput} />
          {this.state.error_email ? <p className="error-msg">{this.state.errorMessage_email}</p> : null}
        </div>

        <button onClick={this.onSavebuttonClick.bind(this)} className='actionBtnWrapper__applyBtn btn'>Save</button>
      </form>
    );
  }
}

export default MyProfile;
