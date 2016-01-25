function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function clickmap() {
        Ti.Platform.openURL("https://maps.google.com/maps?q=" + encodeURIComponent(Alloy.CFG.venueAddress));
    }
    function clickcall() {
        Ti.Platform.canOpenURL("tel://" + Alloy.CFG.venuePhoneNumber) ? Ti.Platform.openURL("tel://" + Alloy.CFG.venuePhoneNumber) : alert(L("no_phone"));
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "venue";
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
    $.__views.venue = Ti.UI.createWindow({
        barColor: "#699F27",
        backgroundColor: "#fff",
        title: L("tab2_title"),
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        id: "venue"
    });
    $.__views.venue && $.addTopLevelView($.__views.venue);
    $.__views.__alloyId32 = Ti.UI.createScrollView({
        layout: "vertical",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        scrollType: "vertical",
        backgroundColor: "#fff",
        disableBounce: true,
        id: "__alloyId32"
    });
    $.__views.venue.add($.__views.__alloyId32);
    $.__views.__alloyId33 = Ti.UI.createView({
        backgroundColor: "#e2e2e2",
        height: 60,
        width: Ti.UI.FILL,
        id: "__alloyId33"
    });
    $.__views.__alloyId32.add($.__views.__alloyId33);
    $.__views.__alloyId34 = Ti.UI.createLabel({
        text: L("venue_title"),
        left: 10,
        right: 10,
        width: Ti.UI.FILL,
        font: {
            fontWeight: "bold",
            fontSize: 15
        },
        color: "#4F4E4E",
        id: "__alloyId34"
    });
    $.__views.__alloyId33.add($.__views.__alloyId34);
    $.__views.__alloyId35 = Ti.UI.createView({
        backgroundImage: "/gwcc.jpg",
        height: 160,
        id: "__alloyId35"
    });
    $.__views.__alloyId32.add($.__views.__alloyId35);
    $.__views.__alloyId36 = Ti.UI.createView({
        height: 30,
        layout: "horizontal",
        top: 10,
        id: "__alloyId36"
    });
    $.__views.__alloyId32.add($.__views.__alloyId36);
    $.__views.__alloyId37 = Ti.UI.createImageView({
        left: 10,
        width: 20,
        right: 10,
        height: 20,
        image: "/mapicon.png",
        id: "__alloyId37"
    });
    $.__views.__alloyId36.add($.__views.__alloyId37);
    $.__views.maptext = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        color: "#4F4E4E",
        id: "maptext"
    });
    $.__views.__alloyId36.add($.__views.maptext);
    clickmap ? $.__views.maptext.addEventListener("click", clickmap) : __defers["$.__views.maptext!click!clickmap"] = true;
    $.__views.__alloyId38 = Ti.UI.createView({
        height: 30,
        layout: "horizontal",
        bottom: 10,
        id: "__alloyId38"
    });
    $.__views.__alloyId32.add($.__views.__alloyId38);
    $.__views.__alloyId39 = Ti.UI.createImageView({
        left: 10,
        width: 20,
        right: 10,
        height: 20,
        image: "/phoneicon.png",
        id: "__alloyId39"
    });
    $.__views.__alloyId38.add($.__views.__alloyId39);
    $.__views.phonetext = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        color: "#4F4E4E",
        id: "phonetext"
    });
    $.__views.__alloyId38.add($.__views.phonetext);
    clickcall ? $.__views.phonetext.addEventListener("click", clickcall) : __defers["$.__views.phonetext!click!clickcall"] = true;
    $.__views.__alloyId40 = Ti.UI.createLabel({
        text: L("venue_description"),
        left: 10,
        right: 10,
        width: Ti.UI.FILL,
        font: {
            fontSize: 14
        },
        color: "#4F4E4E",
        id: "__alloyId40"
    });
    $.__views.__alloyId32.add($.__views.__alloyId40);
    $.__views.__alloyId41 = Ti.UI.createView({
        id: "__alloyId41"
    });
    $.__views.__alloyId32.add($.__views.__alloyId41);
    $.__views.sitemap300 = Ti.UI.createImageView({
        id: "sitemap300"
    });
    $.__views.__alloyId41.add($.__views.sitemap300);
    $.__views.__alloyId42 = Ti.UI.createView({
        id: "__alloyId42"
    });
    $.__views.__alloyId32.add($.__views.__alloyId42);
    $.__views.sitemap400 = Ti.UI.createImageView({
        id: "sitemap400"
    });
    $.__views.__alloyId42.add($.__views.sitemap400);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    $.maptext.text = Alloy.CFG.venueAddress;
    $.phonetext.text = Alloy.CFG.venuePhoneNumber;
    $.sitemap300.image = "/sitemap300.png";
    $.sitemap400.image = "/sitemap400.png";
    __defers["$.__views.maptext!click!clickmap"] && $.__views.maptext.addEventListener("click", clickmap);
    __defers["$.__views.phonetext!click!clickcall"] && $.__views.phonetext.addEventListener("click", clickcall);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;