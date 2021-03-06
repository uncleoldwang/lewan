(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Sdk/sdk.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ddad1pj1ZBB5pnxQ/yIyjRQ', 'sdk', __filename);
// Sdk/sdk.js

"use strict";

/**
1.安装apidoc，参考链接：
	http://apidocjs.com
2.按照格式弄好后，执行命令
    apidoc -i ./apiTest/assets/Sdk -o api/
    
    在小程序后台添加合法域名：
        https://game.llewan.com:1899
        https://login.llewan.com:1799
        https://log.llewan.com:1999
        https://res.llewan.com:2099

        https://glog.aldwx.com
 */

var md5 = require("md5");
var mta = require("mta");
var sdk_conf = require("sdk_conf");
var aldgame = require("ald-game");
var sdk = {
    md5: md5,
    mta: mta,
    ip1: "https://login.llewan.com:1799",
    ip2: "https://game.llewan.com:1899",

    ip3: "https://log.llewan.com:1999",
    ip4: "https://res.llewan.com:2099",
    debug: false, //是否开启调试

    login: '/Login/common',
    Config: '/Config/common',
    ConfigData: {
        "config1": {},
        "config2": {}
    },
    Share: "/Share/common",
    ShareList: [],
    Logcommon: "/Log/common",

    BannerAd: null,
    VideoAd: null,

    //.即将废弃
    userid: 0,

    /**
     * @apiGroup A
     * @apiName init
     * @api {初始化sdk} 使用sdk前，必须先初始化一次才能使用 init（初始化sdk）
     *
     * @apiParam {Boolean} [debug=false] 是否开启调试
     * @apiParam {Boolean} [userid] 用户的id（兼容旧游戏，新游戏废弃）
     * 
     * @apiSuccessExample {json} 示例:
     * //.初始化游戏
     *   sdk.init({
     *      debug: true,        //.是否开启调试
     *      userid: 110         //.用户的id（兼容旧游戏，新游戏废弃）
     *   }, (res)=>{
     *       console.log('sdk初始化结果：', res)
     *   })
     */
    init: function init(args, callback) {
        var self = this;
        if (args.debug) {
            this.debug = args.debug;
        }
        if (args.userid) {
            this.userid = args.userid;
        }

        // this.checkUpdate();

        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            //1.初始化后台配置信息
            this.Get(this.ip2 + this.Config, {}, function (d) {
                if (d && d.c == 1) {
                    self.ConfigData = d.d;

                    //2.初始化分享信息
                    self.Get(self.ip2 + self.Share, {}, function (d2) {
                        // console.log("初始化分享信息：",d2)
                        if (d2 && d2.c == 1) {
                            self.ShareList = d2.d;
                        } else {
                            console.log("初始化分享信息失败：", d2);
                        }
                        callback(true);
                    });
                } else {
                    if (self.debug) {
                        console.log("后台配置信息初始化失败，再次初始化：", d);
                    }
                    self.init(args, callback);
                }
            });

            //2.统计接口
            var option = wx.getLaunchOptionsSync();
            option.query.share_uid = option.query.uid;
            option.query.uid = this.userid;
            // console.log('==3统计信息==',option)
            this.Get(this.ip3 + this.Logcommon, { log_type: "ShareEnter", data: option }, function (d) {
                // console.log("==3统计信息结果==", d)
            });
            wx.onShow(function (option) {
                // console.log(option)
                if (option.query.uid) {
                    option.query.share_uid = option.query.uid;
                    option.query.uid = self.userid;
                    // console.log('==4统计信息==',option)
                    self.Get(self.ip3 + self.Logcommon, { log_type: "ShareEnter", data: option }, function (d) {
                        // console.log("==4统计信息结果==", d)
                    });
                }
            });
        }
    },

    //.根据权重随机获取指定type类型的分享信息。
    getShareByWeight: function getShareByWeight(type) {
        if (this.ShareList.length > 0) {
            //1.获取某种type的集合
            var tArray = [];
            for (var i = 0; i < this.ShareList.length; i++) {
                if (type == this.ShareList[i].type) {
                    this.ShareList[i].weight = parseInt(this.ShareList[i].weight);
                    tArray.push(this.ShareList[i]);
                }
            }
            //2.根据权重配比：从i集合（权重越大占比越多）中随机获取。
            var iArray = [];
            for (var i = 0; i < tArray.length; i++) {
                for (var j = 0; j < tArray[i].weight; j++) {
                    iArray.push(i);
                }
            }
            var i = iArray[parseInt(Math.random() * iArray.length)];
            //3.结果处理：正则替换昵称
            var item = tArray[i];
            if (item.title.indexOf("&nickName") != -1) {
                item.title = item.title.replace(/&nickName/g, this.getUser().nickName);
            }
            return JSON.parse(JSON.stringify(item));
        } else {
            return null;
        }
    },

    /**
     * @apiGroup C
     * @apiName onShareAppMessage
     * @api {分享} 注册微信右上角分享 onShareAppMessage(分享)
     * @apiParam {int} type=0 后台自定义的分享类型；例如：0：右上角分享、1：普通分享 2：分享加金币
     * @apiParam {String} [title] 转发标题
     * @apiParam {String} [imageUrl] 转发显示图片的链接
     * @apiParam {String} [query] 必须是 key1=val1&key2=val2 的格式。
     * @apiParam {callback} [success] 成功回调
     * @apiParam {callback} [fail] 失败回调
     * 
     * @apiSuccessExample {json} 示例:
     * sdk.onShareAppMessage({type: 0, query: "uid=520" });
     */
    onShareAppMessage: function onShareAppMessage(obj) {
        var self = this;
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            //.微信右上角分享
            wx.showShareMenu({ withShareTicket: true });
            wx.onShareAppMessage(function (res) {
                //.默认0：右上角分享
                var tpye = 0;
                if (obj.type) {
                    tpye = obj.type;
                }
                var shareInfo = self.getShareByWeight(tpye);

                if (obj.title) {
                    shareInfo.title = obj.title;
                }
                if (obj.imageUrl) {
                    shareInfo.imageUrl = obj.imageUrl;
                }
                if (shareInfo.query) {
                    shareInfo.query += obj.query + "&share_id=" + shareInfo.sysid + "&uid=" + self.userid;
                } else {
                    if (obj.query) {
                        shareInfo.query = "share_id=" + shareInfo.sysid + "&uid=" + self.userid + "&" + obj.query;
                    } else {
                        shareInfo.query = "share_id=" + shareInfo.sysid + "&uid=" + self.userid;
                    }
                }
                if (obj.success) {
                    shareInfo.success = obj.success;
                }
                if (obj.fail) {
                    shareInfo.fail = obj.fail;
                }

                //.分享统计 测试：  uid=11&share_id=22
                var option = { 'uid': sdk.userid, 'share_id': shareInfo.sysid };
                // console.log('==1统计信息==', { log_type: "ShareClick", data: option })
                self.Get(self.ip3 + self.Logcommon, { log_type: "ShareClick", data: option }, function (d) {
                    // console.log("==1统计信息结果==", d)
                });

                return shareInfo;
            });
        }
    },

    /**
     * @apiGroup C
     * @apiName shareAppMessage
     * @api {分享} 主动拉起微信分享 shareAppMessage(分享)
     * @apiParam {int} type=1 后台自定义的分享类型；例如：0：右上角分享、1：普通分享 2：分享加金币
     * @apiParam {String} [title] 转发标题
     * @apiParam {String} [imageUrl] 转发显示图片的链接
     * @apiParam {String} [query] 必须是 key1=val1&key2=val2 的格式。
     * @apiParam {callback} [success] 成功回调
     * @apiParam {callback} [fail] 失败回调
     * 
     * @apiSuccessExample {json} 示例:
     * sdk.shareAppMessage({type: 1, query: "uid=520" });
     */
    shareAppMessage: function shareAppMessage(obj) {
        var self = this;
        //.默认1：普通分享
        var tpye = 1;
        if (obj.type) {
            tpye = obj.type;
        }
        var shareInfo = this.getShareByWeight(tpye);
        if (obj.title) {
            shareInfo.title = obj.title;
        }
        if (obj.imageUrl) {
            shareInfo.imageUrl = obj.imageUrl;
        }
        if (shareInfo.query) {
            shareInfo.query += obj.query + "&share_id=" + shareInfo.sysid + "&uid=" + self.userid;
        } else {
            if (obj.query) {
                shareInfo.query = "share_id=" + shareInfo.sysid + "&uid=" + self.userid + "&" + obj.query;
            } else {
                shareInfo.query = "share_id=" + shareInfo.sysid + "&uid=" + self.userid;
            }
        }
        if (obj.success) {
            shareInfo.success = obj.success;
        }
        if (obj.fail) {
            shareInfo.fail = obj.fail;
        }
        console.log("====111======", shareInfo);
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.shareAppMessage(shareInfo);

            //.分享统计 测试： uid=11&share_id=22
            var option = { 'uid': sdk.userid, 'share_id': shareInfo.sysid };
            // console.log('==2统计信息==', { log_type: "ShareClick", data: option })
            self.Get(self.ip3 + self.Logcommon, { log_type: "ShareClick", data: option }, function (d) {
                // console.log("==2统计信息结果==", d)
            });
        }
    },


    /**
     * @apiIgnore
     * @apiGroup B
     * @apiName initmta
     * @api {初始化腾讯统计sdk} 参考链接http://mta.qq.com/wechat_mini/manage/ctr_sdk_help?app_id=500625714 initmta（腾讯统计）
     * @apiParam {Object} args 参数
     * 
     * @apiSuccessExample {json} 示例:
     * //.简单
     * mta.App.init({
     *     "appID":"500618042",
     *     "eventID":"500618044"
     * });
     * //.高级
     * mta.App.init({
     *     "appID":"500618042",
     *     "eventID":"500618044", // 高级功能-自定义事件统计ID，配置开通后在初始化处填写
     *     "lauchOpts":options, //渠道分析,需在onLaunch方法传入options,如onLaunch:function(options){...}
     *     "statPullDownFresh":true, // 使用分析-下拉刷新次数/人数，必须先开通自定义事件，并配置了合法的eventID
     *     "statShareApp":true, // 使用分析-分享次数/人数，必须先开通自定义事件，并配置了合法的eventID
     *     "statReachBottom":true // 使用分析-页面触底次数/人数，必须先开通自定义事件，并配置了合法的eventID
     * });
     */
    initmta: function initmta(args) {
        mta.App.init(args);
        // 功能组件
        // App id: 500625714
        // App Secret key: 9b0fd6393ca10f5eebe0d1c659a460ab
    },

    /**
     * @apiIgnore
     * @apiGroup B
     * @apiName setmta
     * @api {腾讯统计埋点} 统计埋点 setmta
     * @apiParam {String} name 腾讯后台查询
     * @apiParam {String} value 腾讯后台查询
     * 
     * @apiSuccessExample {json} 示例:
     * sdk.setmta("click","p003")
     */
    setmta: function setmta(name, value) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            mta.Event.stat(name, { value: 'true' });
        }
    },

    /**
     * @apiGroup B
     * @apiName setAld
     * @api {阿拉丁埋点} 统计埋点(使用前请到阿拉丁注册游戏，并配置sdk/ald-game-conf.js) setAld（阿拉丁埋点）
     * @apiParam {String} type 描述用户的动作名称，不超过255个字符,不支持数字,英文,中文,"-"、"_"、"+",以外的字符格式
     * @apiParam {String} key 动作的参数，不超过255个字符，不支持数字，英文，中文，"-"、"_"、"+"，以外的字符格式
     * @apiParam {String} value 动作的参数值，不超过255个字符，不支持数字，英文，中文，“-“、”_”、"+"，以外的字符格式
     * 
     * @apiSuccessExample {json} 示例:
     * //使用前，在开发者设置中添加 request合法域名https://glog.aldwx.com
     * //统计类型（点击）， 统计位置（开始游戏按钮），  统计参数（点了1次）
     * sdk.setAld("click", "playButton", "1")
     */
    setAld: function setAld(type, key, value) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            // wx.aldSendEvent('事件名称',{'参数key' : '参数value'})、
            wx.aldSendEvent(v1, { v2: v3 });
        }
    },


    /**
     * @apiGroup C
     * @apiName Get
     * @api {Get} 发起网络请求 Get（发起Get请求）
     * 
     * @apiParam {String} url 请求地址
     * @apiParam {Object} reqData 请求参数
     * @apiParam {Object} callback 不存在返回null
     * @apiSuccessExample {json} 示例:
     * sdk.Get("https://xxx.xxx", { user_id: user_id }, function (d) {
     *     console.log(d)
     * });
     */
    Get: function Get(url, reqData, callback) {
        var self = this;

        reqData.game = sdk_conf.game;
        reqData.version = sdk_conf.version;
        var ts = new Date().getTime();
        reqData.ts = ts;
        reqData.sign = md5(ts.toString().substr(0, 4) + sdk_conf.game.substr(0, 2) + sdk_conf.version.substr(0, 1) + '$5dfjr$%dsadsfdsii');

        url += "?";
        for (var item in reqData) {
            url += item + "=" + reqData[item] + "&";
        }
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    var response = xhr.responseText;
                    if (response) {
                        var responseJson = JSON.parse(response);
                        callback(responseJson);
                    } else {
                        if (self.debug) {
                            console.log("返回数据不存在", url);
                        }
                        callback(null);
                    }
                } else {
                    if (self.debug) {
                        console.log("请求失败", url);
                    }
                    callback(null);
                }
            }
        };
        xhr.open("GET", url, true);
        xhr.send();
    },

    /**
     * @apiGroup C
     * @apiName Post
     * @api {Post} 发起网络请求 Post（发起Post请求）
     * 
     * @apiParam {String} url 请求地址
     * @apiParam {Object} reqData 请求参数
     * @apiParam {Object} callback 不存在返回null
     * @apiSuccessExample {json} 示例:
     * sdk.Post(sdk.ip + sdk.common, { user_id: user_id }, function (d) {
     *     console.log(d)
     * });
     */
    Post: function Post(url, reqData, callback) {
        var self = this;

        reqData.game = sdk_conf.game;
        reqData.version = sdk_conf.version;
        var ts = new Date().getTime();
        reqData.ts = ts;
        reqData.sign = md5(ts.toString().substr(0, 4) + sdk_conf.game.substr(0, 2) + sdk_conf.version.substr(0, 1) + '$5dfjr$%dsadsfdsii');

        //1.拼接请求参数
        var param = "";
        for (var item in reqData) {
            param += item + "=" + reqData[item] + "&";
        }
        //2.发起请求
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    var response = xhr.responseText;
                    // console.log(response)
                    if (response) {
                        var responseJson = JSON.parse(response);
                        callback(responseJson);
                    } else {
                        if (self.debug) {
                            console.log("返回数据不存在");
                        }
                        callback(null);
                    }
                } else {
                    if (self.debug) {
                        console.log("请求失败", xhr);
                    }
                    callback(null);
                }
            }
        };
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(param); //reqData为字符串形式： "key=value"
    },
    /**
     * @apiGroup C
     * @apiName checkUpdate
     * @api {检测版本更新} 微信小游戏（冷启动的时候会检查，如果有更新则会重启小游戏进行更新） checkUpdate（版本更新）
     * 
     * @apiSuccessExample {json} 示例:
     * sdk.checkUpdate();
     */
    checkUpdate: function checkUpdate() {
        if (cc.sys.platform === cc.sys.WECHAT_GAME && typeof wx.getUpdateManager === 'function') {
            var updateManager = wx.getUpdateManager();
            updateManager.onCheckForUpdate(function (res) {
                if (self.debug) {
                    console.log("请求完新版本信息的回调", res.hasUpdate);
                }
            });
            updateManager.onUpdateReady(function () {
                if (self.debug) {
                    console.log("新的版本已经下载好，调用 applyUpdate 应用新版本并重启");
                }
                updateManager.applyUpdate();
            });
            updateManager.onUpdateFailed(function () {
                if (self.debug) {
                    console.log("新的版本下载失败");
                }
            });
        }
    },

    /**
     * @apiGroup C
     * @apiName getConfig1
     * @api {运营配置} 游戏后台配置信息，运营人员使用的通用配置开关 getConfig1（运营配置）
     * @apiParam {Object} callback 不存在返回null
     * 
     * @apiSuccessExample {json} 示例:
     * var d = sdk.getConfig1();
     */
    getConfig1: function getConfig1() {
        return JSON.parse(this.ConfigData.config1);
    },

    /**
     * @apiGroup C
     * @apiName getConfig2
     * @api {程序配置} 游戏后台配置信息，程序员使用的游戏数据开关，可随便自定义数据：例如复活次数等 getConfig2（程序配置）
     * @apiParam {Object} callback 不存在返回null
     * 
     * @apiSuccessExample {json} 示例:
     * var d = sdk.getConfig2();
     */
    getConfig2: function getConfig2() {
        return JSON.parse(this.ConfigData.config2);
    },


    /**
     * @apiGroup C
     * @apiName createImage
     * @api {显示网络图片} 微信小游戏加载图片 createImage（显示图片）
     * @apiParam {cc.Sprite} sprite 显示图片的Sprite
     * @apiParam {String} url 需要加载的图片地址
     * 
     * @apiSuccessExample {json} 示例:
     * var data = sdk.createImage(advs);
     */
    createImage: function createImage(sprite, url) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            var image = wx.createImage();
            image.onload = function () {
                var texture = new cc.Texture2D();
                texture.initWithElement(image);
                texture.handleLoadedTexture();
                sprite.spriteFrame = new cc.SpriteFrame(texture);
            };
            image.src = url;
        }
    },

    /**
     * @apiGroup C
     * @apiName getUser
     * @api {获取本地用户信息} 获取本地用户信息（登录成功后，会在本地存储用户信息） getUser（获取用户信息）
     * 
     * @apiSuccessExample {json} 示例:
     * var user = sdk.getUser();
     */
    getUser: function getUser() {
        var userinfo = this.getItem('userinfo');
        if (userinfo) {
            return userinfo;
        } else {
            return null;
        }
    },

    /**
     * @apiGroup C
     * @apiName setItem
     * @api {set} 数据存储 setItem（存）
     * @apiParam {String} key 键
     * @apiParam {String} value 值
     * 
     * @apiSuccessExample {json} 示例:
     * sdk.setItem("nick","hello")
     */
    setItem: function setItem(key, value) {
        cc.sys.localStorage.setItem(key, value);
    },

    /**
     * @apiGroup C
     * @apiName getItem
     * @api {get} 数据存储 getItem（取）
     * @apiParam {String} key 键
     * @apiParam {String} value 值
     * 
     * @apiSuccessExample {json} 示例:
     * var nick = sdk.getItem("nick")
     */
    getItem: function getItem(key) {
        return cc.sys.localStorage.getItem(key);
    },

    /**
     * @apiGroup C
     * @apiName onMessage
     * @api {主域监听子域发送的消息} 主域监听子域发送的消息 onMessage（监听消息）
     * @apiParam {callback} callback 回调函数
     * 
     * @apiSuccessExample {json} 示例:
     * sdk.onMessage((d)=>{
     *     console.log(d)
     * })
     */
    onMessage: function onMessage(callback) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.onMessage(function (d) {
                // if(d.message == "common_back"){//.子域: 返回子域首页
                //     cc.director.loadScene("common_children")
                // }
                callback(d);
            });
        }
    },

    /**
     * @apiGroup C
     * @apiName postMessage
     * @api {主域向子域发送消息} 主域向子域发送消息 postMessage（发送消息）
     * @apiParam {String} msg 发送给子域的消息
     * 
     * @apiSuccessExample {json} 示例:
     * sdk.postMessage("hello")
     */
    postMessage: function postMessage(msg) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.postMessage({ message: msg });
        }
    },

    //.主域上报数据:    对用户托管数据进行写数据操作，允许同时写多组 KV 数据。
    setUserCloudStorage: function setUserCloudStorage(kvDataList, callback) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.setUserCloudStorage({
                KVDataList: kvDataList,
                success: function success(res) {
                    callback(res);
                },
                fail: function fail(res) {
                    callback(res);
                }
            });
        }
    },

    //.获取当前用户托管数据当中对应 key 的数据。该接口只可在开放数据域下使用
    getUserCloudStorage: function getUserCloudStorage(keyList, callback) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.getUserCloudStorage({
                keyList: keyList,
                success: function success(res) {
                    callback(res);
                },
                fail: function fail(res) {
                    callback(res);
                }
            });
        }
    },

    //.在小游戏是通过群分享卡片打开的情况下，可以通过调用该接口获取群同玩成员的游戏数据。该接口只可在开放数据域下使用。
    getGroupCloudStorage: function getGroupCloudStorage(shareTicket, keyList, callback) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.getGroupCloudStorage({
                shareTicket: shareTicket,
                keyList: keyList,
                success: function success(res) {
                    callback(res);
                },
                fail: function fail(res) {
                    callback(res);
                }
            });
        }
    },

    //.拉取当前用户所有同玩好友的托管数据。该接口只可在开放数据域下使用
    getFriendCloudStorage: function getFriendCloudStorage(keyList, callback) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.getFriendCloudStorage({
                keyList: keyList,
                success: function success(res) {
                    callback(res);
                },
                fail: function fail(res) {
                    callback(res);
                }
            });
        }
    },

    /**
     * @apiGroup C
     * @apiName sortList
     * @api {对子域数据进行排序} 对子域数据进行排序 sortList（子域排序）
     * @apiParam {String} ListData 要排序的微信子域数据
     * @apiParam {String} field 排序字段
     * @apiParam {String} order 正序：true  ； 倒序：false
     * 
     * @apiSuccessExample {json} 示例:
     * wx.getFriendCloudStorage({
     *       keyList: ["yw_score"],
     *       success(res){
     *           var ListData = sdk.sortList(res.data, 'yw_score', true));
     *       },
     *       fail(){
     *           console.log(res)
     *       }
     *})
     */
    sortList: function sortList(ListData, field, order) {
        ListData.sort(function (a, b) {
            var AMaxScore = 0;
            var KVDataList = a.KVDataList;
            for (var i = 0; i < KVDataList.length; i++) {
                if (KVDataList[i].key == field) {
                    AMaxScore = KVDataList[i].value;
                }
            }

            var BMaxScore = 0;
            KVDataList = b.KVDataList;
            for (var i = 0; i < KVDataList.length; i++) {
                if (KVDataList[i].key == field) {
                    BMaxScore = KVDataList[i].value;
                }
            }

            if (order) {
                return parseInt(AMaxScore) - parseInt(BMaxScore);
            } else {
                return parseInt(BMaxScore) - parseInt(AMaxScore);
            }
        });
        return ListData;
    },

    /**
     * @apiIgnore
     * @apiGroup C
     * @apiName getMyRank3
     * @api {排名与我相邻的3位玩家信息} 排名与我相邻的3位玩家信息 getMyRank3（Top3）
     * @apiParam {String} ListData 要排序的微信子域数据
     * @apiParam {String} me 我的子域信息
     * 
     * @apiSuccessExample {json} 示例:
     * wx.getUserInfo({
     *       openIdList: ['selfOpenId'],
     *       lang: 'zh_CN',
     *       success(res){
     *          //.Top3
     *          var dList = sdk.getMyRank3(dataList,res.data[0]);
     *          console.log(dList)
     *       },
     *       fail(error) {
     *          console.log(error)
     *       }
     * })
     * 
     * 
     */
    getMyRank3: function getMyRank3(ListData, me) {
        var dataList = [];
        for (var i = 0; i < ListData.length; i++) {
            if (ListData.length <= 3) {
                //.只有3个人或以下
                if (ListData[i].avatarUrl == me.avatarUrl && ListData[i].nickname == me.nickName) {
                    ListData[i].isSelf = true; //.标记自己
                }
                dataList = ListData;
                for (var i = 0; i < dataList.length; i++) {
                    dataList[i].rank = i;
                }
            } else {
                if (ListData[i].avatarUrl == me.avatarUrl && ListData[i].nickname == me.nickName) {
                    ListData[i].isSelf = true; //.标记自己
                    if (i == ListData.length - 1) {
                        //.自己分数最低
                        ListData[i].rank = i;
                        ListData[i - 1].rank = i - 1;
                        ListData[i - 2].rank = i - 2;
                        dataList.push(ListData[i - 2]);
                        dataList.push(ListData[i - 1]);
                        dataList.push(ListData[i]);
                    } else if (i == 0) {
                        //.自己分数最高
                        ListData[i].rank = i;
                        ListData[i + 1].rank = i + 1;
                        ListData[i + 2].rank = i + 2;
                        dataList.push(ListData[i]);
                        dataList.push(ListData[i + 1]);
                        dataList.push(ListData[i + 2]);
                    } else {
                        //.居中
                        ListData[i - 1].rank = i - 1;
                        ListData[i].rank = i;
                        ListData[i + 1].rank = i + 1;
                        dataList.push(ListData[i - 1]);
                        dataList.push(ListData[i]);
                        dataList.push(ListData[i + 1]);
                    }
                    break;
                }
            }
        }
        return dataList;
    },

    /**
     * @apiGroup C
     * @apiName WeChatLogin
     * @api {微信登录} 微信登录 WeChatLogin（登录）
     * @apiParam {String} loginImg 登录按钮图片
     * @apiParam {String} imgWidth 图片宽度
     * @apiParam {String} imgHeight 图片高度
     * 
     * @apiSuccessExample {json} 示例:
     * //.登录按钮图片、图片宽度、图片高度
     *   sdk.WeChatLogin({loginImg: 'https://laixiao.github.io/lewan/html/img/btn_start.png', imgWidth:382, imgHeight: 164}, (d)=>{
     *       if(d){
     *           console.log(d)
     *       }else{
     *           console.log("登陆失败，请重试")
     *       }
     *   });
     * 
     * 
     */
    WeChatLogin: function WeChatLogin(obj, callback) {
        var self = this;

        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            var options = wx.getLaunchOptionsSync();

            var referee_id = options.query.uid; //.推荐人id
            var source_id = options.query.source_id; //.用户来源id
            var source_id2 = options.query.source_id2; //.用户来源子id
            var share_id = options.query.share_id; //.分享素材ID

            var userinfo = this.getItem('userinfo');
            if (userinfo) {
                callback(userinfo);
            } else {
                if (self.button) {
                    self.button.show();
                } else {
                    self.button = wx.createUserInfoButton(obj.buttonConfig);
                    self.button.onTap(function (res1) {
                        // 处理用户拒绝授权的情况
                        // if (res1.errMsg.indexOf('auth deny') > -1 || res1.errMsg.indexOf('auth denied') > -1 ) {
                        //     wx.showToast();
                        // }
                        wx.showToast({ title: '登录中...', icon: 'loading', duration: 8 });
                        wx.getSetting({
                            success: function success(auths) {
                                if (auths.authSetting["scope.userInfo"]) {
                                    console.log('===已经授权===');
                                    wx.login({
                                        success: function success(res2) {
                                            var reqData = {
                                                code: res2.code,
                                                rawData: res1.rawData,
                                                iv: res1.iv,
                                                encryptedData: res1.encryptedData,
                                                signature: res1.signature,

                                                referee_id: referee_id,
                                                source_id: source_id,
                                                source_id2: source_id2,
                                                share_id: share_id
                                            };
                                            console.log('==登录参数==', reqData);
                                            self.Post(self.ip1 + self.login, reqData, function (data) {
                                                console.log('==登录结果==', data);
                                                if (data.c == 1) {
                                                    wx.hideToast();
                                                    self.setItem('userinfo', data.d);
                                                    self.button.hide();
                                                    callback(data.d);
                                                } else {
                                                    console.log('==登录接口请求失败==', data);
                                                    wx.showToast({ title: '登录失败请重试' });
                                                }
                                            });
                                        },
                                        fail: function fail() {
                                            wx.showToast({ title: '登录失败请重试' });
                                            callback(false);
                                        }
                                    });
                                } else {
                                    callback(false);
                                }
                            }
                        });
                    });
                    self.button.show();
                }
            }
        }
    },

    /**
     * @apiGroup C
     * @apiName createBannerAd
     * @api {微信登录} 创建banner广告组件 createBannerAd（广告）
     * @apiParam {String} adUnitId 广告单元id	
     * @apiParam {String} style banner 广告组件的样式
     * 
     * @apiSuccessExample {json} 示例:
     * //.参考文档：https://developers.weixin.qq.com/minigame/dev/document/ad/wx.createBannerAd.html
     *  var bannerAd = sdk.createBannerAd({
     *      style:{
     *          left: 0,
     *          top: 0,
     *          width: 100,
     *          height: 200
     *      }
     *  });
     *  bannerAd.show()
     * 
     */
    createBannerAd: function createBannerAd(obj) {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            if (this.BannerAd) {
                return this.BannerAd;
            } else {
                this.BannerAd = wx.createBannerAd({
                    adUnitId: sdk_conf.bannerAdUnitId,
                    style: obj.style
                });
                this.BannerAd.onLoad(function (res) {
                    console.log("BannerAd广告加载事件：", res);
                });
                this.BannerAd.onError(function (res) {
                    console.log("BannerAd广告错误事件：", res);
                });
                return this.BannerAd;
            }
        }
    },

    /**
     * @apiGroup C
     * @apiName createRewardedVideoAd
     * @api {微信登录} 创建banner广告组件 createRewardedVideoAd（广告）
     * @apiParam {String} adUnitId 广告单元id	
     * 
     * @apiSuccessExample {json} 示例:
     * //.参考文档：https://developers.weixin.qq.com/minigame/dev/document/ad/wx.createRewardedVideoAd.html
     *  var videoAd = sdk.createRewardedVideoAd();
     *  videoAd.load().then(() => videoAd.show());
     * 
     */
    createRewardedVideoAd: function createRewardedVideoAd() {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            if (this.VideoAd) {
                return this.VideoAd;
            } else {
                this.VideoAd = wx.createRewardedVideoAd({ adUnitId: sdk_conf.videoAdUnitId });
                this.VideoAd.onLoad(function (res) {
                    console.log("VideoAd广告加载事件：", res);
                });
                this.VideoAd.onError(function (res) {
                    console.log("VideoAd广告错误事件：", res);
                });
                return this.VideoAd;
            }
        }
    },

    /**
    * @apiGroup C
    * @apiName Screenshot
    * @api {微信小游戏截图保存} 微信小游戏截图保存 Screenshot（截图）
    * @apiParam {cc.Camera} camera 摄像头组件	
    * 
    * @apiSuccessExample {json} 示例:
    *   //.摄像机组件、回调
    *   sdk.Screenshot(this.camera, (d)=>{
    *       if(d){
    *           console.log("图片保存成功：", d)
    *       }else{
    *           console.log("图片保存失败：", d)
    *       }
    *   })
    * 
    */
    Screenshot: function Screenshot(camera, callback) {
        var self = this;
        //1.判断是否授权
        wx.getSetting({
            success: function success(res) {
                // console.log("授权状态", res.authSetting['scope.writePhotosAlbum'])
                if (res.authSetting['scope.writePhotosAlbum']) {
                    self.capture(camera, callback);
                } else {
                    // console.log("未授权", res)
                    wx.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success: function success(res2) {
                            console.log("success res2", res2);
                            self.Screenshot(camera, callback);
                        },
                        fail: function fail(res2) {
                            wx.showToast({ title: '请重新授权' });
                            callback(null);
                            console.log("fail res2", res2);
                        }
                    });
                }
            },
            fail: function fail() {
                callback(null);
            }
        });
    },
    capture: function capture(camera, callback) {
        //.要截取的范围（全屏）
        var texture = new cc.RenderTexture();
        // 如果截图内容中不包含 Mask 组件，可以不用传递第三个参数
        var gl = cc.game._renderContext;
        texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height, gl.STENCIL_INDEX8);
        camera.targetTexture = texture;
        this.texture = texture;

        var width = this.texture.width;
        var height = this.texture.height;
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        camera.render();
        var data = this.texture.readPixels();
        var rowBytes = width * 4;
        for (var row = 0; row < height; row++) {
            var srow = height - 1 - row;
            var imageData = ctx.createImageData(width, 1);
            var start = srow * width * 4;
            for (var i = 0; i < rowBytes; i++) {
                imageData.data[i] = data[start + i];
            }
            ctx.putImageData(imageData, 0, row);
        }
        var dataURL = canvas.toDataURL("image/jpeg");
        var tempFilePath = canvas.toTempFilePathSync({
            x: 0,
            y: 0,
            width: width,
            height: height,
            destWidth: width,
            destHeight: height
        });

        wx.saveImageToPhotosAlbum({
            filePath: tempFilePath,
            success: function success(res2) {
                console.log('==截图保存=success=', res2);
                callback(true);
            },
            fail: function fail(res2) {
                console.log('==截图保存=fail=', res2);
                callback(null);
            }
        });
    }
};
// module.exports = sdk;
window.sdk = sdk;

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
        //# sourceMappingURL=sdk.js.map
        