import { CacheType, Interaction } from "discord.js";

export default function Ping(interaction: Interaction<CacheType>){
    if(interaction.isChatInputCommand())
        interaction.reply("PONG!");
}