// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BulletBase from "./BulletBase";

cc.Class({
  extends: BulletBase,

  fire() {
    cc.tween(this.node)
      .to(this.getDistanceY() / 150, {
        y: -this.canvasHeight() / 2,
      })
      .start();
  },

  update(dt) {
    if (this.node.y === -this.canvasHeight() / 2) {
      this.node.destroy();
      console.log("destroyed");
      let boom = this.boom();
      boom.x = this.node.x + 45;
      boom.y = this.node.y;
      this.game.node.addChild(boom);
    }
    this.parabola();
  },

  parabola() {
    let dropPosY = this.canvasHeight() / 2 + this.startPosY;
    let paraY = this.canvasHeight() / 2 + this.node.y;
    this.node.angle = -Math.sqrt(dropPosY - paraY) / 0.25;
    this.node.x = this.startPosX + Math.sqrt((dropPosY - paraY) / 0.005);
  },
});
