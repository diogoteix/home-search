import React from "react";
import {
  Container,
  InputGroup,
  Table,
  Modal,
  FormControl,
  Row,
  Col,
  Accordion,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { getHomes } from "../service/home.service";

import "./home-list.css";

class HomeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homes: [],
      id: "1",
      showModal: false,
      modalUrl: null,
      search: {
        location: "",
        type: "",
        areaMax: 0,
        areaMin: 0,
        priceMin: 0,
        priceMax: 0,
        priceAreaMin: 0,
        priceAreaMax: 0,
      },
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    getHomes().then((data) => {
      this.setState({ homes: data, id });
    });
  }

  handleClose = () => this.setState({ showModal: false, modalUrl: null });

  handleShow = (url) => this.setState({ showModal: true, modalUrl: url });

  changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      search: {
        ...this.state.search,
        [name]: value,
      },
    });

    console.log(this.state);
  };

  filterHomes = (homes) => {
    return homes
      .filter(
        (home) =>
          !this.state.search.location ||
          home.location === this.state.search.location
      )
      .filter(
        (home) =>
          !this.state.search.type || home.type === this.state.search.type
      )
      .filter(
        (home) =>
          !this.state.search.areaMax ||
          parseInt(home.area) <= parseInt(this.state.search.areaMax)
      )
      .filter(
        (home) =>
          !this.state.search.areaMin ||
          parseInt(home.area) >= parseInt(this.state.search.areaMin)
      )
      .filter(
        (home) =>
          !this.state.search.priceMax ||
          home.price[home.price.length - 1]?.value <=
            parseInt(this.state.search.priceMax)
      )
      .filter(
        (home) =>
          !this.state.search.priceMin ||
          home.price[home.price.length - 1]?.value >=
            parseInt(this.state.search.priceMin)
      )
      .filter(
        (home) =>
          !this.state.search.priceAreaMax ||
          home.price[home.price.length - 1]?.value / parseInt(home.area) <=
            parseInt(this.state.search.priceAreaMax)
      )
      .filter(
        (home) =>
          !this.state.search.priceAreaMin ||
          home.price[home.price.length - 1]?.value / parseInt(home.area) >=
            parseInt(this.state.search.priceAreaMin)
      );
  };

  render() {
    return (
      <Container>
        <Modal
          size="lg"
          centered
          show={this.state.showModal}
          onHide={this.handleClose}
          dialogClassName="custom-modal"
          bsClass="my-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <iframe className="iframes" src={this.state.modalUrl}></iframe>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
        <Container className="m-2">
          <Accordion>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Filtros
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Container>
                <Row>
                  <Col md className="mb-2">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-lg">
                          Localização
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        as="select"
                        name="location"
                        placeholder="Enter location"
                        value={this.state.search.location}
                        onChange={this.changeHandler}
                      >
                        <option></option>
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
                      </FormControl>
                    </InputGroup>
                  </Col>
                  <Col md className="mb-2">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-lg">
                          Tipologia
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        as="select"
                        name="type"
                        placeholder="Enter type"
                        value={this.state.search.type}
                        onChange={this.changeHandler}
                      >
                        <option></option>
                        <option>T1</option>
                        <option>T1+1</option>
                        <option>T2</option>
                        <option>T2+1</option>
                        <option>T3</option>
                        <option>T3+1</option>
                        <option>T4</option>
                        <option>T4+1</option>
                      </FormControl>
                    </InputGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md className="mb-2">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-lg">
                          Area Max
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        type="number"
                        name="areaMax"
                        placeholder="Enter max area"
                        value={this.state.search.areaMax}
                        onChange={this.changeHandler}
                      ></FormControl>
                    </InputGroup>
                  </Col>
                  <Col md className="mb-2">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-lg">
                          Area Min
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        type="number"
                        name="areaMin"
                        placeholder="Enter min area"
                        value={this.state.search.areaMin}
                        onChange={this.changeHandler}
                      ></FormControl>
                    </InputGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md className="mb-2">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-lg">
                          Price Min
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        type="number"
                        name="priceMin"
                        placeholder="Enter min price"
                        value={this.state.search.priceMin}
                        onChange={this.changeHandler}
                      ></FormControl>
                    </InputGroup>
                  </Col>
                  <Col md className="mb-2">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-lg">
                          Price Max
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        type="number"
                        name="priceMax"
                        placeholder="Enter max price"
                        value={this.state.search.priceMax}
                        onChange={this.changeHandler}
                      ></FormControl>
                    </InputGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md className="mb-2">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-lg">
                          Price/m2 Min
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        type="number"
                        name="priceAreaMin"
                        placeholder="Enter min area price"
                        value={this.state.search.priceAreaMin}
                        onChange={this.changeHandler}
                      ></FormControl>
                    </InputGroup>
                  </Col>
                  <Col md className="mb-2">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-lg">
                          Price/m2 Max
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        type="number"
                        name="priceAreaMax"
                        placeholder="Enter max area price"
                        value={this.state.search.priceAreaMax}
                        onChange={this.changeHandler}
                      ></FormControl>
                    </InputGroup>
                  </Col>
                </Row>
              </Container>
            </Accordion.Collapse>
          </Accordion>
        </Container>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Localização</th>
              <th>Tipologia</th>
              <th>Ano</th>
              <th>Area</th>
              <th>Preço</th>
              <th>Preço/m2</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.homes &&
              this.filterHomes(this.state.homes).map((home) => (
                <tr onClick={() => this.handleShow(home.url)}>
                  <td>{home.description}</td>
                  <td>{home.location}</td>
                  <td>{home.type}</td>
                  <td>{home.year}</td>
                  <td>{home.area}</td>
                  <td>
                    {home.price[home.price.length - 1]?.value.toLocaleString(
                      "pt-PT",
                      {
                        style: "currency",
                        currency: "EUR",
                      }
                    )}
                  </td>
                  <td>
                    {home.price[home.price.length - 1] &&
                      (
                        home.price[home.price.length - 1]?.value / home.area
                      ).toLocaleString("pt-PT", {
                        style: "currency",
                        currency: "EUR",
                      })}
                  </td>
                  <td>
                    <Link to={`/home/${home._id}`}>Detalhes</Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default HomeList;
