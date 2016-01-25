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
        loadVideos();
    }
    function loadVideos() {
        if (Ti.Network.online) {
            if (0 === $.videolist.sections[0].items.length) {
                $.videolist.sections[0].insertItemsAt(0, [ {
                    template: "loadingtemplate",
                    loading: {
                        text: L("refreshing")
                    }
                } ]);
                require("videomod").refreshList($.videolist);
            }
        } else alert(L("offline_error"));
    }
    function doclick(evt) {
        var section = $.videolist.sections[evt.sectionIndex];
        var item = section.getItemAt(evt.itemIndex);
        openApp({
            appUrl: item.properties.url,
            webUrl: item.properties.url
        });
    }
    function openApp(args) {
        Ti.Platform.openURL(Titanium.Platform.canOpenURL(args.appUrl) ? args.appUrl : args.webUrl);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "videos";
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
    $.__views.video = Ti.UI.createWindow({
        barColor: "#699F27",
        title: L("tab4_title"),
        backgroundColor: "#fff",
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        id: "video"
    });
    $.__views.video && $.addTopLevelView($.__views.video);
    $.__views.__alloyId44 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.REFRESH,
        id: "__alloyId44"
    });
    dorefresh ? $.__views.__alloyId44.addEventListener("click", dorefresh) : __defers["$.__views.__alloyId44!click!dorefresh"] = true;
    $.__views.video.rightNavButton = $.__views.__alloyId44;
    var __alloyId45 = {};
    var __alloyId48 = [];
    var __alloyId50 = {
        type: "Ti.UI.ImageView",
        bindId: "thumb",
        properties: {
            height: 60,
            width: 60,
            top: 5,
            left: 5,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "#cacaca",
            bindId: "thumb"
        }
    };
    __alloyId48.push(__alloyId50);
    var __alloyId52 = {
        type: "Ti.UI.Label",
        bindId: "summary",
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
            bindId: "summary"
        }
    };
    __alloyId48.push(__alloyId52);
    var __alloyId54 = {
        type: "Ti.UI.Label",
        bindId: "author",
        properties: {
            height: Ti.UI.SIZE,
            width: Ti.UI.SIZE,
            top: 5,
            left: 70,
            font: {
                fontSize: 12,
                fontWeight: "bold"
            },
            color: "#000",
            bindId: "author"
        }
    };
    __alloyId48.push(__alloyId54);
    var __alloyId56 = {
        type: "Ti.UI.Label",
        bindId: "duration",
        properties: {
            height: Ti.UI.SIZE,
            width: Ti.UI.SIZE,
            top: 5,
            right: 10,
            font: {
                fontSize: 12,
                fontWeight: "bold"
            },
            color: "#000",
            bindId: "duration"
        }
    };
    __alloyId48.push(__alloyId56);
    var __alloyId47 = {
        properties: {
            height: 100,
            name: "rowtemplate"
        },
        childTemplates: __alloyId48
    };
    __alloyId45["rowtemplate"] = __alloyId47;
    var __alloyId59 = [];
    var __alloyId61 = {
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
    __alloyId59.push(__alloyId61);
    var __alloyId58 = {
        properties: {
            height: 50,
            backgroundColor: "#636363",
            name: "loadingtemplate"
        },
        childTemplates: __alloyId59
    };
    __alloyId45["loadingtemplate"] = __alloyId58;
    $.__views.__alloyId62 = Ti.UI.createListSection({
        name: "notification",
        id: "__alloyId62"
    });
    var __alloyId64 = [];
    __alloyId64.push($.__views.__alloyId62);
    $.__views.__alloyId65 = Ti.UI.createListSection({
        name: "videos",
        id: "__alloyId65"
    });
    __alloyId64.push($.__views.__alloyId65);
    $.__views.videolist = Ti.UI.createListView({
        top: 0,
        backgroundColor: "#0000",
        defaultItemTemplate: "rowtemplate",
        separatorColor: "#cacaca",
        backgroundFocusedColor: "transparent",
        sections: __alloyId64,
        templates: __alloyId45,
        id: "videolist"
    });
    $.__views.video.add($.__views.videolist);
    doclick ? $.__views.videolist.addEventListener("itemclick", doclick) : __defers["$.__views.videolist!itemclick!doclick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    loadVideos();
    __defers["$.__views.__alloyId44!click!dorefresh"] && $.__views.__alloyId44.addEventListener("click", dorefresh);
    __defers["$.__views.videolist!itemclick!doclick"] && $.__views.videolist.addEventListener("itemclick", doclick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;