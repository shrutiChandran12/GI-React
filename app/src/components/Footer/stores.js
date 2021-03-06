import React from 'react';
import { Col } from 'react-bootstrap';

const StoreLinks = (props) => {
    return(
        <Col md={12} sm={12}>
            <div>
                <h3 className='heading'>
                    {props.name.text}
                </h3>
                <ul className='store_area'>
                    { props.name.children.map((links, i) => {
                        return (
                            <li className='list' key={i}>
                                <a className='link' href={links.action}>{links.text} </a>
                               
                            </li>
                        )})
                    }
                </ul>                
            </div>
        </Col>
    );
}

export default StoreLinks;