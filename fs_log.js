const fs = require('fs');

function saveToLogFile(input) {
  let jsonData = fs.readFileSync('./test_log/logs.json', 'utf8');
  jsonData = JSON.parse(jsonData);
  jsonData['garter'].push(input);

  return fs.writeFileSync(
    './test_log/logs.json',
    JSON.stringify(jsonData, null, 2),
    'utf8'
  );
}

module.exports = saveToLogFile;
