cc.Class({
  extends: cc.Component,

  properties: {},

  onClick(event, customEventData) {
    this.node.parent.getComponent("selectPage").progressBar.enabled = true;
    this.selectScene(customEventData);
  },

  /** 跳轉頁面前顯示進度條 */
  selectScene(scene = String) {
    cc.director.preloadScene(scene, this.onProgress.bind(this), function () {
      /** 載入畫面 */
      cc.director.loadScene(scene);
    });
  },

  onProgress(completedCount, totalCount) {
    let progress = completedCount / totalCount;
    let barProgress = this.node.parent
      .getComponent("selectPage")
      .progressBar.getComponent(cc.ProgressBar).progress;

    this.node.parent
      .getComponent("selectPage")
      .progressBar.getComponent(cc.ProgressBar).progress =
      progress > barProgress ? progress : barProgress;
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start() {},

  // update (dt) {},
});
