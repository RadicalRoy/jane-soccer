"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var MatchResult;
(function (MatchResult) {
    MatchResult[MatchResult["W"] = 3] = "W";
    MatchResult[MatchResult["L"] = 0] = "L";
    MatchResult[MatchResult["T"] = 1] = "T";
})(MatchResult = exports.MatchResult || (exports.MatchResult = {}));
var MatchReader = /** @class */ (function () {
    function MatchReader(fileName) {
        var _this = this;
        this.fileName = fileName;
        // Track data by team using an array to represent sequential days of data
        // simple rolling aggregate later
        this.raw = [];
        this.data = {};
        this.read = function (fileName) {
            var lines = fs_1.default
                .readFileSync(fileName, {
                encoding: 'utf-8'
            })
                .split('\n')
                .filter(function (line) { return line != ''; }); // empty lines
            // save raw data
            _this.raw = lines;
        };
        this.parseRaw = function () {
            // Read each line (match) into TeamMatchData object
            _this.raw.forEach(function (line) {
                var _a = line.split(', '), team1 = _a[0], team2 = _a[1];
                // parse name and score
                var team1Score = _this.getTeamScore(team1);
                var team2Score = _this.getTeamScore(team2);
                // create match data
                var team1Data = {
                    score: team1Score.score,
                    result: _this.compareScores(team1Score.score, team2Score.score),
                    opponent: team2Score.name
                };
                var team2Data = {
                    score: team2Score.score,
                    result: _this.compareScores(team2Score.score, team1Score.score),
                    opponent: team1Score.name
                };
                // add to data record
                if (_this.data[team1Score.name]) {
                    _this.data[team1Score.name].push(team1Data);
                }
                else {
                    _this.data[team1Score.name] = [team1Data];
                }
                if (_this.data[team2Score.name]) {
                    _this.data[team2Score.name].push(team2Data);
                }
                else {
                    _this.data[team2Score.name] = [team2Data];
                }
            });
        };
        // helper function to parse raw text
        this.getTeamScore = function (team) {
            var teamArr = team.split(' ');
            var score = parseInt(teamArr[teamArr.length - 1]); // score is last entry
            teamArr.pop(); // remove score
            var name = teamArr.join(' '); // join for full name
            return { name: name, score: score };
        };
        // returns the match result for the first team
        this.compareScores = function (t1Score, t2Score) {
            var result = t1Score > t2Score ? 'W' : t1Score === t2Score ? 'T' : 'L';
            return MatchResult[result];
        };
        this.read(fileName);
        this.parseRaw();
    }
    return MatchReader;
}());
exports.MatchReader = MatchReader;
