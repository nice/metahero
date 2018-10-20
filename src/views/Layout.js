var m = require("mithril");
var moment = require("moment");

var Rank = require("../utils/Rank");
var dummy = require("../utils/Dummy");

var Layout = {
  view: function(vnode) {
    return m("", [
      m("ul.tab.tab-block", [
        m("li.tab-item", {onclick: refresh}, [
          m("a[href='#!/live']", {class: m.route.get() === "/live" ? "active" : ""}, [m("div.circle"), " Live"])
        ]),
        m("li.tab-item", {onclick: refresh}, [
          m("a[href='#!/pro']", {class: m.route.get() === "/pro" ? "active" : ""}, "Pro")
        ]),
        m("li.tab-item", {onclick: refresh}, [
          m("a[href='#!/pub']", {class: m.route.get() === "/pub" ? "active" : ""}, "Pub")
        ])
      ]),
      vnode.children
    ]);

    function refresh() {
      dummy.timestamp = moment().format("X");
    }
  }
};

module.exports = Layout;