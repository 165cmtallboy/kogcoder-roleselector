import { ActionRowBuilder, APIActionRowComponent, APITextInputComponent, CacheType, Guild, GuildMember, GuildMemberRoleManager, Interaction, ModalBuilder, Role, SelectMenuBuilder, StringSelectMenuBuilder, StringSelectMenuInteraction, TextInputBuilder, TextInputStyle } from "discord.js";
import { grades } from "../conf";

export default async function Grade(interaction: Interaction<CacheType>){
    if (!interaction.isButton()) return;
	
    if(interaction.customId === "join-main" || interaction.customId === "join-tmp"){
        const main = interaction.customId === "join-main";

        const modal = new ModalBuilder()
            .setCustomId(interaction.customId)
            .setTitle(main?"本参加":"仮参加" + "申請書");

        const studentIDInput = new TextInputBuilder()
            .setCustomId("student-id")
            .setLabel("学籍番号(半角)")
            .setPlaceholder("J01122334")
            .setRequired(true)
            .setStyle(TextInputStyle.Short);

        const studentNameInput = new TextInputBuilder()
            .setCustomId("student-name")
            .setLabel("氏名")
            .setPlaceholder("田中 太郎")
            .setRequired(true)
            .setStyle(TextInputStyle.Short);


        const studentPhoneNumber = new TextInputBuilder()
            .setCustomId("student-phone")
            .setLabel("電話番号")
            .setPlaceholder("080-XXXX-XXXX")
            .setRequired(true)
            .setStyle(TextInputStyle.Short);

        const firstActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(studentIDInput);
        const secondActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(studentNameInput);
        const thirdActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(studentPhoneNumber);

        
        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);
        await interaction.showModal(modal);
    }


}