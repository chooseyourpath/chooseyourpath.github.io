//pattern from https://stackoverflow.com/questions/5292372/how-to-pass-parameters-to-a-script-tag
function getSyncScriptParams() {
	var scripts = document.getElementsByTagName('script');
	var lastScript = scripts[scripts.length - 1];
	var scriptName = lastScript;
	return {
		customerID: scriptName.getAttribute('data-customerID'),
		bookID: scriptName.getAttribute('data-bookID'),
		readerID: scriptName.getAttribute('data-readerID')
	};
}
var parameter = getSyncScriptParams();

////verify via the log that the paramaters are correct
//console.log('createLinks.js:customerID=' + parameter.customerID);
//console.log('createLinks.js:bookID=' + parameter.bookID);
//console.log('createLinks.js:readerID=' + parameter.readerID);

//now create an element
var a = document.createElement('a');
var textNode = 'Press to record the book "' + parameter.bookID + '" with the Reader named ' + parameter.readerID;
var linkText = document.createTextNode(textNode);
a.appendChild(linkText);
a.title = 'click this to record'; //show this on hover
var href =
	'./' +
	parameter.customerID +
	'/' +
	parameter.bookID +
	'/' +
	'story.html?' +
	'recordbutton' +
	'&customerID=' +
	parameter.customerID +
	'&bookID=' +
	parameter.bookID +
	'&reader=' +
	parameter.readerID;
a.href = href;
document.body.appendChild(a);
