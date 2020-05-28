import React from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import Rater from "react-rater";
import { Link } from "react-router-dom";
import { getHome, updateHome, createHome } from "../../service/home.service";

import "./home.css";

class HomeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { home: null, id: null };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      getHome(id).then((data) => {
        this.setState({
          home: { ...data, price: [...data.price, { value: 0 }] },
          id,
        });
      });
    } else {
      this.setState({
        home: {
          url: "",
          description: "",
          location: "",
          area: 0,
          year: 0,
          type: "",
          locationRating: 0,
          priceRating: 0,
          rating: 0,
          price: [
            {
              value: 0,
            },
          ],
        },
        id: null,
      });
    }
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

  updatePrice = (event) => {
    const value = event.target.value;

    const prices = this.state.home.price;
    prices[this.state.home.price.length - 1] = { value };

    this.setState({
      home: {
        ...this.state.home,
        price: prices,
      },
    });

    console.log(this.state);
  };

  submit(id, home) {
    if (id) {
      updateHome(id, home).then((data) => {
        window.location = `/home/${id}`;
      });
    } else {
      createHome(home).then((data) => {
        window.location = `/home/${data._id}`;
      });
    }
  }

  render() {
    const price = this.state.home?.price[this.state.home.price.length - 1]
      .value;
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
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter description"
                      name="description"
                      value={this.state.home.description}
                      onChange={this.changeHandler}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Localização</Form.Label>
                    <Form.Control
                      as="select"
                      name="location"
                      value={this.state.home.location}
                      onChange={this.changeHandler}
                    >
                      <option>Arcozelo</option>
                      <option>Avintes</option>
                      <option>Canelas</option>
                      <option>Canidelo</option>
                      <option>Girjó e Sermonde</option>
                      <option>Gulpilhares e Valadares</option>
                      <option>Madalena</option>
                      <option>Mafamude e Vilar do Paraíso</option>
                      <option>Oliveira do Douro</option>
                      <option>Pedroso e Seixezelo</option>
                      <option>Sandim, Olival, Lever e Crestuma</option>
                      <option>Santa Marinha e São Pedro da Afurada</option>
                      <option>Serzedo e Perosinho</option>
                      <option>São Felix da Marinha</option>
                      <option>Vilar de Andorinho</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Preço</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter price"
                      name="price"
                      value={price}
                      onChange={this.updatePrice}
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
                    <Form.Label>Ano</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter year"
                      name="year"
                      value={this.state.home.year}
                      onChange={this.changeHandler}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Tipologia</Form.Label>
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
                    <Form.Label>Rating Localização</Form.Label>
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
                    <Form.Label>Rating Preço</Form.Label>
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
                </Form>
                <Button variant="warning" href={`/home/${this.state.home._id}`}>
                  Descartar
                </Button>{" "}
                <Button
                  variant="success"
                  onClick={() => this.submit(this.state.id, this.state.home)}
                >
                  Confirmar
                </Button>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}

export default HomeEdit;
