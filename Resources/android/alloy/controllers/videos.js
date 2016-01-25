function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
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
        Ti.Platform.openURL(args.webUrl);
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
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.UPSIDE_PORTRAIT ],
        id: "video"
    });
    $.__views.video && $.addTopLevelView($.__views.video);
    var __alloyId38 = {};
    var __alloyId41 = [];
    var __alloyId43 = {
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
    __alloyId41.push(__alloyId43);
    var __alloyId45 = {
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
    __alloyId41.push(__alloyId45);
    var __alloyId47 = {
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
    __alloyId41.push(__alloyId47);
    var __alloyId49 = {
        type: "Ti.UI.Label",
        bindId: "duration",
        properties: {
            height: Ti.UI.SIZE,
            width: Ti.UI.SIZE,
            top: 5,
            right: 10,
            font: {
                fontSize: 12
            },
            color: "#000",
            bindId: "duration"
        }
    };
    __alloyId41.push(__alloyId49);
    var __alloyId40 = {
        properties: {
            height: 100,
            name: "rowtemplate"
        },
        childTemplates: __alloyId41
    };
    __alloyId38["rowtemplate"] = __alloyId40;
    var __alloyId52 = [];
    var __alloyId54 = {
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
    __alloyId52.push(__alloyId54);
    var __alloyId51 = {
        properties: {
            height: 50,
            backgroundColor: "#636363",
            name: "loadingtemplate"
        },
        childTemplates: __alloyId52
    };
    __alloyId38["loadingtemplate"] = __alloyId51;
    $.__views.__alloyId55 = Ti.UI.createListSection({
        name: "notification",
        id: "__alloyId55"
    });
    var __alloyId57 = [];
    __alloyId57.push($.__views.__alloyId55);
    $.__views.__alloyId58 = Ti.UI.createListSection({
        name: "videos",
        id: "__alloyId58"
    });
    __alloyId57.push($.__views.__alloyId58);
    $.__views.videolist = Ti.UI.createListView({
        top: 0,
        backgroundColor: "#0000",
        defaultItemTemplate: "rowtemplate",
        separatorColor: "#cacaca",
        backgroundFocusedColor: "transparent",
        sections: __alloyId57,
        templates: __alloyId38,
        id: "videolist"
    });
    $.__views.video.add($.__views.videolist);
    doclick ? $.__views.videolist.addEventListener("itemclick", doclick) : __defers["$.__views.videolist!itemclick!doclick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    loadVideos();
    __defers["$.__views.videolist!itemclick!doclick"] && $.__views.videolist.addEventListener("itemclick", doclick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;