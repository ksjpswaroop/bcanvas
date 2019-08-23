import React from 'react';
import PropTypes from 'prop-types';

const canvasIcons = {
  business: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 179">
      <path d="M234,0H6A6,6,0,0,0,0,6V173a6,6,0,0,0,6,6H234a6,6,0,0,0,6-6V6A6,6,0,0,0,234,0ZM49,60H95v56H49Zm0-2V2H95V58ZM97,2h46V116H97Zm48,58h46v56H145Zm0-2V2h46V58ZM2,6A4,4,0,0,1,6,2H47V116H2ZM6,177a4,4,0,0,1-4-4V118H119v59Zm232-4a4,4,0,0,1-4,4H121V118H238Zm-45-57V2h41a4,4,0,0,1,4,4V116Z" />
    </svg>
  ),
  lean: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 179">
      <path d="M234,0H6A6,6,0,0,0,0,6V173a6,6,0,0,0,6,6H234a6,6,0,0,0,6-6V6A6,6,0,0,0,234,0ZM49,60H95v56H49Zm0-2V2H95V58ZM97,2h46V116H97Zm48,58h46v56H145Zm0-2V2h46V58ZM2,6A4,4,0,0,1,6,2H47V116H2ZM6,177a4,4,0,0,1-4-4V118H119v59Zm232-4a4,4,0,0,1-4,4H121V118H238Zm-45-57V2h41a4,4,0,0,1,4,4V116Z" />
    </svg>
  ),
  value: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 179">
      <path d="M234,0H6A6,6,0,0,0,0,6V173a6,6,0,0,0,6,6H234a6,6,0,0,0,6-6V6A6,6,0,0,0,234,0ZM62,60h57v56H62Zm0-2V2h57V58Zm59,2h57v56H121Zm0-2V2h57V58ZM2,6A4,4,0,0,1,6,2H60V116H2ZM6,177a4,4,0,0,1-4-4V118H119v59Zm232-4a4,4,0,0,1-4,4H121V118H238Zm-58-57V2h54a4,4,0,0,1,4,4V116Z" />
    </svg>
  ),
};

const IconCanvas = ({ type }) => canvasIcons[type];
IconCanvas.propTypes = { type: PropTypes.string.isRequired };

export default IconCanvas;
