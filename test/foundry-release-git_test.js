// Load in dependencies
var exec = require('child_process').exec;
var path = require('path');
var expect = require('chai').expect;
var sinon = require('sinon');
var shell = require('shelljs');
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
        exec('git tag', function (err, stdout, stderr) {
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
});

describe('Publishing', function () {
  describe('in a git folder', function () {
    fixtureUtils.bundle.mkdir('publish_test');
    fixtureUtils.bundle.exec('git init');
    fixtureUtils.bundle.exec('touch a');
    fixtureUtils.bundle.exec('git add -A');
    fixtureUtils.bundle.exec('git commit -m "Initial commit =D"');

    // DEV: Ideally we would override `child_process.exec` but it causes complications with `shelljs`
    before(function stubExec () {
      this.execStub = sinon.stub(shell, 'exec');
    });
    after(function restoreExec () {
      this.execStub.restore();
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

    it('publishes the commit', function () {
      expect(this.execStub.args[0]).to.deep.equal(['git push']);
    });
    it('publishes the tags', function () {
      expect(this.execStub.args[1]).to.deep.equal(['git push --tags']);
    });
  });
});
