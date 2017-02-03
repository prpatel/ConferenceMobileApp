var args = arguments[0] || {};

$.maptext.text=Alloy.CFG.venueAddress;
$.phonetext.text=Alloy.CFG.venuePhoneNumber;
$.sitemap300.top=30;
$.sitemap300.image = "/sitemap300.png";
$.sitemap400.image = "/sitemap400.png";
function clickmap(evt){
	Ti.Platform.openURL('https://www.google.com/maps/place/Georgia+World+Congress+Center,+Building+A/@33.7585927,-84.3982873,17z/data=!3m1!4b1!4m5!3m4!1s0x88f5038001a068b7:0xa1241c70ef012961!8m2!3d33.7585927!4d-84.3960933');
}

function clickcall(evt){
	if (OS_IOS){
		// canOpenURL is iOS only
		if (Ti.Platform.canOpenURL('tel://' + Alloy.CFG.venuePhoneNumber)){
			Ti.Platform.openURL('tel://' + Alloy.CFG.venuePhoneNumber);
		}else{
			alert(L('no_phone'));
		}
	}else{
		Ti.Platform.openURL('tel://' + Alloy.CFG.venuePhoneNumber);
	}
}
