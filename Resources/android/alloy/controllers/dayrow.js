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
    this.__controllerPath = "dayrow";
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
    $.__views.row = Ti.UI.createTableViewRow({
        id: "row",
        rowId: ""
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.__alloyId22 = Ti.UI.createView({
        height: 100,
        id: "__alloyId22"
    });
    $.__views.row.add($.__views.__alloyId22);
    $.__views.__alloyId23 = Ti.UI.createView({
        width: "40%",
        left: "0",
        top: "5",
        layout: "vertical",
        id: "__alloyId23"
    });
    $.__views.__alloyId22.add($.__views.__alloyId23);
    $.__views.time = Ti.UI.createLabel({
        left: "5",
        top: "0",
        color: "#000",
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        text: "8am-9am",
        id: "time"
    });
    $.__views.__alloyId23.add($.__views.time);
    $.__views.location = Ti.UI.createLabel({
        left: "5",
        top: "8",
        color: "#000",
        font: {
            fontSize: 14,
            fontStyle: "italic"
        },
        text: "Main Room",
        id: "location"
    });
    $.__views.__alloyId23.add($.__views.location);
    $.__views.__alloyId24 = Ti.UI.createView({
        width: "60%",
        right: "5",
        backgroundColor: "#efefef",
        top: "5",
        layout: "vertical",
        id: "__alloyId24"
    });
    $.__views.__alloyId22.add($.__views.__alloyId24);
    $.__views.talkname = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        color: "#000",
        left: "8",
        right: "8",
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        text: "Building a conference app",
        id: "talkname"
    });
    $.__views.__alloyId24.add($.__views.talkname);
    $.__views.speaker = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        color: "#000",
        left: "8",
        right: "8",
        font: {
            fontSize: 13,
            fontStyle: "italic"
        },
        text: "Ricardo Alcocer",
        id: "speaker"
    });
    $.__views.__alloyId24.add($.__views.speaker);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.row.rowId = args.index;
    $.time.text = args.time;
    $.location.text = args.room;
    $.talkname.text = args.title;
    $.speaker.text = args.speaker;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;