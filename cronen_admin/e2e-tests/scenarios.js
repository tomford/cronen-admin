'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {

  browser.get('index.html');

  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/view1");
  });

  describe('view1', function() {

    beforeEach(function() {
      browser.get('index.html#/view1');
    });


    it('should render view1 when user navigates to /view1', function() {
      expect(element.all(by.css('h2')).first().getText()).
        toMatch(/Jobs table/);
    });

  });

  describe('view2', function() {

    beforeEach(function() {
      browser.get('index.html#/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
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
      browser.get('index.html#/view2');

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
      browser.get('index.html#/view2');

      addTestServer('myhost', 4321);

      browser.get('index.html#/view1');

      var serverStatusList = element.all(by.repeater('(key, desc) in jobs'));
      var serverHostname = serverStatusList.first().all(by.tagName('td')).get(0);
      var serverPort = serverStatusList.first().all(by.tagName('td')).get(1);
      var serverStatus = serverStatusList.first().all(by.tagName('td')).get(2);

      expect(serverHostname.getText()).toMatch(/myhost/);
      expect(serverPort.getText()).toMatch(/4321/);
      expect(serverStatus.getText()).toMatch(/FAILED/);

      //Cleanup

      browser.get('index.html#/view2');
      removeServer(0);
    });
  });
});
