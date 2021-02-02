// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import COMMON from "../Common";

cc.Class({
  extends: cc.Component,

  properties: {
    // foo: {
    //     // ATTRIBUTES:
    //     default: null,        // The default value will be used only when the component attaching
    //                           // to a node for the first time
    //     type: cc.SpriteFrame, // optional, default is typeof default
    //     serializable: true,   // optional, default is true
    // },
    // bar: {
    //     get () {
    //         return this._bar;
    //     },
    //     set (value) {
    //         this._bar = value;
    //     }
    // },
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.text = this.node.getComponent(cc.Sprite);
    this.showMsg(true, false, false);

    cc.director.on(
      COMMON.SHOW_TEXT,
      function (isShow, text) {
        if (isShow) {
          this.text.node.active = true;
          if (text === COMMON.START_TEXT) {
            this.showMsg(true, false, false);
          } else if (text === COMMON.SUCCESS_TEXT) {
            this.showMsg(false, true, false);
          } else if (text === COMMON.FAIL_TEXT) {
            this.showMsg(false, false, true);
          }
        } else {
          this.text.node.active = false;
        }
      },
      this
    );
  },

  start() {},

  // update (dt) {},

  showMsg(start_text = true, success_text = false, failure_text = false) {
    this.text.node
      .getChildByName(COMMON.START_TEXT)
      .getComponent(cc.Sprite).enabled = start_text;
    this.text.node
      .getChildByName(COMMON.SUCCESS_TEXT)
      .getComponent(cc.Sprite).enabled = success_text;
    this.text.node
      .getChildByName(COMMON.FAIL_TEXT)
      .getComponent(cc.Sprite).enabled = failure_text;
  },
});
