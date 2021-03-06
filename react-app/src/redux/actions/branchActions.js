import axios from "axios";
import Swal from "sweetalert2";

import { SET_BRANCH, TOGGLE_BRANCH_FETCHING_STATE } from "../actionTypes";
import config from "../../config";

export const getBranchInfo = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: SET_BRANCH, payload: null });
    dispatch({ type: TOGGLE_BRANCH_FETCHING_STATE });

    const { data } = await axios(`https://cors-anywhere.herokuapp.com/https://ifsc.datayuge.com/api/v1/${searchQuery}`, {
      headers: {
        "DY-X-Authorization": config.ifscApiKey,
      },
    });

    if (data.error) {
      Swal.fire("Not Found!", `No branch found with IFSC "${searchQuery}" `, "warning");
    } else {
      dispatch({ type: SET_BRANCH, payload: data });
    }
  } catch (error) {
    Swal.fire("", error.message, "warning");
  } finally {
    dispatch({ type: TOGGLE_BRANCH_FETCHING_STATE });
  }
};
