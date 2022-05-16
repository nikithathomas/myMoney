
const { ProcessPortfolio } = require("./processPortfolio");

fs = require("fs");
const filename = process.argv[2];

// Code to read file for input
fs.readFile(filename, "utf8", function (err, data) {
    const newProcessPortfolio=new ProcessPortfolio();
    if (err) {
        return console.log(err);
    }
    newProcessPortfolio.processPortfolio(data);
});

