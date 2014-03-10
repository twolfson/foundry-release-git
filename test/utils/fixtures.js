// Load in dependencies
var assert = require('assert');
var exec = require('child_process').exec;
var path = require('path');
var shell = require('shelljs');
var wrench = require('wrench');

// Set up our fixture dir
var tmp = shell.tempdir();
exports.dir = path.join(tmp, 'foundry_test');

// Define helper functions to work in fixture directory
exports.mkdir = function (folderName) {
  before(function mkdirFn () {
    // Create our directory
    this.fixtureDir = path.join(fixtureUtils.dir, folderName);
    wrench.mkdirSyncRecursive(this.fixtureDir);

    // Prevent accidents by guaranteeing test runs inside fixture dir
    process.chdir(this.fixtureDir);
  });
  after(function cleanupMkdir () {
    // Prevent test leaks via cleanup
    delete this.fixtureDir;
  });
};

exports.exec = function (command) {
  before(function execFn (done) {
    // Assert `this.fixtureDir` exists
    assert(this.fixtureDir, '`this.fixtureDir` was not defined. Did you run `fixtureUtils.mkdir`?');

    // Run the command in our directory
    process.chdir(this.fixtureDir);
    exec(command, function handleExec (err, stdout, stderr) {
      // Callback with the error
      done(err);
    });
  });
};
