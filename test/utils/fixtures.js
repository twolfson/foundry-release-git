// Load in dependencies
var assert = require('assert');
var exec = require('child_process').exec;
var path = require('path');
var shell = require('shelljs');
var wrench = require('wrench');

// Set up our fixture dir
var tmp = shell.tempdir();
exports.dir = path.join(tmp, 'foundry_git_test');

// Define helper functions to work in fixture directory
exports.bundle = {
  mkdir: function (folderName) {
    before(function mkdirFn () {
      // Create our directory
      this.bundleFixtureDir = path.join(exports.dir, folderName);
      try { wrench.rmdirSyncRecursive(this.bundleFixtureDir); } catch (e) {}
      wrench.mkdirSyncRecursive(this.bundleFixtureDir);

      // Prevent accidents by guaranteeing test runs inside fixture dir
      process.chdir(this.bundleFixtureDir);

      // Define more helper functions for logical continuity
      this.inBundle = function (cb) {
        process.chdir(this.bundleFixtureDir);
        return cb();
      };
    });
    after(function cleanupMkdir () {
      // Preserve bundleFixtureDir during cleanup
      var bundleFixtureDir = this.bundleFixtureDir;

      // Prevent test leaks via cleanup
      delete this.bundleFixtureDir;
      delete this.inBundle;

      // Remove the test directory
      wrench.rmdirSyncRecursive(bundleFixtureDir);
    });
  },
  exec: function (command) {
    before(function execFn (done) {
      // Assert `this.bundleFixtureDir` exists
      assert(this.bundleFixtureDir, '`this.bundleFixtureDir` was not defined. Did you run `fixtureUtils.mkdir`?');

      // Run the command in our directory
      process.chdir(this.bundleFixtureDir);
      exec(command, function handleExec (err, stdout, stderr) {
        // If there is stderr, log it
        if (stderr) {
          console.error('STDERR: ', stderr);
        }

        // Callback with the error
        done(err);
      });
    });
  }
};
