import React from 'react';
import apiManager from '../../utils/apiManager';
import {
  espotAPI, homePageApi
} from '../../../public/constants/constants';
import DescriptionBanner from '../PlpComponent/DescriptionBanner/descriptionBanner';
import '../../../public/styles/readMore.scss';
import { HomepageES } from '../../utils/EspotConstant';

class ReadMore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      readableData: '',
      error: false,
      hasMore: true,
      isLoading: false,
    };
  }

  	getReadMoreData() {
    apiManager
      	.get(`${espotAPI}${HomepageES.about}`)
		.then(response => {
			const {data} = response || '';
			this.setState({
				readableData: data && data.data,
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
    this.getReadMoreData();
  }
  

  render() {
    const { readableData } = this.state;
    return (
      !!readableData && (
        <div className="readMore">
          <DescriptionBanner
            descriptionDataPro={this.state.readableData}
            ref={divElement => (this.divElement = divElement)}
            isH1Tag={true}
          />
        </div>
      )
    );
  }
}

export default ReadMore;
