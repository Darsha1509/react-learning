import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';

import './app.css';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';
import ItemList from '../item-list/item-list';
import SwapiService from '../../services/swapi-service';
import PersonDetails from '../person-details';

export default class App extends Component {
 
  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false,
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  }  

  componentDidCatch() {
    this.setState({hasError: true})
  }
  

  render() {
    
    const {showRandomPlanet, hasError} = this.state;

    if(hasError) {
      return <ErrorIndicator />
    }

    let planet = null;

  if(showRandomPlanet) {planet = <RandomPlanet />};

    return (
      <div className="stardb-app">
        <Header />
        {planet}

        <div className="row mb2 button-row">
          <button
            className="toggle-planet btn btn-warning btn-lg"
            onClick={this.toggleRandomPlanet}>
              Toggle Random Planet
          </button>
          <ErrorButton />
        </div>
  
        <PeoplePage />

        {/* <div className="row mb2">
          <div className="col-md-6">
            <ItemList 
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllPlanets}
    renderItem={(item) => <span>{item.name} <button>!</button></span>} />
              
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson} />
          </div>
        </div>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList 
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllStarships}
              renderItem={(item) => item.name}/>
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson} />
          </div>
        </div> */}
        
      </div>
    );
  }  
}
