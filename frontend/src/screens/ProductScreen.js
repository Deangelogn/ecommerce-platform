import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, Form, ListGroupItem } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';


function ProductScreen() {
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    dispatch(addToCart(id, qty));
    navigate(`/cart/${id}?qty=${qty}`)
  }

  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>Go back</Link>
      
      {loading ?
        <Loader/>
        : error
          ? <Message variant='danger'>{error}</Message>
        :(
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

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col xs='auto' className='my-1'>
                      <Form.Select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {
                         [...Array(product.countInStock).keys()].map((x) => (
                          <option key={x+1} value={x+1}>
                            {x + 1}
                          </option>
                         ))
                        }
                      </Form.Select>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}


              <ListGroupItem className="text-center">
                <Button className='btn-block' disabled={product.countInStock === 0} type='button'
                onClick={addToCartHandler}
                >Add to Cart</Button>
              </ListGroupItem>

            </ListGroup>
          </Card>  
        </Col>
      </Row>
        )
      }
    </div>
  );
}

export default ProductScreen;
