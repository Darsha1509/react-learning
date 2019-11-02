import React from 'react';

import './spinner.css';

const Spinner = () => {
  const style = {
    width: '100%',
    height: '100%'
  }

  return(
    <div style={style} className="lds-css ng-scope">
      <div className="lds-double-ring">
        <div></div>
        <div></div>
        <div>
          <div></div>
        </div>
        <div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Spinner;