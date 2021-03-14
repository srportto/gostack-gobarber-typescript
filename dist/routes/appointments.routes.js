"use strict";
// Responsabilidades de uma rota: Receber requisições,
// chamar outro arquivo para tratar a requisição e devolver uma resposta
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var date_fns_1 = require("date-fns");
var typeorm_1 = require("typeorm");
var AppointmentsRepository_1 = __importDefault(require("../repositories/AppointmentsRepository"));
var CreateAppointmentServices_1 = __importDefault(require("../services/CreateAppointmentServices"));
//
// startOfHour  -> transformar a hora 13:33 em 13:00, ou seja, ele starta/inicia a hora
// parseISO     -> transforma uma data de um outro padrao para ISO, padrao reconhecido pela biblioteca Date() do js
//                 Converte de string para Date()
// isEqual      -> valida se duas datas sao iguais
var appointmentsRouter = express_1.Router();
// para ca serao direcionadas todas as reuisições da rota: http://localhost:3333/appointments
// aonde abaixo sera tomada uma acao para cada metodo invocadado na rota (het, post, put, delete, ...)
appointmentsRouter.get('/', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var appointmentsRepository, appointments;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                appointmentsRepository = typeorm_1.getCustomRepository(AppointmentsRepository_1.default);
                return [4 /*yield*/, appointmentsRepository.find()];
            case 1:
                appointments = _a.sent();
                return [2 /*return*/, response.json(appointments)];
        }
    });
}); });
appointmentsRouter.post('/', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, providerId, date, parseDate, createAppointment, appointment, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = request.body, providerId = _a.providerId, date = _a.date;
                parseDate = date_fns_1.parseISO(date);
                createAppointment = new CreateAppointmentServices_1.default();
                return [4 /*yield*/, createAppointment.execute({
                        providerId: providerId,
                        date: parseDate,
                    })];
            case 1:
                appointment = _b.sent();
                return [2 /*return*/, response.json(appointment)];
            case 2:
                err_1 = _b.sent();
                return [2 /*return*/, response.status(400).json({ erro: err_1.message })];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = appointmentsRouter;
