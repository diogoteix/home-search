import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-rater/lib/react-rater.css";
import HomeList from "./components/home-list.component";
import Header from "./components/header.component";
import Home from "./components/home/home.component";

function App() {
  return (
    <Router>
      <div className="App">
        <Header></Header>

        <div className="AppContent">
          <Switch>
            <Route path="/home/:id" component={Home} />
            <Route path="/" component={HomeList} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
