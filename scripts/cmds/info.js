
const fs = require('fs');
const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "info",
    version: "1.4",
    author: "Kyle",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "Sends information about the bot and admin along with an image."
    },
    longDescription: {
      vi: "",
      en: "Sends information about the bot and admin along with an image."
    },
    category: "utility",
    guide: {
      en: "{pn}"
    },
    envConfig: {}
  },

  onStart: async function ({ message }) {
    const botName = "symer AI";
    const botPrefix = "#";
    const authorName = "symer Steve berondo";
    const authorFB = "https://www.facebook.com/SymerSteveBerondo";
    const authorInsta = "Mr Symer";
    const status = "single";

    const urls = JSON.parse(fs.readFileSync('sandy.json'));
    const link = urls[Math.floor(Math.random() * urls.length)];

    // Get current date and time in Asia/Kathmandu timezone
    const now = moment().tz('Asia/Kathmandu');
    const date = now.format('MMMM Do YYYY');
    const time = now.format('h:mm:ss A');

    // Get Nepali date
    const nepaliDate = new NepaliDate(now.toDate());
    const bsDateStr = nepaliDate.format("dddd, DD MMMM");

    // Calculate bot uptime
    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));
    const uptimeString = `${hours}hrs: ${minutes}min: ${seconds}sec`;

    message.reply({
      body: `››››「 Bot & owner Info 」‹‹‹‹\n❀Bot Name: ${botName}\n🤖Bot Prefix: ${botPrefix}\n👤AuthorName: ${authorName}\n🔲FB: ${authorFB}\n🔳Insta: ${authorInsta}\n🟢Status: ${status}\n📆Date: ${date}\n📆Date:  ${bsDateStr}\n⏰Time: ${time}\n⚡Bot Running: ${uptimeString}\n☤☤☤☤☤☤☤☤☤☤☤☤☤☤☤☤☤`,
      attachment: await global.utils.getStreamFromURL(link)
    });
  },

  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "info") {
      this.onStart({ message });
    }
  }
};
