import COMMON from "../Common";

export default cc.Class({
  extends: cc.Component,

  properties: {
    anim: null,
    score: 0,
    tempScore: 0,
  },

  setScore() {
    cc.sys.localStorage.setItem(this.node.name + " Score", this.score);
  },

  getScore() {
    this.score = +cc.sys.localStorage.getItem(this.node.name + " Score");
    if (this.score === 3) {
      cc.director.emit(COMMON.FINISHED, true);
      cc.director.emit(COMMON.SHOW_TEXT, true, COMMON.FAIL_TEXT);

      this.lobby.eve.getComponent("Eve").showAction(COMMON.ACTION_LOSE_03, 0);
      this.showAction(COMMON.ACTION_WIN, 0);

      this.toggleBtn(false);
    }
    for (let i = 1; i <= this.score; i++) {
      this.initSymbol(i);
    }
  },

  initSymbol(score) {
    this.lobby.adam_symbol = cc.instantiate(this.lobby.adam_symbol_prefab);
    this.lobby.node.addChild(this.lobby.adam_symbol);
    this.lobby.adam_symbol.x = 180 + (score - 1) * 70;
    this.tempScore++;
  },

  showAction: function (action, delay) {
    this.scheduleOnce(function () {
      let anim = this.anim.play(this.node.name + action);
      this.onPlay(anim);
      this.onFinish(anim);
    }, delay);
  },

  onPlay(anim) {
    anim.on(
      "play",
      function () {
        this.enableBtn(anim.name);
      },
      this
    );
  },

  onFinish(anim) {
    anim.on(
      "finished",
      function () {
        if (
          (anim.name === this.node.name + COMMON.ACTION_LOSE_03 ||
            anim.name === this.node.name + COMMON.ACTION_WIN) &&
          this.lobby.finished === true
        ) {
          this.scheduleOnce(function () {
            cc.director.emit(COMMON.FINISHED, this.lobby.finished);
          }, 0.5);
        }
      },
      this
    );
  },

  toggleBtn(isEnable) {
    this.node.parent
      .getChildByName("rps_btn")
      .children.forEach(
        (child) => (child.getComponent(cc.Button).interactable = isEnable)
      );
  },

  enableBtn(anim_name) {
    switch (anim_name) {
      case this.node.name + COMMON.ACTION_DEFAULT:
        if (this.node.parent.getComponent("Lobby").finished === true) {
          this.toggleBtn(false);
          cc.director.emit(COMMON.SHOW_TEXT, false);
        } else {
          this.toggleBtn(true);
          cc.director.emit(COMMON.SHOW_TEXT, true, COMMON.START_TEXT);
        }
        break;
      case this.node.name + COMMON.ACTION_WIN:
        cc.director.emit(COMMON.SHOW_TEXT, true, COMMON.FAIL_TEXT);
        break;
      case this.node.name + COMMON.ACTION_LOSE_03:
        cc.director.emit(COMMON.SHOW_TEXT, true, COMMON.SUCCESS_TEXT);
        break;
      default:
        cc.director.emit(COMMON.SHOW_TEXT, false);
        this.toggleBtn(false);
        break;
    }
  },

  addScore(delay) {
    this.scheduleOnce(function () {
      this.initSymbol(this.score);
    }, delay);
  },

  removeScore() {
    cc.director.on(
      COMMON.FINISHED,
      function (finished) {
        if (!finished) {
          this.lobby.node.getChildren().forEach((child) => {
            if (child.name === "symbol364") child.destroy();
          });
          this.onPlay(this.anim.play(this.node.name + COMMON.ACTION_DEFAULT));
        }
      },
      this
    );
  },
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.anim = this.getComponent(cc.Animation);
    this.lobby = this.node.parent.getComponent("Lobby");
  },

  start() {
    this.getScore();
    this.removeScore();
  },
});
