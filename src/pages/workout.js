import { getExercises, getBodyParts, getEquipment } from "./exercises"
import { standard, lower, upper, core } from "./plans"

const NUM_ROUNDS = 4

const exercises = getExercises()
console.log(exercises)

export default function getWorkout(focus, equipment) {
  const workoutStructure = getWorkoutFocus(focus)
  const exercisesForEquipment = exercises.filter(e =>
    equipment.includes(e.category)
  )

  const legExercises = exercisesForEquipment.filter(
    e => e.mainBodyPart === "Legs"
  )
  const upperBodyExercises = exercisesForEquipment.filter(
    e => e.mainBodyPart === "Upper Body"
  )
  const wholeBodyExercises = exercisesForEquipment.filter(
    e => e.mainBodyPart === "Whole Body"
  )
  const coreExercises = exercisesForEquipment.filter(
    e => e.mainBodyPart === "Core"
  )

  const randomizedExercises = [
    ...getRandomExercises(legExercises, workoutStructure.lower),
    ...getRandomExercises(upperBodyExercises, workoutStructure.upper),
    ...getRandomExercises(coreExercises, workoutStructure.core),
    ...getRandomExercises(wholeBodyExercises, workoutStructure.body),
  ].sort((a, b) => 0.5 - Math.random())

  return splitExercisesToRounds(randomizedExercises, NUM_ROUNDS)
}

function getRandomExercises(arr, count) {
  const len = arr.length

  if (len === count) return arr
  else if (len < count) {
    console.log(arr[0])
    throw new Error(
      `Can\'t get ${count} exercises if we don\'t have ${count} exercises`
    )
  }

  const randomNumbers = []
  for (let i = 0; i < count; i++) {
    let num = getRandomNum(len)
    while (randomNumbers.includes(num)) {
      num = getRandomNum(len)
    }
    randomNumbers.push(num)
  }
  return randomNumbers.map(num => {
    return arr[num]
  })
}

function getRandomNum(max) {
  return Math.floor(Math.random() * max)
}

function getWorkoutFocus(focus) {
  switch (focus) {
    case "Upper Body":
      return upper
    case "Core":
      return core
    case "Legs":
      return lower
  }
  return standard
}

function splitExercisesToRounds(exercises, numRounds) {
  const rounds = []
  const numExercises = exercises.length
  const exercisesPerRound = numExercises / numRounds
  let start = 0

  while (rounds.length < numRounds) {
    console.log(exercises)
    // console.log(start, start + exercisesPerRound)
    console.log(exercises.slice(start, start + exercisesPerRound))
    rounds.push(exercises.slice(start, start + exercisesPerRound))
    start += exercisesPerRound
  }
  console.log(rounds)

  return rounds
}
