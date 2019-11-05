import React, {Component, Fragment} from 'react';

import Spinner from '../spinner';
import ErrorButton from '../error-button';
import SwapiService from '../../services/swapi-service';

import './item-details.css';

export default class ItemDetails extends Component {

  swapiService = new SwapiService();

  state = {
    item: null,
    image: null,
    loading: false
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if(this.props.personId !== prevProps.personId) {
      this.updateItem();
    }    
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    this.setState({loading: true});
    if(!itemId) {
      this.setState({loading: false});
      return;
    }

    getData(itemId)
    .then(item => {
      this.setState({ 
        item, 
        loading: false, 
        image: getImageUrl(item) 
      })
    });
  };

  render() {
    const { item, loading, image } = this.state; 

    if(!item) {
      return <span>Select a person from a list</span>;
    }

    const spinner = loading ? <Spinner /> : null;

    const { id, name, gender, birthYear, eyeColor } = item;

    return(
      <div className="person-details card">
        {loading ? 
        <Spinner /> :
        <Fragment>
        <img className="person-image"
            src={image} alt="person"/>
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
          <ErrorButton />
        </div>
        </Fragment>
        }        
      </div>
    );
  }
}