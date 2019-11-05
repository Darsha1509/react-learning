import React, {Component} from 'react';

import ItemList from '../item-list';
import ItemDetails from '../item-details';
import ErrorBoundry from '../error-boundry';
import Row from '../row';
import SawpiService from '../../services/swapi-service';

import './people-page.css';
import SwapiService from '../../services/swapi-service';

export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: 5,
  }

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    });
  };  

  render() {

    const itemList = (
      <ItemList 
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}>
            {(i) => (
              `${i.name} (${i.birthYear})`
            )}
      </ItemList>
    );

    const personDetails = (
      <ErrorBoundry>
        <ItemDetails personId={this.state.selectedPerson}/>
      </ErrorBoundry>
    );

    return <Row left={itemList} right={personDetails} />
  }
}