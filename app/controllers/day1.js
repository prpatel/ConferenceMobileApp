var args = arguments[0] || {};
var dayTag="day1";

require('schedulemod').loadSchedule();
require('schedulemod').loadTable($.day1table,dayTag);

function tableclick(evt){
  var talkDetails=require('schedulemod').getTalkDetails(dayTag,evt.row.rowId);
  console.log('tableclick from controller')
  require('schedulemod').tableClick(evt,talkDetails,dayTag);
}


function tablescroll(evt){
  evt.cancelBubble=true;
}
