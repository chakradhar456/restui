import React, { useState } from 'react';

function Dropdown(props) {
  const [display, setDisplay] = useState('none');

  function handleClick() {
    if (display === 'none') {
      setDisplay('block');
    } else {
      setDisplay('none');
    }
  }

  return (
    <div>
      <div onClick={handleClick}>Hello World</div>
      <div style={{ display: display }}>
        {props.children}
      </div>
    </div>
  );
}

export default Dropdown;
