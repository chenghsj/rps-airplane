// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

export default cc.Class({
  extends: cc.Component,

  properties: {
    startPosX: 0,
    startPosY: 0,
  },

  canvasWidth() {
    return this.node.parent.width;
  },

  canvasHeight() {
    return this.node.parent.height;
  },

  getDistanceX() {
    return this.canvasWidth() - (this.canvasWidth() / 2 + this.node.x);
  },

  getDistanceY() {
    return this.canvasHeight() - (this.canvasHeight() / 2 - this.node.y);
  },

  fire() {
    cc.tween(this.node)
      .to(this.getDistanceX() / 200, { x: this.canvasWidth() / 2 })
      .start();
  },

  boom() {
    return cc.instantiate(this.game.boomPrefab);
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.fire();
    this.startPosX = this.node.x;
    this.startPosY = this.node.y;
  },

  start() {},

  update(dt) {
    if (this.node.x === this.canvasWidth() / 2) {
      this.node.destroy();
      console.log("destroyed");
      let boom = this.boom();
      boom.x = this.node.x;
      boom.y = this.node.y + 40;
      this.game.node.addChild(boom);
    }
  },
});
