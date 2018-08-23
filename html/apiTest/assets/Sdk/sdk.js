/**
1.安装apidoc，参考链接：
	http://apidocjs.com
2.按照格式弄好后，执行命令
    apidoc -i ./apiTest/assets/Sdk -o api/
    

 */

var md5 = require("md5");
var mta = require("mta");
var aldgame = require("ald-game");
var sdk = { 
    md5: md5,
    mta: mta,
    // ip1: "https://login.llewan.com",
    ip1: 'http://mock.eolinker.com/RiwKeAE4fb4e33cce254aee8509dbdd47b3898870569465?uri=https://login.llewan.com',
    ip2: "https://game.llewan.com",

    debug: false,                            //是否开启调试
    game: "",
    version: "",

    login: '/Login/common',
    Config: '/Config/common',
    ConfigData: { 
        "config1": {},
        "config2": {},
    },
    Share: "/Share/common",
    ShareList: [],

    /**
     * @apiGroup A
     * @apiName init
     * @api {初始化sdk} 使用勇往sdk前，必须先初始化一次才能使用 init（初始化sdk）
     *
     * @apiParam {String} game 游戏标识
     * @apiParam {String} version 版本
     * @apiParam {Boolean} [debug=false] 是否开启调试
     * 
     * @apiSuccessExample {json} 示例:
     * //.初始化游戏
     *   sdk.init({
            debug: true,         //.是否开启调试
            app_name: "xiao_xiao_yu_tang",     //.游戏唯一标识
            version: "1.0.0",   //.游戏版本
        }, (res)=>{
            console.log('sdk初始化结果：', res)
        })
     */
    init(args, callback){
        var self = this;
        if(args.debug){
            this.debug = args.debug;
        }
        if(args.game){
            this.game = args.game;
        }
        if(args.version){
            this.version = args.version;
        }
        this.checkUpdate();

        //.获取后台配置信息
        this.Get(this.ip2 + this.Config, {}, function (d) {
            if (d && d.c == 1) {
                self.ConfigData = d.d;
                callback(true);
            }else{
                if(self.debug){
                    console.log("获取游戏后台配置信息失败：",d)
                }
                self.init(args, callback);
            }
        });

        //.初始化分享
        this.initShare();

    },
    initShare(){
        var self = this;
        //.获取后台分享信息
        this.Get(this.ip2 + this.Share, {}, function (d) {
            if (d && d.c == 1) {
                self.ShareList = d.d;
            }else{
                console.log("获取后台分享信息失败：",d)
            }
        });
    },
    getShareByWeight(type){
        if(this.ShareList.length > 0){
            var info = {};
            var tArray = [];
            for (var i = 0; i < share_list.length; i++) {
                if (type == share_list[i].position) {
                    share_list[i].weight = parseInt(share_list[i].weight);
                    tArray.push(share_list[i]);
                }
            }
            var iArray = [];
            for (var i = 0; i < tArray.length; i++) {
                for (var j = 0; j < tArray[i].weight; j++) {
                    iArray.push(i);
                }
            }
            var rI = iArray[parseInt(Math.random() * iArray.length)];
            if(tArray[rI]){
                info.title = tArray[rI].title;
                info.imageUrl = tArray[rI].image;
            }else{
                info.title = "小小鱼塘";
                info.imageUrl = "";
            }
            //.正则替换昵称
            if(info.title.indexOf("&nick") != -1){
                info.title = info.title.replace(/&nick/g, this.getUser().nickname);
            }
            return info;
        }else{
            this.initShare();
            return null;
        }
    },
    /**
     * @apiGroup C
     * @apiName shareAppMessage
     * @api {分享} 微信分享 shareAppMessage(分享)
     * @apiParam {int} type 后台自定义的分享类型；例如：0：右上角分享(只读)、1：普通分享 2：分享加金币
     * 
     * @apiSuccessExample {json} 示例:
     * sdk.shareAppMessage  (1);
     */
    shareAppMessage(type){
        
    },
    onShareAppMessage(type){
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            //.微信右上角分享
            wx.showShareMenu({withShareTicket:true})
            wx.onShareAppMessage(function(res){
                var shareItem = self.getShareByWeight();
                return {
                    title: shareItem.title,
                    imageUrl: shareItem.imageUrl,
                    query: shareItem.query,
                    success(res){
                        console.log(res)
                    },
                    fail(res){
                        console.log(res)
                    } 
                }
            })
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
    initmta(args){
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
    setmta(name, value){
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            mta.Event.stat(name, { value: 'true' })
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
    setAld(type, key, value){
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            // wx.aldSendEvent('事件名称',{'参数key' : '参数value'})、
            wx.aldSendEvent(v1,  { v2 : v3 })
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
    Get(url, reqData, callback) {
        var self = this;

        reqData.game = this.game;
        reqData.version = this.version;
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
                        if(self.debug){
                            console.log("返回数据不存在",url)
                        }
                        callback(null);
                    }
                } else {
                    if(self.debug){
                        console.log("请求失败",url)
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
    Post: function (url, reqData, callback) {
        var self = this;
        
        reqData.game = this.game;
        reqData.version = this.version;
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
                        if(self.debug){
                            console.log("返回数据不存在")
                        }
                        callback(null);
                    }
                } else {
                    if(self.debug){
                        console.log("请求失败",xhr)
                    }
                    callback(null);
                }
            }
        };
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(param);//reqData为字符串形式： "key=value"
    },
    /**
     * @apiGroup C
     * @apiName checkUpdate
     * @api {检测版本更新} 微信小游戏（冷启动的时候会检查，如果有更新则会重启小游戏进行更新） checkUpdate（版本更新）
     * 
     * @apiSuccessExample {json} 示例:
     * sdk.checkUpdate();
     */
    checkUpdate() {
        if (cc.sys.platform === cc.sys.WECHAT_GAME && typeof wx.getUpdateManager === 'function') {
            const updateManager = wx.getUpdateManager()
            updateManager.onCheckForUpdate(function (res) {
                if(self.debug){
                    console.log("请求完新版本信息的回调", res.hasUpdate)
                }
            })
            updateManager.onUpdateReady(function () {
                if(self.debug){
                    console.log("新的版本已经下载好，调用 applyUpdate 应用新版本并重启")
                }
                updateManager.applyUpdate()
            })
            updateManager.onUpdateFailed(function () {
                if(self.debug){
                    console.log("新的版本下载失败")
                }
            })
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
    getConfig1(){
        return ConfigData.config1;
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
    getConfig2(){
        return ConfigData.config2;
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
    createImage(sprite, url) {
        let image = wx.createImage();
        image.onload = function () {
            let texture = new cc.Texture2D();
            texture.initWithElement(image);
            texture.handleLoadedTexture();
            sprite.spriteFrame = new cc.SpriteFrame(texture);
        };
        image.src = url;
    },
    /**
     * @apiGroup C
     * @apiName getUser
     * @api {获取本地用户信息} 获取本地用户信息（登录成功后，会在本地存储用户信息） getUser（获取用户信息）
     * 
     * @apiSuccessExample {json} 示例:
     * var user = sdk.getUser();
     */
    getUser(){
        var userinfo = this.getItem('userinfo');
        if(userinfo){
            return userinfo;
        }else{
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
    setItem(key, value){
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
    getItem(key){
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
    onMessage(callback){
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.onMessage(function(d){
                // if(d.message == "common_back"){//.子域: 返回子域首页
                //     cc.director.loadScene("common_children")
                // }
                callback(d)
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
    postMessage(msg){
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.postMessage({ message: msg });
        }
    },
    //.主域上报数据:    对用户托管数据进行写数据操作，允许同时写多组 KV 数据。
    setUserCloudStorage(kvDataList, callback){
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.setUserCloudStorage({
                KVDataList: kvDataList,
                success(res){
                    callback(res)
                },
                fail(res){
                    callback(res)
                }
            })
        }
    },
    //.获取当前用户托管数据当中对应 key 的数据。该接口只可在开放数据域下使用
    getUserCloudStorage(keyList, callback){
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.getUserCloudStorage({
                keyList: keyList,
                success(res){
                    callback(res)
                },
                fail(res){
                    callback(res)
                }
            })
        }
    },
    //.在小游戏是通过群分享卡片打开的情况下，可以通过调用该接口获取群同玩成员的游戏数据。该接口只可在开放数据域下使用。
    getGroupCloudStorage(shareTicket, keyList, callback){
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.getGroupCloudStorage({
                shareTicket: shareTicket,
                keyList: keyList,
                success(res){
                    callback(res)
                },
                fail(res){
                    callback(res)
                }
            })
        }
    },
    //.拉取当前用户所有同玩好友的托管数据。该接口只可在开放数据域下使用
    getFriendCloudStorage(keyList, callback){
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.getFriendCloudStorage({
                keyList: keyList,
                success(res){
                    callback(res)
                },
                fail(res){
                    callback(res)
                }
            })
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
    sortList(ListData, field, order){
        ListData.sort(function(a,b){
            var AMaxScore = 0;
            var KVDataList = a.KVDataList;
            for(var i=0; i<KVDataList.length; i++){
                if(KVDataList[i].key == field){
                    AMaxScore = KVDataList[i].value;
                }
            }

            var BMaxScore = 0;
            KVDataList = b.KVDataList;
            for(var i=0; i<KVDataList.length; i++){
                if(KVDataList[i].key == field){
                    BMaxScore = KVDataList[i].value;
                }
            }

            if(order){
                return parseInt(AMaxScore) - parseInt(BMaxScore);
            }else{
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
    getMyRank3(ListData,me){
        var dataList = [];
        for(var i=0; i<ListData.length; i++){
            if(ListData.length <= 3){
                //.只有3个人或以下
                if(ListData[i].avatarUrl == me.avatarUrl && ListData[i].nickname == me.nickName){
                    ListData[i].isSelf = true;//.标记自己
                }
                dataList = ListData;
                for(var i=0; i<dataList.length; i++){
                    dataList[i].rank = i;
                }                 
            }else{
                if(ListData[i].avatarUrl == me.avatarUrl && ListData[i].nickname == me.nickName){
                    ListData[i].isSelf = true;//.标记自己
                    if(i == ListData.length-1){
                        //.自己分数最低
                        ListData[i].rank = i;
                        ListData[i-1].rank = i-1;
                        ListData[i-2].rank = i-2;
                        dataList.push(ListData[i-2])
                        dataList.push(ListData[i-1])
                        dataList.push(ListData[i])
                    }else if(i==0){
                        //.自己分数最高
                        ListData[i].rank = i;
                        ListData[i+1].rank = i+1;
                        ListData[i+2].rank = i+2;
                        dataList.push(ListData[i])
                        dataList.push(ListData[i+1])
                        dataList.push(ListData[i+2])
                    }else{
                        //.居中
                        ListData[i-1].rank = i-1;
                        ListData[i].rank = i;
                        ListData[i+1].rank = i+1;
                        dataList.push(ListData[i-1])
                        dataList.push(ListData[i])
                        dataList.push(ListData[i+1])
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
    WeChatLogin(obj, callback){
        var self = this;
        var loginImg = 'https://laixiao.github.io/lewan/html/img/btn_start.png';
        var imgWidth = 382/2;
        var imgHeight = imgHeight/2;
        var referee_id = '';
        var source_id = '';
        var source_id2 = '';
        if(obj.loginImg){
            loginImg = obj.loginImg;
        }
        if(obj.imgWidth){
            imgWidth = obj.imgWidth;
        }
        if(obj.imgHeight){
            imgHeight = obj.imgHeight;
        }
        if(obj.referee_id){
            referee_id = obj.referee_id;
        }
        if(obj.source_id){
            source_id = obj.source_id;
        }
        if(obj.source_id2){
            source_id2 = obj.source_id2;
        }

        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            var userinfo = this.getItem('userinfo');
            if(userinfo){
                callback(JSON.parse(userinfo))
            }else{
                if(self.button){
                    self.button.show();
                }else{
                    wx.getSystemInfo({
                        success(res){
                            self.button = wx.createUserInfoButton({
                                type: 'image',
                                image: loginImg,
                                style: {
                                    left: res.screenWidth/2 - imgWidth/2,
                                    top: res.screenHeight/2 - imgHeight/2,
                                    width: imgWidth,
                                    height: imgHeight,
                                }
                            })
                            self.button.onTap((res1) => {
                                // 处理用户拒绝授权的情况
                                // if (res1.errMsg.indexOf('auth deny') > -1 || res1.errMsg.indexOf('auth denied') > -1 ) {
                                //     wx.showToast();
                                // }
                                wx.showToast({title: '登录中...',icon:'loading',duration: 8});
                                wx.getSetting({
                                    success(auths){
                                        if(auths.authSetting["scope.userInfo"]){
                                            console.log('===已经授权===');
                                            wx.login({
                                                success(res2){ 
                                                    var reqData = {   
                                                        code: res2.code,
                                                        rawData: res1.rawData,
                                                        iv: res1.iv,
                                                        encryptedData: res1.encryptedData,
                                                        signature: res1.signature,

                                                        referee_id: referee_id,
                                                        source_id: source_id,
                                                        source_id2: source_id2
                                                    }
                                                    // console.log('==登录参数==', reqData)
                                                    self.Post(self.ip1 + self.login, reqData, function(data){
                                                        // console.log('==登录结果==', data)
                                                        if(data.c == 1){
                                                            wx.hideToast();
                                                            self.setItem('userinfo',data.d);
                                                            self.button.hide();
                                                            callback(data.d);
                                                        }else{
                                                            wx.showToast({title: '登录失败请重试'});
                                                        }                
                                                    });
                                                },
                                                fail(){
                                                    wx.showToast({title: '登录失败请重试'});
                                                    callback(false)
                                                },
                                            })
                                        }else{
                                            callback(false)
                                        }
                                    }
                                })        
                            })
                            self.button.show()
                        },
                        fail(){
                            callback(false)
                        }
                    })
                }
            }
        }
    },


    

};
// module.exports = sdk;
window.sdk = sdk;

