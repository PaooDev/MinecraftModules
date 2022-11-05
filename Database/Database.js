// Importing Minecraft Module
import {
  world,
  Location
} from "@minecraft/server";

const overworld = world.getDimension("overworld")
async function runCommand(command, dim) {
  let dimension = dim || "overworld"
  try {
    return { error: false, ...await world.getDimension(dimension).runCommandAsync(command) };
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

/**
 * Create database
 * @param {string} key 
 * @param {string} value 
 */
function set(key, value) {
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

/**
 * Get database value
 * @param {string} key
 * @returns {string}
 */
function get(key) {
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

/**
 * Check if database have key
 * @param {string} key 
 * @returns {boolean}
 */
function has(key) {
  let db = get(key)
  if (db == undefined) return false;
  return true
}

/**
 * Get all database
 * @returns {string[]}
 */
function gets() {
  let db_dummy = setting()
  let db = db_dummy.getTags()
  return db
}

/**
 * Remove or Delete database
 * @param {string} key 
 */
function remove(key) {
  let db_dummy = setting()
  let db = db_dummy.getTags().find(tag => {
    let arr = tag.split(":").shift()
    if (arr == key || tag == key) return tag
  })
  if (db != undefined) {
    db_dummy.removeTag(db)
  }
}

/**
 * Remove all database
 */
function clear() {
  let db_dummy = setting()
  let db = db_dummy.getTags()
  for (const data of db) {
    remove(data)
  }
}

export { set, get, gets, remove, has, clear }
