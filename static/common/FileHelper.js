{
	/* <script>
    var filePathAndName = "17135.dedlee.tsv";
    var dave = FileHelper.readStringFromFileAtPath(filePathAndName);
    document.getElementById("dedleeSource").innerHTML = dave;
</script> */
}

//load the file from the load file system
//https://stackoverflow.com/questions/13428532/using-a-local-file-as-a-data-source-in-javascript

// function readTextFile(file) {
// 	var rawFile = new XMLHttpRequest();
// 	rawFile.open('GET', file, false);
// 	rawFile.onreadystatechange = function() {
// 		if (rawFile.readyState === 4) {
// 			if (rawFile.status === 200 || rawFile.status == 0) {
// 				var allText = rawFile.responseText;
// 				alert(allText);
// 			}
// 		}
// 	};
// 	rawFile.send(null);
// }

function FileHelper() {}
{
	FileHelper.readStringFromFileAtPath = function(pathOfFileToReadFrom) {
		var request = new XMLHttpRequest();
		request.open('GET', pathOfFileToReadFrom, false);
		request.send(null);
		var returnValue = request.responseText;
		return returnValue;
	};
}
// function FileHelper() {}
// {
// 	const request = async () => {
// 		FileHelper.readStringFromFileAtPath = function(pathOfFileToReadFrom) {
// 			var request = new XMLHttpRequest();
// 			request.open('GET', pathOfFileToReadFrom, false);
// 			request.send(null);
// 			var returnValue = request.responseText;
// 			return returnValue;
// 		};

// 		const response = await fetch(filePathAndName);

// 		if (response.status === 200) {
// 			//console.log("FileHelper.request.if:looks like your file exists");
// 		} else {
// 			// this else isn't needed but you can put it here or in the catch block
// 			console.error(
// 				'FileHelper.request.else:response.status!=== 200-fail' + filePathAndName + ' file likely does not exist'
// 			);
// 		}
// 	};
// 	request();
// }
