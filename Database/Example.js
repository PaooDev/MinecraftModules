import * as Database from "./Modules/Database.js"

Database.set("key", "value")
Database.get("key") // Output : value
Database.set("key1", "value2")

Database.gets() // Output : ["key:value", "key1:value2"]

// Example in Balance
Database.set(`Balance_PlayerName`, 5000) // You can use playername to set balance
Database.set(`Balance_Paoeni`, 1500)

for (const player of world.getPlayers()) { // Getting all player money in server / world
  let balance = Database.get(`Balance_${player.nameTag}`)
  console.log(`${player.nameTag} : ${balance}`)
}

// If you want to get all player money (even the player is offline), you can use this
let Balance_Database = Database.gets().filter(data => {
  if (data.key.startsWith("Balance_") {
    let playerName = data.key.substring("Balance_".length)
    let playerMoney = data.value
    console.log(`${playerName} : ${playerMoney}`) // Output : "PlayerName : 5000", "Paoeni : 1500"
  }
})
