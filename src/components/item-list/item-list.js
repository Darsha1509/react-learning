import React, {Component} from 'react';

import Spinner from '../spinner';
import SwapiService from '../../services/swapi-service';
import { withData } from '../hoc-helpers';

import './item-list.css';

const ItemList = ({ data, onItemSelected, children: renderLabel }) => {  

  const items = data.map((item) => {
      const { id } = item;
      const label = renderLabel(item);

      return(
        <li className="list-group-item"
            key={id}
            onClick={() => onItemSelected(id)}>          
          {label}
        </li>
      );
    });

  return(
    <ul className="item-list list-group">
      { items }
    </ul>
  );
}

export default ItemList;