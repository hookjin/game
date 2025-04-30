const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const CHANNEL_ID = '1367073464523165800'; // replace with the ID of your channel
const MESSAGE_CONTENT = 'Please enter your desired username.\n**【6H SLOWMODE】**';

client.once('ready', () => {
    console.log('Bot is online!');
    sendMessage();
});

client.on('messageCreate', (message) => {
    // Ensure the bot doesn't respond to its own messages
    if (message.author.bot) return;

    // Check if the message is in the correct channel
    if (message.channel.id === CHANNEL_ID) {
        resendMessage();
    }
});

function sendMessage() {
    const channel = client.channels.cache.get(CHANNEL_ID);
    channel.send(MESSAGE_CONTENT).then((sentMessage) => {
        // Save the sent message ID for later deletion
        sentMessageId = sentMessage.id;
    });
}

function resendMessage() {
    const channel = client.channels.cache.get(CHANNEL_ID);
    channel.messages.fetch(sentMessageId).then((msg) => {
        msg.delete().then(() => {
            sendMessage();
        });
    });
}

client.login('MTM2NzA3NjMxNzMyMDg0MzI5NQ.GH3Ekd.dd-31xNd0FHMI_lycbLSeQ76M6roPyRXA_GQtE'); // replace with your bot token
