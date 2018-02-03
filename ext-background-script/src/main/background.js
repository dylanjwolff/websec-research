import request from "superagent";

var filter = {urls: ["<all_urls>"]};
var opt_extraInfoSpec = [];
var callback = function(details) {
    // Obviously not great to hardcode the ip and port here, but dockerizing a browser that loads an extension is nontrivial
    request.post("http://0.0.0.0:32770")
        .send({ method: details.method, url: details.url, timestamp: details.timeStamp})
        .catch( (reason) => alert("request to server failed with reason: " + reason) );
};

chrome.webRequest.onBeforeRequest.addListener(
    callback, filter, opt_extraInfoSpec);
