

$httpClient.post({
  url: "https://mars.sharedaka.com/api/v1/habit/note/create",
  header: {
    "Content-Type": "application/x-www-form-urlencoded",
    Token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvY2h2cTBCdE1penctX0EycXkwVnI1WFkyRnhvIiwiYXVkaWVuY2UiOiJtb2JpbGUiLCJjcmVhdGVkIjoxNTgyODE3MDU4NTg3LCJhcHBJZCI6Ind4ODU1YzVkNzcxOGYyMThjOSIsImN1cnJlbnRPcGVuSWQiOiJvY2h2cTBCdE1penctX0EycXkwVnI1WFkyRnhvIiwib3JpZ2luT3BlbklkIjoib2NodnEwQnRNaXp3LV9BMnF5MFZyNVhZMkZ4byIsImV4cCI6MTU4MjkwMzQ1OH0.haUP45wjvt9EXRQYWtCT-IdPdQXBHkM9LKEFan2vVJ4"
  },
  body: `{
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
  }`
},
  function(error, response, data) {
    if (error) {
      console.log(error);
      $done();
    } else {
      var obj = JSON.parse(data);
      $notification.post(obj.msg);
      $done(obj.msg)
    }
  }
});
