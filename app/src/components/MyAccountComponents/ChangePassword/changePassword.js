import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import apiManager from '../../../utils/apiManager';
import { changePasswordAPI } from '../../../../public/constants/constants';
import {
  resolveTheWishlistData,
  getCookie,
  getReleventReduxState,
} from '../../../utils/utilityManager';
import '../../../../public/styles/myAccount/changePassword.scss';
// import '../../../../public/styles/myAccount/myAccountBase.scss';
import { regexPw, validateEmptyObject } from '../../../utils/validationManager';
import Input from '../../Primitives/input';

class ChangePassword extends React.Component {
  state = {
    errorMessage: null,
    inputType: 'password',
    isShowPass: false,
    inputTextCurrent: '',
    inputTextNew: '',
    errorCurrent: false,
    errorNew: false,
    newPasswordPasteTxt: null,
  };

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  showHidePass() {
    if (this.state.isShowPass) {
      this.setState({
        isShowPass: false,
        inputType: 'password',
      });
    } else {
      this.setState({
        isShowPass: true,
        inputType: 'text',
      });
    }
  }

  saveBtnPressed() {
    // this.validate(this.state.inputTextCurrent, this.state.errorCurrent);
    // console.log('afterrrr');
    if (!validateEmptyObject(this.state.inputTextCurrent)) {
      this.setState({
        errorCurrent: true,
        errorMessage: this.state.inputTextCurrent === '' ? 'The field is required' : 'Please enter the Password',
      });
      return;
    }

    if (!regexPw.test(this.state.inputTextCurrent)) {
      let errorMsg;
      if (this.state.inputTextCurrent.length > 25) {
        errorMsg =
          'Invalid Password. Password should not be more than 25 characters';
      } else {
        errorMsg =
          'Invalid Password. Password should have min 6 characters and atleast 1 number';
      }

      this.setState({
        errorCurrent: true,
        errorMessage: errorMsg,
      });
      return;
    }

    if (!validateEmptyObject(this.state.inputTextNew)) {
      this.setState({
        errorNew: true,
        errorMessage: this.state.inputTextNew === '' ? 'The field is required' : 'Please enter the Password',
      });
      return;
    }

    if (!regexPw.test(this.state.inputTextNew)) {
      let errorMsg;
      if (this.state.inputTextNew.length > 25) {
        errorMsg =
          'Invalid Password. Password should not be more than 25 characters';
      } else {
        errorMsg =
          'Invalid Password. Password should have min 6 characters and atleast 1 number';
      }

      this.setState({
        errorNew: true,
        errorMessage: errorMsg,
      });
      return;
    }

    const data = {
      current_password: this.state.inputTextCurrent,
      new_password: this.state.inputTextNew,
    };
    apiManager
      .put(changePasswordAPI, data)
      .then(response => {
        console.log('Change password -- ', response.data.data.message);
        this.setState({
          errorCurrent: false,
          errorNew: false,
          inputTextNew: '',
          inputTextCurrent: '',
        });
        alert(response.data.data.message);
      })
      .catch(error => {
        const errorData = error.response.data;
        const errorMessage = errorData.error.error_message;
        console.log('Current passwod Error -- ', errorMessage);
        alert(errorMessage);
        // this.setState({
        //   error: true,
        //   errorMessage,
        // });
      });
  }

  handleInputChange(value) {
    console.log('Handle Input --- ', value.target.id);
    if (value.target.id === 'new') {
      this.setState({
        errorCurrent: false,
        errorNew: false,
        inputTextNew: this.state.newPasswordPasteTxt !== null ? this.state.inputTextNew : value.target.value,
        newPasswordPasteTxt: null,
      });
    } else {
      this.setState({
        errorCurrent: false,
        errorNew: false,
        inputTextCurrent: value.target.value,
      });
    }
  }

  onPasteText(value) {
    
    if (value.target.id === 'new') {
      console.log('onPasge --- ',value.clipboardData.getData('text'))
      this.setState({
        errorCurrent: false,
        errorNew: false,
        newPasswordPasteTxt: value.clipboardData.getData('text'),
      });
    }
  }

  render() {
    let errorItemCurrent = null;
    if (this.state.errorCurrent) {
      errorItemCurrent = (
        <div className="error-msg">{this.state.errorMessage}</div>
      );
    }

    let errorItemNew = null;
    if (this.state.errorNew) {
      errorItemNew = <div className="error-msg">{this.state.errorMessage}</div>;
    }

    var oldPasswordItem;
    if (this.props.changePasswordTagPro === 0) {
      oldPasswordItem = (
        <div className="form-div clearfix">
          {/* <label className="form-label">Current Password</label> */}
          <div className="currentPassword">
            <Input
              className="form-control newinputmargin"
              inputType={this.state.inputType}
              title="Current Password"
              name="text"
              id="current"
              placeholder="Enter Current Password"
              value={this.state.inputTextCurrent}
              handleChange={this.handleInputChange.bind(this)}
            />
            {this.state.inputTextCurrent !== '' ? <span onClick={this.showHidePass.bind(this)} className="valiationPosition-NewPassword" >
              {<img src={require('../../SVGs/eye.svg')} />}
            </span> : null}
            
          </div>
          {errorItemCurrent}
        </div>
      )
    }

    return (
      <div className="form-BgContainer changePasswordContainer">

        {oldPasswordItem}

        <div className="form-div clearfix">
          <div className="form-group">
            {/* <label className="form-label">New Password</label> */}
            <Input
              className="form-control"
              inputType="text"
              title="New Password"
              name="email"
              id="new"
              placeholder="Enter New Password"
              value={this.state.inputTextNew}
              handleChange={this.handleInputChange.bind(this)}
              onPaste={this.onPasteText.bind(this)}
            />
          </div>
          {errorItemNew}
        </div>

        <button
          onClick={this.saveBtnPressed.bind(this)}
          className="btn-apply btn"
        >
          Save
        </button>
      </div>
    );
  }
}

export default ChangePassword;
