function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function dorefresh() {
        console.log("dorefresh");
        console.log("dorefresh");
        loadTweets();
    }
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
        Ti.Platform.openURL(Titanium.Platform.canOpenURL(obj.appUrl) ? obj.appUrl : obj.webUrl);
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
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        id: "conversation"
    });
    $.__views.conversation && $.addTopLevelView($.__views.conversation);
    $.__views.__alloyId1 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.REFRESH,
        id: "__alloyId1"
    });
    dorefresh ? $.__views.__alloyId1.addEventListener("click", dorefresh) : __defers["$.__views.__alloyId1!click!dorefresh"] = true;
    $.__views.conversation.rightNavButton = $.__views.__alloyId1;
    var __alloyId2 = {};
    var __alloyId5 = [];
    var __alloyId7 = {
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
    __alloyId5.push(__alloyId7);
    var __alloyId9 = {
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
    __alloyId5.push(__alloyId9);
    var __alloyId11 = {
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
    __alloyId5.push(__alloyId11);
    var __alloyId13 = {
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
    __alloyId5.push(__alloyId13);
    var __alloyId4 = {
        properties: {
            height: 100,
            name: "rowtemplate"
        },
        childTemplates: __alloyId5
    };
    __alloyId2["rowtemplate"] = __alloyId4;
    var __alloyId16 = [];
    var __alloyId18 = {
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
    __alloyId16.push(__alloyId18);
    var __alloyId15 = {
        properties: {
            height: 50,
            backgroundColor: "#636363",
            name: "loadingtemplate"
        },
        childTemplates: __alloyId16
    };
    __alloyId2["loadingtemplate"] = __alloyId15;
    $.__views.__alloyId19 = Ti.UI.createListSection({
        name: "notification",
        id: "__alloyId19"
    });
    var __alloyId21 = [];
    __alloyId21.push($.__views.__alloyId19);
    $.__views.__alloyId22 = Ti.UI.createListSection({
        name: "tweets",
        id: "__alloyId22"
    });
    __alloyId21.push($.__views.__alloyId22);
    $.__views.tweetlist = Ti.UI.createListView({
        top: 0,
        backgroundColor: "#0000",
        defaultItemTemplate: "rowtemplate",
        separatorColor: "#cacaca",
        backgroundFocusedColor: "transparent",
        sections: __alloyId21,
        templates: __alloyId2,
        id: "tweetlist"
    });
    $.__views.conversation.add($.__views.tweetlist);
    doclick ? $.__views.tweetlist.addEventListener("itemclick", doclick) : __defers["$.__views.tweetlist!itemclick!doclick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    loadTweets();
    __defers["$.__views.__alloyId1!click!dorefresh"] && $.__views.__alloyId1.addEventListener("click", dorefresh);
    __defers["$.__views.tweetlist!itemclick!doclick"] && $.__views.tweetlist.addEventListener("itemclick", doclick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;