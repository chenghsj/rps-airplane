import COMMON from "../Common";
import judge from "../Judge";

var BtnState = cc.Enum({
  ROCk: "0",
  PAPER: "1",
  SCISSORS: "2",
});

cc.Class({
  extends: cc.Component,

  properties: {
    adamHand: [],
  },

  onLoad() {
    this.adamHand.push(COMMON.ACTION_ROCk);
    this.adamHand.push(COMMON.ACTION_PAPER);
    this.adamHand.push(COMMON.ACTION_SCISSORS);
  },

  start() {
    this.lobby = this.node.parent.getComponent("Lobby");
    this.eve = this.lobby.eve.getComponent("Eve");
    this.adam = this.lobby.adam.getComponent("Adam");
  },

  update(dt) {},

  btn_click: function (event, customEventData) {
    let randomHand = Math.floor(Math.random() * 3);
    let adam_action = this.adamHand[randomHand];
    let eve_action = "";
    let winner = "";
    let result = "";

    this.adam.showAction(this.adamHand[randomHand], 0);

    // if (!lobby.rps_start) {
    switch (customEventData) {
      case BtnState.ROCk:
        {
          this.eve.showAction(COMMON.ACTION_ROCk, 0);
          eve_action = COMMON.ACTION_ROCk;
        }
        break;
      case BtnState.PAPER:
        {
          this.eve.showAction(COMMON.ACTION_PAPER, 0);
          eve_action = COMMON.ACTION_PAPER;
        }
        break;
      case BtnState.SCISSORS:
        {
          this.eve.showAction(COMMON.ACTION_SCISSORS, 0);
          eve_action = COMMON.ACTION_SCISSORS;
        }
        break;
    }

    [this.adam.score, this.eve.score, winner, result] = judge(
      adam_action,
      eve_action,
      this.adam.score,
      this.eve.score
    );

    this.result(adam_action, eve_action, winner, result);

    console.log(
      `Adam: ${this.adam.score}, Eve: ${this.eve.score}, winner: ${winner}, result: ${result}`
    );
  },

  result(adam_action, eve_action, winner, result) {
    if (!result) {
      if (winner === "Eve") {
        if (eve_action === COMMON.ACTION_ROCk) {
          this.eve.showAction(COMMON.ACTION_WIN_ROCK, 1);
          this.eve.showAction(COMMON.ACTION_DEFAULT, 2);
        } else if (eve_action === COMMON.ACTION_PAPER) {
          this.eve.showAction(COMMON.ACTION_WIN_PAPER, 1);
          this.eve.showAction(COMMON.ACTION_DEFAULT, 2);
        } else if (eve_action === COMMON.ACTION_SCISSORS) {
          this.eve.showAction(COMMON.ACTION_WIN_SCISSORS, 1);
          this.eve.showAction(COMMON.ACTION_DEFAULT, 2);
        }
        this.eve.addScore(1);
        this.adam.showAction(COMMON.ACTION_LOSE_01, 1);
        this.adam.showAction(COMMON.ACTION_DEFAULT, 2);
      } else if (winner === "Adam") {
        if (adam_action === COMMON.ACTION_ROCk) {
          this.adam.showAction(COMMON.ACTION_WIN_ROCK, 1);
          this.adam.showAction(COMMON.ACTION_DEFAULT, 2);
        } else if (adam_action === COMMON.ACTION_PAPER) {
          this.adam.showAction(COMMON.ACTION_WIN_PAPER, 1);
          this.adam.showAction(COMMON.ACTION_DEFAULT, 2);
        } else if (adam_action === COMMON.ACTION_SCISSORS) {
          this.adam.showAction(COMMON.ACTION_WIN_SCISSORS, 1);
          this.adam.showAction(COMMON.ACTION_DEFAULT, 2);
        }
        this.adam.addScore(1);
        this.eve.showAction(COMMON.ACTION_LOSE_02, 1);
        this.eve.showAction(COMMON.ACTION_DEFAULT, 2);
      } else if (!winner) {
        this.eve.showAction(COMMON.ACTION_DEFAULT, 1);
        this.adam.showAction(COMMON.ACTION_DEFAULT, 1);
      }
    } else if (result) {
      this.lobby.finished = true;
      this.node.children.forEach(
        (child) => (child.getComponent(cc.Button).interactable = false)
      );
      if (result === "win") {
        this.eve.addScore(1);
        this.eve.showAction(COMMON.ACTION_WIN, 1);
        this.adam.showAction(COMMON.ACTION_LOSE_03, 1);
      } else if (result === "lose") {
        this.adam.addScore(1);
        this.eve.showAction(COMMON.ACTION_LOSE_03, 1);
        this.adam.showAction(COMMON.ACTION_WIN, 1);
      }
    }

    cc.director.emit(COMMON.SHOW_TEXT, false);

    this.adam.setScore();
    this.eve.setScore();
    // cc.director.emit(COMMON.ADD_SCORE, this.adam.score, this.eve.score);
  },
});
