import axios from "axios";

export const createChurch = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "CHURCH_CREATE_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/churches`,
      {},
      config,
    );

    dispatch({
      type: "CHURCH_CREATE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "CHURCH_CREATE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateChurch = (church) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "CHURCH_UPDATE_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/churches/${church._id}`,
      church,
      config,
    );

    dispatch({
      type: "CHURCH_UPDATE_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "CHURCH_UPDATE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteChurch = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "CHURCH_DELETE_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/churches/${id}`,
      config,
    );

    dispatch({
      type: "CHURCH_DELETE_SUCCESS",
    });
  } catch (error) {
    dispatch({
      type: "CHURCH_DELETE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const listChurches = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "CHURCH_LIST_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/churches`,
      config,
    );

    dispatch({
      type: "CHURCH_LIST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "CHURCH_LIST_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
