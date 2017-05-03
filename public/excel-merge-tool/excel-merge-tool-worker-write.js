/**
 * Created by seunggabi on 2017. 4. 15..
 */

importScripts("/lib/cpexcel.js");
importScripts("/lib/jszip.js");
importScripts("/lib/xlsx.js");
importScripts("/lib/workerFakeDOM.js");
importScripts("/lib/jquery.min.js");

importScripts("/excel-merge-tool/excel-merge-tool-config.js");
importScripts("/excel-merge-tool/excel-merge-tool-data.js");
importScripts("/excel-merge-tool/excel-merge-tool-log.js");
importScripts("/excel-merge-tool/excel-merge-tool-statistics.js");
importScripts("/excel-merge-tool/excel-merge-tool-util.js");
importScripts("/excel-merge-tool/excel-merge-tool.js");

function callback(event) {
	var options = event.data.options;
	var binaryFiles = event.data.binaryFiles;
	var binaryFileList = [];

	EMT.TOOL.init(options);
	writeFile = (binaryFiles) => {
		var wbList = EMT.TOOL.readBinaryFiles(binaryFiles);
		postMessage({
			type: "read",
			time: EMT.STATISTICS.getTime(),
		});
		binaryFileList = EMT.TOOL.writeBinaryFile(wbList);
	};
	writeFile(binaryFiles);
	postMessage({
		type: "write",
		binaryFileList: binaryFileList
	});
}

(function() {
	this.onmessage = callback;
})()