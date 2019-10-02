"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MatchAggregator_1 = require("./model/MatchAggregator");
var filename = 'input/sample-input.txt';
var agg = new MatchAggregator_1.MatchAggregator(filename);
console.log(agg.matchAggs);
