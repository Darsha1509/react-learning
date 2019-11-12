import React, { Component } from 'react';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

const withData = (View) => {
  return class extends Component {

    state = {
      data: null,
      loading: true,
      error: false
    }
  
    componentDidMount() { 
      this.props.getData()
        .then((data) => this.setState({ data }));
    }

    componentDidUpdate(prevProps) {
      if (this.props.getData !== prevProps.getData) {
        this.update();
      }
    }

    update() {
      this.props.getData()
        .then((data) => {
          this.setState({ data });
        })
        .catch(() => this.setState({ error: true, loading: false }));
    }

    render() {
      const { data, loading, error } = this.state;

      if(!data && loading) {
        return <Spinner />
      }

      if(error) {
        return <ErrorIndicator />
      }

      return <View {...this.props} data={data} />
    }
  }
}

export default withData;