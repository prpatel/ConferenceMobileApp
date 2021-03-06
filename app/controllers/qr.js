var args = arguments[0] || {};
var vcard = require('vcard');
var moment = require('moment.min');
$.qrview.backgroundColor = '#699F27'
var qrreader = require('com.acktie.mobile.ios.qr');
$.qrview.layout = 'absolute';
// $.qrview.height = '50%';

function success(data) {
	if (data != undefined && data.data != undefined) {
		Titanium.Media.vibrate();
    console.log(data);
		storeNewQRScan(data.data);
		alert('Captured contact: ' + data.data);
	}
};

function cancel() {
	console.log("Cancelled QR capture");
};

// Only used with scanning from photo gallery
function error() {
	alert("error");
};

function scanQRFromCamera(qrCodeWindow, options) {
	console.log('scanQRFromCamera called')
	qrCodeView = qrreader.createQRCodeView(options);

	var view = Titanium.UI.createView({
	   borderRadius:10,
	   width:'100%',
		 layout: 'horizontal',
		 height: 60
	});

	var label2 = Ti.UI.createLabel({
  text: 'Toggle light',
  textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	left: 20,
});

	var lightToggle = Ti.UI.createSwitch({
		value : false,
		top : 10,
		left : 20,
		height: 50
	});

	lightToggle.addEventListener('change', function(event) {
		console.log('event.value', event.value)
		if (event.value) {
			qrCodeView.turnLightOn();
		} else {
			qrCodeView.turnLightOff();
		}
	})

	view.add(label2);
	view.add(lightToggle);
	qrCodeWindow.add(qrCodeView);
	if (Ti.Platform.osname !== 'ipad' && (options.useFrontCamera === undefined || (options.useFrontCamera != undefined && !options.useFrontCamera))) {
		qrCodeWindow.add(view);
	}
	qrCodeView.turnLightOff();
	return [qrCodeView, view];
}

// userControlLight : false
var clearScannedButton = Ti.UI.createButton({
	title: 'Clear data',
	// left: 20
})

clearScannedButton.addEventListener('click',function(e) {
	 clearTableData();
});
var testBtn = Ti.UI.createButton({
  title: 'Email data',
	// left: 20
});
testBtn.addEventListener('click',function(e) {
  //  Titanium.API.info("You clicked the button");
  //  var data = "BEGIN:VCARD\nN:Patel;Pratik\nEMAIL:pratik.r.patel@gmail.com\nORG:ORGANIZER\nTITLE:Sponsor\nEND:VCARD";
	// BEGIN:VCARD\nVERSION:2.1\nN:Patel;Pratik\nFN:Pratik Patel\nORG:AJUG\nTITLE:\nEMAIL;PREF;INTERNET:pratik.r.patel@gmail.com\nEND:VCARD
	 //
	//  storeNewQRScan(data);
	 emailData();
});

function storeNewQRScan(data) {
	var parsedvcard = normalizeVcard(vcard.parse(data));
 //  console.log("Names", parsedvcard);

	var savedContactsJson = Ti.App.Properties.getObject('savedContactsJson');
 //  console.log("Names", savedContactsJson);
	if (_.isEmpty(savedContactsJson)) {
	 savedContactsJson = [];
	}
	savedContactsJson.unshift(parsedvcard);
	Ti.App.Properties.setObject('savedContactsJson', savedContactsJson);
	updateTableData();
}

function updateTableData() {
	var data = [];
	// Ti.App.Properties.setObject('givenName', 'Paul');
	var savedContactsJson = Ti.App.Properties.getObject('savedContactsJson');
	if (_.isEmpty(savedContactsJson)) {
		data.push({'title':'no contacts saved'});
	} else {
		data =  _.map(savedContactsJson, function(i) {
			return ({'title': vcardToCsv(i)})
		});
	}
	// console.log("savedContactsJson", savedContactsJson);
	table.data = data;
}

function clearTableData() {
	var data = [];
	// Ti.App.Properties.setObject('givenName', 'Paul');

	var dialog = Ti.UI.createAlertDialog({
    cancel: 1,
    buttonNames: ['DELETE DATA', 'Cancel'],
    message: 'ARE YOU SURE? This will permanently delete the data you have scanned',
    title: 'DELETE ALL DATA'
  });
  dialog.addEventListener('click', function(e){
    if (e.index === e.source.cancel){
      Ti.API.info('\n\nThe cancel button was clicked');
    } else {
			Ti.API.info('\n\deleteing all data');
			Ti.App.Properties.setObject('savedContactsJson', data);
			data.push({'title':'no contacts saved'});
			table.data = data;
		}

  });
  dialog.show();
}

var table = Ti.UI.createTableView({

});

table.addEventListener('click', function(e) {
	alert(JSON.stringify(e.row.title));
})

// var parsedvcard = vcard.parse(data);
function vcardToCsv(vcard) {
	var memo = "";
	_.each(vcard, function(i) {
		memo += i + ",";
	})
	return memo;
}

function normalizeVcard(data) {
  var newData = {};
	//
	if (data.email) {
		if (data.email[0]) {
				newData.email = data.email[0].value
		} else {
			  newData.email = "";
		}
	} else {
		newData.email = "";
	}
  newData.name = separateName(data.n);
  newData.org = data.org;
  newData.title = data.title;
  return newData;
}

function separateName(name) {
	var names = name.split(";");
	return names[0] + ','+names[1];
}

function emailData() {
	var csvData = "";
	var savedContactsJson = Ti.App.Properties.getObject('savedContactsJson');
	if (_.isEmpty(savedContactsJson)) {
		csvData = 'no contacts saved';
	} else {
		_.each(savedContactsJson, function(i) {
			 	csvData += vcardToCsv(i) + "\n";
		});
	}

	console.log('csvData', csvData);

	var root = Ti.Filesystem.getApplicationDataDirectory();
	var file = Ti.Filesystem.getFile(root, 'attendeeData-' + moment().format('YYYY-MM-DD-') + '.csv');
	file.write(csvData);


	var emailDialog = Ti.UI.createEmailDialog()
	emailDialog.subject = "DevNexus App Email Data";
	emailDialog.messageBody = "Scanned QR data attachment";
	emailDialog.addAttachment(file);
	emailDialog.open();
}

updateTableData();
var qrcontrolsview = Titanium.UI.createView({
	 width:'100%',
	 layout: 'vertical',
	 height: '60%',
	 top:0
});
$.qrview.add(qrcontrolsview);
var tableView = Titanium.UI.createView({
	 borderRadius:10,
	 width:'100%',
	 layout: 'vertical',
	 height: '40%',
	 bottom: 0
});
tableView.add(testBtn);
tableView.add(clearScannedButton);
tableView.add(table);
$.qrview.add(tableView);
var options = {
		backgroundColor : 'black',
		width : '100%',
		height : '85%',
		top : 0,
		left : 0,
		useFrontCamera : false,
		success : success,
		cancel : cancel,
		userControlLight: true
	};

var qrCodeViewElements;
$.qrwindow.addEventListener('focus', function(){
	qrCodeViewElements = scanQRFromCamera(qrcontrolsview, options);
	console.log('focus');
		qrCodeViewElements[0].turnLightOff();
	setTimeout(function() {
			qrCodeViewElements[0].turnLightOff();
	}, 200)
});
$.qrwindow.addEventListener('blur', function(){
	qrCodeViewElements[0].turnLightOff();
	qrCodeViewElements[0].stop();
	qrcontrolsview.remove(qrCodeViewElements[0]);
	qrcontrolsview.remove(qrCodeViewElements[1]);
	console.log('blur');
});
