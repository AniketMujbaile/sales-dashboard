import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DatePicker({ selected, onChange }) {
  return (
    <ReactDatePicker
      selected={selected}
      onChange={onChange}
      dateFormat="MMMM d, yyyy"
      className="form-input px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
    />
  );
}

export default DatePicker;