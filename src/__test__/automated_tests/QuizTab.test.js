/*require('chromedriver')

const webdriver = require('selenium-webdriver'),
By = webdriver.By,
until = webdriver.until;

const driver = new webdriver.Builder().forBrowser("chrome").build();

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const el = {
    titleInput: By.id('kysynimi'),
    topicInput: By.id('quiztopic'),
    teacherInput: By.id('useBadge'),
    numberInputAll: By.id('allQuestions'),
    numberInputSome: By.id('someQuestions'),
    numberInput: By.id('kysynum'),
    timerInput: By.id('timer'),
    submitButton: By.id('quizSubmitBtn'),
    resetButton: By.id('quizResetBtn'),
    tagInput: By.css('.react-tags__search-input'),
    tagSuggestion: By.css('.react-tags__suggestions'),
    tagButton: By.css('.react-tags__selected-tag'),
    tagSpan: By.css('.react-tags__selected-tag-name')
};

describe("QuizTab", () => {
    console.log('First login to the page')

    before(done => {

        driver.get('http://localhost:4000/login').then(res => {
        driver.findElement(By.id('emailfield'))
        .sendKeys('testi@testi.com')
        .then(() => driver.findElement(By.id('passfield')).sendKeys('Testi123'))
        .then(() => driver.findElement(By.id('loginBtn')).click())
        .then(() => {
            driver.wait(until.elementLocated(By.id('teacherTagP')), 10000)
            .then(() => {done()}) 
            })    
        }) 
    })

    it("Autocompletes tags", async function() {

        await driver.findElement(el.tagInput).sendKeys('re')
        await driver.wait(until.elementLocated(el.tagSuggestion), 10000)
        await driver.findElement(el.tagSuggestion).click()

        await driver.wait(until.elementLocated(el.tagSpan), 10000);

            let value = await driver.findElement(el.tagSpan).getAttribute("innerText")
            
            return expect(value).to.equal("react")
    })

    /*it("Can search questions with only tags", async function() {

        await driver.findElement(el.titleInput).sendKeys('Tentti')
        await driver.findElement(el.tagInput).sendKeys('re')
        await driver.wait(until.elementLocated(el.tagSuggestion), 10000)
        await driver.findElement(el.tagSuggestion).click()
        await driver.findElement(el.submitButton).click()

        await driver.wait(until.elementLocated(By.xpath("(//*[@class='mQuestion'])[0]")))

            let value = await driver.findElement(By.xpath("(//*[@class='mQuestion'])[0]")).getAttribute("innerText")
            
            return expect(value).to.equal("Moro")
    })

    after(() => driver && driver.quit())
})*/
