import { getExercises, getBodyParts, getEquipment } from './exercises'

const exercises = getExercises();

export default function getWorkout() {
  const legExercises = exercises.filter(e => e.mainBodyPart === "Legs")
  const chestExercises = exercises.filter(e => e.mainBodyPart === "Chest")
  const armExercises = exercises.filter(e => e.mainBodyPart === "Arms")
  const coreExercises = exercises.filter(e => e.mainBodyPart === "Core")

  return [
    getRandomExercises(legExercises),
    getRandomExercises(chestExercises),
    getRandomExercises(armExercises),
    getRandomExercises(coreExercises),
  ]
}

function getRandomExercises(arr) {
  const len = arr.length;

  if (len === 3) return arr;
  else if (len < 3) throw new Error('Can\'t get 3 exercises if we don\'t have 3 exercises')

  const randomNumbers = [];
  for (let i = 0; i < 3; i++) {
    let num = getRandomNum(len);
    while (randomNumbers.includes(num)) {
      num = getRandomNum(len);
    }
    randomNumbers.push(num);
  }
  return randomNumbers.map(num => {
    return arr[num];
  })
}

function getRandomNum(max) {
  return Math.floor(Math.random() * max);
}