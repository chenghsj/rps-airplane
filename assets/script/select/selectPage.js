// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    airplaneBtn: {
      default: null,
      type: cc.Button,
    },
    RPSBtn: {
      default: null,
      type: cc.Button,
    },
    progressBar: {
      default: null,
      type: cc.Sprite,
    },
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.progressBar.enabled = false;
  },

  start() {},

  update(dt) {},
});
