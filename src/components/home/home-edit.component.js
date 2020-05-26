import React from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import Rater from "react-rater";
import { Link } from "react-router-dom";
import { getHome } from "../../service/home.service";

import "./home.css";

class HomeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { home: null, id: null };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    getHome(id).then((data) => {
      this.setState({ home: data, id });
    });
  }

  changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      home: {
        ...this.state.home,
        [name]: value,
      },
    });

    console.log(this.state);
  };

  render() {
    const price = this.state.home?.price[this.state.home.price.length - 1]
      .value;
    const priceArea = price / this.state.home?.area;
    return (
      <div>
        {this.state.home && (
          <Container>
            <Row>
              <Col md={8}>
                <iframe
                  className="iframe"
                  title={this.state.home.description}
                  src={this.state.home.url}
                ></iframe>
              </Col>
              <Col md>
                <Form>
                  <Form.Group>
                    <Form.Label>Url</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter url"
                      name="url"
                      value={this.state.home.url}
                      onChange={this.changeHandler}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter description"
                      name="description"
                      value={this.state.home.description}
                      onChange={this.changeHandler}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter location"
                      name="location"
                      value={this.state.home.location}
                      onChange={this.changeHandler}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter price"
                      name="price"
                      value={this.state.home.price}
                      onChange={this.changeHandler}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Area</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter area"
                      name="area"
                      value={this.state.home.area}
                      onChange={this.changeHandler}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter year"
                      name="year"
                      value={this.state.home.year}
                      onChange={this.changeHandler}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Tipology</Form.Label>
                    <Form.Control
                      as="select"
                      name="type"
                      value={this.state.home.type}
                      onChange={this.changeHandler}
                    >
                      <option>T1</option>
                      <option>T2</option>
                      <option>T3</option>
                      <option>T4</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Location Rating</Form.Label>
                    <Rater
                      total={5}
                      rating={this.state.home.locationRating}
                      onRate={({ rating }) =>
                        this.changeHandler({
                          target: { name: "locationRating", value: rating },
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Price Rating</Form.Label>
                    <Rater
                      total={5}
                      rating={this.state.home.priceRating}
                      onRate={({ rating }) =>
                        this.changeHandler({
                          target: { name: "priceRating", value: rating },
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Rating</Form.Label>
                    <Rater
                      total={5}
                      rating={this.state.home.rating}
                      onRate={({ rating }) =>
                        this.changeHandler({
                          target: { name: "rating", value: rating },
                        })
                      }
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
                <h5>{this.state.home.description}</h5>
                <h5>
                  {price.toLocaleString("pt-PT", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </h5>
                <h5>{this.state.home.area}m2</h5>
                <h5>
                  {priceArea.toLocaleString("pt-PT", {
                    style: "currency",
                    currency: "EUR",
                  })}
                  /m2
                </h5>
                <h5>{this.state.home.year}</h5>
                <h5>{this.state.home.type}</h5>
                <Rater
                  total={5}
                  rating={this.state.home.locationRating}
                  interactive={false}
                />
                <br />
                <Rater
                  total={5}
                  rating={this.state.home.priceRating}
                  interactive={false}
                />
                <br />
                <Rater
                  total={5}
                  rating={this.state.home.rating}
                  interactive={false}
                />
                <br />
                <Button variant="warning" href={`/home/${this.state.home._id}`}>
                  Discard
                </Button>{" "}
                <Button variant="success">Confirm</Button>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}

export default HomeEdit;
