var m = require("mithril");

var Hero = require("../models/Hero");
var Match = require("../models/Match");
var Rank = require("../utils/Rank");
var winrate = require("../utils/Winrate");

var Live = {
  oninit: function() {
    console.log("oninit:live");

    Promise.all([
      Hero.loadList(),
      Match.loadLiveList()
    ]).then(function() {
      console.log("then:live");
      Rank.generateList(Hero, Match);
    });
  },
  view: function() {
    console.log("view:live");

    if(!Match.list.length && !("1" in Hero.list)) {
      return m(".loading-wrapper", [
        m(".loading.loading-lg", "")
      ]); 
    }

    return m(".meta-list", Rank.list.map(function(item, index) {
      return m(".meta-list-item", [m(".meta-row", [
        m(".columns", [
          m(".column.col-2.col-sm-3", [
            m("img", {class: "meta-img", src: "https://res.cloudinary.com/metahero/image/upload/v1539853210/" + Hero.list[item.hero_id].img.split("/").splice(-1)[0]})
          ]),
          m(".column.col-7.col-sm-6.col-xs-5", [
            m(".text-dark", Hero.list[item.hero_id].localized_name),
            m("", [
              m("span.text-gray", [m("small", "Played in ")]),
              m("mark", [m("b.text-large", item.rank),m("small", "/100")]),
              m("span.text-gray", [m("small", " top games now.")])
            ])
          ]),
          m(".column.col-3.col-sm-3.col-xs-4.text-right", [
            m("span.chip", ["rank", m.trust("&nbsp;"), m("b", [m("small", "#")], (index+1) )]),
            m("span.chip", ["win", m.trust("&nbsp;"), m("b", winrate(Hero.list[item.hero_id]), [m("small", "%")])])
          ])
        ]),
      ]),m(".divider"),"\n"]);
    }));
  }
};

module.exports = Live;