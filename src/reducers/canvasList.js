import {
  CANVAS_LIST_FETCH_REQUEST,
  CANVAS_LIST_FETCH_SUCCESS,
  CANVAS_CREATE_SUCCESS,
  CANVAS_REMOVE_SUCCESS,
  CANVAS_UPDATE_TITLE_SUCCESS,
} from '../actions/canvas';
import { AUTH_UNSET_USER } from '../actions/auth';

function addCanvasToList(state, canvas) {
  // Make a new copy of array
  const canvases = state.canvases.slice(0);
  canvases.push(canvas);

  return {
    ...state,
    canvases,
  };
}

function removeCanvasFromList(state, { canvasId }) {
  const { canvases } = state;

  return {
    ...state,
    canvases: canvases.slice(0).filter(canvas => canvas.id !== canvasId),
  };
}

function updateCanvasTitleInList(state, { canvasId, title }) {
  const { canvases } = state;

  return {
    ...state,
    canvases: canvases.map(canvas => {
      if (canvas.id === canvasId) {
        return {
          ...canvas,
          title,
        };
      }
      return canvas;
    }),
  };
}

const defaultState = {
  isFetching: false,
  isLoaded: false,
  canvases: [],
};

const canvas = (state = defaultState, action) => {
  switch (action.type) {
    case CANVAS_LIST_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case CANVAS_LIST_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        canvases: action.payload,
      };
    case CANVAS_CREATE_SUCCESS:
      return addCanvasToList(state, action.payload);
    case CANVAS_REMOVE_SUCCESS:
      return removeCanvasFromList(state, action.payload);
    case CANVAS_UPDATE_TITLE_SUCCESS:
      return updateCanvasTitleInList(state, action.payload);
    case AUTH_UNSET_USER:
      return defaultState;
    default:
      return state;
  }
};

export default canvas;
