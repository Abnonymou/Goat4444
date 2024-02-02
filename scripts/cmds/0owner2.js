const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "owner2",
    aliases: ["o2"],
    author: "kshitiz",// idea and half code stolen from mirai coded by Rickiel haha
    version: "2.0",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "get bot owner info"
    },
    category: "owner",
    guide: {
      en: "{p}{n}"
    }
  },
  onStart: async function ({ api, event }) {
      try {
        const loadingMessage = "Loading owner information...";
        await api.sendMessage(loadingMessage, event.threadID);

        const ownerInfo = {
          name: 'Asmit Adhikari',
          gender: 'male',
          hobby: 'doing sex',
          relationship: 'Mingle',
          facebookLink: 'www.facebook.com',
          bio: '𝑯𝒂𝒕𝒆𝒓𝒔 𝒂𝒓𝒆 𝒎𝒚 𝒎𝒐𝒕𝒊𝒗𝒂𝒕𝒐𝒓𝒔'
        };

        const videoUrl = 'https://drive.google.com/uc?export=download&id=1uFLIV0C-yqArk-Ne-_4HfWa-KtRw4S7d';
        const tmpFolderPath = path.join(__dirname, 'tmp');

        if (!fs.existsSync(tmpFolderPath)) {
          fs.mkdirSync(tmpFolderPath);
        }

        const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
        const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

        fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

        const response = `
          𝗼𝘄𝗻𝗲𝗿 𝗶𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻:
          Name: ${ownerInfo.name}
          Gender: ${ownerInfo.gender}
          Hobby: ${ownerInfo.hobby}
          Relationship: ${ownerInfo.relationship}
          Facebook: ${ownerInfo.facebookLink}
          Status: ${ownerInfo.bio}
        `;

        await api.sendMessage({
          body: response,
          attachment: fs.createReadStream(videoPath)
        }, event.threadID);
      } catch (error) {
        console.error('Error in owner command:', error);
        api.sendMessage('An error occurred while processing the command.', event.threadID);
      }
    },
    onChat: async function({ api, event }) {
      try {
        const lowerCaseBody = event.body.toLowerCase();
        
        if (lowerCaseBody === "owner" || lowerCaseBody.startsWith("{p}owner")) {
          await this.onStart({ api, event });
        }
      } catch (error) {
        console.error('Error in onChat function:', error);
      }
    }
  };