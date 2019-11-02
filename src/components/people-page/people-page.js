import React, {Component} from 'react';

import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';
import SawpiService from '../../services/swapi-service';

import './people-page.css';
import SwapiService from '../../services/swapi-service';

class ErrorBoundry extends Component {
  render() {
    return this.props.children;
  }
}

const Row = ({ left, right }) => {
  return(
    <div className="row mb2">
          <div className="col-md-6">
            {left}
          </div>
          <div className="col-md-6">
            {right}
          </div>
        </div>
  );
}

export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: 5,
    hasError: false,
  }

  componentDidCatch() {
    this.setState({hasError: true});
  }

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    });
  };  

  render() {
    if(this.state.hasError) {
      return <ErrorIndicator />
    }

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
      <PersonDetails personId={this.state.selectedPerson}/>
    );

    return(
      <ErrorBoundry>
        <Row left={itemList} right={personDetails} />
      </ErrorBoundry>
    );
  }
}