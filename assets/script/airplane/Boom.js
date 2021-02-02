// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    anim: null,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.anim = this.getComponent(cc.Animation);
  },

  start() {
    this.anim.on(
      "finished",
      function () {
        this.node.destroy();
      },
      this
    );
  },

  // update (dt) {},
});
