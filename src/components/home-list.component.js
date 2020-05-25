import React from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getHomes } from "../service/home.service";

class HomeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { homes: [], id: "1" };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    getHomes().then((data) => {
      this.setState({ homes: data, id });
    });
  }

  render() {
    return (
      <Container>
        <h1>{this.state.id}</h1>
        {this.state.homes &&
          this.state.homes.map((home) => (
            <Row>
              <Link to={`/home/${home._id}`}>{home.url}</Link>
            </Row>
          ))}
      </Container>
    );
  }
}

export default HomeList;
