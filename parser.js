const fs = require('fs')

// const fileName = 'test-q1.txt'
const args = process.argv.slice();
const inputFile = args[2];


fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return
    }
    // console.log(data)
    // Search for Customer number and Account number
    const regexNums = /[0-9]{7} - [0-9]{8}/;
    const search = regexNums.exec(data);
    if (search) {
        const acctNum = search[0];
        // console.log("Customer # - Account #:", acctNum);
        const numbers = acctNum.split('-');
        console.log("Customer number: ", numbers[0])
        console.log("Account number: ", numbers[1])
    } else {
        console.log('No match for Customer and Account number');
    }
    // Searching for Bill Period
    const regexBill = /(\w+ \w+), [0-9]{4} to (\w+ \w+), [0-9]{4}/;
    const searchBill = regexBill.exec(data);
    if (searchBill) {
        const acctBill = searchBill[0];
        console.log("Bill period: ", acctBill);
    } else {
        console.log("No match for Bill Period")
    }
    // Searching for Bill Number
    const regexBillNumb = /Bill number: [0-9]{8}/;
    const searchBillNumb = regexBillNumb.exec(data);
    if (searchBillNumb) {
        const acctBillNumb = searchBillNumb[0];
        console.log(acctBillNumb);
    } else {
        console.log("No match for Bill Number");
    }
    // Searching for Bill Date
    const regexBillDate = /Bill date: (\w+ [0-9]{2}), [0-9]{4}/;
    const searchBillDate = regexBillDate.exec(data);
    if (searchBillDate) {
        const acctBillDate = searchBillDate[0];
        console.log(acctBillDate);
    } else {
        console.log("No match for Bill Date")
    }
    // Searching for Total new charges
    const total = /(?:Total new charges \s+)(\W[0-9]{1},[0-9]{3}.[0-9]{2})/;
    const searchTotal = total.exec(data);
    if (searchTotal) {
        const acctTotal = searchTotal[1];
        console.log("Total new charges: ", acctTotal);
    } else {
        console.log("No Total new charges")
    }
})

