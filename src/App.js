import React, { Component } from 'react';
import Comparison from './Comparison';
import Filter from './Filter';
import CardList from './CardList';
import DistrictRepository from './helper';
import kinderData from '../data/kindergartners_in_full_day_program.js';
import './App.css';
const district = new DistrictRepository(kinderData);

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      dataArray: district.findAllMatches(),
    }
  }

  handleInput(input) {
    this.setState({dataArray: district.findAllMatches(input)})
  }

  toggleSelected(location) {
    const index = this.state.dataArray.map(district => district.location).indexOf(location);
    this.state.dataArray[index].selected = !this.state.dataArray[index].selected;

    let selectedTotal = 0;
    const selectedTotalSum = this.state.dataArray.map((district) => {
      if(district.selected === true) {
        selectedTotal++;
      }
    })

    if(selectedTotal <= 2) {
      this.setState({ dataArray: this.state.dataArray })
    } else {
      this.state.dataArray[index].selected = !this.state.dataArray[index].selected;
    }
  }

  render() {
    return (
      <div className='app'>
        <Comparison dataArray={this.state.dataArray}
                    toggleSelected={this.toggleSelected.bind(this)}
                    findAverage={district.findAverage.bind(district)}
                    compareDistrictAverages={district.compareDistrictAverages.bind(district)}/>
        <Filter handleInput={this.handleInput.bind(this)}/>
        <CardList dataArray={this.state.dataArray}
                  toggleSelected={this.toggleSelected.bind(this)}/>
      </div>
    );
  }
}
