module.exports = {
    mode: "development",
    entry: __dirname + "/public/index.js",
    output: {
        path: __dirname + "/public/build",
        filename: "bundle.js"
    }
}