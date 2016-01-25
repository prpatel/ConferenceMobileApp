function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function loadTweets() {
        if (Ti.Network.online) {
            if (0 === $.tweetlist.sections[0].items.length) {
                $.tweetlist.sections[0].insertItemsAt(0, [ {
                    template: "loadingtemplate",
                    loading: {
                        text: L("refreshing")
                    }
                } ]);
                require("conversationmod").refreshList($.tweetlist);
            }
        } else alert(L("offline_error"));
    }
    function doclick(evt) {
        var section = $.tweetlist.sections[evt.sectionIndex];
        var item = section.getItemAt(evt.itemIndex);
        openApp({
            appUrl: "twitter://status?id=" + item.properties.id,
            webUrl: item.properties.url
        });
    }
    function openApp(obj) {
        Ti.Platform.openURL(obj.webUrl);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "conversation";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.conversation = Ti.UI.createWindow({
        title: L("tab3_title"),
        barColor: "#699F27",
        backgroundColor: "#fff",
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.UPSIDE_PORTRAIT ],
        id: "conversation"
    });
    $.__views.conversation && $.addTopLevelView($.__views.conversation);
    var __alloyId0 = {};
    var __alloyId3 = [];
    var __alloyId5 = {
        type: "Ti.UI.ImageView",
        bindId: "avatar",
        properties: {
            height: 60,
            width: 60,
            top: 5,
            left: 5,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "#cacaca",
            bindId: "avatar"
        }
    };
    __alloyId3.push(__alloyId5);
    var __alloyId7 = {
        type: "Ti.UI.Label",
        bindId: "name",
        properties: {
            height: Ti.UI.SIZE,
            width: Ti.UI.SIZE,
            left: 70,
            top: 5,
            font: {
                fontSize: 12,
                fontWeight: "bold"
            },
            color: "#000",
            bindId: "name"
        }
    };
    __alloyId3.push(__alloyId7);
    var __alloyId9 = {
        type: "Ti.UI.Label",
        bindId: "screen_name",
        properties: {
            height: Ti.UI.SIZE,
            width: Ti.UI.SIZE,
            top: 5,
            right: 10,
            font: {
                fontSize: 12
            },
            color: "#000",
            bindId: "screen_name"
        }
    };
    __alloyId3.push(__alloyId9);
    var __alloyId11 = {
        type: "Ti.UI.Label",
        bindId: "tweet",
        properties: {
            top: 20,
            left: 70,
            right: 10,
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE,
            font: {
                fontSize: 13
            },
            color: "#000",
            bindId: "tweet"
        }
    };
    __alloyId3.push(__alloyId11);
    var __alloyId2 = {
        properties: {
            height: 100,
            name: "rowtemplate"
        },
        childTemplates: __alloyId3
    };
    __alloyId0["rowtemplate"] = __alloyId2;
    var __alloyId14 = [];
    var __alloyId16 = {
        type: "Ti.UI.Label",
        bindId: "loading",
        properties: {
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE,
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            color: "#fff",
            bindId: "loading"
        }
    };
    __alloyId14.push(__alloyId16);
    var __alloyId13 = {
        properties: {
            height: 50,
            backgroundColor: "#636363",
            name: "loadingtemplate"
        },
        childTemplates: __alloyId14
    };
    __alloyId0["loadingtemplate"] = __alloyId13;
    $.__views.__alloyId17 = Ti.UI.createListSection({
        name: "notification",
        id: "__alloyId17"
    });
    var __alloyId19 = [];
    __alloyId19.push($.__views.__alloyId17);
    $.__views.__alloyId20 = Ti.UI.createListSection({
        name: "tweets",
        id: "__alloyId20"
    });
    __alloyId19.push($.__views.__alloyId20);
    $.__views.tweetlist = Ti.UI.createListView({
        top: 0,
        backgroundColor: "#0000",
        defaultItemTemplate: "rowtemplate",
        separatorColor: "#cacaca",
        backgroundFocusedColor: "transparent",
        sections: __alloyId19,
        templates: __alloyId0,
        id: "tweetlist"
    });
    $.__views.conversation.add($.__views.tweetlist);
    doclick ? $.__views.tweetlist.addEventListener("itemclick", doclick) : __defers["$.__views.tweetlist!itemclick!doclick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    loadTweets();
    __defers["$.__views.tweetlist!itemclick!doclick"] && $.__views.tweetlist.addEventListener("itemclick", doclick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;