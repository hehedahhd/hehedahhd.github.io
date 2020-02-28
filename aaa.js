var $nobyda = nobyda();

const JRSUrl = {
  url: "https://mars.sharedaka.com/api/v1/habit/note/create",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Token:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvY2h2cTBCdE1penctX0EycXkwVnI1WFkyRnhvIiwiYXVkaWVuY2UiOiJtb2JpbGUiLCJjcmVhdGVkIjoxNTgyODE3MDU4NTg3LCJhcHBJZCI6Ind4ODU1YzVkNzcxOGYyMThjOSIsImN1cnJlbnRPcGVuSWQiOiJvY2h2cTBCdE1penctX0EycXkwVnI1WFkyRnhvIiwib3JpZ2luT3BlbklkIjoib2NodnEwQnRNaXp3LV9BMnF5MFZyNVhZMkZ4byIsImV4cCI6MTU4MjkwMzQ1OH0.haUP45wjvt9EXRQYWtCT-IdPdQXBHkM9LKEFan2vVJ4"
  },
  body: {
    habitID: 4025457,
    notePhotoProperties: null,
    tagIds: null,
    openId: "ochvq0BtMizw - _A2qy0Vr5XY2Fxo",
    topicID: 0,
    curDate: null,
    logID: 711246615,
    noteText: "早起的鸟儿是假的",
    notePhoto: null,
    noteLat: null,
    noteLng: null,
    noteLocation: null,
    noteLocationDesc: null,
    noteVisible: 1,
    habitForceNoteState: 1,
    noteAudioKey: null,
    noteAudioType: 1,
    noteAudioTime: 0,
    noteVideoKey: null,
    noteVideoDuration: null,
    noteVideoHeight: null,
    noteVideoWidth: null,
    noteVideoSize: null,
    qrCode: null,
    fromOpenId: null,
    inviteType: null,
    sessionId: 1582817077972
  }
};

$nobyda.post(JRSUrl, function(error, response, data) {});

function nobyda() {
  const isRequest = typeof $request != "undefined";
  const isSurge = typeof $httpClient != "undefined";
  const isQuanX = typeof $task != "undefined";
  const isJSBox =
    typeof $app != "undefined" && $app.info.bundleID == "app.cyan.jsbox";
  const isNode = typeof require == "function" && !isJSBox;
  const node = (() => {
    if (isNode) {
      const request = require("request");
      return { request };
    } else {
      return null;
    }
  })();
  const notify = (title, subtitle, message) => {
    if (isQuanX) $notify(title, subtitle, message);
    if (isSurge) $notification.post(title, subtitle, message);
    if (isNode) log(title + subtitle + message);
    if (isJSBox)
      $push.schedule({
        title: title,
        body: subtitle ? subtitle + "\n" + message : message
      });
  };
  const write = (value, key) => {
    if (isQuanX) return $prefs.setValueForKey(value, key);
    if (isSurge) return $persistentStore.write(value, key);
  };
  const read = key => {
    if (isQuanX) return $prefs.valueForKey(key);
    if (isSurge) return $persistentStore.read(key);
  };
  const adapterStatus = response => {
    if (response) {
      if (response.status) {
        response["statusCode"] = response.status;
      } else if (response.statusCode) {
        response["status"] = response.statusCode;
      }
    }
    return response;
  };
  const get = (options, callback) => {
    if (isQuanX) {
      if (typeof options == "string") options = { url: options };
      options["method"] = "GET";
      $task.fetch(options).then(
        response => {
          callback(null, adapterStatus(response), response.body);
        },
        reason => callback(reason.error, null, null)
      );
    }
    if (isSurge)
      $httpClient.get(options, (error, response, body) => {
        callback(error, adapterStatus(response), body);
      });
    if (isNode) {
      node.request(options, (error, response, body) => {
        callback(error, adapterStatus(response), body);
      });
    }
    if (isJSBox) {
      if (typeof options == "string") options = { url: options };
      options["header"] = options["headers"];
      options["handler"] = function(resp) {
        let error = resp.error;
        if (error) error = JSON.stringify(resp.error);
        let body = resp.data;
        if (typeof body == "object") body = JSON.stringify(resp.data);
        callback(error, adapterStatus(resp.response), body);
      };
      $http.get(options);
    }
  };
  const post = (options, callback) => {
    if (isQuanX) {
      if (typeof options == "string") options = { url: options };
      options["method"] = "POST";
      $task.fetch(options).then(
        response => {
          callback(null, adapterStatus(response), response.body);
        },
        reason => callback(reason.error, null, null)
      );
    }
    if (isSurge) {
      $httpClient.post(options, (error, response, body) => {
        callback(error, adapterStatus(response), body);
      });
    }
    if (isNode) {
      node.request.post(options, (error, response, body) => {
        callback(error, adapterStatus(response), body);
      });
    }
    if (isJSBox) {
      if (typeof options == "string") options = { url: options };
      options["header"] = options["headers"];
      options["handler"] = function(resp) {
        let error = resp.error;
        if (error) error = JSON.stringify(resp.error);
        let body = resp.data;
        if (typeof body == "object") body = JSON.stringify(resp.data);
        callback(error, adapterStatus(resp.response), body);
      };
      $http.post(options);
    }
  };
  const log = message => console.log(message);
  const done = (value = {}) => {
    if (isQuanX) isRequest ? $done(value) : null;
    if (isSurge) isRequest ? $done(value) : $done();
  };
  return {
    isQuanX,
    isSurge,
    isJSBox,
    isRequest,
    notify,
    write,
    read,
    get,
    post,
    log,
    done
  };
}
