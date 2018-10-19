var m = require("mithril");

var Layout = require("./views/Layout");
var Live = require("./views/Live");
var Pro = require("./views/Pro");
var Pub = require("./views/Pub");

m.route(document.getElementById("main"), "/live", {
  "/live": {
    render: function() {
      return m(Layout, m(Live));
    }
  },
  "/pro": {
    render: function() {
      return m(Layout, m(Pro));
    }
  },
  "/pub": {
    render: function() {
      return m(Layout, m(Pub));
    }
  }
});

// m.mount(document.getElementById("footer-inner"), {
//   oninit: function() {
//   },
//   view: function() {
//     function blink() {
//       m.route.set(m.route.get());
//     }
//     return m("h1", {onclick: blink}, "test test"+m.route.get());
//   }
// });