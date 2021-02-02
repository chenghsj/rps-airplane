import { ACTION_ROCk, ACTION_PAPER, ACTION_SCISSORS } from "./Common";
import Eve from "./Eve";

export default (adam_action, eve_action, adam_score, eve_score) => {
  let winner, result;
  if (eve_action === ACTION_ROCk) {
    // win
    if (adam_action === ACTION_SCISSORS) {
      eve_score++;
      winner = "Eve";
    }
    // lose
    else if (adam_action === ACTION_PAPER) {
      adam_score++;
      winner = "Adam";
    }
  } else if (eve_action === ACTION_PAPER) {
    // win
    if (adam_action === ACTION_ROCk) {
      eve_score++;
      winner = "Eve";
    }
    // lose
    else if (adam_action === ACTION_SCISSORS) {
      adam_score++;
      winner = "Adam";
    }
  } else if (eve_action === ACTION_SCISSORS) {
    // win
    if (adam_action === ACTION_PAPER) {
      eve_score++;
      winner = "Eve";
    }
    // lose
    else if (adam_action === ACTION_ROCk) {
      adam_score++;
      winner = "Adam";
    }
  } else if (eve_action === adam_action) {
    winner = null;
  }

  if (eve_score === 3) {
    result = "win";
  } else if (adam_score === 3) {
    result = "lose";
  }

  return [adam_score, eve_score, winner, result];
};
