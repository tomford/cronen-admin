'use strict';

describe('Cronen admin', function() {

  it('should automatically redirect to /jobView when location hash/fragment is empty', function() {
    browser.get('index.html');

    expect(browser.getLocationAbsUrl()).toMatch("/jobView");
  });

  describe('jobView', function() {

    beforeEach(function() {
      browser.get('index.html#/jobView');
    });


    it('should render jobView when user navigates to /jobView', function() {
      expect(element.all(by.css('h2')).first().getText()).
        toMatch(/Jobs table/);
    });

  });

  describe('serverView', function() {

    beforeEach(function() {
      browser.get('index.html#/serverView');
    });


    it('should render serverView when user navigates to /serverView', function() {
      expect(element.all(by.css('h2')).first().getText()).
        toMatch(/Servers table/);
    });
  });

  describe('server status viewing', function() {

    var removeServer = function(serverIndex) {
      var serverList = element.all(by.repeater('server in servers'));
      var removeServerButton = serverList.get(serverIndex).all(by.tagName('td')).get(3).element(by.id('removeServerButton'));
      removeServerButton.click();
    };

    var addTestServer = function(server, port) {
      var hostnameElem = element(by.model('addServer.hostname'));
      var portElem = element(by.model('addServer.port'));
      var addServerButton = element(by.id('addServerButton'));

      hostnameElem.clear();
      hostnameElem.sendKeys(server);
      portElem.clear();
      portElem.sendKeys(port);

      addServerButton.click();
    };

    it('should allow servers to be added and then removed', function() {
      browser.get('index.html#/serverView');

      addTestServer('localhost', 1234);

      var serverList = element.all(by.repeater('server in servers'));
      expect(serverList.count()).toEqual(1);

      var serverHostname = serverList.first().all(by.tagName('td')).get(1);
      var serverPort = serverList.first().all(by.tagName('td')).get(2);

      expect(serverHostname.getText()).toMatch(/localhost/);
      expect(serverPort.getText()).toMatch(/1234/);

      removeServer(0);

      expect(serverList.count()).toEqual(0);
    });

    it('should allow the status of a server to be viewed', function() {
      browser.get('index.html#/serverView');

      addTestServer('myhost', 4321);

      browser.get('index.html#/jobView');

      var serverStatusList = element.all(by.repeater('(key, desc) in jobs'));
      var serverHostname = serverStatusList.first().all(by.tagName('td')).get(0);
      var serverPort = serverStatusList.first().all(by.tagName('td')).get(1);
      var serverStatus = serverStatusList.first().all(by.tagName('td')).get(2);

      expect(serverHostname.getText()).toMatch(/myhost/);
      expect(serverPort.getText()).toMatch(/4321/);
      expect(serverStatus.getText()).toMatch(/FAILED/);

      //Cleanup

      browser.get('index.html#/serverView');
      removeServer(0);
    });
  });
});
