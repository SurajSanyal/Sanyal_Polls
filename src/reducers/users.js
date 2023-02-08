import {
  ADD_ANSWER_TO_USER,
  ADD_POLL_TO_USER,
  RECEIVE_USERS,
} from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };

    // changing ...users from _DATA to ...state adapts for store
    case ADD_ANSWER_TO_USER:
      const { authedUser, qid, answer } = action;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer,
          },
        },
      };

    case ADD_POLL_TO_USER:
      const { id, user } = action;
      return {
        ...state,
        [user]: {
          ...state[user],
          questions: state[user].questions.concat(id),
        },
      };

    default:
      return state;
  }
}
