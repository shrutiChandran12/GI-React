import React from 'react';
import { Col } from 'react-bootstrap';

const productKeywords = props => (
  <>
    {      
      <Col md={12} sm={12} xs={12}>
      <div className='moreKeyword'>
        <h3 className="heading">More Items You May Like</h3>
        <ul className="keywordsList">
          {props.productKeywords.map((keywords, i) => (
            <li className='list' key={i}>
              {keywords}
            </li>
          ))} 
        </ul>
        </div>
      </Col>
      
    }
  </>
);
export default productKeywords;
