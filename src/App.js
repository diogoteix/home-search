import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-rater/lib/react-rater.css";
import HomeList from "./components/home-list.component";
import Header from "./components/header.component";
import Home from "./components/home/home.component";
import HomeEdit from "./components/home/home-edit.component";

function App() {
  return (
    <Router>
      <div className="App">
        <Header></Header>

        <div className="AppContent">
          <Switch>
            <Route path="/home/new" component={HomeEdit} />
            <Route path="/home/edit/:id" component={HomeEdit} />
            <Route path="/home/:id" component={Home} />
            <Route path="/" component={HomeList} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
