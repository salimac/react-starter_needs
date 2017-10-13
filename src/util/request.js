import React from "react";
import store from "../main";
import service from "../services";
import renderHTML from "./renderHTML";
const request = require("superagent");
const defaultAjaxTimeout = 30000;
//const cookie = require("cookie");
request.Request.prototype.finish = function (successCallback, handleLoader = true, handleAppError = true, httpErrorCallback) {
    // this replaces superagent's .end() function to include our custom error handling (see above)
    this.end((err,res)=>{
        if (err || res.body.error) {
            store.dispatch(triggerNotification(store.dispatch, err || res.body.error));
        } else if (res.body) {
            successCallback(res);
        }
    });
};

request.Request.prototype.settingFinish = function (callback) {
    // this replaces superagent's .end() function to include our custom error handling (see above)
    this.end((err,res)=>{
        callback(err,res);
    });
};

request.Request.prototype.finalSend = request.Request.prototype.send;

request.Request.prototype.send = function (postParams) {
    return this.finalSend(postParams);
};
var requestWrapper = function(method) {
    // this is here so that we can append the .timeout call to all of our ajax requests with the default value.
    return function(url ,handleLoader = true, timeOut = 2400000, tokens) {
            return request[method](service.baseURL + url)
            .type("form")
            .timeout(timeOut);
    };
};

export default {
    get: requestWrapper("get"),
    put: requestWrapper("put"),
    post: requestWrapper("post"),
    del: requestWrapper("del")
};

function triggerNotification(dispatch, error) {
    const notificationOpts = {
        uid: Math.random(),
        title:error.code ,
        message: error ? <span>{renderHTML(error.message)}</span> : "",
        autoDismiss: 3,
        level: "error",
        onRemove: ()=>{
            dispatch({
                type: "REMOVE_NOTIFICATION"
            });
        }
    };
    return {
        type: "ADD_NOTIFICATION",
        payload: {
          notification: notificationOpts
        }
    };
}
