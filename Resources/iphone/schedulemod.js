function loadSchedule(serverJsonData) {
    if (serverJsonData || !Ti.App.Properties.getBool("scheduleloaded")) {
        var contents;
        if (serverJsonData) {
            console.log("loading from server");
            contents = serverJsonData;
        } else {
            var filename = "/data/alldays.json";
            console.log("before load:" + filename);
            var f = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, filename);
            contents = f.read();
        }
        var alldays = JSON.parse(contents);
        var days = [];
        var currentDay = moment("2015-01-01");
        var currentDayNum = 0;
        var currentDayIndex = 0;
        _.each(alldays.scheduleItems, function(it) {
            var currentSlot = moment(it.fromTime).add(5, "h");
            if (moment(currentSlot).isSame(currentDay, "day")) currentDayIndex++; else {
                currentDay = currentSlot;
                currentDayNum++;
                currentDayIndex = 0;
                days[currentDayNum] = [];
            }
            if ("ADMINISTRATIVE" == it.scheduleItemType || "BREAK" == it.scheduleItemType || "REGISTRATION" == it.scheduleItemType) days[currentDayNum].push({
                index: currentDayIndex,
                time: currentSlot.format("LT"),
                room: it.room.name,
                title: it.title,
                description: it.title
            }); else if (null == it.presentation) {
                var tempTitle;
                tempTitle = it.title ? it.title : "TBD";
                days[currentDayNum].push({
                    index: currentDayIndex,
                    time: currentSlot.format("LT"),
                    room: it.room.name,
                    title: tempTitle,
                    speaker: speakerInfo,
                    description: "TBD",
                    speakerbio: speakerDetails,
                    speakerId: speakerId
                });
            } else {
                var speakerInfo = _.reduce(it.presentation.speakers, function(memo, s) {
                    return memo + s.firstName + " " + s.lastName + "\n";
                }, "");
                var speakerDetails = _.reduce(it.presentation.speakers, function(memo, s) {
                    return memo + s.firstName + " " + s.lastName + "\n" + s.bio + "\n";
                }, "");
                if (void 0 == it.presentation.speakers) var speakerId = "TBD"; else var speakerId = it.presentation.speakers[0].id;
                days[currentDayNum].push({
                    index: currentDayIndex,
                    time: currentSlot.format("LT"),
                    room: it.room.name,
                    title: it.presentation.title,
                    speaker: speakerInfo,
                    description: it.presentation.description,
                    speakerbio: speakerDetails,
                    speakerId: speakerId
                });
            }
        });
        for (var key in days) Ti.App.Properties.setObject("day" + key, days[key]);
        Ti.App.Properties.setBool("scheduleloaded", true);
    }
}

function getTalkDetails(day, row) {
    return Ti.App.Properties.getObject(day)[row];
}

function loadTable(tableObject, dayTag) {
    var tableData = [];
    var baseTime = "first";
    Ti.App.Properties.getObject(dayTag).forEach(function(item, index) {
        if (baseTime == item.time) ; else {
            "first" !== baseTime && tableData.push(Ti.UI.createTableViewRow({
                height: 5,
                backgroundColor: "#CE741D"
            }));
            baseTime = item.time;
        }
        item.index = index;
        var row = Alloy.createController("dayrow", item).getView();
        tableData.push(row);
    });
    tableObject.setData(tableData);
}

function tableClick(evt, talkDetails, dayTag) {
    var w = Alloy.createController("talkdetails", {
        rowId: evt.row.rowId,
        talkDetails: talkDetails,
        day: dayTag
    }).getView();
    w.addEventListener("open", function(evt) {
    });
    Alloy.Globals.tabGroup.activeTab.open(w, {
        animated: true
    });
}

function loadScheduleFromServer(success, error) {
    var http = Ti.Network.createHTTPClient({
        onload: function() {
            loadSchedule(this.responseText);
            success();
        },
        onerror: error
    });
    http.open("GET", "https://devnexus.com/api/schedule.json");
    http.send();
}

var moment = require("moment.min");

exports.tableClick = tableClick;

exports.getTalkDetails = getTalkDetails;

exports.loadSchedule = loadSchedule;

exports.loadTable = loadTable;

exports.loadScheduleFromServer = loadScheduleFromServer;