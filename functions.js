"use strict";
exports.__esModule = true;
exports.f1 = exports.addStrings = void 0;
function addNumbers(a, b) {
    return a + b;
}
exports["default"] = addNumbers;
var addStrings = function (str1, str2) {
    return "".concat(str1, " ").concat(str2);
};
exports.addStrings = addStrings;
var f1 = function () {
    return true;
};
exports.f1 = f1;
// ^^ retains it return type void when assigned to another variable
var v1 = (0, exports.f1)();
