// LINE Notifyでトークルームのトークンを取得して以下に設定★
var LINE_NOTIFY_TOKEN = "XXXXX";
var NOTIFY_API = "https://notify-api.line.me/api/notify";

function translateDiaryIntoEnglish() { // ---- (*1)
  // 今日の予定を取得 --- (*2)
  var today = new Date();
  var day = today.getDate();
  // javascriptで月を取得すると0-11月を取得するため +1が必要
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  var events = CalendarApp.getDefaultCalendar().getEventsForDay(today);
  var bodyItem = [ year + "." + month + "." + day + "-Diary-" + "\n"];
  for (var i = 0; i < events.length; i++) {
    var e = events[i];
    var d = e.getStartTime();
    var dstr = z2(d.getHours()) + ":" + z2(d.getMinutes());
    // タイトルを取得
    var title = LanguageApp.translate(e.getTitle(), "ja", "en");
    // 内容を取得
    var content;
    content = LanguageApp.translate(e.getDescription(), "ja", "en");
    bodyItem.push(dstr + "> " + title);
    bodyItem.push(content);
  }
  if (bodyItem.length == 0) {
    bodyItem.push("I hava no plan.");
  }
  // LINEに送信 --- (*3)
  _sendMessage(bodyItem.join("\n"));
}
function z2(n) {
  n = "00" + n;
  return n.substr(n.length - 2, 2);
}

// スタンプを送信する
function _sendMessage(msg) {
  // 認証情報のセット
  var headers = {
    "Authorization": "Bearer " + LINE_NOTIFY_TOKEN
  };
  // メッセージをセット
  var payload = {
    "message": msg
  };
  // 送信情報をまとめる
  var options = {
    'method' : 'post',
    'contentType' : 'application/x-www-form-urlencoded',
    'headers': headers,
    'payload' : payload
  };
  Logger.log(options);
  // 実際に送信する
  var response = UrlFetchApp.fetch(NOTIFY_API, options);
  Logger.log(response);
}