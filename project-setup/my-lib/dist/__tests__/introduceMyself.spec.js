"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
describe('introduceMyself', () => {
    it('should introduce me', () => {
        expect((0, src_1.introduceMyself)('P', 'B-R')).toEqual('Mr. P B-R');
    });
});
