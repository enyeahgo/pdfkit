require('dotenv').config();
const DiscordDatabase = require("discord-cloud-database");
var discordDatabase = new DiscordDatabase(process.env.TOKEN, process.env.CHANNELID);

const uploadImageMiddleware = async (req, res, next) => {
  const file = req.files[0];
  const image = await discordDatabase.uploadFile(
    file.buffer,
    file.originalname,
    { id: process.env.CHANNELID }
  );
  req.image = image;
  next();
};

const deleteImageMiddleware = async (req, res, next) => {
  const { fileId } = req.body;
  req.deleteStatus = await deleteMessageById(fileId, { id: process.env.CHANNELID });
  next();
}

module.exports = {
  uploadImageMiddleware,
  deleteImageMiddleware
}