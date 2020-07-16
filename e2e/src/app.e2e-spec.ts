import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Recent Transactions', () => {
    page.navigateTo();    
    expect(page.getGridTitle()).toContain('Recent Transactions');  
  });

  it('Should display type in table',()=>{
    page.navigateTo();
    var headers = page.getTableHeader();
    expect(headers).toContain('Type');
  })

  it('should load 10 records', () => {
    page.navigateTo();
    //10 records and 1 header = 11   
    expect(page.getTableCount()).toBe(11);      
  });

  it('should load more records on scroll', () => {
    page.navigateTo();
    expect(page.getTableCount()).toBe(11); 
    let lastRowText = page.getTablelLastRow();
    page.scrollADiv("cdk-virtual-scroll-content-wrapper");
    browser.sleep(2000);
    page.scrollADiv("cdk-virtual-scroll-content-wrapper");
    expect(page.getTableCount()).toBeGreaterThan(11);
    expect(page.getTablelLastRow()).not.toEqual(lastRowText);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
