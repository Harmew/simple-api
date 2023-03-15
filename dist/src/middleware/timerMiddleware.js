"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timerMiddleware = void 0;
function timerMiddleware(req, res, next) {
    const time = new Date(2003, 11, 3).toLocaleTimeString();
    const timeNow = new Date().toLocaleTimeString();
    if (timeNow < time)
        res.status(400).send({ message: "Serviço indisponível" });
    else
        next();
}
exports.timerMiddleware = timerMiddleware;
