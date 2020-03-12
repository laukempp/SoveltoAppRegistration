require('chromedriver')

const webdriver = require('selenium-webdriver'),
By = webdriver.By,
until = webdriver.until;

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe("Login page", () => {
    let driver;

    beforeEach(async () => {
        driver = new webdriver.Builder().forBrowser("chrome").build();
    })

    it("User can log in with proper values", async function() {

        await driver.get('http://localhost:4000/login');
        await driver.findElement(By.id('emailfield')).sendKeys('testi@testi.com')
        await driver.findElement(By.id('passfield')).sendKeys('Testi123');
        await driver.findElement(By.id('loginBtn')).click()

        await driver.wait(until.elementLocated(By.id('teacherTagP')), 20000);

            let value = await driver.findElement(By.id('teacherTagP')).getAttribute('innerText')
            
            return expect(value).to.equal("Tunnuksesi on: 12345")
    })

    it("Redirects to registration page when link is clicked", async function() {

        await driver.get('http://localhost:4000/login');
        await driver.findElement(By.id('regLink')).click()

        await driver.wait(until.elementLocated(By.css('.user__title')), 10000);

            let value = await driver.findElement(By.css('.user__title')).getText()
            
            return expect(value).to.equal("Soveltommi rekisteröityminen")
    })

    /*it("Page showcases an error message if user types wrong login & password value", async function() {

        await driver.findElement(By.id('emailfield')).sendKeys('testi@testi.fi')
        await driver.findElement(By.id('passfield')).sendKeys('Testi123');
        await driver.findElement(By.id('loginBtn')).click()

        await driver.wait(until.elementLocated(By.id('tervetuloa')), 10000);

            let value = await driver.findElement(By.id('teacherTagP')).getText()
            
            return expect(value).to.equal("Tunnuksesi on: 12345")
    })*/

    afterEach(() => driver.quit())
})
