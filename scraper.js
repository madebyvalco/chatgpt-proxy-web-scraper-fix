const puppeteer = require('puppeteer');

async function scrapeProxies() {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();


        await page.goto('https://www.sslproxies.org/');
        await page.waitForSelector('.table');

       const Scraper = await page.evaluate(() => {
            const scrapedData = {}
            const rows = Array.from(document.querySelectorAll('.table tbody'))[0].querySelectorAll('tr');

            rows.forEach(row => {
                const columns = Array.from(row.querySelectorAll('td'));
                
                columns.map(() => {
                    scrapedData[columns[0].innerText] = {
                        ip: columns[0].innerText,
                        port: columns[1].innerText,
                        code: columns[2].innerText,
                        country: columns[3].innerText,
                        anonymity: columns[4].innerText,
                        google: columns[5].innerText,
                        https: columns[6].innerText,
                        lastChecked: columns[7].innerText
                    }
                })

            })
            return scrapedData
        })

        await browser.close();
        return Scraper
    } catch (err) {}
}

(async() => {
    console.log(JSON.stringify(await scrapeProxies()))
})()
