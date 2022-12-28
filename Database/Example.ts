import { Database } from "./index.js";

const testDatabase = new Database("test")
testDatabase.set("key", "value")
testDatabase.get("key") // will return "value"

const moneyDatabase = new Database("money")
moneyDatabase.set("PlayerName", 100)
moneyDatabase.set("Paoeni", 1000000)

moneyDatabase.get("PlayerName") // will return 100
moneyDatabase.get("Paoeni") // will return 1000000
