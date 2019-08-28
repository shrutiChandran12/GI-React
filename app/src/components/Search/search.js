import React from 'react';
//Redux Imports
import { connect } from 'react-redux';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from '../../containers/PlpContainer/reducer';
import saga from '../../containers/PlpContainer/saga';
import { compose } from 'redux';
import * as actionCreators from '../../containers/PlpContainer/actions';
import { getReleventReduxState, fetchReleventSortingValue, fetchReleventSortingValueByIndex } from '../../utils/utilityManager';

import { Route, NavLink, Link, withRouter } from 'react-router-dom';

import apiManager from '../../utils/apiManager';
import SearchLogo from '../SVGs/search';
import {
  autoSuggestAPI
} from '../../../public/constants/constants';
import '../../../public/styles/headerContainer/search.scss';

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      searchData: [],
    };
    this.handleClick = this.handleChange.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.clearFields= this.clearFields.bind(this);
    this.showButton= this.showButton.bind(this);
    this.searchResultClick = false;
  }

  handleChange = event => {
    const searchText = event.target.value;
    if (event.target.value === '') {            
      var crossbtn=document.getElementById('clearField');
      crossbtn.style.display='none';
  	}
    this.setState({
      searchData: [],
    });

    if (searchText.length > 1) {
      if (searchText) {
        apiManager
          .get(autoSuggestAPI + searchText)
          .then(response => {
            document.addEventListener('click', this.handleOutsideClick, false);
            this.setState({
              searchData: response.data.data.suggestionView[0].entry,
            });
          })
          .catch(error => {
            console.log(error.message);
          });
      } else {
        document.removeEventListener('click', this.handleOutsideClick, false);
      }
    }
  };

  handleOutsideClick(e) {
    if (this.state.searchData.length > 0) {
      if (this.node.contains(e.target)) {
        return;
      }
      this.setState({
        searchData: [],
      });
    }
  }

  componentDidMount() { 
    const wage = document.getElementById('searchInput');
    wage.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        this.onSearchResultClick(e);
      }
    });
  }

  onSearchResultClick(e) {
    const text = e.target.value.trim();
    if (text !== '') {
      console.log('mmmmm --- ',e.target.value);
      
      this.props.plpReduxStateReset();
      console.log('dd -- ', this.props);
      this.props.history.push({ pathname: '/search', search: `keyword=${text}` });
      this.setState({
        searchData: [],
      });
      this.searchResultClick = true;
    }
    
  }

  onLinkNavigation = (e) => {
    console.log('dd -- ', e.target.name);
    document.getElementById("searchInput").value=e.target.name;
    this.props.plpReduxStateReset();
    this.setState({
      searchData: [],
    });
  }

	clearFields(e){         
		document.getElementById("searchInput").value='';     
		const crossbtn = document.getElementById('clearField');
    crossbtn.style.display='none'
    document.getElementById("searchInput").focus();
	}

	showButton(e){
    if (this.searchResultClick === false) {
	    const crossbtn = document.getElementById('clearField');
      crossbtn.style.display='block'
    } else {
      this.searchResultClick = false;
    }
	}

  render() {
	const searchData = this.state.searchData;
    return (
        <div className='searchBar'>
            <SearchLogo />                
            <input className='searchInput' id='searchInput' onKeyPress={this.showButton} onChange={this.handleChange} onClick={this.handleChange} type='text' autoComplete='off' placeholder='What are you looking for?' />
            <a className='clearField' id='clearField' role='button' onClick={this.clearFields}>X</a>
            { searchData.length > 0 && 
                <div id='autoSuggestDiv' ref={node => { this.node = node; }}>
                    <ul className='auto-search'>
                    <li className='list'><a className='link' href='#'>Suggestions</a></li>
                        { searchData.map((item, index) => {    
                            const searchItem = document.getElementById("searchInput").value;
                            if (index < 6) {								
                                return(
									<li className="list" key={index}>
										<Link name={item.term} className="link" onClick={this.onLinkNavigation} to={{ pathname: '/search', search: `keyword=${item.term}`, }} >
											<strong>{item.term.substr(0, searchItem.length)}</strong>{item.term.substr(searchItem.length).replace(' ','')}
										</Link>
									</li>
                                );
                            }
                            })
                        }
                    </ul>
                </div>
            }
        </div>
    );
  }
}

//export default withRouter(SearchBar);
// export default SearchBar;

/* ----------------------------------------   REDUX HANDLERS   -------------------------------------  */
const mapDispatchToProps = dispatch => {
  return {
    plpReduxStateReset: () => dispatch(actionCreators.resetPLPReduxState()),
  }
};

const mapStateToProps = state => {
  const stateObj = getReleventReduxState(state, 'plpContainer');
  return {

  }
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
)(SearchBar);
