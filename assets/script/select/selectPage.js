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

  btnClick(event, customEventData) {
    this.progressBar.getComponent(cc.Sprite).enabled = true;
    this.selectScene(customEventData);
  },

  /** 跳轉頁面前顯示進度條 */
  selectScene(scene = String) {
    cc.director.preloadScene(scene, this.onProgress.bind(this), function () {
      cc.director.loadScene(scene);
    });
  },

  onProgress(completedCount, totalCount) {
    let progress = completedCount / totalCount;
    this.progressBar.getComponent(cc.ProgressBar).progress =
      progress > this.progressBar.getComponent(cc.ProgressBar).progress
        ? progress
        : this.progressBar.getComponent(cc.ProgressBar).progress;
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.progressBar.getComponent(cc.Sprite).enabled = false;
  },

  start() {},

  update(dt) {},
});
