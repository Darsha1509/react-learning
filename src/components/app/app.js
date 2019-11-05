import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import ItemDetails from '../item-details';
import Row from '../row';

import './app.css';
import SwapiService from '../../services/swapi-service';

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
    
    const { showRandomPlanet } = this.state;

    let planet = null;

    if(showRandomPlanet) {planet = <RandomPlanet />};

    const { getPerson, getStarship, getPersonImage, getStarshipImage } = this.swapiService;

    const personDetails = (
      <ItemDetails 
        itemId={11}
        getData={getPerson}
        getImageUrl={getPersonImage} />
    );

    const starshipDetails = (
      <ItemDetails 
        itemId={5} 
        getData={getStarship}
        getImageUrl={getStarshipImage} />
    );

    return (
      <ErrorBoundry>
        <div className="stardb-app">
          <Header />
          <Row 
            left={personDetails}
            right={starshipDetails} />
        </div>
      </ErrorBoundry>
    );
  }  
}
