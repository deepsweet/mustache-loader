var expect = require("chai").expect;
var mustacheLoader = require("../index");
var fs = require("fs");
describe("MustacheLoader", function () {
    describe("Basic run", function () {
        it("runs without errors", function (done) {
            fs.readFile('test/sample.html', 'utf8', function (err, data) {
                try {
                    if (err) {
                        done(err);
                        return;
                    }
                    var results = mustacheLoader.apply({query : {}}, [data]);
                    var module = {};
                    eval(results);
                    expect(module.exports).to.not.be.undefined;
                    expect(module.exports).to.be.a("function");
                    var templateResults = module.exports({ a: 5 });
                    expect(templateResults).to.be.equal("<html>\n\
    <head></head>\n\
    <body>\n\
        <div>5</div>\n\
    </body>\n\
</html>")
                    done();
                }
                catch (e) {
                    done(e);
                }
            })
        });

        it("permits dynamic render functions", function (done) {
            fs.readFile('test/sample.html', 'utf8', function (err, data) {
                try {
                    if (err) {
                        done(err);
                        return;
                    }
                    var render = function () {
                        return { a: 5 };
                    };
                    var results = mustacheLoader.apply({query : { render: render }}, [data]);
                    var module = {};
                    eval(results);
                    expect(module.exports).to.not.be.undefined;
                    expect(module.exports).to.be.a("function");
                    var templateResults = module.exports();
                    expect(templateResults).to.be.equal("<html>\n\
    <head></head>\n\
    <body>\n\
        <div>5</div>\n\
    </body>\n\
</html>")
                    done();
                }
                catch (e) {
                    done(e);
                }
            })
        });
    });
    describe("Minify", function () {
        it("runs quickly", function (done) {
           fs.readFile('test/sample.html', 'utf8', function (err, data) {
                try {
                    if (err) {
                        done(err);
                        return;
                    }
                    var results = mustacheLoader.apply({query: "?minify"}, [data]);
                    var module = {};
                    eval(results);
                    expect(module.exports).to.not.be.undefined;
                    expect(module.exports).to.be.a("function");
                    var templateResults = module.exports({ a: 5 });
                    expect(templateResults).to.be.equal("<html><head></head><body><div>5</div></body></html>")
                    done();
                }
                catch (e) {
                    done(e);
                }
            })
        });
    });
});
