import React from 'react';
import apiManager from '../../utils/apiManager';
import {
  espotAPI,
  storeId,
  accessToken,
} from '../../../public/constants/constants';
import '../../../public/styles/content.scss';

class EasyStepsEspot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      espotName: "GI_DREAM_KITCHEN_STEPS",
      pageLayoutEspot: null,
      isLoading: true,
      error: null,
    };
  }

  getEspotData() {
    apiManager
      .get(espotAPI + this.state.espotName)
      .then(response => {
        console.log('respo', response)
        const {data} = response || {};
        this.setState({
          pageLayoutEspot: data && data.data,
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

  componentDidMount() {
    this.getEspotData();
  }

  render() {
    const { pageLayoutEspot } = this.state;
    if(!pageLayoutEspot) return null;
    return (
		!!pageLayoutEspot && (
			<div className='kitchenEspots'>
				<div dangerouslySetInnerHTML={{ __html: pageLayoutEspot.content }} />
			</div>
		)
    );
  }
}

export default EasyStepsEspot;
