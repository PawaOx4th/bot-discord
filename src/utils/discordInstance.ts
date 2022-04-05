import { ColorResolvable, MessageEmbed, WebhookClient } from "discord.js"

function getWebhookClient() {
  return new WebhookClient({
    id: `${process.env.DISCORD_ID}`,
    token: `${process.env.DISCORD_TOKEN}`
  })
}

export function onAlertMeeting() {
  const webhookClient = getWebhookClient()

  const embeb = new MessageEmbed()
    .setColor("ORANGE")
    .setTitle("💻 Team meeting.")
    .setTimestamp()
  webhookClient.send({
    embeds: [embeb]
  })
}

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
