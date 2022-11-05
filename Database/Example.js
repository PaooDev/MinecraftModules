import * as Database from "./Modules/Database.js"

Database.set("key", "value")
Database.get("key") // Output : value
Database.set("key1", "value2")

Database.gets() // Output : ["key:value", "key1:value2"]

// Example in Balance
Database.set(`Balance_PlayerName`, 5000) // You can use playername to set balance
Database.set(`Balance_Paoeni`, 1500)
for (const player of world.getPlayers()) {
  let balance = Database.get(`Balance_${player.nameTag}`)
  console.log(`${player.nameTag} : ${balance}`)
}
