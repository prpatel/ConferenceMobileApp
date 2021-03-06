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
    this.__controllerPath = "talkdetails";
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
    $.__views.talkdetails = Ti.UI.createWindow({
        barColor: "#699F27",
        layout: "vertical",
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        id: "talkdetails"
    });
    $.__views.talkdetails && $.addTopLevelView($.__views.talkdetails);
    $.__views.banner = Ti.UI.createView({
        height: "100",
        backgroundImage: "/devnexusBackgroundMiddle.png",
        id: "banner"
    });
    $.__views.talkdetails.add($.__views.banner);
    $.__views.bannerImage = Ti.UI.createImageView({
        id: "bannerImage"
    });
    $.__views.banner.add($.__views.bannerImage);
    $.__views.__alloyId30 = Ti.UI.createScrollView({
        layout: "vertical",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        scrollType: "vertical",
        backgroundColor: "#fff",
        disableBounce: true,
        id: "__alloyId30"
    });
    $.__views.talkdetails.add($.__views.__alloyId30);
    $.__views.__alloyId31 = Ti.UI.createView({
        height: "90",
        width: Ti.UI.FILL,
        backgroundColor: "#699F27",
        layout: "vertical",
        id: "__alloyId31"
    });
    $.__views.__alloyId30.add($.__views.__alloyId31);
    $.__views.talktitle = Ti.UI.createLabel({
        font: {
            fontSize: "17",
            fontWeight: "bold"
        },
        top: "3",
        color: "#fff",
        textAlign: "center",
        id: "talktitle"
    });
    $.__views.__alloyId31.add($.__views.talktitle);
    $.__views.time = Ti.UI.createLabel({
        font: {
            fontSize: "17",
            fontWeight: "bold"
        },
        color: "#fff",
        id: "time"
    });
    $.__views.__alloyId31.add($.__views.time);
    $.__views.room = Ti.UI.createLabel({
        font: {
            fontSize: "17",
            fontWeight: "bold"
        },
        bottom: "5",
        color: "#fff",
        id: "room"
    });
    $.__views.__alloyId31.add($.__views.room);
    $.__views.description = Ti.UI.createLabel({
        font: {
            fontSize: "15"
        },
        top: "10",
        left: "10",
        color: "#4F4E4E",
        id: "description"
    });
    $.__views.__alloyId30.add($.__views.description);
    $.__views.speaker = Ti.UI.createLabel({
        top: "10",
        left: "10",
        font: {
            fontSize: "17",
            fontWeight: "bold"
        },
        color: "#4F4E4E",
        id: "speaker"
    });
    $.__views.__alloyId30.add($.__views.speaker);
    $.__views.speakerbio = Ti.UI.createLabel({
        font: {
            fontSize: "15"
        },
        top: "10",
        left: "10",
        color: "#4F4E4E",
        id: "speakerbio"
    });
    $.__views.__alloyId30.add($.__views.speakerbio);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var talkDetails = args.talkDetails;
    $.talktitle.text = talkDetails.title;
    $.time.text = talkDetails.time;
    $.room.text = talkDetails.room;
    $.description.text = talkDetails.description;
    $.bannerImage.image = talkDetails.speakerId ? "https://devnexus.com/s/speakers/" + talkDetails.speakerId + ".jpg" : "https://devnexus.com/assets/img/DevNexus_logo_small.png";
    $.speaker.text = "" !== talkDetails.speaker && null !== talkDetails.speaker && void 0 !== talkDetails.speaker ? String.format(L("about"), talkDetails.speaker) : "";
    $.speakerbio.text = "" !== talkDetails.speakerbio && null !== talkDetails.speakerbio ? talkDetails.speakerbio : "";
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;