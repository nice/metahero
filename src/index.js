var m = require("mithril");
var moment = require("moment");

var Layout = require("./views/Layout");
var Live = require("./views/Live");
var Pro = require("./views/Pro");
var Pub = require("./views/Pub");
var Footer = require("./views/Footer");
var dummy = require("./utils/Dummy");

dummy.timestamp = moment().format("X");

m.route(document.getElementById("main"), "/live", {
  "/live": {
    render: function() {
      return m(Layout, [m(Live, {key: dummy.timestamp}), m(Footer, {key: dummy.timestamp})]);
    }
  },
  "/pro": {
    render: function() {
      return m(Layout, [m(Pro, {key: dummy.timestamp}), m(Footer, {key: dummy.timestamp})]);
    }
  },
  "/pub": {
    render: function() {
      return m(Layout, [m(Pub, {key: dummy.timestamp}), m(Footer, {key: dummy.timestamp})]);
    }
  }
});
