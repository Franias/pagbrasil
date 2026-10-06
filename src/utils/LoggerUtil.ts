import fs from 'node:fs';
import path from 'node:path';
import winston from 'winston';
import moment from 'moment-timezone';

/**
 * Logger central (winston) com fuso horário de São Paulo.
 * Escreve em `src/logging/test_run.log` (info+) e `src/logging/test_error.log`
 * (error), além do console.
 */
const currentDir = __dirname;
const srcDir = path.resolve(currentDir, '..');
const loggingDir = path.resolve(srcDir, 'logging');

/** Garante que o diretório de logs exista antes do winston abrir o arquivo. */
fs.mkdirSync(loggingDir, { recursive: true });

const timeZone = 'America/Sao_Paulo';

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: () => moment().tz(timeZone).format() }),
    customFormat,
  ),
  transports: [
    new winston.transports.Console({ level: 'debug' }),
    new winston.transports.File({
      filename: path.join(loggingDir, 'test_run.log'),
      maxFiles: 5,
      maxsize: 300 * 1024,
      level: 'info',
    }),
    new winston.transports.File({
      filename: path.join(loggingDir, 'test_error.log'),
      maxFiles: 5,
      maxsize: 10 * 1024,
      level: 'error',
    }),
  ],
});

export default logger;
