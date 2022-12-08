import React, {useState} from 'react';
import NumberAnglesAndLevels from './NumberAnglesAndLevels';
import { Steps, Button, message } from 'antd';

const steps = [
  {
    title: 'First',
    content: <NumberAnglesAndLevels />,
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];

const Test = () => {
  const [current, setCurrent] = useState(0);

  const {Step} = Steps
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  return (
    <>
    <br/>
      <br />
      <br />
      {/* <Steps direction='vertical' current={current} items={items} /> */}
      <Steps>
        <Step title="first" />
      </Steps>
      <div>{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </>
  );
}

export default Test;