// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    background: {
      default: null,
      type: cc.Node,
    },
    airplanePrefab: {
      default: null,
      type: cc.Prefab,
    },
    BulletBase: {
      default: null,
      type: cc.Prefab,
    },
    BulletRotation: {
      default: null,
      type: cc.Prefab,
    },
    BulletParabola: {
      default: null,
      type: cc.Prefab,
    },
    boomPrefab: {
      default: null,
      type: cc.Prefab,
    },
  },

  getMode() {
    cc.director.on(
      "mode",
      function (msg) {
        switch (msg) {
          case "Straight":
            this.mode = "BulletBase";
            break;
          case "Rotation":
            this.mode = "BulletRotation";
            break;
          case "Parabola":
            this.mode = "BulletParabola";
            break;
          case "Back":
            cc.director.loadScene("Select");
            break;
        }
        console.log(this.mode);
      },
      this
    );
  },

  firedBullet() {
    this.node.on(
      "mousedown",
      function (e) {
        let firedBullet = cc.instantiate(this[this.mode]);
        firedBullet.getComponent(this.mode).game = this;
        firedBullet.x = e._x - this.node.width / 2;
        firedBullet.y = e._y - this.node.height / 2 - 40;
        this.node.addChild(firedBullet);
      },
      this
    );
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.mode = "BulletBase";

    this.airplane = cc.instantiate(this.airplanePrefab);
    this.node.addChild(this.airplane);
  },

  start() {
    this.getMode();
    this.firedBullet();
  },

  update(dt) {},
});
