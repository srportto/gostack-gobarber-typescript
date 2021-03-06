"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var AlterProviderFieldToProfviderId1593963297352 = /** @class */ (function () {
    function AlterProviderFieldToProfviderId1593963297352() {
    }
    AlterProviderFieldToProfviderId1593963297352.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // para excluir uma coluna
                    // param 1: tabela
                    // param 2: coluna
                    return [4 /*yield*/, queryRunner.dropColumn('appointments', 'provider')];
                    case 1:
                        // para excluir uma coluna
                        // param 1: tabela
                        // param 2: coluna
                        _a.sent();
                        // para adicionar uma coluna
                        // param 1: tabela
                        // param 2: estrutura da coluna nova
                        return [4 /*yield*/, queryRunner.addColumn('appointments', new typeorm_1.TableColumn({
                                name: 'providerId',
                                type: 'uuid',
                                // indicando que o campo pode ser nulo
                                isNullable: true,
                            }))];
                    case 2:
                        // para adicionar uma coluna
                        // param 1: tabela
                        // param 2: estrutura da coluna nova
                        _a.sent();
                        // para criar chave estrangeira
                        // param 1: tabela que receber?? o relacionamento
                        // param 2: estrutura da coluna nova
                        return [4 /*yield*/, queryRunner.createForeignKey('appointments', new typeorm_1.TableForeignKey({
                                name: 'AppointmentProvider',
                                columnNames: ['providerId'],
                                referencedColumnNames: ['id'],
                                referencedTableName: 'users',
                                /**
                                 * O parametro abaixo descreve o que ir?? acontecer caso o id usurio que compoe
                                 * o relacionamento seja deletado da tabela, possui as sequintes op????es:
                                 *
                                 * RESTRICT - N??o deixa o usuario ser deletado enquanto existir esse relacionamento
                                 * SET NULL - Na tabela que recebe o relacionamento, esse relacionamento ficar?? preenchido com NULL
                                 * CASCADE - Quando deletado o usuario, deletar tamb??m os relacionamentos
                                 */
                                onDelete: 'SET NULL',
                                onUpdate: 'CASCADE',
                            }))];
                    case 3:
                        // para criar chave estrangeira
                        // param 1: tabela que receber?? o relacionamento
                        // param 2: estrutura da coluna nova
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AlterProviderFieldToProfviderId1593963297352.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Desfaz as a????es do metodo acima, na ordem do ultimo para o primeiro
                    // desfaz cria????o de chave estrangeira
                    // param 1: tabela que recebeu o relacionamento
                    // param 2: nome do relacionamento/coluna do relacionamento
                    return [4 /*yield*/, queryRunner.dropForeignKey('appointments', 'AppointmentProvider')];
                    case 1:
                        // Desfaz as a????es do metodo acima, na ordem do ultimo para o primeiro
                        // desfaz cria????o de chave estrangeira
                        // param 1: tabela que recebeu o relacionamento
                        // param 2: nome do relacionamento/coluna do relacionamento
                        _a.sent();
                        // desfaz cria????o da coluna providerId
                        // param 1: tabela que recebeu a coluna
                        // param 2: coluna adicionada
                        return [4 /*yield*/, queryRunner.dropColumn('appointments', 'providerId')];
                    case 2:
                        // desfaz cria????o da coluna providerId
                        // param 1: tabela que recebeu a coluna
                        // param 2: coluna adicionada
                        _a.sent();
                        // para adicionando coluna deletada
                        // param 1: tabela que teve coluna deletada
                        // param 2: estrutura da coluna nova
                        return [4 /*yield*/, queryRunner.addColumn('appointments', new typeorm_1.TableColumn({
                                name: 'provider',
                                type: 'varchar',
                            }))];
                    case 3:
                        // para adicionando coluna deletada
                        // param 1: tabela que teve coluna deletada
                        // param 2: estrutura da coluna nova
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return AlterProviderFieldToProfviderId1593963297352;
}());
exports.default = AlterProviderFieldToProfviderId1593963297352;
