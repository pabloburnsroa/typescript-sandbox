"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
describe('borgName', () => {
    it('should give me a borg name', () => {
        const myname = (0, src_1.borgName)();
        const out = myname.match(/^Your Borg name is (\d+) of (\d+)$/);
        if (out) {
            const [_, n1, n2] = out;
            expect(parseInt(n1) <= parseInt(n2)).toBeTruthy();
        }
    });
});
