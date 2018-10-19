var m = require("mithril");

var moment = require("moment");

var Hero = {
  list: {},
  cache: {
    list: {},
    stamp: 0,
  },
  cacheExpiry: 30,

  loadList: function() {
    // Hero.list = {};

    // using cache
    var now = parseInt(moment().format("X"));
    var past = parseInt(Hero.cache.stamp);
    if(past && (now-past <= Hero.cacheExpiry)) {
      Hero.list = JSON.parse(JSON.stringify(Hero.cache.list));
      return;
    }

    // api request
    return m.request({
      method: "GET",
      url: "https://api.opendota.com/api/heroStats"
    }).then(function(result) {
      for(i in result) {
        item = result[i];

        // fix for id:121, hero_id: missing
        if(item.id === 121) {
          item.hero_id = 121;
        }

        Hero.list[item.hero_id] = item;
      }

      // updating cache
      Hero.cache.stamp = now;
      Hero.cache.list = JSON.parse(JSON.stringify(Hero.list));
    });
  }
};

module.exports = Hero;