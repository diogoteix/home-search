import React from "react";
import { Container, Row, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getHomes } from "../service/home.service";

import "./home-list.css";

class HomeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { homes: [], id: "1", showModal: false, modalUrl: null };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    getHomes().then((data) => {
      this.setState({ homes: data, id });
    });
  }

  handleClose = () => this.setState({ showModal: false, modalUrl: null });

  handleShow = (url) => this.setState({ showModal: true, modalUrl: url });

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
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Localização</th>
              <th>Tipologia</th>
              <th>Area</th>
              <th>Preço</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.homes &&
              this.state.homes.map((home) => (
                <tr onClick={() => this.handleShow(home.url)}>
                  <td>
                    {/* <Link to={`/home/${home._id}`}>{home.url}</Link> */}
                    {home.description}
                  </td>
                  <td>{home.location}</td>
                  <td>{home.type}</td>
                  <td>{home.area}</td>
                  <td>{home.price[home.price.length - 1]?.value}</td>
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
