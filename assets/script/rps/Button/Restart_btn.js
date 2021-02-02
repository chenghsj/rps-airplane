// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import COMMON from "../Common";

cc.Class({
  extends: cc.Component,

  properties: {},

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    cc.director.on(
      COMMON.FINISHED,
      function (finished) {
        this.node.parent
          .getComponent("Lobby")
          .restartBtn.getComponent(cc.Button).node.active = finished;
      },
      this
    );
  },

  start() {},

  update(dt) {},

  onClick(event, customEventData) {
    let lobby = this.node.parent.getComponent("Lobby");

    lobby.finished = false;
    cc.director.emit(COMMON.FINISHED, lobby.finished);
    lobby.adam.getComponent("Adam").score = 0;
    lobby.eve.getComponent("Eve").score = 0;
    cc.sys.localStorage.setItem(lobby.adam.name + " Score", 0);
    cc.sys.localStorage.setItem(lobby.eve.name + " Score", 0);
  },
});
