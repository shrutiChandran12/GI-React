import React from 'react';
import { Row, Col } from 'react-bootstrap';

class productDetail extends React.Component {
  constructor() {
    super();
    this.dataClass = '';
    this.activeClass = 'active';
  }

  /* display tab with data */
  productDetailsTab(divId) {
    const tabcontent = document.getElementsByClassName('tabcontent');
    const tabData = document.getElementsByClassName('tabData');
    const contentElement = document.getElementById(`content_${divId}`);
    const tabElement = document.getElementById(`tab_${divId}`);

    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].classList.remove('dataNotActive');
      tabcontent[i].classList.add('dataNotActive');
      tabData[i].classList.remove('active');
    }
    contentElement.classList.remove('dataNotActive');
    contentElement.classList.remove('dataActive');
    tabElement.classList.add('active');
  }

  render() {
    return (
      <div className="product_details">
        <Row>
          <Col md={12} sm={12} xs={12}>
            <h3 className="heading"> Product Detail</h3>
          </Col>
        </Row>
        <Row>
          <Col md={6} sm={12} xs={12}>
            <div className="product_img">
              <img
                className="imgfullwidth"
                src={this.props.productDetail.imagePath}
              />
            </div>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <div className="product_description">
              {this.props.productDetail.description.map((tabData, index) => {
                this.activeClass = 'active';
                if (index > 0) {
                  this.activeClass = '';
                }

                return (
                  <a
                    key={index}
                    id={`tab_${index}`}
                    className={`tab tabData ${this.activeClass}`}
                    onClick={() => this.productDetailsTab(index)}
                  >
                    {tabData.title}
                  </a>
                );
              })}
              {this.props.productDetail.description.map((data, index) => {
                this.dataClass = '';
                if (index > 0) {
                  this.dataClass = 'dataNotActive';
                }
                return (
                  <div key={index}>
                    <div
                      id={`content_${index}`}
                      className={`tabcontent ${this.dataClass}`}
                    >
                      {data.values.map((tabContent, id) => (
                        <div key={id}>
                          <b>{tabContent.name}</b>
                          <p>{tabContent.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default productDetail;
