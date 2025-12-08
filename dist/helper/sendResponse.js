"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, data) => {
    res
        .status(data.status)
        .json({
        success: data.success,
        message: data.message,
        data: data.data || null
    });
};
exports.sendResponse = sendResponse;
//# sourceMappingURL=sendResponse.js.map