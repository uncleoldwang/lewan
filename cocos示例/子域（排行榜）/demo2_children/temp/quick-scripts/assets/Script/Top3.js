(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Top3.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '85e99efelFGLbQNA0cnbkvy', 'Top3', __filename);
// Script/Top3.js

'use strict';

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
        Top3Item: cc.Prefab,
        Content: cc.Node

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},


    // update (dt) {},

    onEnable: function onEnable() {
        var self = this;
        //.拉取当前用户所有同玩好友的托管数据。该接口只可在开放数据域下使用
        sdk.getFriendCloudStorage(["score"], function (res) {
            if (res.data && res.data.length > 0) {
                var d = sdk.sortList(res.data, 'score', false);
                //.获取当前用户信息
                wx.getUserInfo({
                    openIdList: ['selfOpenId'],
                    lang: 'zh_CN',
                    success: function success(res2) {
                        //.当前用户排名位置
                        var myPos = 0;
                        for (var i = 0; i < d.length; i++) {
                            var item = cc.instantiate(self.Top3Item);
                            item.parent = self.Content;
                            item.getComponent("Top3Item").setData(d[i], i + 1);
                            if (d[i].avatarUrl == res2.data[0].avatarUrl && d[i].nickname == res2.data[0].nickName) {
                                myPos = i;
                            }
                        }
                        //.参考文档：http://docs.cocos.com/creator/api/zh/classes/ScrollView.html#scrollto
                        if (myPos > 3) {
                            if (myPos == d.length - 1) {
                                self.node.getComponent(cc.ScrollView).scrollTo(cc.v2(1, 0), 0.1);
                            } else {
                                self.node.getComponent(cc.ScrollView).scrollTo(cc.v2(myPos / (d.length - 1), 0), 0.1);
                            }
                        }
                    },
                    fail: function fail(error) {
                        console.log(error);
                    }
                });
            }
        });
    },
    onDisable: function onDisable() {
        this.Content.removeAllChildren();
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Top3.js.map
        