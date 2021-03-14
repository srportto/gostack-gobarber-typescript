"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Esse arquivo importa a função createConnection da biblioteca typeorm, essa função
// busca dentro do projeto pelo arquivo ormconfig e dele pega as configurações para
// tentar estabelecer uma conexão com o banco de dados
var typeorm_1 = require("typeorm");
typeorm_1.createConnection();
