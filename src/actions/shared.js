import { _getQuestions, _getUsers } from "../utils/_DATA";
import { setAuthedUser } from "./authedUser";
import { receivePolls } from "./polls";
import { receiveUsers } from "./users";

const AUTHED_ID = "sarahedo";

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, polls }) => {
      dispatch(receiveUsers(users));
      dispatch(receivePolls(polls));
      dispatch(setAuthedUser(AUTHED_ID));
    });
  };
}

function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(([users, polls]) => {
    return {
      users,
      polls,
    };
  });
}
