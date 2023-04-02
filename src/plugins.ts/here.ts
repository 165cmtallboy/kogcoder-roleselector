import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CacheType, Interaction, SelectMenuBuilder, SelectMenuComponentOptionData, StringSelectMenuBuilder } from "discord.js";
import { grades } from "../conf";

export default async function Here(interaction: Interaction<CacheType>){
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "here") {
        console.log(interaction.channelId);
        // const row = new ActionRowBuilder<SelectMenuBuilder>()
        //     .addComponents(
        //         new StringSelectMenuBuilder()
        //             .setCustomId("select-grade")
        //             .setPlaceholder("入学年度")
        //             .addOptions(
        //                 grades.map<SelectMenuComponentOptionData>(grade => ({
        //                     label: grade,
        //                     value: grade,
        //                 }))
        //             ),
        //     );
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
        //await interaction.channel?.send({ content: "参加を承認するために、下から参加年度を選択してください。", components: [row] });
        await interaction.channel?.send({ content: "KogCoderへようこそ。サークルに参加するためには、下のボタンより参加形態を選択してください。", components: [row] });
    
    }    
}