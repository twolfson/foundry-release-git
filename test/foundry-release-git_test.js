// Load in dependencies
var childProcess = require('child_process');
var path = require('path');
var expect = require('chai').expect;
var wrench = require('wrench');
var gitRelease = require('../');
var fixtureUtils = require('./utils/fixtures');

describe('Committing', function () {
  describe('in a git folder', function () {
    fixtureUtils.bundle.mkdir('commit_test');
    fixtureUtils.bundle.exec('git init');
    fixtureUtils.bundle.exec('touch a');
    fixtureUtils.bundle.exec('git add -A');
    fixtureUtils.bundle.exec('git commit -m "Initial commit =D"');

    before(function commit (done) {
      this.inBundle(function () {
        gitRelease.commit({
          version: '0.1.0',
          message: 'Release 0.1.0',
          description: null
        }, done);
      });
    });

    it('adds a git tag', function (done) {
      this.inBundle(function () {
        childProcess.exec('git tag', function (err, stdout, stderr) {
          if (err) {
            return done(err);
          }
          expect(stdout).to.equal('0.1.0\n');
          done();
        });
      });
    });

    it('adds a git commit', function (done) {
      this.inBundle(function () {
        childProcess.exec('git log --format=oneline -n 1', function (err, stdout, stderr) {
          if (err) {
            return done(err);
          }
          expect(stdout).to.match(/\w{32} Release 0.1.0\n/);
          done();
        });
      });
    });
  });
});

describe.only('Publishing', function () {
  describe('in a git folder', function () {
    fixtureUtils.bundle.mkdir('publish_test');
    fixtureUtils.bundle.exec('git init');
    fixtureUtils.bundle.exec('touch a');
    fixtureUtils.bundle.exec('git add -A');
    fixtureUtils.bundle.exec('git commit -m "Initial commit =D"');
    var _exec = childProcess.exec;
    before(function stubExec () {
      var that = this;
      this.execCalls = [];
      childProcess.exec = function (/* cmd, options, cb */) {
        // Preserve the arguments
        var args = [].slice.call(arguments);
        that.execCalls.push(args);

        // Run the callback (err, stdout, stderr)
        var cb = args[args.length - 1];
        console.log(args);
        cb(null, '', '');
      };
    });
    after(function restoreExec () {
      childProcess.exec = _exec;
    });

    before(function publish (done) {
      this.inBundle(function () {
        gitRelease.publish({
          version: '0.1.0',
          message: 'Release 0.1.0',
          description: null
        }, done);
      });
    });

    it.skip('publishes the commit', function () {

    });
    it.skip('publishes the tags', function () {

    });
  });
});
