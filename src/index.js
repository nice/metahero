var m = require("mithril");
var moment = require("moment");

var Layout = require("./views/Layout");
var Live = require("./views/Live");
var Pro = require("./views/Pro");
var Pub = require("./views/Pub");
var Footer = require("./views/Footer");
var Settings = require("./views/Settings");
var dummy = require("./utils/Dummy");

dummy.timestamp = moment().format("X");

m.route(document.getElementById("main"), "/live", {
  "/live": {
    render: function() {
      return m(Layout, [
        m(Live, {key: dummy.timestamp}),
        m(Footer, {key: dummy.timestamp})
      ]);
    }
  },
  "/pro": {
    render: function() {
      return m(Layout, [
        m(Pro, {key: dummy.timestamp}),
        m(Footer, {key: dummy.timestamp})
      ]);
    }
  },
  "/pub": {
    render: function() {
      return m(Layout, [
        m(Pub, {key: dummy.timestamp}),
        m(Footer, {key: dummy.timestamp})
      ]);
    }
  }
});


m.mount(document.getElementById("settings"), Settings);
m.mount(document.getElementById("cog"), {
  view: function() {
    return m("span.#cog.c-hand", {onclick: function() {Settings.active=true;}}, [
      m("img", {
        src: "https://res.cloudinary.com/metahero/image/upload/v1539997876/cog.svg"
      })
    ]);
  }
})