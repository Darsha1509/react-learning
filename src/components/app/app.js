import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import ItemDetails, { Record } from '../item-details';
import ItemList from '../item-list';
import Row from '../row';
import { PersonList, PersonDetails, PlanetList, PlanetDetails, StarshipList, StarshipDetails } from '../sw-components';
import { SwapiServiceProvider } from '../swapi-service-context';
import DummySwapiService from '../../services/dummy-swapi-service';

import './app.css';
import SwapiService from '../../services/swapi-service';

export default class App extends Component {
 
  swapiService = new SwapiService();
  dummySwapiService = new DummySwapiService();

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
    
    const { showRandomPlanet } = this.state;
    const { getAllPeople, getAllPlanets } = this.swapiService;

    let planet = null;

    if(showRandomPlanet) {planet = <RandomPlanet />};

    return (
      <SwapiServiceProvider value={this.dummySwapiService}>
        <ErrorBoundry>
          <div className="stardb-app">
            <Header />

            <PersonDetails itemId={11} />
            <PlanetDetails itemId={5} />
            <StarshipDetails itemId={13} />

            <PersonList />
            <StarshipList />
            <PlanetList />

          </div>
        </ErrorBoundry>
      </SwapiServiceProvider>
    );
  }  
}
