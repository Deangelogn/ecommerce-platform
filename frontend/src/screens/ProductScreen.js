import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem } from 'react-bootstrap';
import Rating from '../components/Rating';
import products from '../products';

function ProductScreen() {
  const { id } = useParams();
  const product = products.find(p => p._id === id);
  
  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>Go back</Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.na} fuild/>
        </Col>

        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>

            <ListGroupItem>
              <h3><Rating value={product.rating} text={`${product.numReviews} rating`} color={'#f8e825'}/></h3>
            </ListGroupItem>
            
            <ListGroupItem>
              Price ${product.price}
            </ListGroupItem>
            
            <ListGroupItem>
              Description ${product.description}
            </ListGroupItem>
            
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <Row>
                <Col>Price:</Col>
                <Col><strong>${product.price}</strong></Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>${product.countInStock > 0 ? 'In stock' : 'Out of Stock'}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem className="text-center">
                <Button className='btn-block' disabled={product.countInStock === 0} type='button'>Add to Cart</Button>
              </ListGroupItem>

            </ListGroup>
          </Card>  
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;
