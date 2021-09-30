const { Console } = require("console");
const fs = require("fs");
const https = require('https');
const puppeteer = require("puppeteer");

// Set argument for download file name
const args = process.argv.slice();
const username = args[2];
const password = args[3];
const outputFile = args[4];


(async () => {
    // Open headless browser (Chromium)
    const browser = await puppeteer.launch({ headless: false});
    const page = await browser.newPage();
    const wait = time => new Promise(resolve => setTimeout(resolve, time))
    const host = "https://app-dev.condoworks.co";
    await page.goto(host);

    // Sign in Logic
    await page.waitForSelector("#Email");
    await page.waitForSelector("#Password");
    await page.type("#Email", username);
    await page.type("#Password", password);
    await page.click("#btnSubmit");

    // Clicks Top-left Toggle Button
    await page.waitForSelector("button.navbar-toggler");
    await page.click("button.navbar-toggler", { delay: 1000 });
    // Clicks Invoice Dropdown menu
    const invoices = await page.$x("//a[contains(@id, 'InvoicesMenuLink')]");
    if (invoices) {
        await wait(1000);
        await invoices[0].click();
        // console.log("invoices clicked")
    } else console.log("no invoices")
    
    // Clicks All from Dropdown
    const button = await page.$x("//a[contains(., 'All')]");
    if (button) {
        await wait(1000);
        // console.log("All found")
        await button[0].click();
    } else {
        console.log("button not there")
    }

    // Clicks Magnifying Glass beside invoice 123444
    await page.waitForNetworkIdle();
    const invNum = await page.$x("//td[contains(., '123444')]/../td/a/button");
    if (invNum) {
        await wait(1000);
        // console.log("Invoice Number clicked")
        await invNum[0].click();
    } else {
        console.log("Can't find invoice number")
    }

    // Downloads PDF file and gives file path
    await page.waitForNetworkIdle();
    const download = await page.$x("//a[contains(@class, 'kv-file-download')]");
    if (download) {
        await wait(1000);
        // console.log("download button found");
        const docHref = await page.evaluate(anchor => anchor.getAttribute('href'), download[0]);
        const downloadPath = host+docHref;
        // console.log(downloadPath);
        const res = await page.evaluate(path =>
        {
            function bufferToBase64(buffer) {
                return btoa(
                    new Uint8Array(buffer).reduce((data, byte) => {
                        return data + String.fromCharCode(byte);
                    }, ''),
                );
            }

            return fetch(path, {
                method: 'GET',
                responseType: 'arraybuffer',
                responseEncoding: 'binary',
            }).then(r => r.arrayBuffer())
            .then(arrayBuffer => bufferToBase64(arrayBuffer));
        }, downloadPath);   
        // Sets default filename as Invoice.pdf unless argument is passed
        const path = outputFile ? outputFile : `${__dirname}/Invoice.pdf`;   
        fs.writeFileSync(path, Buffer.from(res, 'base64'));
        console.log("File location: " + path);
    } else {
        console.log("Can't find download")
    }

   await browser.close();
})();
