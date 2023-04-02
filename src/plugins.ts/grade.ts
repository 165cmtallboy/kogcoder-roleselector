import { CacheType, Guild, GuildMember, GuildMemberRoleManager, Interaction, Role, StringSelectMenuInteraction } from "discord.js";

export default async function Grade(interaction: Interaction<CacheType>){
    if (!interaction.isStringSelectMenu()) return;

    if (interaction.customId === "select-grade") {
        if(!interaction.member)
            return;

        console.log(interaction.values);
        const targetRoleName = interaction.values[0];

        const role = interaction.guild?.roles.cache.find(role => role.name === targetRoleName);
        if(!role){
            await interaction.reply({
                content: "ロールが不明。管理者に問い合わせてください。",
                ephemeral: true
            });
            return;
        }
        const memberRoels = interaction.member.roles as GuildMemberRoleManager;

        memberRoels.cache.forEach((role: Role) => {
            if(role.name.includes("年度"))
                memberRoels.remove(role);
        });

        memberRoels.add(role);
        
        interaction.reply({
            content: `${targetRoleName}として参加しました。変更する場合は上から変更してください。`,
            ephemeral: true
        });

    }
}