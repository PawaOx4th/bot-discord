import { ColorResolvable, MessageEmbed, WebhookClient } from "discord.js"

export async function sendWithWebhook(
  message: string,
  opt: { color?: ColorResolvable }
) {
  const webhookClient = new WebhookClient({
    id: `${process.env.DISCORD_ID}`,
    token: `${process.env.DISCORD_TOKEN}`
  })
  const embed = new MessageEmbed()
    .setColor(opt.color || "BLUE")
    .setDescription(`${message}   ` || "Empty...")
    .setTimestamp()

  webhookClient.send({
    embeds: [embed],
    content: `<@&929374046989193216>`
  })
}
