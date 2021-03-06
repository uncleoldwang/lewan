"use strict";
cc._RF.push(module, '5b7063nAVlAS5T6ljuVmCkS', 'MoveRight');
// Script/MoveRight.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

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

        duration: 0,
        delayTime: 0

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var x = this.node.x;
        this.node.x = -cc.winSize.width / 2 - this.node.width;

        this.node.runAction(cc.sequence(cc.delayTime(this.delayTime), cc.moveTo(this.duration, cc.p(x, this.node.y)).easing(cc.easeCubicActionOut())));
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();