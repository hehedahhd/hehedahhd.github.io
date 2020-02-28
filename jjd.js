const cookieName = '网易云音乐'
const cookieKey = 'chavy_cookie_neteasemusic'
const cookieVal = 'osver=8.0.0; deviceId=ODY4MjQ0MDMwOTgyNzQzCWI0OmNkOjI3OmNlOjdjOjRlCTUwOWUzM2FjNjFkMWIwNWMJMzlLOVgxODkxMkMwNTY1MA%3D%3D; appver=7.0.20; MUSIC_U=fb91e2f3c0b237e43695bf0b26f364559227b7e12c5f5d39c68b83d6ab61bdaed6a19bb7bcaa86276c65131df50e8b1e384fe0dd1eca3a5f; ntes_kaola_ad=1; versioncode=7000020; mobilename=ATU-TL10; buildver=1581948817; resolution=1440x720; __remember_me=true; __csrf=f6cedc576744342ee60ea3e6a9b6eeba; os=android; channel=netease'

const pc = `https://mars.sharedaka.com/api/v1/habit/note/create `
const mobile = `http://music.163.com/api/point/dailyTask?type=0`

function sign() {
  let url = {
    url: null,
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
    noteText: "早起的鸟儿的",
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
  }

  let signinfo = {}

  url.url = pc
  $httpClient.post(url, (error, response, data) => {
    let result = JSON.parse(data)
    signinfo.pc = {
      title: `网易云音乐(PC)`,
      success: result.code == 200 || result.code == -2 ? true : false,
      skiped: result.code == -2 ? true : false,
      resultCode: result.code,
      resultMsg: result.msg
    }
    console.log(`开始签到: ${signinfo.pc.title}, 编码: ${result.code}, 原因: ${result.msg}`)
  })

  url.url = mobile
  $httpClient.post(url, (error, response, data) => {
    let result = JSON.parse(data)
    signinfo.app = {
      title: `网易云音乐(APP)`,
      success: result.code == 200 || result.code == -2 ? true : false,
      skiped: result.code == -2 ? true : false,
      resultCode: result.code,
      resultMsg: result.msg
    }
    console.log(`开始签到: ${signinfo.app.title}, 编码: ${result.code}, 原因: ${result.msg}`)
  })
  check(signinfo)
}

function check(signinfo, checkms = 0) {
  if (signinfo.pc && signinfo.app) {
    log(signinfo)
    $done({})
  } else {
    if (checkms > 5000) {
      $done({})
    } else {
      setTimeout(() => check(signinfo, checkms + 100), 100)
    }
  }
}

function log(signinfo) {
  let title = `${cookieName}`
  let subTitle = ``
  let detail = `今日共签: ${signinfo.signedCnt}, 本次成功: ${signinfo.successCnt}, 本次失败: ${signinfo.failedCnt}`

  if (signinfo.pc.success && signinfo.app.success) {
    subTitle = `签到结果: 全部成功`
    detail = `PC: ${signinfo.pc.success ? '成功' : '失败'}, APP: ${signinfo.app.success ? '成功' : '失败'}`
  } else if (!signinfo.pc.success && !signinfo.app.success) {
    subTitle = `签到结果: 全部失败`
    detail = `PC: ${signinfo.pc.success ? '成功' : '失败'}, APP: ${signinfo.app.success ? '成功' : '失败'}, 详见日志!`
  } else {
    subTitle = ``
    detail = `PC: ${signinfo.pc.success ? '成功' : '失败'}, APP: ${signinfo.app.success ? '成功' : '失败'}, 详见日志!`
  }
  $notification.post(title, subTitle, detail)
}

sign()