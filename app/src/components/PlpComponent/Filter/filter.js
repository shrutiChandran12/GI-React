import React from 'react';
import { connect } from 'react-redux';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import reducer from '../../../containers/PlpContainer/reducer';
import saga from '../../../containers/PlpContainer/saga';
import { compose } from 'redux';
import * as actionCreators from '../../../containers/PlpContainer/actions';

class Filter extends React.Component {
    constructor() {
        super();
        this.state = {
    
        }
    }

    render() {
        return (
            <>
               <h1 onClick={this.props.onFilterUpdate}>Filterrrr</h1>
            </>
        )
    }

}
  
  const mapDispatchToProps = dispatch => {
    return {
      onFilterUpdate: () => dispatch(actionCreators.filter('Master Filter New')),
    }
  };

  const mapStateToProps = state => {
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
  )(Filter);
  

