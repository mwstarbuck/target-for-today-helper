import React, { useState, useContext, useEffect } from 'react';
import { Row, Col, Radio, Checkbox, Input } from 'antd';
import GameContext from './GameContext';

const { TextArea } = Input;

const Zone = () => {
  const ctx = useContext(GameContext);
  const [weatherValue, setWeatherValue] = useState(ctx?.zonesInfo?.find(z => z.zone === ctx?.currentZone)?.weather || null);
  const [escortLevel, setEscortLevel] = useState(ctx?.zonesInfo?.find(z => z.zone === ctx?.currentZone)?.escort || null);
  const [contrails, setContrails] = useState(null);
  const [resistance, setResistance] = useState(null);
  const [waves, setWaves] = useState(null);
  const [formation, setFormation] = useState(null);

  useEffect(() => {
    if (ctx.outbound) {
      setWeatherValue(ctx.weather);
      setContrails(ctx.contrails);
      setResistance(ctx.resistance);
      setWaves(ctx.waveTotal);
    }
  })
  const onWeatherChange = (e) => {
    const value = e.target.value
    setWeatherValue(value);
    let zones = ctx.zonesInfo;
    for (const zone of zones) {
      if (zone.zone === ctx.currentZone) {
        zone.weather = value
        break;
      }
    }
    ctx.setZonesInfo(zones);
    ctx.setWeather(value);
  }

  const onEscortChange = (e) => {
    const value = e.target.value
    setEscortLevel(value);
    let zones = ctx.zonesInfo;
    for (const zone of zones) {
      if (zone.zone === ctx.currentZone) {
        zone.escort = value
        break;
      }
    }
    ctx.setZonesInfo(zones)
    ctx.setEscort(value);
  }

  const onContrailsChange = (e) => {
    // setContrails(e.target.value);
    const value = e.target.value
    setContrails(value);
    let zones = ctx.zonesInfo;
    for (const zone of zones) {
      if (zone.zone === ctx.currentZone) {
        zone.resistance = value
        break;
      }
    }
    ctx.setZonesInfo(zones)
    ctx.setContrails(value);
  }

  const onResistanceChange = (e) => {
    const value = e.target.value
    setResistance(value);
    let zones = ctx.zonesInfo;
    for (const zone of zones) {
      if (zone.zone === ctx.currentZone) {
        zone.resistance = value
        break;
      }
    }
    ctx.setZonesInfo(zones);
    ctx.setResistance(value);
  }

  const onWaveChange = (e) => {
    setWaves(e.target.value);
    const value = e.target.value
    setWaves(value);
    ctx.setWaveTotal(value);
    let zones = ctx.zonesInfo;
    for (const zone of zones) {
      if (zone.zone === ctx.currentZone) {
        zone.waves = value
        break;
      }
    }
    if (value > 0) {
      ctx.setWaveCount(1);
      ctx.setRound(1)
    }
    else {
      ctx.setWaveCount(0);
      ctx.setRound(1);
    }
    ctx.setZonesInfo(zones);
  }

  const onFormationChange = (e) => {
    setFormation(e.target.value);
  }

  return <Row gutter={[1, 1]}>
    <Col span={2}><div className='zoneCellHeader'>Zone</div></Col>
    <Col span={3}><div className='zoneCellHeader'>DRM / Locatation</div></Col>
    <Col span={10}><div className='zoneCellHeader'>Weather</div></Col>
    <Col span={9}><div className='zoneCellHeader'>Fighter Escort Level</div></Col>
    <Col span={2}><div className='zoneCellText'>{ctx.zonesInfo && ctx.zonesInfo[ctx.currentZone - 1]?.zone}</div></Col>
    <Col span={3}><div className='zoneCellText'>{ctx.zonesInfo && `${ctx.zonesInfo[ctx.currentZone - 1]?.drm} / ${ctx.zonesInfo[ctx.currentZone - 1]?.location}`}</div></Col>
    <Col span={10}>
      <div className='zoneCell'>
        <Col>
          <Radio.Group name='weather' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }} onChange={onWeatherChange} value={weatherValue}>
            <Radio value={'clear'}><span style={{ fontWeight: weatherValue === 'clear' ? 600 : 500 }}>Clear</span></Radio>
            <Radio value={'haze'}><span style={{ fontWeight: weatherValue === 'haze' ? 600 : 500 }}>Haze</span></Radio>
            <Radio value={'50% clouds'}><span style={{ fontWeight: weatherValue === '50% clouds' ? 600 : 500 }}>50% Clouds</span></Radio>
            <Radio value={'100% clouds'}><span style={{ fontWeight: weatherValue === '100% clouds' ? 600 : 500 }}>100% Clouds</span></Radio>
          </Radio.Group>
        </Col>
      </div></Col>
    <Col span={9}>
      <div className='zoneCell'>
        <Radio.Group name='escortLevel' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }} onChange={onEscortChange} value={escortLevel}>
          <Radio value={'none'}><span style={{ fontWeight: escortLevel === 'none' ? 600 : 500 }}>None</span></Radio>
          <Radio value={'poor'}><span style={{ fontWeight: escortLevel === 'poor' ? 600 : 500 }}>Poor</span></Radio>
          <Radio value={'fair'}><span style={{ fontWeight: escortLevel === 'fair' ? 600 : 500 }}>Fair</span></Radio>
          <Radio value={'good'}><span style={{ fontWeight: escortLevel === 'good' ? 600 : 500 }}>Good</span></Radio>
        </Radio.Group>
      </div>
    </Col>
    <Col span={12}>
      <Row>
        <Col span={10}>
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
        <Col span={14}>
          <div className='zoneCell'>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              Enemy Fighter Resistance:
              <Radio.Group name='resistance' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}
                onChange={onResistanceChange} value={resistance}>
                <Radio value={'none'}><span style={{ fontWeight: resistance === 'none' ? 600 : 500 }}>None</span></Radio>
                <Radio value={'light'}><span style={{ fontWeight: resistance === 'light' ? 600 : 500 }}>Light</span></Radio>
                <Radio value={'moderate'}><span style={{ fontWeight: resistance === 'moderate' ? 600 : 500 }}>Moderate</span></Radio>
                <Radio value={'heavy'}><span style={{ fontWeight: resistance === 'heavy' ? 600 : 500 }}>Heavy</span></Radio>
              </Radio.Group>
            </div>
          </div>
        </Col>
        <Col span={10}>
          <div className='zoneCell'>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              Enemy Attack Waves:
              <Radio.Group name='waves' onChange={onWaveChange} value={waves}>
                <Radio value={0}><span style={{ fontWeight: waves === 'none' ? 600 : 500 }}>None</span></Radio>
                <Radio value={1}><span style={{ fontWeight: waves === '1' ? 600 : 500 }}>1</span></Radio>
                <Radio value={2}><span style={{ fontWeight: waves === '2' ? 600 : 500 }}>2</span></Radio>
                <Radio value={3}><span style={{ fontWeight: waves === '3' ? 600 : 500 }}>3</span></Radio>
              </Radio.Group>
            </div>
          </div>
        </Col>
        <Col span={14}>
          <div className='zoneCell'>
            <div style={{ display: 'flex', flexDirection: 'column', height: 45, paddingTop: 8 }}>
              Enemies Removed: ______________________
            </div>
          </div>
        </Col>
        <Col span={14}>
          <div className='zoneCell'>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              Formation:&emsp;
              <Radio.Group name='formation' onChange={onFormationChange} value={formation}>
                <Radio value={'in'}><span style={{ fontWeight: formation === 'in' ? 600 : 500 }}>In</span></Radio>
                <Radio value={'out'}><span style={{ fontWeight: formation === 'out' ? 600 : 500 }}>Out</span></Radio>
                <Radio value={'disrupted'}><span style={{ fontWeight: formation === 'disrupted' ? 600 : 500 }}>Disrupted</span></Radio>
              </Radio.Group>
            </div>
          </div>
        </Col>
        <Col span={10}>
          <div className='zoneCell'>
            <Checkbox>Below 10K Feet or Less</Checkbox>
          </div>
        </Col>
      </Row>
    </Col>
    <Col span={12}>
      <div className='zoneCellNotes'>
        Notes:
        {/* <TextArea rows={5}/> */}
      </div>
    </Col>
  </Row>
}

export default Zone;