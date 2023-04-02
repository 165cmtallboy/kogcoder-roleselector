import { ActionRowBuilder, CacheType, Interaction, SelectMenuBuilder, SelectMenuComponentOptionData, StringSelectMenuBuilder } from "discord.js";
import { grades } from "../conf";

export default async function Here(interaction: Interaction<CacheType>){
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "here") {
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
        
    
                
        await interaction.reply("おけ");
        await interaction.channel?.send({ content: "参加を承認するために、下から参加年度を選択してください。", components: [row] });
    }    
}