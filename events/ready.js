module.exports = async (client) => {
  console.log(`
    Fully operational, ready to play!
    
    Logged in as ${client.user.tag}
    [+] Authorized with Discord
    `);

  try {
    await client.user.setActivity(`Sword Art Online`, {
      type: "PLAYING",
    });
    await client.user.setStatus("dnd");
  } catch (e) {}
};
