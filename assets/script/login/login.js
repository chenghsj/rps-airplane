// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

let userInfo = { username: "admin", password: "123456" };

cc.Class({
  extends: cc.Component,

  properties: {
    username: {
      default: null,
      type: cc.EditBox,
    },
    password: {
      default: null,
      type: cc.EditBox,
    },
    loginBtn: {
      default: null,
      type: cc.Button,
    },
    loginMsg: {
      default: null,
      type: cc.Label,
    },
    input_username: null,
    input_password: null,
  },

  onChanged(label) {
    this[label].node.on(
      "text-changed",
      function (input) {
        this[`input_${label}`] = input.string;
      },
      this
    );
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.onChanged("username");
    this.onChanged("password");

    this.loginMsg.node.active = false;

    cc.director.preloadScene("Select");

    this.loginBtn.node.on(
      "click",
      function () {
        if (
          this.input_username === userInfo.username &&
          this.input_password === userInfo.password
        ) {
          cc.director.loadScene("Select");
          console.log(this.input_username, this.input_password);
        } else {
          this.loginMsg.node.active = true;
        }
      },
      this
    );
  },

  start() {},

  update(dt) {},
});
