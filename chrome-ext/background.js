var filter = {urls: ["<all_urls>"]};
var opt_extraInfoSpec = [];
var callback = function(details) {
    alert(details.method + " Request to " + details.url + " at " + details.timeStamp
);
}

chrome.webRequest.onBeforeRequest.addListener(
        callback, filter, opt_extraInfoSpec);
