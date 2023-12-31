import React, { useEffect  } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { Col, ListGroup, Image, ListGroupItem, Row, Form, Button, Card } from 'react-bootstrap'


function CartScreen() {
    const { productId } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const qty = location.search ? Number(location.search.split('=')[1]): 1
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    
    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    },  [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping')
    }

  return (
    <Row>
        <Col md={8}>
            <h1> Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <Message varuant='info'> 
                    Your cart is empty <Link to='/'>Go back</Link>
                </Message>
            ) : (
                <ListGroup variant='flush'>
                    {cartItems.map(item => (
                        <ListGroupItem key={item.product}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col md={2}>
                                    ${item.price}
                                </Col>

                                <Col md={3}>
                                    <Form.Select
                                        value={item.qty}
                                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                    >
                                    {
                                        [...Array(item.countInStock).keys()].map((x) => (
                                        <option key={x+1} value={x+1}>
                                            {x + 1}
                                        </option>
                                        ))
                                    }
                                    </Form.Select>
                                </Col>

                                <Col md={1}>
                                    <Button
                                        type='button'
                                        variant='light'
                                        onClick={() => removeFromCartHandler(item.product)}
                                    >
                                        <i className='fas fa-trash'></i>

                                    </Button>
                                </Col>

                            </Row>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            )}
        </Col>

        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>
                           Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items  
                        </h2>
                        ${cartItems.reduce((acc, item)=> acc + item.qty * item.price, 0).toFixed(2)}
                    </ListGroup.Item>
                </ListGroup>

                <ListGroupItem className="text-center my-3"> 
                    <Button
                        type='button'
                        className='btn-block'
                        disabled={cartItems.length === 0}
                        onClick={checkoutHandler}
                    >
                        Proceed To Checkout
                    </Button>
                                    
                </ListGroupItem>                  

            </Card>
        </Col>
        
    </Row>
  )
}

export default CartScreen
