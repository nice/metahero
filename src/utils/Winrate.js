module.exports = function winrate(hero) {
  var rateList = [];

  if("1_win" in hero && "1_pick" in hero) {
    rateList.push(hero["1_win"]/hero["1_pick"]);
  }
  if("2_win" in hero && "2_pick" in hero) {
    rateList.push(hero["2_win"]/hero["2_pick"]);
  }
  if("3_win" in hero && "3_pick" in hero) {
    rateList.push(hero["3_win"]/hero["3_pick"]);
  }
  if("4_win" in hero && "4_pick" in hero) {
    rateList.push(hero["4_win"]/hero["4_pick"]);
  }
  if("5_win" in hero && "5_pick" in hero) {
    rateList.push(hero["5_win"]/hero["5_pick"]);
  }
  if("6_win" in hero && "6_pick" in hero) {
    rateList.push(hero["6_win"]/hero["6_pick"]);
  }
  if("7_win" in hero && "7_pick" in hero) {
    rateList.push(hero["7_win"]/hero["7_pick"]);
  }
  if("8_win" in hero && "8_pick" in hero) {
    rateList.push(hero["8_win"]/hero["8_pick"]);
  }
  if("pro_win" in hero && "pro_pick" in hero) {
    rateList.push(hero["pro_win"]/hero["pro_pick"]);
  }

  // ret avg rate
  var sum = 0;
  var avgRate = 0;

  for(var i in rateList) {
    sum += rateList[i];
  }

  avgRate = (sum/rateList.length)*100;
  avgRate = parseFloat(avgRate.toFixed(2));
  return avgRate;
}