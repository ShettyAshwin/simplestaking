import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }

  getGridTitle():Promise<string>{
    return element(by.css('app-root .transaction h3')).getText() as Promise<string>;
  }

  getTableHeader():Promise<string>{
    return element.all(by.css('app-root .cdk-virtual-scroll-content-wrapper tr th')).first().getText() as Promise<string>;
  }

  getTableCount():Promise<number>{
    return element.all(by.css("app-root .cdk-virtual-scroll-content-wrapper table tr")).count() as Promise<number>;
  }

  getTablelLastRow():Promise<string>{
    return element.all(by.css("app-root .cdk-virtual-scroll-content-wrapper table tr")).last().getText() as Promise<string>;
  }

  scrollADiv(name:string):Promise<void>{
    var ele = element.all(by.css('.' + name)).first();
    browser.executeScript('arguments[0].scrollIntoView({block: "end"})', ele.getWebElement());
    return null as Promise<void>;
  }
}
