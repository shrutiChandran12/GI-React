import React from 'react';
import Dropdown from './dropdown';
import UploadImage from './uploadImage';
import EnterInvoiceView from './enterInvoiceView';
import Checkboxes from './checkboxes';
import AddressLists from './addressLists';
import apiManager from '../../utils/apiManager';
import { getAddressListAPI,getDetailtForSerReq } from '../../../public/constants/constants';
import AddressList from './addressLists';
import { ADD_NEW_ADD} from '../../constants/app/myAccountConstants';
import AddAddressForm from '../../components/MyAccountComponents/ManageAddress/addAddressForm';
import '../../../public/styles/myAccount/service-request.scss';


class ServiceRequestForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categorySelectionData: ['Home Furniture', 'Office Furniture', 'Mattress', 'Décor'],
      selectedCategory:"",
      invoiceSelectionData: ['Invoice 1', 'Invoice 2', 'Invoice 3', 'Invoice 4', 'Invoice 5', 'Add an invoice number'],
      selectedInvoice:"",
      serviceRequestReasons: ['Upholstery wear and tear', 'Broken locks or handles', 'Loose doors or hinges', 'Shelf or drawer issues', '	Missing screws and accessories', 'Surface chipping and cracks', 'Other'],
      selectedReason:[],
      addressListItem: null,
      selectedAddress:null,
      addressData: null,
      isAddAddress:false,
      showEnterInvoice:false,
      invoiceFile:null,
      showInvoiceDisclaimer:true,
      isSaveBtnDisabled:true,
      selectedImages:[],
      otherReason:"",
    };
  }

  componentDidMount() {
    this.getAddressListAPI();
   // this.getDetailAPI()
  }
  getDetailAPI=()=>{

    apiManager
      .get(getDetailtForSerReq+'56101505SD00084')
      .then(response => {
        this.setState({
          addressData: response.data.data.addressList,
          categorySelectionData:response.data.data.productCategory,
          serviceRequestReasons:response.data.data.serviceReasonList,
        })
      })
      .catch(error => {
      });

  }

  getAddressListAPI() {
    apiManager
      .get(getAddressListAPI)
      .then(response => {
        let address=null;
        if(response.data.data.addressList && response.data.data.addressList.length>0)
        {
          address=response.data.data.addressList[0];
          console.log("Slected address",address)
        }
        this.setState({
          addressData: response.data.data.addressList,
          selectedAddress:address
        })
      })
      .catch(error => {
      });
  }

  getCategorySelectionValue(value) {
    this.setState(
      {
        selectedCategory:value,
      }
    )
  }

  getInvoiceValue(value,index) {
    const flag=index==0 || this.state.invoiceSelectionData.length-1==index; 
    if(this.state.invoiceSelectionData.length-1==index)
    {
      this.setState({
        showEnterInvoice: true,
        showInvoiceDisclaimer:flag,
        selectedInvoice:"",
      });
    }
    else{
      this.setState({
        showEnterInvoice: false,
        showInvoiceDisclaimer:flag,
        selectedInvoice:value,
      });
    }
  }

  getServiceRequestReason(value) {
    this.setState({
      selectedReason:value
    })
  }

  getSelectedAddress(value) {
    console.log('on Selected Address --- ', value)
    this.setState({
      selectedAddress:value,
    })
  }

  addNewAddressBtnClicked() {
    this.setState({
      isAddAddress: !this.state.isAddAddress,
    });
  }

  onEnterInvoiceTextChanged(value)
  {
    this.setState({
      showInvoiceDisclaimer: value.length==0,
    });
  }
  onInvoiceFileSelection(value)
  {
    this.setState({
      invoiceFile: value,
    });
  }
  onOtherReasonEnter(value)
  {
    this.setState({
      otherReason: value,
    });
  }

  onImageAddRemove(value)
  {
    this.setState({
      selectedImages: value,
    });
  }


  render() 
  {
    let isSaveBtnDisabled=true;
    if(this.state.selectedCategory!="" && this.state.selectedReason.length>0  && this.state.selectedImages.length>0)
    {
      isSaveBtnDisabled=false;
    }
    return (
      <div className="trackMyOrder service-request">
        <div className="bottomDivider">
          <button className="backBtn" onClick={this.props.renderSelectionPro} >{`< Back`}</button>
        </div>

        {this.renderProductDetails()}
        {this.renderProductCategory()}
        {this.renderInvoice()}
        {this.renderServiceRequestReason()}
        {this.renderUploadImage()}
        {this.renderAddress()}
        {this.renderAddAddress()}

        <div className='actionBtnWrapper'>
            <button  className='btn-cancel btn'>Cancel</button>
            <button  disabled={isSaveBtnDisabled} className='btn-save btn'>Submit</button>
          </div>

      </div>
    );
  }

  renderAddAddress() {
    return (
      <div className="manageAddressContainer">
        <ul className="itemList">{this.state.addressListItem}</ul>
        <div className="add-service-address clearfix" />
        {this.state.isAddAddress ? (
          <AddAddressForm
            onCancel={this.addNewAddressBtnClicked.bind(this)}
            onUpdateActivity={this.getAddressListAPI.bind(this)}
            editAddressDataPro={this.state.editAddressData}

          />
        ) : (
          <button
            className="addNewAddress"
            onClick={this.addNewAddressBtnClicked.bind(this)}
          >
            <span className='icon'>+</span> {ADD_NEW_ADD}
          </button>
        )}
      </div>
    );
  }

  renderAddress() {
    return (
      <div class='get-selected-address'>
        <h4 className='heading'>Address</h4>
        <AddressList data={this.state.addressData} onSelection={this.getSelectedAddress.bind(this)}/>
      </div>
    )
  }

  renderUploadImage() {
    return (
      <div className='add-img'>
        <h4 className='heading'>Add Image</h4>
        <UploadImage onImageAddRemove={this.onImageAddRemove.bind(this)}/>
      </div>
    )
  }

  renderProductCategory() {
    return (
      <div className='product-category'>
        <h4 className='heading'>Product Category</h4>
        <Dropdown title='Please select a product category' data={this.state.categorySelectionData} onSelection={this.getCategorySelectionValue.bind(this)} />
      </div>
    )
  }

  renderInvoice() {
    return (
      <div className='invice-selection'>
        <h4 className='heading'>Invoice Selection</h4>
        <Dropdown title='Select Invoice' data={this.state.invoiceSelectionData} 
              onSelection={this.getInvoiceValue.bind(this)} />
        {
        this.state.showEnterInvoice &&
        (
          <EnterInvoiceView  onInvoiceChange={this.onEnterInvoiceTextChanged.bind(this)} onInvoiceFile={this.onInvoiceFileSelection.bind(this)}/>
        )       

        }
        {this.state.showInvoiceDisclaimer  ? <div className='error-msg'>Please note that the service may be chargeable, in case of missing invoice details</div> : null}
      </div>
    )
  }

  renderServiceRequestReason() {
    return (
      <div className='service-request-reasons'>
        <h4 className='heading'>Reason For Service Request</h4>
        <Checkboxes data={this.state.serviceRequestReasons} title='Reason for Service Request' onSelection={this.getServiceRequestReason.bind(this)}
          onOtherText={this.onOtherReasonEnter.bind(this)} />
      </div>
    )
  }

  renderProductDetails() {
    return (
      <>
        <div className="itemBox">
          <div className="orderProduct clearfix">
            <div className="orderimgbox clearfix">
              <div className="imgBox">
                <img src={require('../../../public/images/plpAssests/placeholder-image.png')} className="imgfullwidth" />
              </div>
              <div className="product-text">
                <p className="heading">Product Name</p>
                <p className="description">(Description)</p>
                <p className="price">
                  <span className="discount-price">₹ 202922</span>
                </p>
                <div className="quantity-shipping clearfix">
                  <div className="quantity">
                    <span className="heading">Quantity: </span>
                    <span className="textval">2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

}
export default ServiceRequestForm;
