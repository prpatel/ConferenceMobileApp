function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
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
    var __alloyId27 = [];
    $.__views.scheduleTab = Alloy.createController("schedule", {
        id: "scheduleTab"
    });
    $.__views.tab1 = Ti.UI.createTab({
        title: L("tab1_title"),
        icon: "images/schedule.png",
        window: $.__views.scheduleTab.getViewEx({
            recurse: true
        }),
        id: "tab1"
    });
    __alloyId27.push($.__views.tab1);
    $.__views.venueTab = Alloy.createController("venue", {
        id: "venueTab"
    });
    $.__views.tab2 = Ti.UI.createTab({
        title: L("tab2_title"),
        icon: "images/venue.png",
        window: $.__views.venueTab.getViewEx({
            recurse: true
        }),
        id: "tab2"
    });
    __alloyId27.push($.__views.tab2);
    $.__views.conversationTab = Alloy.createController("conversation", {
        id: "conversationTab"
    });
    $.__views.tab3 = Ti.UI.createTab({
        title: L("tab3_title"),
        icon: "images/conversation.png",
        window: $.__views.conversationTab.getViewEx({
            recurse: true
        }),
        id: "tab3"
    });
    __alloyId27.push($.__views.tab3);
    $.__views.qr = Alloy.createController("qr", {
        id: "qr"
    });
    $.__views.tab4 = Ti.UI.createTab({
        title: L("tab4_title"),
        icon: "images/videos.png",
        window: $.__views.qr.getViewEx({
            recurse: true
        }),
        id: "tab4"
    });
    __alloyId27.push($.__views.tab4);
    $.__views.index = Ti.UI.createTabGroup({
        tabsTintColor: "#699F27",
        tintColor: "#ffffff",
        tabs: __alloyId27,
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.tabGroup = $.index;
    Alloy.Globals.currentTab = 0;
    $.index.addEventListener("open", function(evt) {
    });
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;