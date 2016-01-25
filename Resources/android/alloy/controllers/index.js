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
    this.__controllerPath = "index";
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
    var __alloyId25 = [];
    $.__views.scheduleTab = Alloy.createController("schedule", {
        id: "scheduleTab"
    });
    $.__views.tab1 = Ti.UI.createTab({
        icon: "/images/schedule.png",
        window: $.__views.scheduleTab.getViewEx({
            recurse: true
        }),
        id: "tab1"
    });
    __alloyId25.push($.__views.tab1);
    $.__views.venueTab = Alloy.createController("venue", {
        id: "venueTab"
    });
    $.__views.tab2 = Ti.UI.createTab({
        icon: "/images/venue.png",
        window: $.__views.venueTab.getViewEx({
            recurse: true
        }),
        id: "tab2"
    });
    __alloyId25.push($.__views.tab2);
    $.__views.conversationTab = Alloy.createController("conversation", {
        id: "conversationTab"
    });
    $.__views.tab3 = Ti.UI.createTab({
        icon: "/images/conversation.png",
        window: $.__views.conversationTab.getViewEx({
            recurse: true
        }),
        id: "tab3"
    });
    __alloyId25.push($.__views.tab3);
    $.__views.index = Ti.UI.createTabGroup({
        tabs: __alloyId25,
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.tabGroup = $.index;
    Alloy.Globals.currentTab = 0;
    $.index.addEventListener("open", function(evt) {
        var activity = evt.source.getActivity();
        var actionbar = activity.actionBar;
        actionbar.title = L("app_title");
        activity.onCreateOptionsMenu = function(e) {
            var item, menu;
            menu = e.menu;
            menu.clear();
            switch (Alloy.Globals.currentTab) {
              case 2:
                item = e.menu.add({
                    title: L("refresh"),
                    showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
                    icon: "/images/refresh.png"
                });
                item.addEventListener("click", function() {
                    if (Ti.Network.online) {
                        if (0 === $.conversationTab.tweetlist.sections[0].items.length) {
                            $.conversationTab.tweetlist.sections[0].insertItemsAt(0, [ {
                                template: "loadingtemplate",
                                loading: {
                                    text: L("refreshing")
                                }
                            } ]);
                            require("conversationmod").refreshList($.conversationTab.tweetlist);
                        }
                    } else alert(L("offline_error"));
                });
                break;

              case 3:
                item = e.menu.add({
                    title: L("refresh"),
                    showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS,
                    icon: "/images/refresh.png"
                });
                item.addEventListener("click", function() {
                    if (Ti.Network.online) {
                        if (0 === $.videosTab.videolist.sections[0].items.length) {
                            $.videosTab.videolist.sections[0].insertItemsAt(0, [ {
                                template: "loadingtemplate",
                                loading: {
                                    text: L("refreshing")
                                }
                            } ]);
                            require("videomod").refreshList($.videosTab.videolist);
                        }
                    } else alert(L("offline_error"));
                });
            }
        };
        Alloy.Globals.tabGroup.addEventListener("focus", function(evt) {
            if ("undefined" != typeof evt.index) {
                activity.invalidateOptionsMenu();
                Alloy.Globals.currentTab = evt.index;
            }
        });
    });
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;