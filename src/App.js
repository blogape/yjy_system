import React, { Component } from "react";
import "./App.css";
import { Button } from "antd";
import "antd/dist/antd.css";
import { doubanbook } from "./api/api.js";

class App extends Component {
  constructor(props) {
    super(props);
  }
  handleClick() {
    let result = doubanbook();
    result
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="App">
        <Button type="primary" onClick={this.handleClick.bind(this)}>
          Primary
        </Button>
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
