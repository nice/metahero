var m = require("mithril");

var Rank = {
  list: [],
  generateList: function(Hero, Match) {
    // reset ranks
    Rank.list = [];
    var Hero = JSON.parse(JSON.stringify(Hero));
    var Match = JSON.parse(JSON.stringify(Match));

    for(var i in Hero.list) {
      Hero.list[i].rank = 0;
    }

    // compute ranks
    for(var i in Match.list) {
      match = Match.list[i];
      for(var j in match.players) {
        player = match.players[j];

        // hero_id: 0, not picked
        if(player.hero_id !== 0) {
          Hero.list[player.hero_id].rank++;
        }
      }
    }

    // sort based on ranks
    var heroRanks = [];
    for(var i in Hero.list) {
      var cur = Hero.list[i];
      heroRanks.push({hero_id: cur.hero_id, rank: cur.rank});
    }

    heroRanks = heroRanks.sort(function(a, b) { return b.rank - a.rank; });
    Rank.list = heroRanks.slice();
    m.redraw();
  }
};

module.exports = Rank;