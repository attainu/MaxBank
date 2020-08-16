import { SET_BRANCH, TOGGLE_BRANCH_FETCHING_STATE } from "../actionTypes";

const initialState = {
  branchSearchResult: null,
  isFetchingBranch: false,
};

const branchReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_BRANCH:
      return { ...state, branchSearchResult: payload };

    case TOGGLE_BRANCH_FETCHING_STATE:
      return { ...state, isFetchingBranch: !state.isFetchingBranch };

    default:
      return state;
  }
};

export default branchReducer;
