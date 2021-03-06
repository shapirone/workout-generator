import json from "../data/workouts.json"

const NUM_COLUMNS = 10

function formatExercises() {
  if (json && json.feed) {
    const entries = json.feed.entry
    const columns = entries.splice(0, NUM_COLUMNS).reduce((acc, val) => {
      const column = val["gs$cell"].col
      const colName = val["content"]["$t"].replace(/\s/g, "")
      const value = colName[0].toLowerCase() + colName.slice(1)
      acc[column] = value
      return acc
    }, {})

    const rows = entries.reduce((acc, val) => {
      const row = val["gs$cell"].row
      const column = val["gs$cell"].col
      const colName = columns[column]
      const content = val["content"]["$t"]
      if (!acc[row]) acc[row] = {}
      if (content) acc[row][colName] = content
      return acc
    }, {})

    const exercises = Object.values(rows).map(e =>
      e.referenceVideo
        ? {
            ...e,
            sides: e.sides === "TRUE",
            timed: e.timed === "TRUE",
            referenceVideo: e.referenceVideo.replace("watch?v=", "embed/"),
          }
        : e
    )
    const equipment = [...new Set(exercises.map(e => e.category))].filter(
      cat => cat
    )
    const bodyParts = [...new Set(exercises.map(e => e.mainBodyPart))].filter(
      part => part
    )

    return {
      bodyParts,
      exercises,
      equipment,
    }
  } else {
    return {}
  }
}

const formattedExercises = formatExercises()

export function getExercises() {
  return formattedExercises.exercises
}

export function getBodyParts() {
  return formattedExercises.bodyParts
}
export function getEquipment() {
  return formattedExercises.equipment
}
