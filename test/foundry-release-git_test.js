// Load in dependencies
var exec = require('child_process').exec;
var path = require('path');
var expect = require('chai').expect;
var wrench = require('wrench');
var gitRelease = require('../');
var fixtureUtils = require('./utils/fixtures');

// TODO: Move git init logic into its own utility

describe('Committing', function () {
  describe('in a git folder', function () {
    before(function createGitFolder () {
      this.gitDir = path.join(fixtureUtils.dir, 'git_test');
      wrench.mkdirSyncRecursive(this.gitDir);
    });

    // TODO: Use premade git directory a la sexy-bash-prompt
    before(function initializeGitFolder (done) {
      process.chdir(this.gitDir);
      exec('git init', function (err, stdout, stderr) {
        if (err) { return done(err); }
        exec('touch a', function (err, stdout, stderr) {
          if (err) { return done(err); }
          exec('git add -A', function (err, stdout, stderr) {
            if (err) { return done(err); }
            exec('git commit -m "Initial commit =D"', function (err, stdout, stderr) {
              done(err);
            });
          });
        });
      });
    });

    before(function publish (done) {
      gitRelease.publish({
        version: '0.1.0',
        message: 'Release 0.1.0',
        description: null
      }, done);
    });

    it('adds a git tag', function (done) {
      exec('git tag', function (err, stdout, stderr) {
        if (err) {
          return done(err);
        }
        expect(stdout).to.equal('0.1.0\n');
        done();
      });
    });

    it('adds a git commit', function (done) {
      exec('git log --format=oneline -n 1', function (err, stdout, stderr) {
        if (err) {
          return done(err);
        }
        expect(stdout).to.match(/\w{32} Release 0.1.0\n/);
        done();
      });
    });
  });
});
