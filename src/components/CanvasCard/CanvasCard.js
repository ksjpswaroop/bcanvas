import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import b from 'b_';
import { removeCanvas } from '../../actions/canvas';
import schemas from '../../constants/schemas';
import Btn from '../Btn/Btn';
import { DEFAULT_CANVAS_TITLE } from '../../constants';
import './CanvasCard.scss';

class CanvasCard extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    canvas: PropTypes.shape({
      type: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
    }).isRequired,
  };

  state = {
    isRemoving: false,
    isConfirmingRemove: false,
  };

  toggleRemoving(e, flag) {
    this.setState({
      isConfirmingRemove: flag,
    });
  }

  removeCanvas() {
    const { dispatch, canvas } = this.props;
    dispatch(removeCanvas(canvas.id));
    this.setState({
      isRemoving: true,
    });
  }

  render() {
    const { canvas } = this.props;
    const { isConfirmingRemove, isRemoving } = this.state;
    const { name, icon } = schemas[canvas.type];

    const cls = b('canvas-card', {
      type: canvas.type,
      removing: isRemoving,
    });

    return (
      <div className={cls}>
        <Link to={`/canvas/${canvas.id}`} className="canvas-card__link">
          <div className="canvas-card__media">
            <img src={`${process.env.PUBLIC_URL}${icon}`} alt={name} />
          </div>
          <div className="canvas-card__body">
            <h3 className={b('canvas-card', 'title', { no: !canvas.title })}>
              {canvas.title || DEFAULT_CANVAS_TITLE}
            </h3>
            <p className="canvas-card__type">{name}</p>
          </div>
        </Link>
        {!isConfirmingRemove ? (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
          <div
            className="canvas-card__delete"
            role="button"
            tabIndex="0"
            onClick={e => this.toggleRemoving(e, true)}
          >
            ×
          </div>
        ) : (
          <div className="canvas-card__confirming-remove">
            <div className="canvas-card__confirming-remove-inner">
              <Btn styleType="danger" size="small" onClick={e => this.removeCanvas(e)}>
                Confirm
              </Btn>{' '}
              <Btn styleType="ghost" size="small" onClick={e => this.toggleRemoving(e, false)}>
                Cancel
              </Btn>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CanvasCard;