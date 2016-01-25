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
        console.log(talkDetails);
        require("schedulemod").tableClick(evt, talkDetails, dayTag);
    }
    function tablescroll(evt) {
        evt.cancelBubble = true;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "day1";
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
    $.__views.day1table = Ti.UI.createTableView({
        separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
        id: "day1table"
    });
    $.__views.day1table && $.addTopLevelView($.__views.day1table);
    tableclick ? $.__views.day1table.addEventListener("click", tableclick) : __defers["$.__views.day1table!click!tableclick"] = true;
    tablescroll ? $.__views.day1table.addEventListener("scroll", tablescroll) : __defers["$.__views.day1table!scroll!tablescroll"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var dayTag = "day1";
    require("schedulemod").loadSchedule();
    require("schedulemod").loadTable($.day1table, dayTag);
    __defers["$.__views.day1table!click!tableclick"] && $.__views.day1table.addEventListener("click", tableclick);
    __defers["$.__views.day1table!scroll!tablescroll"] && $.__views.day1table.addEventListener("scroll", tablescroll);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;