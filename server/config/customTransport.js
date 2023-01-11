const Transport = require("winston-transport");
const util = require("util");
const fs = require("fs");

module.exports = class CustomTransport extends Transport {
  constructor(opts) {
    super(opts);
    this.filename = opts.filename;
    this.setup();
  }

  initialize() {
    try {
      // fs.writeFileSync(this.filename, [], 'utf8');
      fs.writeFile(
        __dirname + "\\..\\logs\\" + this.filename,
        "",
        "utf8",
        function (err) {
          if (err) return err;
          return true;
        }
      );
    } catch (error) {
      return false;
    }
  }

  setup() {
    // This checks if the file exists
    if (fs.existsSync(__dirname + "\\..\\logs\\" + this.filename)) {
      // The content of the file is checked to know if it is necessary to adapt the array
      try {
        const data = fs.readFile(
          __dirname + "\\..\\logs\\" + this.filename,
          "utf8", function(err) {
              if(err) return err;
              return true;
          }
        );
        // If the content of the file is not an array, it is set
        const content = JSON.parse(data.toString());
        if (!Array.isArray(content) && !content) {
          this.initialize();
        }
      } catch (error) {
        // this.initialize();
      }
    }
    // Otherwise create the file with the desired format
    else {
      this.initialize();
    }
  }

  readLog() {
    let data = null;
    try {
      data = fs.readFileSync(__dirname + "\\..\\logs\\" + this.filename, "utf8", function(err) {
          if(err) return err;
          return true;
      });
    } catch (error) {
      console.log(error);
    }
    return data;
  }

  writeLog(info) {
    const data = this.readLog();
    let arr = [];
    if (data) {
      arr = JSON.parse(data);
    }
    //add data
    arr.push(info);
    //convert it back to json
    const json = JSON.stringify(arr);
    try {
      // Writing the array again
      fs.writeFileSync(__dirname + "\\..\\logs\\" + this.filename, json, "utf8", function(err) {
          if(err) return err;
          return true;
      });
    } catch (error) {
      console.log(error);
    }
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit("logged", info);
    });
    // Perform the writing
    this.writeLog(info);

    callback();
  }
};
