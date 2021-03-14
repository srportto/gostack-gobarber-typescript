// Esse arquivo importa a função createConnection da biblioteca typeorm, essa função
// busca dentro do projeto pelo arquivo ormconfig e dele pega as configurações para
// tentar estabelecer uma conexão com o banco de dados
import { createConnection } from 'typeorm';

createConnection();
