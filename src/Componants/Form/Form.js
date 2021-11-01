import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Login from '../Login/Login';

const Form = () => {
     return (
          <div>

               <Container className="m-5">
                    <Row>
                         <Col sm={8} md={6} >
                              <div className="p-3">
                                   <Login></Login>

                              </div>

                         </Col>
                         <Col sm={4} md={6}>

                         </Col>
                    </Row>
               </Container>

          </div>
     );
};

export default Form;