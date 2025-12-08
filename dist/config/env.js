"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv/config");
exports.config = {
    port: process.env.PORT || 5000,
    db: {
        userName: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    },
    jwt: {
        accessSecret: process.env.ACCESS_SECRET
    }
};
//# sourceMappingURL=env.js.map