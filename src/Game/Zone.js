import React, { useState } from 'react';
import { Row, Col, Radio, Checkbox, Input } from 'antd';

const {TextArea} = Input;

const Zone = () => {
  const [weatherValue, setWeatherValue] = useState(null);
  const [escortLevel, setEscortLevel] = useState(null);
  const [contrails, setContrails] = useState(null);
  const [resistance, setResistance] = useState(null);
  const [waves, setWaves] = useState(null);
  const [formation, setFormation] = useState(null);


  const onWeatherChange = (e) => {
    setWeatherValue(e.target.value);
  }

  const onEscortChange = (e) => {
    setEscortLevel(e.target.value);
  }

  const onContrailsChange = (e) => {
    setContrails(e.target.value);
  }

  const onResistanceChange = (e) => {
    setResistance(e.target.value);
  }

  const onWaveChange = (e) => {
    setWaves(e.target.value);
  }

  const onFormationChange = (e) => {
    setFormation(e.target.value);
  }

  return <Row gutter={[1, 1]}>
    <Col span={2}><div className='zoneCellText'>Zone</div></Col>
    <Col span={4}><div className='zoneCellText'>DRM / Locatation</div></Col>
    <Col span={10}><div className='zoneCellText'>Weather</div></Col>
    <Col span={8}><div className='zoneCellText'>Fighter Escort Level</div></Col>
    <Col span={2}><div className='zoneCellText'>1</div></Col>
    <Col span={4}><div className='zoneCellText'>-2/W</div></Col>
    <Col span={10}>
      <div className='zoneCell'>
        <Col>
          <Radio.Group style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }} onChange={onWeatherChange} value={weatherValue}>
            <Radio value={'clear'}><span style={{ fontWeight: weatherValue === 'clear' ? 600 : 500 }}>Clear</span></Radio>
            <Radio value={'haze'}><span style={{ fontWeight: weatherValue === 'haze' ? 600 : 500 }}>Haze</span></Radio>
            <Radio value={'50% clouds'}><span style={{ fontWeight: weatherValue === '50% clouds' ? 600 : 500 }}>50% Clouds</span></Radio>
            <Radio value={'100% clouds'}><span style={{ fontWeight: weatherValue === '100% clouds' ? 600 : 500 }}>100% Clouds</span></Radio>
          </Radio.Group>
        </Col>
      </div></Col>
    <Col span={8}>
      <div className='zoneCell'>
        <Radio.Group name='escortLevel' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }} onChange={onEscortChange} value={escortLevel}>
          <Radio value={'none'}><span style={{ fontWeight: escortLevel === 'none' ? 600 : 500 }}>None</span></Radio>
          <Radio value={'poor'}><span style={{ fontWeight: escortLevel === 'poor' ? 600 : 500 }}>Poor</span></Radio>
          <Radio value={'fair'}><span style={{ fontWeight: escortLevel === 'fair' ? 600 : 500 }}>Fair</span></Radio>
          <Radio value={'good'}><span style={{ fontWeight: escortLevel === 'good' ? 600 : 500 }}>Good</span></Radio>
        </Radio.Group>
      </div>
    </Col>
    <Col span={10}>
      <Row>
      <Col span={12}>
        <div className='zoneCell'>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            Contrails:
            <Radio.Group name='contrails' onChange={onContrailsChange} value={contrails}>
              <Radio value={'yes'}><span style={{ fontWeight: contrails === 'yes' ? 600 : 500 }}>Yes</span></Radio>
              <Radio value={'no'}><span style={{ fontWeight: contrails === 'no' ? 600 : 500 }}>No</span></Radio>
            </Radio.Group>
          </div>
        </div>
      </Col>
      <Col span={12}>
        <div className='zoneCell'>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            Enemy Fighter Resistance:
            <Radio.Group name='resistance' onChange={onResistanceChange} value={resistance}>
              <Radio value={'none'}><span style={{ fontWeight: resistance === 'none' ? 600 : 500 }}>None</span></Radio>
              <Radio value={'light'}><span style={{ fontWeight: resistance === 'light' ? 600 : 500 }}>Light</span></Radio>
              <Radio value={'moderate'}><span style={{ fontWeight: resistance === 'moderate' ? 600 : 500 }}>Moderate</span></Radio>
              <Radio value={'heavy'}><span style={{ fontWeight: resistance === 'heavy' ? 600 : 500 }}>Heavy</span></Radio>
            </Radio.Group>
          </div>
        </div>
      </Col>
        <Col span={12}>
          <div className='zoneCell'>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              Enemy Attack Waves:
              <Radio.Group name='waves' onChange={onWaveChange} value={waves}>
                <Radio value={'none'}><span style={{ fontWeight: waves === 'none' ? 600 : 500 }}>None</span></Radio>
                <Radio value={'1'}><span style={{ fontWeight: waves === '1' ? 600 : 500 }}>1</span></Radio>
                <Radio value={'2'}><span style={{ fontWeight: waves === '2' ? 600 : 500 }}>2</span></Radio>
                <Radio value={'3'}><span style={{ fontWeight: waves === '3' ? 600 : 500 }}>3</span></Radio>
              </Radio.Group>
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className='zoneCell'>
            <div style={{ display: 'flex', flexDirection: 'column', height: 45, paddingTop: 8  }}>
              Enemies Removed: ______________________
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className='zoneCell'>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              Formation:&emsp;
              <Radio.Group name='waves' onChange={onFormationChange} value={formation}>
                <Radio value={'in'}><span style={{ fontWeight: formation === 'in' ? 600 : 500 }}>In</span></Radio>
                <Radio value={'out'}><span style={{ fontWeight: formation === 'out' ? 600 : 500 }}>Out</span></Radio>
                <Radio value={'disrupted'}><span style={{ fontWeight: formation === 'disrupted' ? 600 : 500 }}>Disrupted</span></Radio>
              </Radio.Group>
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className='zoneCell'>
          <Checkbox>Below 10K Feet or Less</Checkbox>
          </div>
        </Col>
      </Row>      
    </Col>
    <Col span={14}>
      <div className='zoneCell'>
        <TextArea rows={5}/>
      </div>
    </Col>
  </Row>
}

export default Zone;