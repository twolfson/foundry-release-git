var shell = require('shelljs');
var quote = require('shell-quote').quote;

exports.commit = function (params, cb) {
  // Commit outstanding changes, tag, and push
  // DEV: Stringify message for passing as an argument (e.g. "abc d$ef" -> "'abc d\$ef'")
  shell.exec(quote(['git', 'commit', '--allow-empty', '-a', '-m', params.message]));
  shell.exec(quote(['git', 'tag', params.version]));
  process.nextTick(cb);
};

exports.publish = function (params, cb) {
  shell.exec('git push');
  shell.exec('git push --tags');
  process.nextTick(cb);
};
