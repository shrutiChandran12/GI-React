import React from 'react';
// import PropTypes from 'prop-types';
import {
  connect
} from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import {
  compose
} from 'redux';
import '../../../public/styles/checkout.scss';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import axios from 'axios';
import Link from 'react-router-dom/Link';
import appCookie from '../../utils/cookie';
import PinChangePopup from './pinChangeModal'
import {
  Button,
  Modal
} from 'react-bootstrap';
import Input from '../Primitives/input';
import {
  validateFullName,
  validateMobileNo,
  validateEmailId,
  validatePindcode,
  validateAddress,
  validateCityDistrict,
  validateState
} from '../../utils/validationManager';
import {
  storeId,
  accessToken,
  accessTokenCookie,
  userLoginAPI,
  addressListAPI,
  userDataAPI,
  PinToCityAPI,
  addAddressAPI,
  AddAddressToCardAPI
} from '../../../public/constants/constants';
import {
  getReleventReduxState
} from '../../utils/utilityManager';
import {
  EROFS
} from 'constants';

export class Step2Component extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        has_pass: false,
        phone: '',
        email: '',
        same_bill: true,
        step: 1,
        selected_add: 0,
        showGift: false,
        addressList: null,
        saved_add: 'active_add',
        new_add: null,
        pin: '',
        city: '',
        state: '',
        ship_add_id: '',
        bill_add_id: '',
        pinPop: false,
        error_name: false,
        error_number: false,
        error_email: false,
        error_pincode: false,
        error_address: false,
        error_city: false,
        error_state: false,

        errorMessage_name: '',
        errorMessage_number: '',
        errorMessage_email: '',
        errorMessage_pincode: '',
        errorMessaget_address: '',
        errorMessage_city: '',
        errorMessage_state: '',
        inputText_name: '',
        inputText_number: '',
        inputText_email: '',
        inputText_pincode: '',
        inputText_address: '',
        inputText_city: '',
        inputText_state: '',

        berror_name: false,
        berror_number: false,
        berror_email: false,
        berror_pincode: false,
        berror_address: false,
        berror_city: false,
        berror_state: false,

        berrorMessage_name: '',
        berrorMessage_number: '',
        berrorMessage_email: '',
        berrorMessage_pincode: '',
        berrorMessaget_address: '',
        berrorMessage_city: '',
        berrorMessage_state: '',
        binputText_name: '',
        binputText_number: '',
        binputText_email: '',
        binputText_pincode: '',
        binputText_address: '',
        binputText_city: '',
        binputText_state: '',
        isSetAsDefault: ''
      };

      this.handleInput = this.handleInput.bind(this);

    }

    componentDidMount() {
      if (this.props.isLoggedIn) {
        this.callPinApi()
          .then(this.callAddressAPI)
          .then((data) => {
            console.log(data, "resolved data")
            this.setState({
              addressList: data.addressList,
              inputText_pincode: data.pinData.pin,
              inputText_city: data.pinData.city,
              inputText_state: data.pinData.state
            })
          })
      } else {
        this.callPinApi()
          .then((data) => {
            this.setState({
              inputText_pincode: data.pin,
              inputText_city: data.city,
              inputText_state: data.state
            })
          })
      }
      if (this.props.logonBy && this.props.logonBy.includes('@')) {
        this.setState({
          email: this.props.logonBy
        })
      } else {
        this.setState({
          phone: this.props.logonBy
        })
      }
    }

    callAddressAPI = (pinData) => {
      return new Promise((resolve, reject) => {
        if (this.props.isLoggedIn) {
          let token = appCookie.get('accessToken')
          axios.get(addressListAPI, {
            headers: {
              store_id: storeId,
              access_token: token
            }
          }).then(response => {
            console.log(response.data.data, "address list reponse")
            var data = {};
            data.addressList = response.data.data.addressList.sort((a, b) => {
              if (b.isDefault == true) {
                return 1;
              } else {
                return 0;
              }
            });
            data.pinData = pinData;
            resolve(data);
          }).catch(error => {
            reject(error);
          })
        } else {
          resolve();
        }
      })
    }

    handleChangeMobile = () => {
      this.props.back();
    }

    getUserAddress = () => {

    }

    newAddActive = () => {
      this.setState({
        saved_add: null,
        new_add: 'active_add'
      })
    }

    savedAddActive = () => {
      if (this.state.addressList) {
        this.setState({
          saved_add: 'active_add',
          new_add: null
        })
      }
    }

    callPinApi = (val) => {
      return new Promise((resolve, reject) => {
        let token = appCookie.get('accessToken')
        let defPin = appCookie.get('pincode');
        console.log(defPin, "this is defpin")
        axios.get(`${PinToCityAPI}${val ? val : defPin}`, {
          headers: {
            store_id: storeId,
            access_token: token
          }
        }).then(response => {
          console.log(response.data.data, "pin response");
          // this.setState({
          //   city: response.data.data.city,
          //   state: response.data.data.state,
          //   pin: defPin
          // })
          var data = response.data.data;
          data.pin = val ? val : defPin;
          resolve(data);
        }).catch(error => {
          throw new Error(error);
          resolve()
        })
      })
    }

    checkPIN = () => {
      var localPIN = appCookie.get('pincode');
      if (this.state.inputText_pincode !== localPIN) {
        this.setState({
          pinPop: true
        })
      } else {
        this.callAddress()
      }
    }

    cancelPinPop = () => {
      this.setState({
        pinPop: false
      })
    }

    phoneChange = (e) => {
      this.setState({
        phone: e.target.value
      })
    }

    mailChange = (e) => {
      this.setState({
        email: e.target.value
      })
    }

    handleSameBill = () => {
      if (this.state.same_bill == false) {
        this.setState({
          same_bill: true
        })
      } else {
        this.setState({
          same_bill: false
        })
      }
    }

    handleInput(value) {
      this.setState({
        error_name: false,
        error_number: false,
        error_email: false,
        error_pincode: false,
        error_address: false,
        error_city: false,
        error_state: false,
        berror_name: false,
        berror_number: false,
        berror_email: false,
        berror_pincode: false,
        berror_address: false,
        berror_city: false,
        berror_state: false,
      });
      switch (value.target.id) {
        case 'name':
          return this.setState({
            inputText_name: value.target.value,
          });
        case 'pin':
          if (value.target.value.length < 6) {
            return this.setState({
              inputText_pincode: value.target.value,
            });
          } else if (value.target.value.length === 6) {
            this.callPinApi(value.target.value).then((data) => {
              this.setState({
                inputText_pincode: data.pin,
                inputText_city: data.city,
                inputText_state: data.state
              })
            })
          } else {
            return false
          };
        case 'address':
          return this.setState({
            inputText_address: value.target.value,
          });
        case 'city':
          return this.setState({
            inputText_city: value.target.value,
          });
        case 'state':
          return this.setState({
            inputText_state: value.target.value,
          });
        case 'bname':
          return this.setState({
            binputText_name: value.target.value,
          });
        case 'bphone':
          return this.setState({
            binputText_number: value.target.value,
          });
        case 'bemail':
          return this.setState({
            binputText_email: value.target.value,
          });
        case 'bpin':
          if (value.target.value.length < 6) {
            return this.setState({
              binputText_pincode: value.target.value,
            });
          } else if (value.target.value.length === 6) {
            this.callPinApi(value.target.value).then((data) => {
              this.setState({
                binputText_pincode: data.pin,
                binputText_city: data.city,
                binputText_state: data.state
              })
            })
          } else {
            return false
          };
        case 'baddress':
          return this.setState({
            binputText_address: value.target.value,
          });
        case 'bcity':
          return this.setState({
            binputText_city: value.target.value,
          });
        case 'bstate':
          return this.setState({
            binputText_state: value.target.value,
          });
        default:
          return null;
      }
    }

    callAddress = () => {
      this.addAddress()
        .then(this.callAddressAPI)
        .then((data) => {
          console.log("in final resolve", data)
          if (this.props.isLoggedIn) {
            this.setState({
              addressList: data.addressList,
              saved_add: 'active_add',
              new_add: null
            })
          } else {
            this.handleProceed()
          }
        }).catch((err) => {
          throw new Error(err);
        })
    }

    addAddress = () => {
      return new Promise((resolve, reject) => {
        var data = {
          name: this.state.inputText_name,
          pincode: this.state.inputText_pincode,
          city: this.state.inputText_city,
          state: this.state.inputText_state,
          address: this.state.inputText_address,
          default: true,
          phone_number: this.state.phone,
          email_id: this.state.email
        };
        // data['phone number'] = this.state.phone;
        // data['email id'] = this.state.email;
        let token = appCookie.get('accessToken')
        console.log(data, "this is address data");
        axios.post(addAddressAPI, data, {
          headers: {
            store_id: storeId,
            access_token: token
          }
        }).then(response => {
          if (this.state.same_bill == false && !this.props.isLoggedIn) {
            this.saveBillAdd()
              .then((billAddId) => {
                this.setState({
                  ship_add_id: response.data.data.addressID,
                  bill_add_id: billAddId
                })
              })
          } else {
            if (!this.props.isLoggedIn && this.state.same_bill == true) {
              this.setState({
                ship_add_id: response.data.data.addressID,
                bill_add_id: response.data.data.addressID
              })
            }
            resolve();
          }
        }).catch(err => {
          throw new Error(err);
          reject();
        })
      })
    }

    saveBillAdd = () => {
      return new Promise((resolve, reject) => {
        var bdata = {
          name: this.state.binputText_name,
          pincode: this.state.binputText_pincode,
          city: this.state.binputText_city,
          state: this.state.binputText_state,
          address: this.state.binputText_address,
          default: true,
          phone_number: this.state.binputText_number,
          email_id: this.state.binputText_email
        };

        axios.post(addAddressAPI, bdata, {
          headers: {
            store_id: storeId,
            access_token: token
          }
        }).then(res => {
          // this.setState({
          //   ship_add_id: response.data.data.addressID,
          //   bill_add_id: res.data.data.addressID
          // })
          resolve(res.data.data.addressID);
        }).catch(err => {
          throw new Error(err);
          reject();
        })
      })
    }

    addAddressToCart = () => {
      return new Promise((resolve, reject) => {
        
      })
    }

    handleloginContinue = () => {
      var selected_address = this.state.addressList[this.state.selected_add];
      if (this.setState.same_bill == false) {
        this.saveBillAdd()
          .then((addressId) => {
            var selected_address = this.state.addressList[this.state.selected_add];
            this.setState({
              ship_add_id: selected_address.addressID,
              bill_add_id: addressId
            })
          })
      } else {
        this.setState({
          ship_add_id: selected_address.addressID,
          bill_add_id: selected_address.addressID
        })
        console.log(this.state.ship_add_id, this.state.bill_add_id, "shipping and billing address id")
      }

    }

    onLoginSave(event) {
      event.preventDefault();
      var selected_address = this.state.addressList[this.state.selected_add];
      var localPIN = appCookie.get('pincode');
      if (selected_address.pincode !== localPIN) {
        this.setState({
          pinPop: true
        })
        return;
      }
      if (this.state.same_bill == false) {
        this.setState({
          berror_name: false,
          berror_number: false,
          berror_email: false,
          berror_pincode: false,
          berror_address: false,
          berror_city: false,
          berror_state: false,
        });

        if (!validateFullName(this.state.binputText_name)) {
          console.log(this.state.binputText_name, "this is input name")
          this.setState({
            berror_name: true,
            berrorMessage_name: 'Please enter a valid Name. It should not exceed 100 characters',
          });
          return;
        }
        if (!validateMobileNo(this.state.binputText_number)) {
          this.setState({
            berror_number: true,
            berrorMessage_number: 'Please enter valid mobile number.',
          });
          return;
        }

        if (!validatePindcode(this.state.binputText_pincode)) {
          this.setState({
            berror_pincode: true,
            berrorMessage_pincode: 'Please enter valid Pincode.',
          });
          return;
        }
        if (!validateEmailId(this.state.binputText_email)) {
          this.setState({
            berror_email: true,
            berrorMessage_email: 'Please enter valid Email ID.',
          });
          return;
        }
        if (!validateAddress(this.state.binputText_address)) {
          this.setState({
            berror_address: true,
            berrorMessaget_address: 'Please enter valid Address.',
          });
          return;
        }
        if (!validateCityDistrict(this.state.binputText_city)) {
          this.setState({
            berror_city: true,
            berrorMessage_city: 'Please enter valid City/District.',
          });
          return;
        }
        if (!validateState(this.state.binputText_state)) {
          this.setState({
            berror_state: true,
            berrorMessage_state: 'Please enter valid State.',
          });
          return;
        }


      }
      this.handleloginContinue()
      console.log(selected_address, 'this is selected address')
    }

    onSavebuttonClick(event) {
      event.preventDefault();
      this.setState({
        error_name: false,
        errorMessage_name: null,
        error_number: false,
        errorMessage_number: null,
        error_email: false,
        errorMessage_email: null,
        error_pincode: false,
        error_address: false,
        error_city: false,
        error_state: false,

        berror_name: false,
        berror_number: false,
        berror_email: false,
        berror_pincode: false,
        berror_address: false,
        berror_city: false,
        berror_state: false,
      });
      if (!validateFullName(this.state.inputText_name)) {
        this.setState({
          error_name: true,
          errorMessage_name: 'Please enter a valid Name. It should not exceed 100 characters',
        });
        return;
      }
      if (!validateMobileNo(this.state.phone)) {
        this.setState({
          error_number: true,
          errorMessage_number: 'Please enter valid mobile number.',
        });
        return;
      }
      if (!validateEmailId(this.state.email)) {
        this.setState({
          error_email: true,
          errorMessage_email: 'Please enter valid Email ID.',
        });
        return;
      }
      if (!validatePindcode(this.state.inputText_pincode)) {
        this.setState({
          error_pincode: true,
          errorMessage_pincode: 'Please enter valid Pincode.',
        });
        return;
      }
      if (!validateAddress(this.state.inputText_address)) {
        this.setState({
          error_address: true,
          errorMessaget_address: 'Please enter valid Address.',
        });
        return;
      }
      if (!validateCityDistrict(this.state.inputText_city)) {
        this.setState({
          error_city: true,
          errorMessage_city: 'Please enter valid City/District.',
        });
        return;
      }
      if (!validateState(this.state.inputText_state)) {
        this.setState({
          error_state: true,
          errorMessage_state: 'Please enter valid State.',
        });
        return;
      }
      if (this.state.same_bill == false) {
        if (!validateFullName(this.state.binputText_name)) {
          console.log(this.state.binputText_name, "this is input name")
          this.setState({
            berror_name: true,
            berrorMessage_name: 'Please enter a valid Name. It should not exceed 100 characters',
          });
          return;
        }
        if (!validateMobileNo(this.state.binputText_number)) {
          this.setState({
            berror_number: true,
            berrorMessage_number: 'Please enter valid mobile number.',
          });
          return;
        }

        if (!validatePindcode(this.state.binputText_pincode)) {
          this.setState({
            berror_pincode: true,
            berrorMessage_pincode: 'Please enter valid Pincode.',
          });
          return;
        }
        if (!validateEmailId(this.state.binputText_email)) {
          this.setState({
            berror_email: true,
            berrorMessage_email: 'Please enter valid Email ID.',
          });
          return;
        }
        if (!validateAddress(this.state.binputText_address)) {
          this.setState({
            berror_address: true,
            berrorMessaget_address: 'Please enter valid Address.',
          });
          return;
        }
        if (!validateCityDistrict(this.state.binputText_city)) {
          this.setState({
            berror_city: true,
            berrorMessage_city: 'Please enter valid City/District.',
          });
          return;
        }
        if (!validateState(this.state.binputText_state)) {
          this.setState({
            berror_state: true,
            berrorMessage_state: 'Please enter valid State.',
          });
          return;
        }
      }
      if (this.isLoggedIn) {
        this.callAddress();
      } else {
        this.checkPIN()
      }
    }

    renderAddressList = () => {
      if(this.state.addressList && this.state.addressList.length > 0) {
        var list = [];
        this.state.addressList.forEach((add, index) => {
          list.push(
            <div className="col-md-6">
              <ul class="saveAddress">
                <li className='list' onClick={this.handleAddressChange.bind(this, index)} style={{cursor: "pointer"}}>
                  <div className='inputBox'>
                     <input type="radio" name="optradio" value={index}  checked={this.state.selected_add == index} />
                  </div>

                  <div className='addressText'>{`${add.address}, ${add.city}, ${add.state}, ${add.pincode}`}</div>
                </li>
              </ul>
            </div>
            )
        });
        return <div className="row">{list}</div>;
      }
    }

    handleAddressChange(index) {
      console.log(index, "event on li");
      this.setState({
        selected_add: index
      })
    }

    handleProceed = () => {
      this.props.proceed();
    }

    render() {
      return (
          
            <div className="col-md-8 checkout_wrapper">
              {this.state.pinPop ?
              <PinChangePopup cancel={this.cancelPinPop} /> :'' }
              <div className='listRow clearfix'>
                <div className='stepActive'>
                  <div className='checkmark'></div>
                </div>

                <div className="labeltext-box">
                  <h4 className="heading-label">Mobile or Email</h4>
                </div>

                <div className="email-box">
                  <h4 className='heading-label'>{this.props.logonBy}</h4>
                </div>

                <div className="action-button">
                  {!this.props.isLoggedIn ?
                  <button onClick={this.handleChangeMobile} className="btn-block btn-blackbg">Change</button>
                  : '' }
                </div>

              </div>

              <div className="listRow bgfullflex clearfix">
                <div className='stepActive'>
                  <div className='stepBg'>2</div>
                </div>
                <div className="leftBox bgGrey">
                  <div className="heading-label">Ship To</div>
                  {this.props.isLoggedIn ? <div className='verticalTab'>
                    <div className={`add_tab ${this.state.saved_add}`} onClick={this.savedAddActive}>
                      <div style={!this.state.addressList ? {color: 'grey' } : {color:'black'} }>Saved Address</div>
                    </div>
                    <div className={`add_tab ${this.state.new_add}`} onClick={this.newAddActive}>
                      <div>New Address</div>
                    </div>
                  </div> : ''}
                </div>
                <div className="rightBox">
                  {!this.props.isLoggedIn || this.state.new_add ?
                  <div>
                    <div className="row">
                      <div className="col-md-6 colpaddingRight">
                        <div className="form-div clearfix div-error">
                          <Input inputType="text" title="Full Name" id="name" name="name"
                            handleChange={this.handleInput} />
                          {this.state.error_name ? <div className='error-msg'>{this.state.errorMessage_name}</div> :
                          null}
                        </div>
                        {/* <label className="from-label" htmlFor="name">Full Name</label>
                        <input type="text" name="name" className="form-control" /> */}
                      </div>
                      <div className="col-md-6 colpaddingRight">
                        {/* <label className="from-label" htmlFor="phone">Phone Number</label>
                        <input type="text" name="phone" className="form-control" value={this.state.phone} onChange={e=>
                        this.phoneChange(e)} /> */}

                        <div className="form-div clearfix div-error">
                          <Input inputType="text" title="Phone Number" name="phone" value={this.state.phone}
                            onChange={e=> this.phoneChange(e)} />
                          {this.state.error_number ? (
                          <div className="error-msg">
                            {this.state.errorMessage_number}
                          </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 colpaddingRight">
                        {/* <label className='form-label' htmlFor="pin">Pin Code</label>
                        <input type="number" name="pin" className="form-control" value={this.state.pin} onChange={e=>
                        this.pinChange(e)} /> */}
                        <div className="form-div clearfix div-error">
                          <Input inputType="number" title="Pin Code" name="pin" value={this.state.inputText_pincode}
                            handleChange={this.handleInput} />
                          {this.state.error_pincode ? <div className='error-msg'>{this.state.errorMessage_pincode}</div>
                          : null}
                        </div>
                      </div>
                      <div className="col-md-6">
                        {/* <label className="from-label" htmlFor="email">Email</label>
                        <input type="text" name="email" className="form-control" value={this.state.email} onChange={e=>
                        this.mailChange(e)} /> */}
                        <div className="form-div clearfix div-error">
                          <Input inputType="text" title="Email (Optional)" id="email" name="Email"
                            value={this.state.email} onChange={e=> this.mailChange(e)} />
                          {this.state.error_email ? <div className="error-msg">{this.state.errorMessage_email}</div> :
                          null}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        {/* <label className="from-label" htmlFor="address">Address</label>
                        <textarea type="text" name="address" className="form-control" /> */}
                         <div className="form-div clearfix div-error">
                            <Input inputType="text" title="Address" id="address" name="address" handleChange={this.handleInput} />
                            {this.state.error_address ? <div className='error-msg'>{this.state.errorMessaget_address}</div> : null}
                         </div>
                        </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        {/* <label  className="from-label" htmlFor="city">City/District</label>
                        <input type="text" name="city" className="form-control" value={this.state.city} /> */}
                         <div className="form-div clearfix div-error">
                           <Input inputType="text" title="City/District" id="city" name="city" value={this.state.inputText_city} handleChange={this.handleInput} />
                           {this.state.error_city ? <div className='error-msg'>{this.state.errorMessage_city}</div> : null}
                         </div>
                      </div>
                      <div className="col-md-6">
                        {/* <label  className="from-label" htmlFor="state">State</label>
                        <input type="text" name="state" className="form-control" value={this.state.state} /> */}
                         <div className="form-div clearfix div-error">
                           <Input inputType="text" title="State" id="state" name="state" value={this.state.inputText_state} />
                           {this.state.error_state ? <div className='error-msg'>{this.state.errorMessage_state}</div> : null}
                         </div>
                      </div>
                    </div>
                    </div> : this.renderAddressList()}
                    {!this.state.new_add ?
                  <div> 
                    <div className="row">
                      <div className="col-md-12">
                      <div className='bill-address customCheckbox clearfix'>
                        <div className='input_box'>
                          <input className='checkbox inputCheck' id="checkbox" type="checkbox" name="billing" defaultChecked={this.state.same_bill} onChange={this.handleSameBill} />
                          <label className="lblCheck" htmlFor="checkbox"></label>
                         </div>
                          <label className='label-billing defaultlbl' htmlFor="billing">Billing address same as shipping address</label>
                        </div>
                      </div>
                    </div>
                    {!this.state.same_bill ? <div className="bill_div">
                    <div className="row">
                      <div className="col-md-12"><h4>Enter a billing address</h4></div>
                    </div>
                    <div className="row">
                    <div className="col-md-6 colpaddingRight">
                      {/* <label htmlFor="fullname">Full Name</label>
                      <input type="text" name="fullname" className="form-control" /> */}
                        <div className="form-div clearfix div-error">
                           <Input inputType="text" title="Full Name" id="bname" name="bname" handleChange={this.handleInput}/>
                           {this.state.berror_name ? <div className='error-msg'>{this.state.berrorMessage_name}</div> : null}
                         </div>
                    </div>
                    <div className="col-md-6">
                      {/* <label htmlFor="phone">Phone Number</label>
                      <input type="text" name="phone" className="form-control" /> */}
                       <div className="form-div clearfix div-error">
                         <Input inputType="text" title="Phone Number" id="bphone" name="bphone" handleChange={this.handleInput} />
                         {this.state.berror_number ? (
                            <div className="error-msg">
                              {this.state.berrorMessage_number}
                            </div>
                          ) : null}
                       </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-6 colpaddingRight">
                      {/* <label htmlFor="pin">Pin Code</label>
                      <input type="text" name="pin" className="form-control" /> */}
                       <div className="form-div clearfix div-error">
                         <Input inputType="text" title="Pin Code" id="bpin" name="bpin" value={this.state.binputText_pincode} handleChange={this.handleInput} />
                         {this.state.berror_pincode ? <div className='error-msg'>{this.state.berrorMessage_pincode}</div> : null}
                       </div>
                    </div>
                    <div className="col-md-6">
                      {/* <label htmlFor="email">Email</label>
                      <input type="text" name="email" className="form-control" /> */}
                      <div className="form-div clearfix div-error">
                         <Input inputType="text" title="Email (Optional)" id="bemail" name="bemail" handleChange={this.handleInput} />
                         {this.state.berror_email ? <div className="error-msg">{this.state.berrorMessage_email}</div> : null}
                       </div>
                    </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-div clearfix div-error">
                        <Input inputType="text" title="Address" id="baddress" name="baddress" handleChange={this.handleInput} />
                           {this.state.berror_address ? <div className='error-msg'>{this.state.berrorMessaget_address}</div> : null}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 colpaddingRight">
                        {/* <label htmlFor="city">City/District</label>
                        <input type="text" name="city" className="form-control" /> */}
                        <div className="form-div clearfix div-error">
                         <Input inputType="text" title="City/District" name="bcity" id="bcity" value={this.state.binputText_city} handleChange={this.handleInput} />
                         {this.state.berror_city ? <div className='error-msg'>{this.state.berrorMessage_city}</div> : null}
                       </div>
                      </div>
                      <div className="col-md-6">
                        {/* <label htmlFor="state">State</label>
                        <input type="text" name="state" className="form-control" /> */}
                        <div className="form-div clearfix div-error">
                         <Input inputType="text" title="State" name="bstate" value={this.state.binputText_state} id="bstate" />
                         {this.state.berror_state ? <div className='error-msg'>{this.state.berrorMessage_state}</div> : null}
                       </div>
                      </div>
                    </div>
                    </div> : ''}

                    <div className='row'>
                     <div className='col-md-12 bussinessNote'>                    
                        <h5 className='buying'>Buying it for your business.</h5>
                        <div className='noteGstin'><span className='bold'>Note</span>
                        :GSTIN cannot be changed after placing order. Registration state must match either billing or shipping state.</div>
                     </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        {/* <label htmlFor="gst">GSTIN (Optional)</label>
                        <input type="text" name="gst" className="form-control" />                         */}
                        <div className="form-div clearfix div-error">
                         <Input inputType="text" title="GSTIN (Optional)" name="city"/>
                       </div>
                      </div>
                    </div>

                    <div className='row'>
                     <div className='col-md-12 form-group'>
                     <button className="btn-blackbg btn-block continueMargin" onClick={this.props.isLoggedIn ? this.onLoginSave.bind(this) : this.onSavebuttonClick.bind(this)}>Continue</button>
                     </div>                    
                    </div>
                  </div> : <div>
                  <div className="row">
                      <div className="col-md-12">
                        <div>
                          <input className='checkbox' type="checkbox" name="billing" />
                          <label className='label-billing' htmlFor="billing">Make this the default address</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                          <button className="btn-blackbg btn-block">cancel</button>
                        </div>
                        <div className="col-md-6">
                          <button className="btn-blackbg btn-block"  onClick={this.onSavebuttonClick.bind(this)}>Submit</button>
                        </div>
                    </div>
                  </div>}
                    
                  </div>
                
              </div>
              
              <div className="listRow clearfix">
                 <div className='stepActive'>
                  <div className='stepbgNone'>3</div>
                 </div>
                <div className="leftBox">
                <div className='heading-label'>Pay By</div>
                </div>
                <div className="rightBox">
                <div className='heading-label'>Choose a payment method</div>
                </div>
              </div>
              
            </div>
      )
    }
}