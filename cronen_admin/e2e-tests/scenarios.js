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

  describe('server add and remove functionality', function() {

    it('should allow servers to be added', function() {
      browser.get('index.html#/view2');

      var hostnameElem = element(by.model('addServer.hostname'));
      var portElem = element(by.model('addServer.port'));
      var addServerButton = element(by.id('addServerButton'));

      hostnameElem.clear();
      hostnameElem.sendKeys('localhost');
      portElem.clear();
      portElem.sendKeys(9000);

      addServerButton.click();

      var serverList = element.all(by.repeater('server in servers'));
      expect(serverList.count()).toEqual(1);

    });
  });

});
