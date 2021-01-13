const VkBot = require('node-vk-bot-api'); // Основа
const api = require('node-vk-bot-api/lib/api'); // Библиотека для получения имени в ВК
const moment = require('moment'); // Для получения даты
const token = process.env.TOKEN // Токен группы
const bot = new VkBot(token); // Авторизация в вк
const mongoose = require("mongoose"); // Модуль mongoose
const Schema = mongoose.Schema; // Создание схемы
// Подключение к mongoose
mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// Схема чата
const chatsScheme = new Schema({
    ID: Number, // ID чата
}); 
const Chat = mongoose.model("chats", chatsScheme); // сама коллекция с чатами

async function RegisterChat(ChatID)
{
    await Chat.create({ID: ChatID}); // Функция создания записи в базе данных
}
// Отслеживание всех сообщений
bot.event('message_new', async (ctx) => {
    if(ctx.message.from_id == ctx.message.peer_id)
    {
        const data = moment().utcOffset("+03:00").toObject(); // Получение даты
        const iHour = data.hours // Константа: Присваивания часа
        const iMinute = data.minutes; // Константа: Присваивания минут
        const iDay = data.day; // Констанста: получение дня
        await ctx.reply(`${iHour}:${iMinute} День: ${iDay}`)
        return true;
    }

    if(ctx.message.from_id != ctx.message.peer_id)
    {
        if (!await Chat.findOne({ID: ctx.message.peer_id}).exec())
            return await RegisterChat(ctx.message.peer_id);
    }
});
// Асинхронная функция: Поиск игроков
async function SendMessageList()
{
    const data = moment().utcOffset("+03:00").toObject(); // Получение даты
    const iHour = data.hours // Константа: Присваивания часа
    const iMinute = data.minutes; // Константа: Присваивания минут
    const iDay = data.day; // Констанста: получение дня
    /*for(const chat of await Chat.find({}))
    {
    }*/
}
// Функция бота: запуск бота
bot.startPolling(); 
// Интервал
//setInterval(SendMessageList, 3600000);
