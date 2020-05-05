function retrieveTextDataFromPDF() {

  // update PDF File URL
  // You can also pull PDFs from Google Drive
  var url = "XXXX.pdf";

  var blob = UrlFetchApp.fetch(url).getBlob();
  Logger.log(blob.getName());
  Logger.log(blob.getDataAsString("Shift_JIS"));
  var resource = {
    title: blob.getName(),
    mimeType: blob.getContentType()
  };

  // Enable the Advanced Drive API Service
  var file = Drive.Files.insert(resource, blob, {ocr: true, ocrLanguage: "en"});

  // Extract Text from PDF file
  var doc = DocumentApp.openById(file.id);
  var text = doc.getBody().getText();

  return text;
}
