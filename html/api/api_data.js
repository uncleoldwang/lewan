define({ "api": [
  {
    "group": "A",
    "name": "init",
    "type": "初始化sdk",
    "url": "使用sdk前，必须先初始化一次才能使用",
    "title": "init（初始化sdk）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": true,
            "field": "debug",
            "defaultValue": "false",
            "description": "<p>是否开启调试</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": true,
            "field": "userid",
            "description": "<p>用户的id（兼容旧游戏，新游戏废弃）</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "//.初始化游戏\n  sdk.init({\n     debug: true,        //.是否开启调试\n     userid: 56032607    //.用户的id（兼容旧游戏，新游戏废弃）\n  }, (res)=>{\n      console.log('sdk初始化结果：', res)\n  })",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apiTest/assets/Sdk/sdk.js",
    "groupTitle": "A"
  },
  {
    "group": "B",
    "name": "setAld",
    "type": "阿拉丁埋点",
    "url": "统计埋点(使用前请到阿拉丁注册游戏，并配置sdk/ald-game-conf.js)",
    "title": "setAld（阿拉丁埋点）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>描述用户的动作名称，不超过255个字符,不支持数字,英文,中文,&quot;-&quot;、&quot;_&quot;、&quot;+&quot;,以外的字符格式</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "key",
            "description": "<p>动作的参数，不超过255个字符，不支持数字，英文，中文，&quot;-&quot;、&quot;_&quot;、&quot;+&quot;，以外的字符格式</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>动作的参数值，不超过255个字符，不支持数字，英文，中文，“-“、”_”、&quot;+&quot;，以外的字符格式</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "//使用前，在开发者设置中添加 request合法域名https://glog.aldwx.com\n//统计类型（点击）， 统计位置（开始游戏按钮），  统计参数（点了1次）\nsdk.setAld(\"click\", \"playButton\", \"1\")",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apiTest/assets/Sdk/sdk.js",
    "groupTitle": "B"
  },
  {
    "group": "C",
    "name": "Get",
    "type": "Get",
    "url": "发起网络请求",
    "title": "Get（发起Get请求）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>请求地址</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "reqData",
            "description": "<p>请求参数</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "callback",
            "description": "<p>不存在返回null</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "sdk.Get(\"https://xxx.xxx\", { user_id: user_id }, function (d) {\n    console.log(d)\n});",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apiTest/assets/Sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "Post",
    "type": "Post",
    "url": "发起网络请求",
    "title": "Post（发起Post请求）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>请求地址</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "reqData",
            "description": "<p>请求参数</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "callback",
            "description": "<p>不存在返回null</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "sdk.Post(sdk.ip + sdk.common, { user_id: user_id }, function (d) {\n    console.log(d)\n});",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apiTest/assets/Sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "Screenshot",
    "type": "微信小游戏截图保存",
    "url": "微信小游戏截图保存",
    "title": "Screenshot（截图）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "cc.Camera",
            "optional": false,
            "field": "camera",
            "description": "<p>摄像头组件</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "//.摄像机组件、回调\nsdk.Screenshot(this.camera, (d)=>{\n    if(d){\n        console.log(\"图片保存成功：\", d)\n    }else{\n        console.log(\"图片保存失败：\", d)\n    }\n})",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apiTest/assets/Sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "WeChatLogin",
    "type": "微信登录",
    "url": "微信登录",
    "title": "WeChatLogin（登录）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "buttonConfig",
            "description": "<p>登录按钮配置，参考：https://developers.weixin.qq.com/minigame/dev/document/open-api/user-info/wx.createUserInfoButton.html</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "//调用sdk登录\nsdk.WeChatLogin({\n    buttonConfig:{\n        type: 'image',\n        image: 'https://laixiao.github.io/lewan/html/img/btn_start.png',\n        style: {  width: 382, height: 164, top: res.screenHeight/2-164/2, left: res.screenWidth/2-382/2 }\n    }\n}, (d)=>{\n    console.log(\"登陆状态：\", d)\n});",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apiTest/assets/Sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "checkUpdate",
    "type": "检测版本更新",
    "url": "微信小游戏（冷启动的时候会检查，如果有更新则会重启小游戏进行更新）",
    "title": "checkUpdate（版本更新）",
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "sdk.checkUpdate();",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apiTest/assets/Sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "createBannerAd",
    "type": "微信登录",
    "url": "创建banner广告组件",
    "title": "createBannerAd（广告）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "adUnitId",
            "description": "<p>广告单元id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "style",
            "description": "<p>banner 广告组件的样式</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "//.参考文档：https://developers.weixin.qq.com/minigame/dev/document/ad/wx.createBannerAd.html\n var bannerAd = sdk.createBannerAd({\n     style:{\n         left: 0,\n         top: 0,\n         width: 100,\n         height: 200\n     }\n });\n bannerAd.show()",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apiTest/assets/Sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "createImage",
    "type": "显示网络图片",
    "url": "微信小游戏加载图片",
    "title": "createImage（显示图片）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "cc.Sprite",
            "optional": false,
            "field": "sprite",
            "description": "<p>显示图片的Sprite</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>需要加载的图片地址</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "var data = sdk.createImage(advs);",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apiTest/assets/Sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "createRewardedVideoAd",
    "type": "微信登录",
    "url": "创建banner广告组件",
    "title": "createRewardedVideoAd（广告）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "adUnitId",
            "description": "<p>广告单元id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "//.参考文档：https://developers.weixin.qq.com/minigame/dev/document/ad/wx.createRewardedVideoAd.html\n var videoAd = sdk.createRewardedVideoAd();\n videoAd.load().then(() => videoAd.show());",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apiTest/assets/Sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "getConfig1",
    "type": "运营配置",
    "url": "游戏后台配置信息，运营人员使用的通用配置开关",
    "title": "getConfig1（运营配置）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "callback",
            "description": "<p>不存在返回null</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "var d = sdk.getConfig1();",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apiTest/assets/Sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "getConfig2",
    "type": "程序配置",
    "url": "游戏后台配置信息，程序员使用的游戏数据开关，可随便自定义数据：例如复活次数等",
    "title": "getConfig2（程序配置）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "callback",
            "description": "<p>不存在返回null</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "var d = sdk.getConfig2();",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apiTest/assets/Sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "getItem",
    "type": "get",
    "url": "数据存储",
    "title": "getItem（取）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "key",
            "description": "<p>键</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>值</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "var nick = sdk.getItem(\"nick\")",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apiTest/assets/Sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "getUser",
    "type": "获取本地用户信息",
    "url": "获取本地用户信息（登录成功后，会在本地存储用户信息）",
    "title": "getUser（获取用户信息）",
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "//.不存在返回null\nvar user = sdk.getUser();",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apiTest/assets/Sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "onMessage",
    "type": "主域监听子域发送的消息",
    "url": "主域监听子域发送的消息",
    "title": "onMessage（监听消息）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "callback",
            "optional": false,
            "field": "callback",
            "description": "<p>回调函数</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "sdk.onMessage((d)=>{\n    console.log(d)\n})",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apiTest/assets/Sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "onShareAppMessage",
    "type": "分享",
    "url": "注册微信右上角分享",
    "title": "onShareAppMessage(分享)",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "type",
            "defaultValue": "0",
            "description": "<p>后台自定义的分享类型；例如：0：右上角分享、1：普通分享 2：分享加金币</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>转发标题</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "imageUrl",
            "description": "<p>转发显示图片的链接</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "query",
            "description": "<p>必须是 key1=val1&amp;key2=val2 的格式。</p>"
          },
          {
            "group": "Parameter",
            "type": "callback",
            "optional": true,
            "field": "success",
            "description": "<p>成功回调</p>"
          },
          {
            "group": "Parameter",
            "type": "callback",
            "optional": true,
            "field": "fail",
            "description": "<p>失败回调</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "sdk.onShareAppMessage({type: 0, query: \"uid=520\" });",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apiTest/assets/Sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "postMessage",
    "type": "主域向子域发送消息",
    "url": "主域向子域发送消息",
    "title": "postMessage（发送消息）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>发送给子域的消息</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "sdk.postMessage(\"hello\")",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apiTest/assets/Sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "setItem",
    "type": "set",
    "url": "数据存储",
    "title": "setItem（存）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "key",
            "description": "<p>键</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>值</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "sdk.setItem(\"nick\",\"hello\")",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apiTest/assets/Sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "shareAppMessage",
    "type": "分享",
    "url": "主动拉起微信分享",
    "title": "shareAppMessage(分享)",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "type",
            "defaultValue": "1",
            "description": "<p>后台自定义的分享类型；例如：0：右上角分享、1：普通分享 2：分享加金币</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>转发标题</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "imageUrl",
            "description": "<p>转发显示图片的链接</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "query",
            "description": "<p>必须是 key1=val1&amp;key2=val2 的格式。</p>"
          },
          {
            "group": "Parameter",
            "type": "callback",
            "optional": true,
            "field": "success",
            "description": "<p>成功回调</p>"
          },
          {
            "group": "Parameter",
            "type": "callback",
            "optional": true,
            "field": "fail",
            "description": "<p>失败回调</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "sdk.shareAppMessage({type: 1, query: \"uid=520\" });",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apiTest/assets/Sdk/sdk.js",
    "groupTitle": "C"
  },
  {
    "group": "C",
    "name": "sortList",
    "type": "对子域数据进行排序",
    "url": "对子域数据进行排序",
    "title": "sortList（子域排序）",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ListData",
            "description": "<p>要排序的微信子域数据</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "field",
            "description": "<p>排序字段</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "order",
            "description": "<p>正序：true  ； 倒序：false</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "示例:",
          "content": "wx.getFriendCloudStorage({\n      keyList: [\"score\"],\n      success(res){\n          var ListData = sdk.sortList(res.data, 'score', true));\n          console.log(\"=排序后的数据=\", ListData);\n      },\n      fail(){\n          console.log(res)\n      }\n})",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "apiTest/assets/Sdk/sdk.js",
    "groupTitle": "C"
  }
] });
