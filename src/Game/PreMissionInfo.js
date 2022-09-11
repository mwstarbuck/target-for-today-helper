import React from 'react';
import { PRE_MISSION_STEPS } from '../Data/GameSteps';
import Card from './Card';

const PreMissionInfo = (props) => {
  const { step, action } = props;
  const [gameStep, setGameStep] = React.useState(null)

  React.useEffect(() => {
    if (step > 0) {
      const nextStep = PRE_MISSION_STEPS.find(s => s.id === step)
      console.log(nextStep);
      setGameStep(nextStep);
    }
  }, [step])
  return <>
    <span style={{ display: 'flex', justifyContent: 'center' }}>
      <Card title={gameStep?.heading}
        description={gameStep?.instruction}
        reference={gameStep?.reference}
        additionalInfo={gameStep?.additionalInfo}
        hasAction={gameStep?.hasAction}
        action={action}
        actionText={gameStep?.actionText} />
    </span>
  </>
}

export default PreMissionInfo;