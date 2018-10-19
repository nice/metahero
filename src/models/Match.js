var m = require("mithril");
var moment = require("moment");

var format = require("../utils/Format");

var Match = {
  list: [],
  cache: {
    liveList: [],
    liveStamp: 0,
    proList: [],
    proStamp: 0,
    pubList: [],
    pubStamp: 0,
  },
  cacheExpiry: 30,

  loadLiveList: function() {
    Match.list = [];

    // using cache
    var now = parseInt(moment().format("X"));
    var past = parseInt(Match.cache.liveStamp);
    if(past && (now-past <= Match.cacheExpiry)) {
      Match.list = Match.cache.liveList.slice();
      return new Promise(function(resolve, reject) {
        resolve("");
      });
    }

    // api request
    return m.request({
      method: "GET",
      url: "https://api.opendota.com/api/live"
    }).then(function(result) {
      Match.list = result;

      // updating cache      
      Match.cache.liveStamp = now;
      Match.cache.liveList = Match.list.slice();
    });
  },

  loadProList: function() {
    Match.list = [];

    // using cache
    var now = parseInt(moment().format("X"));
    var past = parseInt(Match.cache.proStamp);
    if(past && (now-past <= Match.cacheExpiry)) {
      Match.list = Match.cache.proList.slice();
      return new Promise(function(resolve, reject) {
        resolve("");
      });
    }

    var url = "https://api.opendota.com/api/explorer?sql=WITH match_ids AS( SELECT match_id FROM matches WHERE TRUE AND start_time > {0} ORDER BY match_id DESC NULLS LAST LIMIT 100) SELECT match_id, duration, start_time, radiant_team_id, radiant.name as radiant_name, dire_team_id, dire.name as dire_name, leagueid, leagues.name as league_name, radiant_score, dire_score, radiant_win, radiant_team, dire_team FROM matches LEFT JOIN teams radiant ON radiant.team_id = matches.radiant_team_id LEFT JOIN teams dire ON dire.team_id = matches.dire_team_id LEFT JOIN leagues USING(leagueid) LEFT JOIN ( SELECT match_id, string_agg(hero_id::text, ',') radiant_team FROM player_matches WHERE match_id IN ( SELECT match_id FROM match_ids ) AND player_slot <= 127 GROUP BY match_id ) radiant_team USING(match_id) LEFT JOIN ( SELECT match_id, string_agg(hero_id::text, ',') dire_team FROM player_matches WHERE match_id IN ( SELECT match_id FROM match_ids ) AND player_slot > 127 GROUP BY match_id ) dire_team USING(match_id) WHERE TRUE AND start_time > {0} ORDER BY match_id DESC LIMIT 100";
    var minTime = moment().subtract(3, 'day').format('X');
    url = format(url, minTime);

    // api request
    return m.request({
      method: "GET",
      url: url
    }).then(function(result) {
      Match.list = [];

      for(var i in result.rows) {  
        var row = result.rows[i];
        var radiant_team = row.radiant_team.split(',');
        var dire_team = row.dire_team.split(',');

        radiant_team = radiant_team.map(function(x) {
          return {hero_id: parseInt(x)};
        });
        dire_team = dire_team.map(function(x) {
          return {hero_id: parseInt(x)};
        });

        Match.list.push({players: radiant_team.concat(dire_team)});
      }

      // updating cache
      Match.cache.proStamp = now;
      Match.cache.proList = Match.list.slice();
    });
  },

  loadPubList: function() {
    Match.list = [];

    // using cache
    var now = parseInt(moment().format("X"));
    var past = parseInt(Match.cache.pubStamp);
    if(past && (now-past <= Match.cacheExpiry)) {
      Match.list = Match.cache.pubList.slice();
      return new Promise(function(resolve, reject) {
        resolve("");
      });
    }

    // api request
    return m.request({
      method: "GET",
      url: "https://api.opendota.com/api/publicMatches?mmr_descending=1"
    }).then(function(result) {
      Match.list = [];
      for(var i in result) {  
        var row = result[i];
        var radiant_team = row.radiant_team.split(',');
        var dire_team = row.dire_team.split(',');

        radiant_team = radiant_team.map(function(x) {
          return {hero_id: parseInt(x)};
        });
        dire_team = dire_team.map(function(x) {
          return {hero_id: parseInt(x)};
        });

        Match.list.push({players: radiant_team.concat(dire_team)});
      }

      // updating cache
      Match.cache.pubStamp = now;
      Match.cache.pubList = Match.list.slice();
    });
  }
};

module.exports = Match;