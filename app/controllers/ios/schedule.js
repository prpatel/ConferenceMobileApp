var args = arguments[0] || {};

function changeday(evt){
	$.scrollableView.currentPage=evt.source.index;
}

function pageChange(evt){
		$.dayoptions.index=evt.source.currentPage;
}

function refreshSchedule() {
	//Alloy.Globals.reloadSchedule();
	// $.scrollableView.close();
	rebuildDayViews();
}

function rebuildDayViews() {

	function success() {
		var day1View = Alloy.createController('day1').getView();
		var day2View = Alloy.createController('day2').getView();
		var day3View = Alloy.createController('day3').getView();
		$.scrollableView.views = [day1View, day2View, day3View];
		$.scrollableView.currentPage=0;
		$.dayoptions.index=0;
	}

	function error() {
		alert('Unable to load schedule from server, check your network connection and try again');
	}

	require('schedulemod').loadScheduleFromServer(success, error);

}
