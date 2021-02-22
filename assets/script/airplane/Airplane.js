// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {},

  /** 飛機跟著滑鼠移動 */
  airplaneMove() {
    let self = this;
    this.node.parent.on(
      "mousemove",
      function (e) {
        let x = e.getLocationX() - this.width / 2;
        let y = e.getLocationY() - this.height / 2;
        self.node.setPosition(x, y);
      },
      this.node.parent
    );
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {},

  start() {
    this.airplaneMove();
  },

  update(dt) {},
});
