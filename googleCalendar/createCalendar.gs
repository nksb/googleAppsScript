function createEventFromSheet() {

    // カレンダー情報取得
    // TODO: input your e-mail address
    Cal = CalendarApp.getCalendarById('xxx.yyy');
    // シートを選択
    var sheet = SpreadsheetApp.getActiveSheet();
    // 抽出日を取得
    var extractionDate = sheet.getRange(1, 9).getValue().toString();
    var title;
    var startTime;
    var endTime;
    var description;
    var options;
    var location;

    // 'end'行まで確認
    var lastRow = 0
    for (var i = 1; i <= sheet.getLastRow(); i++) {
      var activeCell = sheet.getRange(i, 1).getValue();
      if (activeCell == 'end') {
        break;
      }
      
      if (activeCell == extractionDate) {
        title = sheet.getRange(i, 2).getValue().toString();
        description = sheet.getRange(i, 3).getValue().toString();
        startTime = new Date(sheet.getRange(i, 4).getValue().toString());
        endTime = new Date(sheet.getRange(i, 5).getValue().toString());
        location = sheet.getRange(i, 6).getValue().toString();
        // オプションを設定
        options = {
            location: location,
            description: description
        }
        // カレンダーにイベントを追加
        Cal.createEvent(title, startTime, endTime, options);
      }
    }
}
