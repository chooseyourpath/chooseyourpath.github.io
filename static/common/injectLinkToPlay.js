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
//console.log('createLinks.js:customerID=' + result.customerID);
//console.log('createLinks.js:bookID=' + result.bookID);
//console.log('createLinks.js:readerID=' + result.readerID);

//Now add the element to the dom
var a = document.createElement('a');
var textNode = 'Press to hear the book"' + parameter.bookID + '" that is read by:' + parameter.readerID;
var linkText = document.createTextNode(textNode);
a.appendChild(linkText);
a.title = 'click this to play';
var href =
	'./' +
	parameter.customerID +
	'/' +
	parameter.bookID +
	'/' +
	'story.html?' +
	'playbutton' +
	'&reader=' +
	parameter.readerID;
a.href = href;
document.body.appendChild(a);
