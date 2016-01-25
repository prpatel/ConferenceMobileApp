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
    this.__controllerPath = "schedule";
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
    $.__views.schedule = Ti.UI.createWindow({
        backgroundColor: "#fff",
        barColor: "#699F27",
        title: L("tab1_title"),
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT, Ti.UI.UPSIDE_PORTRAIT ],
        layout: "vertical",
        id: "schedule"
    });
    $.__views.schedule && $.addTopLevelView($.__views.schedule);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var tabs = require("com.navid.tabs");
    var tabs = tabs.createPagerTabs({
        current: 0,
        tab: {
            indicatorColor: Alloy.Globals.viewPager.indicatorColor,
            backgroundColor: Alloy.Globals.viewPager.backgroundColor,
            alignment: tabs.ALIGNMENT_LEFT,
            shouldExpand: true,
            color: Alloy.Globals.viewPager.color,
            upperCase: Alloy.Globals.viewPager.upperCase
        },
        views: [ {
            title: L("day1_caption"),
            view: Alloy.createController("day1").getView()
        }, {
            title: L("day2_caption"),
            view: Alloy.createController("day2").getView()
        }, {
            title: L("day3_caption"),
            view: Alloy.createController("day3").getView()
        } ]
    });
    $.schedule.add(tabs);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;