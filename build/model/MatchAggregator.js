"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MatchReader_1 = require("./MatchReader");
var MatchAggregator = /** @class */ (function () {
    function MatchAggregator(fileName) {
        var _this = this;
        this.fileName = fileName;
        this.matchAggs = {};
        this.days = 0;
        this.calcDaySums = function () {
            var _loop_1 = function (team) {
                var runTotals = [];
                _this.data[team].reduce(function (acc, ele) {
                    var daySum = ele.result + acc;
                    runTotals.push(daySum);
                    return daySum;
                }, 0);
                _this.matchAggs[team] = runTotals;
                _this.days = runTotals.length; // somewhat out of place
            };
            for (var team in _this.data) {
                _loop_1(team);
            }
        };
        // might make more sense in its own Reporter class
        this.reportRanks = function () {
            for (var i = 0; i < _this.days; i++) {
                console.log(i, ' ', _this.dayRank(i));
            }
        };
        // get rankings for the day and return array of top 3 teams
        this.dayRank = function (day) {
            var dayArr = [];
            for (var team in _this.matchAggs) {
                dayArr.push({ score: _this.matchAggs[team][day], name: team });
            }
            dayArr.sort(function (team1, team2) {
                if (team1.score > team2.score)
                    return 1;
                if (team1.score < team2.score)
                    return -1;
                if (team1.score === team2.score)
                    return team1.name > team2.name ? 1 : -1;
            });
            return dayArr.slice(0, 3);
        };
        this.matchReader = new MatchReader_1.MatchReader(fileName);
        this.calcDaySums();
    }
    Object.defineProperty(MatchAggregator.prototype, "data", {
        get: function () {
            return this.matchReader.data;
        },
        enumerable: true,
        configurable: true
    });
    return MatchAggregator;
}());
exports.MatchAggregator = MatchAggregator;
