var m = require("mithril");

var Layout = {
  view: function(vnode) {
    // return m("section", vnode.children);
    return m("", [
      m("ul.tab.tab-block", [
        m("li.tab-item", [
          m("a[href='#!/live']", {class: m.route.get() === "/live" ? "active" : "" }, [m("div.circle"), " Live"])
        ]),
        m("li.tab-item", [
          m("a[href='#!/pro']", {class: m.route.get() === "/pro" ? "active" : "" }, "Pro")
        ]),
        m("li.tab-item", [
          m("a[href='#!/pub']", {class: m.route.get() === "/pub" ? "active" : "" }, "Pub")
        ])
      ]),
      vnode.children
    ]);
  }
};

module.exports = Layout;