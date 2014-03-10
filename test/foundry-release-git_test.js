// Load in dependencies
var path = require('path');
var expect = require('chai').expect;
var wrench = require('wrench');
var gitRelease = require('../');
var fixtureUtils = require('./utils/fixtures');

describe('Committing', function () {
  describe('in a git folder', function () {
    fixtureUtils.mkdir('git_test');
    fixtureUtils.exec('git init');
    fixtureUtils.exec('touch a');
    fixtureUtils.exec('git add -A');
    fixtureUtils.exec('git commit -m "Initial commit =D"');

    before(function publish (done) {
      this.inFixtureDir(function () {
        console.log('hai');
        gitRelease.publish({
          version: '0.1.0',
          message: 'Release 0.1.0',
          description: null
        }, done);
      });
    });

    it('adds a git tag', function (done) {
      this.inFixtureDir(function () {
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
      this.inFixtureDir(function () {
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
