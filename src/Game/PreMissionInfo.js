import React, { useContext } from 'react';
import GameContext from './GameContext';
import { PRE_MISSION_STEPS } from '../Data/GameSteps';
import Card from './Card';

const PreMissionInfo = (props) => {
  const ctx = useContext(GameContext);
  const { step, isIncrement } = props;
  const [gameStep, setGameStep] = React.useState(null)

  React.useEffect(() => {
    if (step > 0) {
      if (step === 3) {
        if (ctx.bomber === 'B-24J') {
          const nextStep = PRE_MISSION_STEPS.find(s => s.id === step)
          setGameStep(nextStep);
        }
        else {
          ctx.setStep(ctx.step + 1)
        }
      }
      else {
        const nextStep = PRE_MISSION_STEPS.find(s => s.id === step)
        console.log(nextStep);
        setGameStep(nextStep);
      }
    }
  }, [step])
  return <>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card title={gameStep?.heading}
        description={gameStep?.instruction}
        reference={gameStep?.reference}
        additionalInfo={gameStep?.additionalInfo}
        hasAction={gameStep?.hasAction}
        action={gameStep?.action}
        actionText={gameStep?.actionText}
        actionType={gameStep?.actionType}
        modifiers={gameStep?.modifiers}
        maxValue={gameStep?.maxValue}
        diceType={gameStep?.diceType}
        table={gameStep?.table}
        setter={gameStep?.setter}
        options={gameStep?.options} />
    </div>
  </>
}

export default PreMissionInfo;