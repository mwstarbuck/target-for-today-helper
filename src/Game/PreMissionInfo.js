import React, { useContext } from 'react';
import GameContext from './GameContext';
import { PRE_MISSION_STEPS } from '../Data/GameSteps';
import Card from './Card';

const PreMissionInfo = (props) => {
  const ctx = useContext(GameContext);
  const { step, isIncrement } = props;
  const [gameStep, setGameStep] = React.useState(null)

  const contingencyEnum = {
    'bomber': ctx.bomber
  }

  React.useEffect(() => {
    if (step > 0) {

      const nextStep = PRE_MISSION_STEPS.find(s => s.id === step)
      if (nextStep?.contingencyStep === true) {
        const value = contingencyEnum[nextStep?.contingencyValue];
        // console.log(value, nextStep?.contingentUpon);
        if (contingencyEnum[nextStep?.contingencyValue] === nextStep?.contingentUpon) {
          ctx.setGameStep(nextStep);
        }
        else {
          ctx.setStep(ctx.step + 1)
        }
      }
      // }
      else
        ctx.setGameStep(nextStep)
      // if (step === 3) {
      //   if (ctx.bomber === 'B-24J') {
      //     const nextStep = PRE_MISSION_STEPS.find(s => s.id === step)
      //     ctx.setGameStep(nextStep);
      //   }
      //   else {
      //     ctx.setStep(ctx.step + 1)
      //   }
      // }
      // else {
      //   const nextStep = PRE_MISSION_STEPS.find(s => s.id === step)
      //   ctx.setGameStep(nextStep);
      // }
    }
  }, [step])
  return <>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card title={ctx.gameStep?.heading}
        description={ctx.gameStep?.instruction}
        reference={ctx.gameStep?.reference}
        additionalInfo={ctx.gameStep?.additionalInfo}
        hasAction={ctx.gameStep?.hasAction}
        action={ctx.gameStep?.action}
        actionText={ctx.gameStep?.actionText}
        actionType={ctx.gameStep?.actionType}
        modifiers={ctx.gameStep?.modifiers}
        maxValue={ctx.gameStep?.maxValue}
        diceType={ctx.gameStep?.diceType}
        table={ctx.gameStep?.table}
        setter={ctx.gameStep?.setter}
        options={ctx.gameStep?.options}
        contingencyStep={ctx.gameStep?.contingencyStep}
        contingencyValue={ctx.gameStep?.contingencyValue}
        contingentUpon={ctx.gameStep?.contingentUpon}
        skipBack={ctx.gameStep?.skipBack} />
    </div>
  </>
}

export default PreMissionInfo;