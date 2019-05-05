import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ submit, change }) => (
  <form onSubmit={submit}>
    <input
      className='city-field u-full-width'
      type='text'
      placeholder='City'
      onChange={change}
    />
    <button className='button-primary u-full-width' type='submit'>Get Weather</button>
  </form>
);

Form.propTypes = {
  submit: PropTypes.func,
  change: PropTypes.func,
};

export default Form;
