export const compareElo = (a, b) => {
  return b.elo - a.elo
}

export const compareDates= (a, b) => {
  if(b.date < a.date) {
    return -1
  }
  return 1
}

export const probability_of_win = (r1, r2) => {
  return (1.0 / (1.0 + Math.pow(10, ((r2 - r1) / 400))))
}

export const  elo_update= (rating, actual, probability) => {
  // let total_score = actual + opponent
  // let expected = probability * total_score
  const k = 30
  
  return rating + (k * (actual - probability))
}

export const calc_elo = (p1elo, p2elo, p1s, p2s) => {
  let actual_p1 = p1s > p2s ? 1.0 : 0.0
  let actual_p2 = Math.abs(1 - actual_p1)
  console.log(`P1 score: ${p1s}`)
  console.log(`P2 score: ${p2s}`)
  console.log(`P1 win? ${actual_p1}`)
  console.log(`P2 win? ${actual_p2}`)


  let prob = probability_of_win(p1elo, p2elo)
  console.log(`Probability of P1 to win: ${prob}`)
  let p1_new_elo = elo_update(p1elo, actual_p1, prob)
  console.log(`P1 initial elo: ${p1elo}`)
  console.log(`P1 updated elo: ${p1_new_elo}`)
  let p2_new_elo = elo_update(p2elo, actual_p2, 1.0 - prob)
  console.log(`P2 initial elo: ${p2elo}`)
  console.log(`P2 updated elo: ${p2_new_elo}`)
  
  return {
    p1_updated_elo: p1_new_elo,
    p2_updated_elo: p2_new_elo
  }
}