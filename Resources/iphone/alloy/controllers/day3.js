function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function tableclick(evt) {
        var talkDetails = require("schedulemod").getTalkDetails(dayTag, evt.row.rowId);
        require("schedulemod").tableClick(evt, talkDetails, dayTag);
    }
    function tablescroll(evt) {
        evt.cancelBubble = true;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "day3";
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
    $.__views.day3table = Ti.UI.createTableView({
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        id: "day3table"
    });
    $.__views.day3table && $.addTopLevelView($.__views.day3table);
    tableclick ? $.__views.day3table.addEventListener("click", tableclick) : __defers["$.__views.day3table!click!tableclick"] = true;
    tablescroll ? $.__views.day3table.addEventListener("scroll", tablescroll) : __defers["$.__views.day3table!scroll!tablescroll"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var dayTag = "day3";
    require("schedulemod").loadSchedule();
    require("schedulemod").loadTable($.day3table, dayTag);
    __defers["$.__views.day3table!click!tableclick"] && $.__views.day3table.addEventListener("click", tableclick);
    __defers["$.__views.day3table!scroll!tablescroll"] && $.__views.day3table.addEventListener("scroll", tablescroll);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;