import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import Rater from "react-rater";
import { getHome } from "../../service/home.service";

import "./home.css";

class Home extends React.Component {
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
                <Button
                  variant="warning"
                  href={`/home/edit/${this.state.home._id}`}
                >
                  Edit
                </Button>{" "}
                <Button variant="danger">Delete</Button>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}

export default Home;
