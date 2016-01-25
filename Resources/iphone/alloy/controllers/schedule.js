function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function changeday(evt) {
        $.scrollableView.currentPage = evt.source.index;
    }
    function pageChange(evt) {
        $.dayoptions.index = evt.source.currentPage;
    }
    function refreshSchedule() {
        rebuildDayViews();
    }
    function rebuildDayViews() {
        function success() {
            var day1View = Alloy.createController("day1").getView();
            var day2View = Alloy.createController("day2").getView();
            var day3View = Alloy.createController("day3").getView();
            $.scrollableView.views = [ day1View, day2View, day3View ];
            $.scrollableView.currentPage = 0;
            $.dayoptions.index = 0;
        }
        function error() {
            alert("Unable to load schedule from server, check your network connection and try again");
        }
        require("schedulemod").loadScheduleFromServer(success, error);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "schedule";
    if (arguments[0]) {
        var __parentSymbol = __processArg(arguments[0], "__parentSymbol");
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
    $.__views.schedule = Ti.UI.createWindow({
        backgroundColor: "#fff",
        barColor: "#699F27",
        title: L("tab1_title"),
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        layout: "vertical",
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        id: "schedule"
    });
    $.__views.schedule && $.addTopLevelView($.__views.schedule);
    $.__views.__alloyId68 = Ti.UI.createButton({
        title: "Refresh",
        id: "__alloyId68"
    });
    refreshSchedule ? $.__views.__alloyId68.addEventListener("click", refreshSchedule) : __defers["$.__views.__alloyId68!click!refreshSchedule"] = true;
    $.__views.schedule.rightNavButton = $.__views.__alloyId68;
    var __alloyId70 = [];
    var __alloyId74 = {
        title: L("day1_caption")
    };
    __alloyId70.push(__alloyId74);
    var __alloyId75 = {
        title: L("day2_caption")
    };
    __alloyId70.push(__alloyId75);
    var __alloyId76 = {
        title: L("day3_caption")
    };
    __alloyId70.push(__alloyId76);
    $.__views.dayoptions = Ti.UI.iOS.createTabbedBar({
        backgroundColor: "#699F27",
        top: 5,
        bottom: 5,
        height: 25,
        width: 200,
        index: 0,
        labels: __alloyId70,
        id: "dayoptions"
    });
    $.__views.schedule.add($.__views.dayoptions);
    changeday ? $.__views.dayoptions.addEventListener("click", changeday) : __defers["$.__views.dayoptions!click!changeday"] = true;
    var __alloyId77 = [];
    $.__views.__alloyId78 = Alloy.createController("day1", {
        id: "__alloyId78",
        __parentSymbol: __parentSymbol
    });
    __alloyId77.push($.__views.__alloyId78.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId79 = Alloy.createController("day2", {
        id: "__alloyId79",
        __parentSymbol: __parentSymbol
    });
    __alloyId77.push($.__views.__alloyId79.getViewEx({
        recurse: true
    }));
    $.__views.__alloyId80 = Alloy.createController("day3", {
        id: "__alloyId80",
        __parentSymbol: __parentSymbol
    });
    __alloyId77.push($.__views.__alloyId80.getViewEx({
        recurse: true
    }));
    $.__views.scrollableView = Ti.UI.createScrollableView({
        showPagingControl: false,
        scrollingEnabled: true,
        views: __alloyId77,
        id: "scrollableView"
    });
    $.__views.schedule.add($.__views.scrollableView);
    pageChange ? $.__views.scrollableView.addEventListener("scroll", pageChange) : __defers["$.__views.scrollableView!scroll!pageChange"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    __defers["$.__views.__alloyId68!click!refreshSchedule"] && $.__views.__alloyId68.addEventListener("click", refreshSchedule);
    __defers["$.__views.dayoptions!click!changeday"] && $.__views.dayoptions.addEventListener("click", changeday);
    __defers["$.__views.scrollableView!scroll!pageChange"] && $.__views.scrollableView.addEventListener("scroll", pageChange);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;