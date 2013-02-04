// Generated by CoffeeScript 1.3.3
var Controller, MockResponse, assert, path, _,
  _this = this;

path = require("path");

_ = require("underscore");

global.Controller = require(path.join(__dirname, "../lib/controller"));

Controller = _.extend(require(path.join(__dirname, "sub_apps/example/controller")), require(path.join(__dirname, "../lib/action")));

MockResponse = require(path.join(__dirname, "../lib/mock_response"));

assert = require("assert");

require("should");

describe('Controller', function() {
  var controller, paramters, response;
  paramters = null;
  controller = null;
  response = null;
  beforeEach(function(done) {
    paramters = {
      test_param01: 'test_params_val01',
      args01: '1',
      args02: '2',
      scr: 'test_action01'
    };
    response = new MockResponse();
    controller = new Controller(paramters, response);
    controller.action('test_action01', function(params, response) {
      return controller.render(parseInt(params.args01) + parseInt(params.args02));
    });
    controller.action('test_action02', function(params, response) {
      return controller.render(parseInt(params.args02) - parseInt(params.args01));
    });
    controller.action('test_action03', function(params, response) {
      return controller.render(parseInt(params.args02) * parseInt(params.args01));
    });
    return done();
  });
  describe('callAction()', function() {
    return it("should call a be added event", function(done) {
      response.on('getResult', function(response) {
        response.body.should.equal('3');
        return done();
      });
      return controller.callAction();
    });
  });
  describe("#setBeforeFilters(options)", function() {
    it("should register filter methods to all actions", function(done) {
      var options;
      options = {
        type: 'all',
        filters: ['filter00', 'filter01']
      };
      controller.filter00 = function() {
        return controller.render({
          rv: 1
        });
      };
      controller.filter01 = function() {
        throw new Error;
      };
      controller.setBeforeFilters(options);
      controller.beforeFiltersChain[0].should.equal(options);
      response.on('getResult', function(response) {
        response.body.should.equal(JSON.stringify({
          rv: 1
        }));
        return done();
      });
      return controller.callAction();
    });
    it("should trigger a only filter", function(done) {
      var options;
      options = {
        type: 'only',
        actions: ['test_action01'],
        filters: ['filter00']
      };
      controller.filter00 = function() {
        return controller.render({
          rv: 1
        });
      };
      controller.setBeforeFilters(options);
      response.on('getResult', function(response) {
        response.body.should.equal(JSON.stringify({
          rv: 1
        }));
        return done();
      });
      return controller.callAction();
    });
    it("should not trigger the only filter which did`t point to the action", function(done) {
      var options,
        _this = this;
      options = {
        type: 'only',
        actions: ['test_action02'],
        filters: ['filter00']
      };
      controller.filter00 = function() {
        return controller.render({
          rv: 1
        });
      };
      controller.setBeforeFilters(options);
      response.on('getResult', function(response) {
        response.body.should.equal('3');
        return done();
      });
      return controller.callAction();
    });
    it("should trigger the except filter which did`t point to the action be called", function(done) {
      var options,
        _this = this;
      options = {
        type: 'except',
        actions: ['test_action02'],
        filters: ['filter00']
      };
      controller.filter00 = function() {
        return controller.render({
          rv: 1
        });
      };
      controller.setBeforeFilters(options);
      response.on('getResult', function(response) {
        response.body.should.equal(JSON.stringify({
          rv: 1
        }));
        return done();
      });
      return controller.callAction();
    });
    return it("should not trigger the except filter which did`t point to the action be called", function(done) {
      var options,
        _this = this;
      options = {
        type: 'except',
        actions: ['test_action01'],
        filters: ['filter00']
      };
      controller.filter00 = function() {
        return controller.render({
          rv: 1
        });
      };
      controller.setBeforeFilters(options);
      response.on('getResult', function(response) {
        response.body.should.equal('3');
        return done();
      });
      return controller.callAction();
    });
  });
  return describe("#render(object)", function() {
    return it("should return a response", function(done) {
      response.on('getResult', function(response) {
        response.get('Content-Type').should.equal('application/json');
        response.body.should.equal(JSON.stringify({
          rv: '0',
          msg: 'test'
        }));
        return done();
      });
      controller.contentType = 'application/json';
      return controller.render({
        rv: '0',
        msg: 'test'
      });
    });
  });
});