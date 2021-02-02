// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    // straightBtn: cc.Button,
    // RotationBtn: cc.Button,
    // ParabolaBtn: cc.Button,
    button: cc.Button,
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad: function () {
    // this.node.on("mode", function (msg) {
    //   console.log(msg);
    // });
    this.button.node.on("click", this.callback, this);
  },

  callback: function (button) {
    cc.director.emit("mode", button.node.name);
    // do whatever you want with button
    // 另外，注意这种方式注册的事件，也无法传递 customEventData
  },

  start() {},

  // update (dt) {},
});
