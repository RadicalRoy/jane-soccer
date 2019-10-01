"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var filename = 'input/sample-input.txt';
var lines = fs_1.default
    .readFileSync(filename, {
    encoding: 'utf-8'
})
    .split('\n');
console.log(lines);
