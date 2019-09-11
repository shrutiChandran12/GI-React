import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../../../containers/PlpContainer/reducer';
import saga from '../../../containers/PlpContainer/saga';
import * as actionCreators from '../../../containers/PlpContainer/actions';
import { getReleventReduxState, isMobile } from '../../../utils/utilityManager';
import { imagePrefix } from '../../../../public/constants/constants';
import { runInThisContext } from 'vm';

const downArrow = (
  <img
    className="dropdownArrow"
    src={require('../../../../public/images/plpAssests/drop-down-arrow-down.svg')} alt="Down"
  />
);
const upArrow = (
  <img
    className="dropdownArrow"
    src={require('../../../../public/images/plpAssests/drop-down-arrow-up.svg')} alt="Up"
  />
);

class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: 0,
      options: ['recommended', 'price_L_H', 'price_H_L', 'newArrival'],
      facetItem: null,
      facetArr: [],
      checked: false,
      isMobile: window.innerWidth <= 760,
      isRWDFilterSelected: false,
    }
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.onCheckBoxClick = this.onCheckBoxClick.bind(this);
    this.onCancelBtnClick = this.onCancelBtnClick.bind(this);
    this.onApplyBtnClick = this.onApplyBtnClick.bind(this);
  }

  toggleDropdown(ismmm) {
   


    if (!this.state.active) {
      document.addEventListener('click', this.handleOutsideClick, false);
      if (isMobile()) {
        this.resolvePreSelectedFilters();
      }
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.unCkeckAll();
    [
      ...document.getElementsByClassName(
        `checkboxSelected${this.props.dataPro.facetName}`,
      ),
    ].map(input => {
      input.checked = 'checked';
    });

    const filteredArr = [];
    var preFilter = this.props.updatedFilter;
    if (isMobile()) {
      preFilter = this.props.RWDupdatedFilter
    }
    for (const [key, value] of preFilter) {
      if (key === this.props.dataPro.facetName) {
        value.map((option, i) => {
          filteredArr.push(option);
        });
      }
    }

    // this.setState({facetArr: filteredArr})

    this.setState({
      active: !this.state.active,
      facetArr: filteredArr,
    });
  }


  handleOutsideClick(e) {
    if (this.node.contains(e.target)) {
      return;
    }
    this.toggleDropdown();
  }

  onCheckBoxClick(index) {
    const selectedFacet = this.props.dataPro.facetValues[index];

    let filteredArr = [...this.state.facetArr];
    const extFacetArr = this.state.facetArr.map(item => {
      return item.value.replace(/\%2B/g, '+');
    });
    if (!extFacetArr.includes(selectedFacet.value)) {
      filteredArr.push(selectedFacet);
    } else {
      filteredArr = this.state.facetArr.filter((value, i, arr) => {
        if (value.value.replace(/\%2B/g, '+') != selectedFacet.value) {
          return value;
        }
      });
    }
    const params = new URLSearchParams(this.props.location.search);

    this.setState({ facetArr: filteredArr });

    if (isMobile()) {
      this.state.facetArr = filteredArr;
      this.props.onRWDFilterUpdate(this.state.facetArr, this.props.dataPro.facetName, false);

      var staticFilterArr = [];
      this.state.facetArr.map(data => {
        staticFilterArr.push(data.value)
      })

      this.filterOptions(staticFilterArr);
      if (filteredArr.length !== 0) {
        this.setState({
          isRWDFilterSelected: true,
        });
      }
      else {
        this.setState({
          isRWDFilterSelected: false,
        });
      }
    }
  }

  onCancelBtnClick() {
    this.toggleDropdown();
    if (this.props.isFromRWD) {
      this.props.rwdFilterCallbackPro();
      this.props.onRWDFilterCancel()
    }
    if (isMobile()) {
    }

  }

  unCkeckAll() {
    [
      ...document.getElementsByClassName(
        `checkbox${this.props.dataPro.facetName}`,
      ),
    ].map(input => {
      if (input.checked) {
        input.checked = !input.checked;
      }
      return null;
    });
  }

  componentDidMount() {

    this.resolvePreSelectedFilters();
  }

  componentWillReceiveProps(nextProps) {
    if (isMobile()) {
      if (nextProps.RWDupdatedFilter !== this.props.RWDupdatedFilter) {
        this.unCkeckAll();
        this.filterOptions([]);
      }
    }
  }

  resolvePreSelectedFilters() {
    const alreadyAddedFiltersArr = [];
    const filteredArr = [...this.state.facetArr];
    var preFilter = this.props.updatedFilter;
    if (isMobile()) {
      preFilter = this.props.RWDupdatedFilter
    }
    for (const [key, value] of preFilter) {
      if (key === this.props.dataPro.facetName) {
        value.map((option, i) => {
          filteredArr.push(option);
          alreadyAddedFiltersArr.push(option);
        });
      }
    }
    this.setState({
      facetArr: filteredArr,
      active: this.props.indexPro === 0 && this.props.isFromRWD ? !this.state.active : false
    });
    const extFacetArr = filteredArr.map(
      item =>
        item.value.replace(/\%2B/g, '+'),
    );
    this.filterOptions(extFacetArr);
  }

  onApplyBtnClick() {
    this.state.facetArr.map(item => {
      item.value = item.value.replace(/\+/g, '%2B');
    });


  

    if (isMobile()) {
      this.props.onRWDFilterUpdate(this.state.facetArr, this.props.dataPro.facetName, true);
    }
    else {
      this.props.onFilterUpdate(
        this.state.facetArr,
        this.props.dataPro.facetName,
      );
    }


  }

  filterOptions(alreadyAddedFiltersArr) {
    var isRWDFacetSelecte = false;
    const item = this.props.dataPro.facetValues.map((option, i) => {
      let checkboxItem;
      let customSelectionBoxId;
      if (alreadyAddedFiltersArr.includes(option.value)) {
        customSelectionBoxId = `selected_${this.props.dataPro.facetName}${i}`;
        checkboxItem = (
          <input
            className={`inputCheck checkboxSelected${
              this.props.dataPro.facetName
              }`}
            onChange={evt => this.onCheckBoxClick(i)}
            defaultChecked
            type="checkbox"
            id={customSelectionBoxId}
            name="scales"
          />

        );
        isRWDFacetSelecte = true;
      } else {
        customSelectionBoxId = this.props.dataPro.facetName + i;
        checkboxItem = (
          <input
            className={`inputCheck checkbox${this.props.dataPro.facetName}`}
            onChange={evt => this.onCheckBoxClick(i)}
            type="checkbox"
            id={customSelectionBoxId}
            name="scales"
            disabled={option.count === 0 ? true : false}
          />
        ); 

      }

      let checkItem;
    

      let colorStyle = {
        display: 'block',
      };
      let imgUrl = null;
      let colorRGBClass;
      let customCheckItem;
      if (option.colorCode) {
        colorRGBClass = 'circleRGB';
        colorStyle = { backgroundColor: `rgb${option.colorCode}` };
        customCheckItem = (
          <div className="circlebox">
            <span className={colorRGBClass} style={colorStyle} />
          </div>
        );
        checkItem = (
          <label className="lblradio" htmlFor={customSelectionBoxId}>
            {customCheckItem}
          </label>
        );
      }
      else if (option.facetImage) {
        colorRGBClass = 'circle';
        imgUrl = `${imagePrefix}${option.facetImage}`;
        customCheckItem = (
          <img className={colorRGBClass} style={colorStyle} src={imgUrl} />
        );
        checkItem = (
          <label className="lblradio" htmlFor={customSelectionBoxId}>
            {customCheckItem}
          </label>
        );
      }
      else {
        checkItem = (
          <label className="lblCheck" htmlFor={customSelectionBoxId} />
        );
      }

      return (
        <li key={i} className="list">
          <div
            key={i}
            className={`dropdown__list-item ${
              i === this.state.selected ? 'dropdown__list-item--active' : ''
              }`}
          >
            <div className="input_box">
              {checkboxItem}
              {checkItem}
            </div>

            {!isMobile() ? (
              <div className={option.count === 0 ? 'label_text_disable' : 'label_text'}>
                {`${option.label} (${option.count})`}
              </div>
            )
              : (
                <div className={option.count === 0 ? 'label_text_disable' : 'label_text'}>
                  {option.label} <span className='filterCount'> {option.count}</span>
                </div>
              )}

          </div>
        </li>
      );
    });
    this.setState({
      facetItem: item,
      isRWDFilterSelected: isRWDFacetSelecte,
    });
  }

  render() {
    return (
      <>
        <div
          ref={node => {
            this.node = node;
          }}
          className="dropdown_filter"
        >
          <div className="dropdown_filter__filter">
            <div className="dropdown_filter__toggle dropdown_filter__list-item" onClick={this.props.isFromRWD ? this.state.active ? null : () => this.toggleDropdown(true) : () => this.toggleDropdown(true)}>
              {this.props.dataPro.facetName}
              {this.props.isFromRWD ? this.state.isRWDFilterSelected ? <div className='selectedFacet'>•</div> : null : null}
              {this.props.isFromRWD ? null : this.state.active ? upArrow : downArrow}
            </div>
          </div>

          {!isMobile() && <ul className={`dropdown_filter__list ${this.state.active ? 'dropdown_filter__list--active' : ''}`}>
            {this.state.facetItem}
            <div className='clearfix'></div>
            <div className="filterbtnWrapper">
              <button onClick={() => this.onCancelBtnClick()} className="dropdown_filter__cancelBtn btn">Cancel</button>
              <button onClick={() => this.onApplyBtnClick()} className="dropdown_filter__applyBtn btn">Apply</button>
            </div>
          </ul>}

          {isMobile() && <div className='filter-data-list'><ul
            className={`dropdown_filter__list ${
              this.state.active ? 'dropdown_filter__list--active' : ''
              }`}
          >
            {this.state.facetItem}
            {isMobile() && <><div className='clearfix'></div>

              <div className="filterbtnWrapper">
                <button onClick={() => this.onCancelBtnClick()} className="dropdown_filter__cancelBtn btn" >Cancel</button>
                <button onClick={() => this.onApplyBtnClick()} className="dropdown_filter__applyBtn btn">Apply</button>
              </div></>}
          </ul></div>}



        </div>
      </>
    );
  }
}

/* ----------------------------------------   REDUX HANDLERS   -------------------------------------  */
const mapDispatchToProps = dispatch => {
  if (isMobile()) {
    return {
      onRWDFilterUpdate: (RWDupdatedArr, RWDfacetName, isApply) => dispatch(actionCreators.RWDFilter(RWDupdatedArr, RWDfacetName, isApply)),
      onRWDFilterCancel: () => dispatch(actionCreators.cancelRWDFilters()),
    }
  }
  else {
    return {
      onFilterUpdate: (updatedArr, facetName) => dispatch(actionCreators.filter(updatedArr, facetName)),
    }
  }


};

const mapStateToProps = state => {
  const stateObj = getReleventReduxState(state, 'plpContainer');
  return {
    updatedFilter: stateObj.updateFilter,
    RWDupdatedFilter: stateObj.rwdUpdatedFilter,
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'plpContainer', reducer });
const withSaga = injectSaga({ key: 'plpContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withRouter,
)(Filter);