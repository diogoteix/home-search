import React from "react";
import { getHomes } from "../service/home.service";

class HomeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { homes: [] };
  }

  componentDidMount() {
    getHomes().then((data) => {
      this.setState({ homes: data });
    });
  }

  render() {
    return (
      <div>
        {this.state.homes &&
          this.state.homes.map((home) => <div>{home.url}</div>)}
      </div>
    );
  }
}

export default HomeList;
