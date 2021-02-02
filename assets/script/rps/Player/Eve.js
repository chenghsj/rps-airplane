import COMMON from "../Common";
import Adam from "./Adam";

export default cc.Class({
  extends: Adam,

  properties: {},

  getScore() {
    this.score = +cc.sys.localStorage.getItem(this.node.name + " Score");
    if (this.score === 3) {
      cc.director.emit(COMMON.FINISHED, true);
      cc.director.emit(COMMON.SHOW_TEXT, true, COMMON.SUCCESS_TEXT);

      this.showAction(COMMON.ACTION_WIN, 0);
      this.lobby.adam.getComponent("Adam").showAction(COMMON.ACTION_LOSE_03, 0);

      this.toggleBtn(false);
    }
    for (let i = 1; i <= this.score; i++) {
      this.initSymbol(i);
    }
  },

  initSymbol(score) {
    this.lobby.eve_symbol = cc.instantiate(this.lobby.eve_symbol_prefab);
    this.lobby.node.addChild(this.lobby.eve_symbol);
    this.lobby.eve_symbol.x = -230 - (score - 1) * 70;
    this.tempScore++;
  },

  showAction: function (action, delay) {
    this.scheduleOnce(function () {
      this.anim.play(this.node.name + action);
    }, delay);
  },

  removeScore() {
    cc.director.on(
      COMMON.FINISHED,
      function (finished) {
        if (!finished) {
          this.lobby.node.getChildren().forEach((child) => {
            if (child.name === "symbol363") child.destroy();
          });
          this.anim.play(this.node.name + COMMON.ACTION_DEFAULT);
        }
      },
      this
    );
  },
});
