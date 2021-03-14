"use strict";
/**
 * Esse arquivo index dentro da pasta de rotas (routes) é o arquivo que centraliza todas as
 * rotas da aplicacao, dentro da pasta routes as rotas sao criadas, contudo as rotas so sao acionadas
 * se colocadas dentro do index, pois ele centraliza e direcionada cada requisição para a rota correta
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var appointments_routes_1 = __importDefault(require("./appointments.routes")); // primeira roda de uma entidade da aplicacao
var users_routes_1 = __importDefault(require("./users.routes"));
var routes = express_1.Router();
// quando chegar uma requisicao em des.: http://localhost:3333/appointments sera direcionada
// para a rota appointments.routes.ts pois eh ela que expoe o objeto de rota appointmentsRouter
routes.use('/appointments', appointments_routes_1.default);
routes.use('/users', users_routes_1.default);
exports.default = routes;
