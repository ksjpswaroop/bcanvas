import api from '../api';
import history from '../history';
import * as analytics from '../analytics';
import isFirestoreId from '../utils/isFirestoreId';

export const CANVAS_LIST_FETCH_REQUEST = 'CANVAS_LIST_FETCH_REQUEST';
export const CANVAS_LIST_FETCH_SUCCESS = 'CANVAS_LIST_FETCH_SUCCESS';
export const CANVAS_LIST_FETCH_ERROR = 'CANVAS_LIST_FETCH_ERROR';

/**
 * Load canvases available for current user
 *
 * @returns {Function}
 */
export const fetchCanvasList = () => async (dispatch, getState) => {
  const { account } = getState();

  dispatch({ type: CANVAS_LIST_FETCH_REQUEST });
  try {
    const canvases = await api.canvas.list();

    // Extends canvas info width generic data
    dispatch({
      type: CANVAS_LIST_FETCH_SUCCESS,
      payload: {
        canvases,
        currentUserId: account.uid,
      },
    });
  } catch (error) {
    dispatch({
      type: CANVAS_LIST_FETCH_ERROR,
      payload: { error },
    });
  }
};

// ---

export const CANVAS_FETCH_REQUEST = 'CANVAS_FETCH_REQUEST';
export const CANVAS_FETCH_SUCCESS = 'CANVAS_FETCH_SUCCESS';
export const CANVAS_FETCH_ERROR = 'CANVAS_FETCH_ERROR';

/**
 * Get a full object of canvas with entries
 *
 * @param canvasId {string}
 * @returns {Function}
 */
export const fetchCanvas = canvasId => async (dispatch, getState) => {
  const { account } = getState();

  dispatch({
    type: CANVAS_FETCH_REQUEST,
    payload: { canvasId },
  });

  try {
    const canvas = await api.canvas.get(canvasId);
    dispatch({
      type: CANVAS_FETCH_SUCCESS,
      payload: {
        ...canvas,
        currentUserId: account.uid,
      },
    });
  } catch (error) {
    dispatch({
      type: CANVAS_FETCH_ERROR,
      payload: { canvasId, error },
    });
  }
};

/**
 * Get a full object of canvas with entries by provided slug
 *
 * @param slug {string}
 * @returns {Function}
 */
export const fetchCanvasBySlug = slug => async (dispatch, getState) => {
  const { account } = getState();

  dispatch({
    type: CANVAS_FETCH_REQUEST,
    payload: { slug },
  });

  try {
    const canvas = await api.canvas.getBySlug(slug);
    dispatch({
      type: CANVAS_FETCH_SUCCESS,
      payload: {
        ...canvas,
        currentUserId: account.uid,
      },
    });
  } catch (error) {
    dispatch({
      type: CANVAS_FETCH_ERROR,
      payload: { slug, error },
    });
  }
};

/**
 * This action will test provided string and will make appropriated request
 *
 * @param idOrSlug {String}
 * @returns {Function}
 */
export const fetchCanvasBySlugOrId = idOrSlug => dispatch => {
  if (isFirestoreId(idOrSlug)) {
    dispatch(fetchCanvas(idOrSlug));
  } else {
    dispatch(fetchCanvasBySlug(idOrSlug));
  }
};

// ---

export const CANVAS_CREATE_REQUEST = 'CANVAS_CREATE_REQUEST';
export const CANVAS_CREATE_SUCCESS = 'CANVAS_CREATE_SUCCESS';
export const CANVAS_CREATE_ERROR = 'CANVAS_CREATE_ERROR';

/**
 * Creates new canvas with given type and title
 * @param type {string}
 * @returns {Function}
 */
export const DEPRICAETD_createCanvas = type => async dispatch => {
  dispatch({
    type: CANVAS_CREATE_REQUEST,
    payload: { type },
  });
  try {
    const canvasId = await api.canvas.create(type);
    const canvas = await api.canvas.get(canvasId);

    dispatch({
      type: CANVAS_CREATE_SUCCESS,
      payload: canvas,
    });
    // Go to newly created canvas
    history.push(`/canvas/${canvasId}`);
    // Fetch updated list of canvases
    // dispatch(fetchCanvasList());
  } catch (error) {
    dispatch({
      type: CANVAS_CREATE_ERROR,
      payload: { error },
    });
  }
};

/**
 * Creates new canvas of given type
 *
 * @param type {string}
 * @returns {Function}
 */
export const createCanvas = type => async (dispatch, getState) => {
  const { account } = getState();

  // Create document reference with unique ID
  const canvasRef = api.canvas.createRef();
  const canvasId = canvasRef.id;

  dispatch({
    type: CANVAS_CREATE_REQUEST,
    payload: {
      currentUserId: account.uid,
      canvas: {
        type,
        id: canvasId,
        ownerId: account.uid,
      },
    },
  });

  try {
    // Go to canvas that will be created
    history.push(`/canvas/${canvasId}`);

    // Using created document reference create document with given type
    await api.canvas.createFromRef(canvasRef, { type });

    analytics.canvasCreated(canvasId, type);

    dispatch({
      type: CANVAS_CREATE_SUCCESS,
      payload: {
        currentUserId: account.uid,
        canvas: {
          type,
          id: canvasId,
          ownerId: account.uid,
        },
      },
    });
  } catch (error) {
    dispatch({
      type: CANVAS_CREATE_ERROR,
      payload: { error },
    });
  }
};

// ---

export const CANVAS_UPDATE_TITLE_REQUEST = 'CANVAS_UPDATE_TITLE_REQUEST';
export const CANVAS_UPDATE_TITLE_SUCCESS = 'CANVAS_UPDATE_TITLE_SUCCESS';
export const CANVAS_UPDATE_TITLE_ERROR = 'CANVAS_UPDATE_TITLE_ERROR';

/**
 * Change title of the canvas with provided ID.
 *
 * @param canvasId {uid}
 * @param title {string}
 * @returns {Function}
 */
export const updateCanvasTitle = (canvasId, title) => async dispatch => {
  dispatch({
    type: CANVAS_UPDATE_TITLE_REQUEST,
    payload: { canvasId, title },
  });
  try {
    await api.canvas.update(canvasId, { title });
    dispatch({
      type: CANVAS_UPDATE_TITLE_SUCCESS,
      payload: { canvasId, title },
    });
  } catch (error) {
    dispatch({
      type: CANVAS_UPDATE_TITLE_ERROR,
      payload: { canvasId, error },
    });
  }
};

// ---

export const CANVAS_REMOVE_REQUEST = 'CANVAS_REMOVE_REQUEST';
export const CANVAS_REMOVE_SUCCESS = 'CANVAS_REMOVE_SUCCESS';
export const CANVAS_REMOVE_ERROR = 'CANVAS_REMOVE_ERROR';

/**
 * Mark canvas with given ID as removed
 *
 * @param canvasId {string}
 * @returns {Function}
 */
export const removeCanvas = canvasId => async dispatch => {
  dispatch({
    type: CANVAS_REMOVE_REQUEST,
    payload: { canvasId },
  });
  try {
    await api.canvas.remove(canvasId);

    analytics.canvasDeleted();

    dispatch({
      type: CANVAS_REMOVE_SUCCESS,
      payload: { canvasId },
    });
  } catch (error) {
    dispatch({
      type: CANVAS_REMOVE_ERROR,
      payload: { canvasId, error },
    });
  }
};

// ---

export const CANVAS_SHARING_REQUEST = 'CANVAS_SHARING_REQUEST';
export const CANVAS_SHARING_SUCCESS = 'CANVAS_SHARING_SUCCESS';
export const CANVAS_SHARING_ERROR = 'CANVAS_SHARING_ERROR';

/**
 * Change Sharing settings of the canvas with given ID
 *
 * @param canvasId {string}
 * @param opts {object}
 * @param opts.isPublic {boolean}
 * @returns {Function}
 */
export const saveSharingSettings = (canvasId, opts = {}) => async dispatch => {
  dispatch({
    type: CANVAS_SHARING_REQUEST,
    payload: { canvasId, opts },
  });
  try {
    const options = {
      isPublic: opts.isPublic,
    };

    await api.canvas.update(canvasId, options);

    if (opts.isPublic) {
      analytics.canvasShare(canvasId);
    }

    dispatch({
      type: CANVAS_SHARING_SUCCESS,
      payload: { canvasId, options },
    });
  } catch (error) {
    dispatch({
      type: CANVAS_SHARING_ERROR,
      payload: { canvasId, error },
    });
  }
};

// ---

export const CANVAS_UNLOAD = 'CANVAS_UNLOAD';

/**
 * Clear canvas state
 *
 * @returns {{type: string}}
 */
export const unloadCanvas = () => ({
  type: CANVAS_UNLOAD,
});
