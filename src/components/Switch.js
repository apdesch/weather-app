import React from 'react';
import PropTypes from 'prop-types';

const Switch = ({ toggle }) => (
  <label className='switch u-pull-right'>
    <input type='checkbox' onChange={toggle} />
    <span className='slider' />
  </label>
);

Switch.propTypes = {
  toggle: PropTypes.func,
}

export default Switch;
