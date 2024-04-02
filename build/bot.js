"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const token = "process.env.TOKEN";
const bot = new node_telegram_bot_api_1.default(token, { polling: true });
bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    if (match) {
        const resp = match[1];
        bot.sendMessage(chatId, resp);
    }
    else {
        bot.sendMessage(chatId, "Ocorreu um erro na comunicação.");
    }
});
function sendWelcomeMessage(chatId) {
    bot.sendMessage(chatId, 'Bem-vindo! Escolha uma opção:\n\n' +
        '1. Fazer cadastro\n' +
        '2. Editar cadastro\n' +
        '3. Deletar cadastro');
}
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if (msg.text && msg.text.startsWith('/')) {
        return;
    }
    if (msg.text === '/start') {
        sendWelcomeMessage(chatId);
        return;
    }
    switch (msg.text) {
        case '1':
            bot.sendMessage(chatId, 'Fazer cadastro.');
            sendWelcomeMessage(chatId);
            break;
        case '2':
            bot.sendMessage(chatId, 'Editar cadastro.');
            sendWelcomeMessage(chatId);
            break;
        case '3':
            bot.sendMessage(chatId, 'Deletar cadastro.');
            sendWelcomeMessage(chatId);
            break;
        default:
            bot.sendMessage(chatId, 'Opção inválida. Por favor, escolha uma opção válida.');
            sendWelcomeMessage(chatId);
    }
});
bot.on('polling_error', (error) => {
    console.log(error);
});
