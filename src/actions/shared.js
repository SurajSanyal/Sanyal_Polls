import { _getQuestions, _getUsers } from "../utils/_DATA";
import { receivePolls } from "./polls";
import { receiveUsers } from "./users";

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, polls }) => {
      dispatch(receiveUsers(users));
      dispatch(receivePolls(polls));
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
