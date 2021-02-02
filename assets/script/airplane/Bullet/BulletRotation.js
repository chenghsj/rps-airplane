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
      .to(this.getDistanceX() / 200, {
        x: this.canvasWidth() / 2,
        angle: (-360 * this.getDistanceX()) / 100,
      })
      .start();
  },
});
