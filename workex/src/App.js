import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BarChart from './bar';
import BarChartSale from './bar_chart';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <BarChart/>
        <BarChartSale/>
      </div>
    );
  }
}

export default App; 