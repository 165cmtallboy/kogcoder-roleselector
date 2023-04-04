import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CacheType, Interaction } from "discord.js";

export default async function Here(interaction: Interaction<CacheType>){
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "here") {
        console.log(interaction.channelId);
        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("join-main")
                    .setLabel("本参加")
                    .setStyle(ButtonStyle.Primary),
            );
        
        row.addComponents(
            new ButtonBuilder()
                .setCustomId("join-tmp")
                .setLabel("仮参加")
                .setStyle(ButtonStyle.Secondary),
        );
                
        await interaction.reply("おけ");
        await interaction.channel?.send({ content: "KogCoderへようこそ。サークルに参加するためには、下のボタンより参加形態を選択してください。", components: [row] });
    
    }    
}