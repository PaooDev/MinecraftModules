// Importing Minecraft Module
import {
  world,
  Location
} from "@minecraft/server";

const overworld = world.getDimension("overworld")

world.events.worldInitialize.subscribe(async data => {
  await setting()
})

function setting() {
  overworld.runCommandAsync("tickingarea add circle 0 0 0 4 db")
  let db_dummy = Array.from(overworld.getEntities({ type: "pao:database" }))[0]
  if (db_dummy == undefined) {
    overworld.runCommandAsync("summon pao:database 0 0 0")
  }
  db_dummy = Array.from(overworld.getEntities({ type: "pao:database" }))[0]
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
  let data = db_dummy.getTags()
  let db = []
  for (const d of data) {
    let splited = d.split(":")
    let key = splited[0]
    splited.shift()
    let value = splited.join(":")
    let dataFormat = {
      key: key,
      value: value
    }
    db.push(dataFormat)
  }
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
