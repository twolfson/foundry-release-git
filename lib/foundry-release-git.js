var shell = require('shelljs');
var quote = require('shell-quote').quote;

exports.commit = function (version, message) {
  // Commit outstanding changes, tag, and push
  // DEV: Stringify message for passing as an argument (e.g. "abc d$ef" -> "'abc d\$ef'")
  shell.exec(quote(['git', 'commit', '--allow-empty', '-a', '-m', message]));
  shell.exec(quote(['git', 'tag', version]));
};

exports.publish = function (version, message) {
  shell.exec('git push');
  shell.exec('git push --tags');
};
