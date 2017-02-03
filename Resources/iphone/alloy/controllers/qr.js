function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function success(data) {
        if (void 0 != data && void 0 != data.data) {
            Titanium.Media.vibrate();
            console.log(data);
            storeNewQRScan(data.data);
            alert("Captured contact: " + data.data);
        }
    }
    function cancel() {
        console.log("Cancelled QR capture");
    }
    function scanQRFromCamera(qrCodeWindow, options) {
        console.log("scanQRFromCamera called");
        qrCodeView = qrreader.createQRCodeView(options);
        var view = Titanium.UI.createView({
            borderRadius: 10,
            width: "100%",
            layout: "horizontal",
            height: 60
        });
        var label2 = Ti.UI.createLabel({
            text: "Toggle light",
            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
            left: 20
        });
        var lightToggle = Ti.UI.createSwitch({
            value: false,
            top: 10,
            left: 20,
            height: 50
        });
        lightToggle.addEventListener("change", function(event) {
            console.log("event.value", event.value);
            event.value ? qrCodeView.turnLightOn() : qrCodeView.turnLightOff();
        });
        view.add(label2);
        view.add(lightToggle);
        qrCodeWindow.add(qrCodeView);
        "ipad" === Ti.Platform.osname || void 0 !== options.useFrontCamera && (void 0 == options.useFrontCamera || options.useFrontCamera) || qrCodeWindow.add(view);
        qrCodeView.turnLightOff();
        return [ qrCodeView, view ];
    }
    function storeNewQRScan(data) {
        var parsedvcard = normalizeVcard(vcard.parse(data));
        var savedContactsJson = Ti.App.Properties.getObject("savedContactsJson");
        _.isEmpty(savedContactsJson) && (savedContactsJson = []);
        savedContactsJson.unshift(parsedvcard);
        Ti.App.Properties.setObject("savedContactsJson", savedContactsJson);
        updateTableData();
    }
    function updateTableData() {
        var data = [];
        var savedContactsJson = Ti.App.Properties.getObject("savedContactsJson");
        _.isEmpty(savedContactsJson) ? data.push({
            title: "no contacts saved"
        }) : data = _.map(savedContactsJson, function(i) {
            return {
                title: vcardToCsv(i)
            };
        });
        table.data = data;
    }
    function clearTableData() {
        var data = [];
        var dialog = Ti.UI.createAlertDialog({
            cancel: 1,
            buttonNames: [ "DELETE DATA", "Cancel" ],
            message: "ARE YOU SURE? This will permanently delete the data you have scanned",
            title: "DELETE ALL DATA"
        });
        dialog.addEventListener("click", function(e) {
            if (e.index === e.source.cancel) Ti.API.info("\n\nThe cancel button was clicked"); else {
                Ti.API.info("\ndeleteing all data");
                Ti.App.Properties.setObject("savedContactsJson", data);
                data.push({
                    title: "no contacts saved"
                });
                table.data = data;
            }
        });
        dialog.show();
    }
    function vcardToCsv(vcard) {
        var memo = "";
        _.each(vcard, function(i) {
            memo += i + ",";
        });
        return memo;
    }
    function normalizeVcard(data) {
        var newData = {};
        newData.email = data.email && data.email[0] ? data.email[0].value : "";
        newData.name = separateName(data.n);
        newData.org = data.org;
        newData.title = data.title;
        return newData;
    }
    function separateName(name) {
        var names = name.split(";");
        return names[0] + "," + names[1];
    }
    function emailData() {
        var csvData = "";
        var savedContactsJson = Ti.App.Properties.getObject("savedContactsJson");
        _.isEmpty(savedContactsJson) ? csvData = "no contacts saved" : _.each(savedContactsJson, function(i) {
            csvData += vcardToCsv(i) + "\n";
        });
        console.log("csvData", csvData);
        var root = Ti.Filesystem.getApplicationDataDirectory();
        var file = Ti.Filesystem.getFile(root, "attendeeData-" + moment().format("YYYY-MM-DD-") + ".csv");
        file.write(csvData);
        var emailDialog = Ti.UI.createEmailDialog();
        emailDialog.subject = "DevNexus App Email Data";
        emailDialog.messageBody = "Scanned QR data attachment";
        emailDialog.addAttachment(file);
        emailDialog.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "qr";
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
    $.__views.qrwindow = Ti.UI.createWindow({
        backgroundColor: "#fff",
        barColor: "#699F27",
        title: L("tab4_title"),
        orientationModes: [ Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT ],
        layout: "vertical",
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        id: "qrwindow"
    });
    $.__views.qrwindow && $.addTopLevelView($.__views.qrwindow);
    $.__views.qrview = Ti.UI.createView({
        backgroundColor: "red",
        id: "qrview"
    });
    $.__views.qrwindow.add($.__views.qrview);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var vcard = require("vcard");
    var moment = require("moment.min");
    $.qrview.backgroundColor = "#699F27";
    var qrreader = require("com.acktie.mobile.ios.qr");
    $.qrview.layout = "absolute";
    var clearScannedButton = Ti.UI.createButton({
        title: "Clear data"
    });
    clearScannedButton.addEventListener("click", function() {
        clearTableData();
    });
    var testBtn = Ti.UI.createButton({
        title: "Email data"
    });
    testBtn.addEventListener("click", function() {
        emailData();
    });
    var table = Ti.UI.createTableView({});
    table.addEventListener("click", function(e) {
        alert(JSON.stringify(e.row.title));
    });
    updateTableData();
    var qrcontrolsview = Titanium.UI.createView({
        width: "100%",
        layout: "vertical",
        height: "60%",
        top: 0
    });
    $.qrview.add(qrcontrolsview);
    var tableView = Titanium.UI.createView({
        borderRadius: 10,
        width: "100%",
        layout: "vertical",
        height: "40%",
        bottom: 0
    });
    tableView.add(testBtn);
    tableView.add(clearScannedButton);
    tableView.add(table);
    $.qrview.add(tableView);
    var options = {
        backgroundColor: "black",
        width: "100%",
        height: "85%",
        top: 0,
        left: 0,
        useFrontCamera: false,
        success: success,
        cancel: cancel,
        userControlLight: true
    };
    var qrCodeViewElements;
    $.qrwindow.addEventListener("focus", function() {
        qrCodeViewElements = scanQRFromCamera(qrcontrolsview, options);
        console.log("focus");
        qrCodeViewElements[0].turnLightOff();
        setTimeout(function() {
            qrCodeViewElements[0].turnLightOff();
        }, 200);
    });
    $.qrwindow.addEventListener("blur", function() {
        qrCodeViewElements[0].turnLightOff();
        qrCodeViewElements[0].stop();
        qrcontrolsview.remove(qrCodeViewElements[0]);
        qrcontrolsview.remove(qrCodeViewElements[1]);
        console.log("blur");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;