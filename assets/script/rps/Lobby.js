import COMMON from "./Common";

cc.Class({
  extends: cc.Component,

  properties: {
    rps_btn_prefab: {
      default: null,
      type: cc.Prefab,
    },
    eve_prefab: {
      default: null,
      type: cc.Prefab,
    },
    adam_prefab: {
      default: null,
      type: cc.Prefab,
    },
    adam_symbol_prefab: {
      default: null,
      type: cc.Prefab,
    },
    eve_symbol_prefab: {
      default: null,
      type: cc.Prefab,
    },
    text_prefab: {
      default: null,
      type: cc.Prefab,
    },
    restartBtn_prefab: {
      default: null,
      type: cc.Prefab,
    },
    backBtn: {
      default: null,
      type: cc.Button,
    },

    eve: null,
    adam: null,
    adam_symbol: null,
    eve_symbol: null,
    rps_btn: null,
    finished: false,
  },

  onLoad() {
    this.init();
  },

  start() {
    this.node
      .getComponent("Lobby")
      .restartBtn.getComponent(cc.Button).node.active = this.finished;
    // this.addScore();
  },

  // update (dt) {},

  //場景初始化
  init: function () {
    let localStorageKey = ["eve Score", "adam Score"];

    window.onbeforeunload = () => {
      for (key of localStorageKey) {
        localStorage.removeItem(key);
      }
    };

    this.eve = cc.instantiate(this.eve_prefab);
    this.node.addChild(this.eve);

    this.adam = cc.instantiate(this.adam_prefab);
    this.node.addChild(this.adam);

    this.rps_btn = cc.instantiate(this.rps_btn_prefab);
    this.node.addChild(this.rps_btn);

    this.text = cc.instantiate(this.text_prefab);
    this.node.addChild(this.text);

    this.restartBtn = cc.instantiate(this.restartBtn_prefab);
    this.node.addChild(this.restartBtn);

    this.backBtn.node.on(
      "click",
      function () {
        cc.director.loadScene("Select");
      },
      this
    );
  },
});
