export const RECEIVE_POLLS = "RECEIVE_POLLS";
export const ADD_POLL = "ADD_POLL";
export const ANSWER_POLL = "ANSWER_POLL";

export function receivePolls(polls) {
  return {
    type: RECEIVE_POLLS,
    polls,
  };
}

export function addPoll(poll) {
  return {
    type: ADD_POLL,
    poll,
  };
}
