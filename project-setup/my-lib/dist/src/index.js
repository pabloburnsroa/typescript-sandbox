"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borgName = exports.introduceMyself = void 0;
const introduceMyself = (first, last) => `Mr. ${first} ${last}`;
exports.introduceMyself = introduceMyself;
const borgName = () => {
    const members = Math.round(5 + Math.random() * 5 + 1);
    const member = Math.floor(Math.random() * members) + 1;
    return `Your Borg name is ${member} of ${members}`;
};
exports.borgName = borgName;
