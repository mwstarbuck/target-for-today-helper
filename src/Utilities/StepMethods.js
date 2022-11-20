export const radioResultStep = (goToNextCard, setStep, step, setGoToNextCard, setAdvance, round) => {
  if (goToNextCard) {
    setStep(step + 1);
    setGoToNextCard(null);
    setAdvance(false);
  }
  else {
    if (round === 1) {
      setStep(step + 3); //skips new attack angles card
      setGoToNextCard(null);
      setAdvance(false);
    }
    else {
      setStep(step + 2); //skips new attack angles card
      setGoToNextCard(null);
      setAdvance(false);
    }
  }
}

export const survivingFightersStep = (goToNextCard, setStep, step, setWaveCount, waveCount, waveTotal, setRound, setGoToNextCard, setAdvance, zoneMove) => {
  if (goToNextCard) {
    setStep(step + 1);
    setGoToNextCard(null);
    setAdvance(false);
  }
  else {
    if (waveCount === waveTotal) {
      setWaveCount('done');
      setStep(27);
      setAdvance(false);
      setGoToNextCard(null);
    }
    else if (waveCount > waveTotal) {
      setStep(zoneMove);
      setAdvance(false);
      setGoToNextCard(null);
    }
    else {
      setWaveCount(waveCount + 1);
      setRound(1);
      setStep(27);
      setGoToNextCard(null);
      setAdvance(false);
    }
  }

}