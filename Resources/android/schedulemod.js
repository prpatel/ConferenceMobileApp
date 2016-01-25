function loadSchedule() {
    if (!Ti.App.Properties.getBool("scheduleloaded", false)) {
        var filename = "/data/alldays.json";
        console.log("before load:" + filename);
        var f = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, filename);
        var contents = f.read();
        var alldays = JSON.parse(contents);
        var days = [];
        var currentDay = moment("2015-01-01");
        var currentDayNum = 0;
        var currentDayIndex = 0;
        _.each(alldays.scheduleItemList.scheduleItems, function(it) {
            var currentSlot = moment(it.fromTime);
            if (moment(currentSlot).isSame(currentDay, "day")) currentDayIndex++; else {
                currentDay = currentSlot;
                currentDayNum++;
                currentDayIndex = 0;
                days[currentDayNum] = [];
            }
            if ("ADMINISTRATIVE" == it.scheduleItemType || "BREAK" == it.scheduleItemType) days[currentDayNum].push({
                index: currentDayIndex,
                time: currentSlot.format("LT"),
                room: it.room.name,
                title: it.title,
                description: it.title
            }); else {
                var speakerInfo = _.reduce(it.presentation.speakers, function(memo, s) {
                    return memo + s.firstName + " " + s.lastName + "\n";
                }, "");
                var speakerDetails = _.reduce(it.presentation.speakers, function(memo, s) {
                    return memo + s.firstName + " " + s.lastName + "\n" + s.bio + "\n";
                }, "");
                days[currentDayNum].push({
                    index: currentDayIndex,
                    time: currentSlot.format("LT"),
                    room: it.room.name,
                    title: it.presentation.title,
                    speaker: speakerInfo,
                    description: it.presentation.description,
                    speakerbio: speakerDetails,
                    speakerId: it.presentation.speakers[0].id
                });
            }
        });
        for (var key in days) Ti.App.Properties.setObject("day" + key, days[key]);
        Ti.App.Properties.setBool("scheduleloadedloaded", true);
    }
}

function getTalkDetails(day, row) {
    return Ti.App.Properties.getObject(day)[row];
}

function loadTable(tableObject, dayTag) {
    var tableData = [];
    Ti.App.Properties.getObject(dayTag).forEach(function(item, index) {
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
        var activity = evt.source.getActivity();
        var actionbar = activity.actionBar;
        actionbar.title = talkDetails.title;
        "" !== talkDetails.speaker && (actionbar.subtitle = String.format(L("presented_by"), talkDetails.speaker));
        actionbar.displayHomeAsUp = true;
        actionbar.onHomeIconItemSelected = function() {
            evt.source.close();
        };
    });
    Alloy.Globals.tabGroup.activeTab.open(w, {
        animated: true
    });
}

var moment = require("moment.min");

exports.tableClick = tableClick;

exports.getTalkDetails = getTalkDetails;

exports.loadSchedule = loadSchedule;

exports.loadTable = loadTable;