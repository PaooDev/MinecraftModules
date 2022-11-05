// Importing Minecraft Module
import {
  world,
  Location
} from "@minecraft/server";

const overworld = world.getDimension("overworld")
async function runCommand(command) {
  try {
    return { error: false, ...await overworld.runCommandAsync(command) };
  } catch (error) {
    return { error: true };
  }
}

function setting() {
  let db_dummy = Array.from(overworld.getEntities({ type: "pao:database" }))[0]
  if(db_dummy == undefined) {
    db_dummy = overworld.spawnEntity("pao:database", new Location(0, 0, 0))
  }
  runCommand("ticking area circle 0 0 0 4 db")
  return db_dummy
}

/** Set or Create database */
function set(key : string, value : string) {
  let db_dummy = setting()
  let db = db_dummy.getTags().find(tag => {
    let arr = tag.split(":").shift()
    if (arr == key || tag == key) return tag
  })
  if (db == undefined) {
    db_dummy.addTag(key + ":" + value)
  } else {
    remove(key)
    db_dummy.addTag(key + ":" + value)
  }
}

/** Get database value */
function get(key : string) : string | undefined {
  let db_dummy = setting()
  let db = db_dummy.getTags().find(tag => {
    let arr = tag.split(":").shift()
    if (arr == key || tag == key) return tag
  })
  if (db == undefined) return undefined
  let arr = db.split(":")
  arr.shift()
  db = arr.join(":")
  return db
}

/** Check if have database */
function has(key : string) : boolean {
  let db = get(key)
  if (db == undefined) return false;
  return true
}

/** Get all database */
function gets() : string[] {
  let db_dummy = setting()
  let db = db_dummy.getTags()
  return db
}

/** Remove or Delete database */
function remove(key : string) {
  let db_dummy = setting()
  let db = db_dummy.getTags().find(tag => {
    let arr = tag.split(":").shift()
    if (arr == key || tag == key) return tag
  })
  if (db != undefined) {
    db_dummy.removeTag(db)
  }
}

/** Remove all database */
function clear() {
  let db_dummy = setting()
  let db = db_dummy.getTags()
  for (const data of db) {
    remove(data)
  }
}

export { set, get, gets, remove, has, clear }
