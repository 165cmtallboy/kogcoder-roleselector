import { CacheType, GuildMemberRoleManager, Interaction, Role, TextChannel } from "discord.js";
import "dotenv/config";

function zenkaku2Hankaku(str: string) {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s: string) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
}


export default async function ModalCallback(interaction: Interaction<CacheType>){
    if (!interaction.isModalSubmit()) return;

    if(interaction.customId === "join-main" || interaction.customId === "join-tmp"){
        if(!interaction.member)
            return;

        let studentID = interaction.fields.getTextInputValue("student-id");
        const studentName = interaction.fields.getTextInputValue("student-name");
        const studentPhone = interaction.fields.getTextInputValue("student-phone");
        studentID = zenkaku2Hankaku(studentID);
        
        let targetRoleName = "";
        if(interaction.customId === "join-main"){
            // 本参加の場合は年度にする
            const year = studentID.slice(2,4);
            targetRoleName = `20${year}年度`;
        }else{
            targetRoleName = "仮参加";
        }
        
        // ロールを取得
        const role = interaction.guild?.roles.cache.find(role => role.name === targetRoleName);
        if(!role){
            await interaction.reply({
                content: "ロールが不明。管理者に問い合わせてください。",
                ephemeral: true
            });
            return;
        }

        // 年度とかの他ロールの削除
        const memberRoles = interaction.member.roles as GuildMemberRoleManager;
        memberRoles.cache.forEach((role: Role) => {
            if(role.name.includes("年度") || role.name === "仮参加")
                memberRoles.remove(role);
        });

        memberRoles.add(role);
        
        await interaction.reply({
            content: `${targetRoleName}として参加しました。変更する場合は上から変更してください。`,
            ephemeral: true
        });

        // 管理チャンネルに情報を投下
        await ((await (interaction.client.channels.fetch(process.env.LOG_CHANNEL || "")) as TextChannel).send({
            content: `${interaction.customId},${studentID},${studentName},${studentPhone}`
        }));
    }
}