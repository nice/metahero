var m = require("mithril");

var Rank = require("../utils/Rank");

var Footer = {
  view: function(vnode) {
    if(!Rank.list.length) {
      return m("");
    }

    return m(".credits", [
      m(".columns", [
        m(".column.col-8.text-small", [
          m(".copyleft", m.trust("&copy")),
          m("small", " no rights reserved.")
        ]),
        m(".column.col-4.text-right", [
          m("small", "by ", [
            m("a", {href: "http://github.com/nice", "target": "_blank"}, "@nice")
          ])
        ])
      ])
    ], m(".d-hide", vnode.key));
  }
};

module.exports = Footer;