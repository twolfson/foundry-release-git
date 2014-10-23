var shell = require('shelljs');
var quote = require('shell-quote').quote;

exports.specVersion = '1.1.0';

exports.commit = function (params, cb) {
  if (shell.test('-d', '.git')) {
    // Commit outstanding changes, tag, and push
    // DEV: Stringify message for passing as an argument (e.g. "abc d$ef" -> "'abc d\$ef'")
    shell.exec(quote(['git', 'commit', '--allow-empty', '-a', '-m', params.message]));
    shell.exec(quote(['git', 'tag', params.version]));
  }
  process.nextTick(cb);
};

exports.publish = function (params, cb) {
  if (shell.test('-d', '.git')) {
    shell.exec('git push');
    shell.exec('git push --tags');
  }
  process.nextTick(cb);
};
