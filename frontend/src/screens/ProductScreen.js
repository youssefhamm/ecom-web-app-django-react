import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Rating from '../components/Rating'
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProductDetails } from '../actions/productActions'
import { useParams, useNavigate } from "react-router-dom";



function ProductScreen() {
  const [qty, setQty] = useState(1)

  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails; 

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

 
  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

 
  return (
    <div>
      <h2>{product.name}</h2>
      {/* Reste de votre code */}
      <Link to="/" className="btn btn-light my-3">
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col>
            <Image
              src={"/images/" + product.image?.split("/images/")[1]}
              alt={product.name}
              className="img-fluid"
            />
          </Col>

          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color={"#f8e825"}
                />
              </ListGroup.Item>

              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Col>Status:</Col>
                  <Col>
                    {product.counInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </ListGroup.Item>

               
                  {product.counInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col xs="auto" className="my-1">
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {
                            
                            [...Array(product.counInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))
                            }
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler()}
                    className="btn-block"
                    disabled={product.counInStock === 0}
                    type="button"
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
      
    </div>
  );
}

export default ProductScreen;
