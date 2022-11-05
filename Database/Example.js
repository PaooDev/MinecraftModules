import * as Database from "./Modules/Database.js"

Database.set("key", "value")
Database.get("key") // will return value

// Example in Balance
Database.set(`PlayerName_Balance`, 5000) // You can use playername to set balance
Database.set(`Paoeni_Balance`, 1500)
for (const player of world.getPlayers()) {
  Database.get(`${player.nameTag}_Balance`) // will return 5000, 1500 
}
