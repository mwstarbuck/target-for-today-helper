import React, { useContext, useEffect, useState, useRef } from 'react';
import b17 from '../Images/b17.jpeg';
import { actionEnum } from '../Utilities/Utilities';
import GameContext from './GameContext';
import { tableEnum } from "../Data/Tables";
import { optionsEnum as options } from "../Data/Options";
import Select from 'react-select';
import './GamePage.css'
import { Popover, Radio } from 'antd';
import tableImageEnum from '../Images/Tables/TableEnum';
import tableNoteEnum from '../Images/TableNotes/TableNoteEnum';
import ZonesModal from '../Modals/ZonesModal';
import TableModal from '../Modals/TableModal';
import TableCard from './CardComponents/TableCard';
import MessageCard from './CardComponents/MessageCard';
import MessageAndRadioCard from './CardComponents/MessageAndRadioCard';
import YesOrNoCard from './CardComponents/YesOrNoCard';
import ButtonActionCard from './CardComponents/ButtonActionCard';
import SelectCard from './CardComponents/SelectCard';
import CombatStatusCard from './CardComponents/CombatStatusCard';
import ModalCard from './CardComponents/ModalCard';
import ModalYesOrNoCard from './CardComponents/modalYesOrNoCard';
import DamageModal from '../Modals/DamageModal/DamageModal';

const Card = (props) => {
  const { actionType, tableImageDependency, cardTableDependency, modalTableDependency, cardTable, modalTable, messageType, inputRequired } = props;
  const ctx = useContext(GameContext);
  const [advance, setAdvance] = useState(false);
  const [selectValue, setSelectValue] = useState(null);
  const [inputValue, setInputValue] = useState(null);
  const [showMods, setShowMods] = useState(false);
  const [showZoneModal, setShowZoneModal] = useState(false);
  const [showTableModal, setShowTableModal] = useState(false);
  const [showDamageModal, setShowDamageModal] = useState(false);
  const [goToNextCard, setGoToNextCard] = useState('');
  const [elligibleFighters, setElligibleFighters] = useState('');

  const startStep = 0;
  const preMission = 1;
  const takeOff = 15;
  const zoneMove = 17;
  const combat = 24
  const newAttackAngles = 30;

  const selectRef = useRef();

  const contextEnum = {
    'setCampaign': ctx?.setCampaign,
    'setStep': ctx?.setStep,
    'setBomber': ctx?.setBomber,
    'setTimePeriod': ctx?.setTimePeriod,
    'setNoseTurret': ctx?.setNoseTurret,
    'setCrew': ctx?.setCrew,
    'setTargetType': ctx?.setTargetType,
    'setTarget': ctx?.setTarget,
    'setCell': ctx?.setCell,
    'setBomberNumber': ctx?.setBomberNumber,
    'setModifiers': ctx?.setModifiers,
    'modifiers': ctx?.modifiers,
    'setZones': ctx?.setZones,
    'setCurrentZone': ctx?.setCurrentZone,
    'currentZone': ctx?.currentZone,
    'outbound': ctx?.outbound,
    'aircraft': ctx?.bomber,
    'resistance': ctx?.zonesInfo?.find(z => z.zone === ctx.currentZone)?.resistance,
    'escort': ctx?.escort
  }

  const optionsEnum = {
    'aircraft': ctx?.campaign?.aircraft,
    'timePeriod': ctx?.campaign?.timePeriod,
    'targetType': options['targetType'],
    'zones': options['zones']
  }

  const action = actionEnum[props.action];

  // useEffect(() => {
  //   if (inputRequired === 'none') {
  //     setAdvance(true);
  //   }
  // }, []);
  useEffect(() => {
    if (inputRequired === 'weather') {
      setAdvance(true);
    }
  }, [ctx?.weather]);

  useEffect(() => {
    if (inputRequired === 'escort') {
      setAdvance(true);
    }
  }, [ctx?.escort]);
  useEffect(() => {
    if (inputRequired === 'resistance') {
      setAdvance(true);
    }
  }, [ctx?.resistance]);
  useEffect(() => {
    if (inputRequired === 'contrails') {
      setAdvance(true);
    }
  }, [ctx?.contrails]);
  useEffect(() => {
    if (inputRequired === 'waves') {
      setAdvance(true);
    }
  }, [ctx?.waveTotal]);

  const getMethodParamsEtc = () => {
    switch (props.action) {
      case 'processResult':
        const pRParams = {
          maxValue: props.maxValue,
          modifiers: props.modifiers,
          diceType: props.diceType,
          table: props.table,
          setter: contextEnum[props.setter.setterA]
        }
        return pRParams;
        break;
      case 'rollCrew':
        const crewInfo = contextEnum[props.setter.setterA];
        return crewInfo;
        break;
      case 'getBomberPosition':
        const bPParams = {
          setCell: contextEnum[props.setter.setterA],
          setBomberNumber: contextEnum[props.setter.setterB],
          setModifiers: contextEnum[props.setter.setterC],
          modifiers: contextEnum[props.modifiers]
        }
        return bPParams;
        break;
      case 'zoneMovement':

        const zMParams = {
          setter: ctx.setCurrentZone,
          value: ctx.currentZone,
          outbound: ctx.outbound,
          zones: ctx.zones,
          setWeather: ctx.setWeather,
          setResistance: ctx.setResistance,
          setContrails: ctx.setContrails,
          setWaveTotal: ctx.setWaveTotal,
          setWaveCount: ctx.setWaveCount
        }

        return zMParams;
        break;
      default:
        break;
    }
  }
  const params = getMethodParamsEtc();
  // let methodInfo;

  const getVariableTable = (sourceList, dependency, endList) => {
    let table;
    switch (dependency) {
      case 'aircraft':
        const aircraft = contextEnum['aircraft'];
        table = sourceList.find(t => t.match.includes(aircraft))
        endList.push({
          table: tableImageEnum[table.table],
          diceType: table.diceType,
          title: table.title,
          note: tableNoteEnum[table.note]
        });
        break;
      case 'campaign':
        const campaign = contextEnum['campaign'];
        table = sourceList[campaign - 1];
        endList.push({
          table: tableImageEnum[table.table],
          diceType: table.diceType,
          title: table.title,
          note: tableNoteEnum[table.note]
        })
        break;
      // endList.push(sourceList.find(t => t.match.includes(campaign)));
      default:
        break;
    }
  }
  const cardTableSrc = [];
  const modalTableSrc = [];
  let cardMessage;
  switch (actionType) {
    case 'tableForCard':
      if (cardTableDependency) {
        switch (cardTableDependency) {
          case 'campaign':
            const table = cardTable[ctx.campaign.campaign - 1];
            cardTableSrc.push({
              table: tableImageEnum[table.table],
              diceType: table.diceType,
              title: table.title,
              note: tableNoteEnum[table.note]
            })
          // break;
        }
      }
      else {
        cardTable.forEach(t => {
          cardTableSrc.push({
            table: tableImageEnum[t.table],
            diceType: t.diceType,
            title: t.title,
            note: tableNoteEnum[t.note]
          })

        })
      }
      break;

    case 'tableCardZoneClick':
      if (cardTableDependency) {
        switch (cardTableDependency) {
          case 'campaign':
            const table = cardTable[ctx.campaign.campaign - 1];
            cardTableSrc.push({
              table: tableImageEnum[table.table],
              diceType: table.diceType,
              title: table.title,
              note: tableNoteEnum[table.note]
            })
            break;
        }
      }
      else {
        cardTable.forEach(t => {
          cardTableSrc.push({
            table: tableImageEnum[t.table],
            diceType: t.diceType,
            title: t.title,
            note: tableNoteEnum[t.note]
          })

        })
      }
      break;

    case 'tableModal':
      if (modalTableDependency) {
        getVariableTable(modalTable, modalTableDependency, modalTableSrc)
      }
      else {
        modalTable.forEach(t => {
          modalTableSrc.push({
            table: tableImageEnum[t.table],
            diceType: t.diceType,
            title: t.title,
            note: tableNoteEnum[t.note]
          })

        })
      }
      break;

    case 'cardModalCombo':
      if (cardTableDependency) {
        getVariableTable(cardTable, cardTableDependency, cardTableSrc)
      }
      else {
        cardTable.forEach(t => {
          cardTableSrc.push({
            table: tableImageEnum[t.table],
            diceType: t.diceType,
            title: t.title,
            note: tableNoteEnum[t.note]
          })
        })
      }
      if (modalTableDependency) {
        getVariableTable(modalTable, modalTableDependency, modalTableSrc)
      }
      else {
        modalTable.forEach(t => {
          modalTableSrc.push({
            table: tableImageEnum[t.table],
            diceType: t.diceType,
            title: t.title,
            note: tableNoteEnum[t.note]
          })
        })
      }
      break;

    default:
      break;
  }
  const getMessage = () => {
    if (messageType) {
      switch (messageType) {
        case 'fighterNumberTable':
          cardMessage = props.message.find(t => t.match.includes(ctx.timePeriod)).message;
          console.log(cardMessage)
          break;
        case 'combatStatus':
          cardMessage = props.message.find(t => t.match.includes(ctx.waveCount)).message;
          console.log(cardMessage)
          break;
        default:
          break;
      }
    }
  }
  getMessage();

  const stepOptions = props.options ? optionsEnum[props.options] : [];

  // const cardAction = <>
  //   {props.hasAction && props.actionType === 'roll' && <button onClick={() => action(params)} className='card__button'>{props.actionText}</button>}
  // </>

  const nextStep = () => {
    if (props.nextCardTest) {
      switch (props.cardTestName) {
        case 'radioResult':
          if (goToNextCard) {
            ctx.setStep(ctx.step + 1);
            setGoToNextCard(null);
            setAdvance(false);
          }
          else {
            if (ctx.round === 1) {
              ctx.setStep(ctx.step + 3); //skips new attack angles card
              setGoToNextCard(null);
              setAdvance(false);
            }
            else {
              ctx.setStep(ctx.step + 2); //skips new attack angles card
              setGoToNextCard(null);
              setAdvance(false);
            }
          }
          break;
        case 'survivingFighters':
          if (goToNextCard) {
            ctx.setStep(ctx.step + 1);
            setGoToNextCard(null);
            setAdvance(false);
          }
          else {
            if (ctx.waveCount === ctx.waveTotal) {
              ctx.setWaveCount('done');
              ctx.setStep(27);
              setAdvance(false);
              setGoToNextCard(null);
            }
            else if (ctx.waveCount > ctx.waveTotal) {
              ctx.setStep(zoneMove);
              setAdvance(false);
              setGoToNextCard(null);
            }
            else {
              ctx.setWaveCount(ctx.waveCount + 1);
              ctx.setRound(1);
              ctx.setStep(27);
              setGoToNextCard(null);
              setAdvance(false);
            }
          }
          break;
        case 'abortOrBail':
          if (!goToNextCard) {
            ctx.setStep(ctx.step + 1);
            setGoToNextCard(null);
            setAdvance(false);
          }
          else {
            ctx.setOutbound(false);
            ctx.setStep(26);
            setAdvance(false);
            setGoToNextCard(null);
          }
          break;
        case 'hitsOnBomber':
          if (goToNextCard) {
            ctx.setStep(ctx.step + 1);
            setGoToNextCard(null);
            setAdvance(false);
          }
          else {
            if (ctx.waveCount === ctx.waveTotal) {
              ctx.setStep(27);
              ctx.setWaveCount('done');
              ctx.setWaveTotal(0);
              ctx.setRound(1);
              setGoToNextCard(null);
              setAdvance(false);
            }
            else {
              ctx.setWaveCount(ctx.waveCount + 1);
              ctx.setRound(1);
              ctx.setStep(27);
              setGoToNextCard(null);
              setAdvance(false);
            }
          }
          break;
        case 'moreHits':
          if (!goToNextCard) {
            if (ctx.round === 3) {
              if (ctx.waveCount === ctx.waveTotal) {
                ctx.setWaveCount('done');
                ctx.setWaveTotal(0);
                ctx.setStep(27);
                setGoToNextCard(null);
                setAdvance(false);
              }
              else {
                ctx.setWaveCount(ctx.waveCount + 1);
                ctx.setRound(1);
                ctx.setStep(27);
                setGoToNextCard(null);
                setAdvance(false);
              }
            }
            else {
              ctx.setRound(ctx.round + 1)
              ctx.setStep(27);
              setGoToNextCard(null);
              setAdvance(false);
            }
          }
          else {
            ctx.setStep(38);
            setGoToNextCard(null);
            setAdvance(false);
          }
          break;
        case 'goCombatTest':
          const drm = ctx.zonesInfo.find(z => z.zone === ctx.currentZone).drm;
          console.log(drm);
          if (drm === 'N/A') {
            ctx.setStep(zoneMove)
            setAdvance(false);
          }
          else {
            ctx.setStep(ctx.step + 1);
            ctx.setRound(1);
            setAdvance(false);
          }
          break;
        case 'resistance':
          const resistance = ctx.zonesInfo.find(z => z.zone === ctx.currentZone).resistance;
          if (resistance === 'none') {
            ctx.setStep(zoneMove);
            setAdvance(false);
          }
          else {
            ctx.setStep(ctx.step + 1);
            setAdvance(false);
          }
          break;
        case 'waves':
          const waves = ctx.zonesInfo.find(z => z.zone === ctx.currentZone).waves; //change to ctx.waveTotal
          if (ctx.waveCount === 0) {
            ctx.setStep(zoneMove);
            setAdvance(false);
          }
          else if (ctx.waveCount === 'done') {
            ctx.setStep(zoneMove);
            ctx.setWaveCount(0);
            setAdvance(false);
          }
          else if (ctx.round > 1) {
            ctx.setStep(newAttackAngles);
            ctx.setWaveCount(0);
            setAdvance(false);
          }
          else {
            ctx.setStep(ctx.step + 1);
            setAdvance(false);
          }
          break;
        case 'skillRoll':
          console.log(ctx.round);
          if (ctx.round === 1) {
            ctx.setStep(ctx.step + 1);
            setAdvance(false);
          }
          else {
            ctx.setStep(ctx.step + 2);
            setAdvance(false);
          }
          break;
        case 'nextZone':
          ctx.setStep(zoneMove);
          setAdvance(false);
          break;
        case 'rollResistance':
          const zone = ctx.currentZone;
          const campaign = ctx.campaign.campaign;
          const outbound = ctx.outbound;
          switch (campaign) {
            case 1:
              if (zone === 6 && outbound) {
                ctx.setStep(ctx.step + 1);
              }
              else
                ctx.setStep(ctx.step + 2);

              setAdvance(false);
              break;
            case 2:
              if ((zone === 6 || zone === 11) && outbound === 'outbound')
                ctx.setStep(ctx.step + 1);
              else
                ctx.setStep(ctx.step + 2);

              setAdvance(false);
              break;
            case 3:
              if ((zone === 6 || zone === 11 || zone === 12) && outbound)
                ctx.setStep(ctx.step + 1);
              else
                ctx.setStep(ctx.step + 2);

              setAdvance(false);
              break;
            case 4:
              if ((zone === 8 || zone === 10 || zone === 13) && outbound)
                ctx.setStep(ctx.step + 1);
              else
                ctx.setStep(ctx.step + 2);

              setAdvance(false);
              break;
            case 5:
              if ((zone === 8 || zone === 10) && outbound)
                ctx.setStep(ctx.step + 1);
              else
                ctx.setStep(ctx.step + 2);

              setAdvance(false);
              break;
            case 6:
              if ((zone === 6 || zone === 11) && outbound)
                ctx.setStep(ctx.step + 1);
              else
                ctx.setStep(ctx.step + 2);

              setAdvance(false);
              break;
            default:
              break;
          }
        default:
          break;
      }
    }
    else {
      ctx.setStep(ctx.step + 1);
      setAdvance(false);
      setSelectValue(null);
    }
  }

  const lastStep = () => {
    if (ctx.step > 0) {
      if (ctx.step === 1) {
        ctx.setCampaign(null);
      }
      if (ctx.gameStep?.skipBack) {
        ctx.setStep(ctx.step - ctx.gameStep.skipBack);
        if (props.setter) {
          for (const [key, value] of Object.entries(props.setter)) {
            contextEnum[value](null);
          }
        }
        setAdvance(false);
        setSelectValue(null);
      }
      else {
        if (props.setter) {
          for (const [key, value] of Object.entries(props.setter)) {
            contextEnum[value](null);
          }
        }
        // contextEnum[props.setter](null);
        ctx.setStep(ctx.step - 1);
        setAdvance(false);
        setSelectValue(null);
      }

    }
  }
  const onSelect = (selection) => {
    const setter = contextEnum[props.setter.setterA]
    setSelectValue(selection);
    setter(selection.value);
    setAdvance(true);
  }

  const onInput = (e) => {
    const input = e.target.value;
    setInputValue(input);
  }

  const onSubmit = () => {
    const setter = contextEnum[props.setter.setterA]
    setter(inputValue);
    setAdvance(true);
  }

  const onRadioChange = (e) => {
    const value = e.target.value
    setGoToNextCard(value);
    setAdvance(true);
  }

  const updateCombat = () => {
    if (ctx.waveCount < ctx.waveTotal) {
      //Elligible fighters?
      //Round < 3?
    }
  }

  const getRound = () => {
    if (messageType) {
      switch (messageType) {
        case 'combatStatus':
          cardMessage = props.message.find(t => t.match.includes(ctx.waveCount)).message;
          console.log(cardMessage)
          break;
        default:
          break;
      }
    }
  }

  return <div className='card'>
    <Popover open={showMods}
      color='white'
      trigger='click'
      overlayStyle={{ width: 300, border: '2 solid grey', opacity: 1 }}
      overlayInnerStyle={{ width: 300, border: '2 solid grey', opacity: 1 }}
      onOpenChange={() => setShowMods(!showMods)}
      placement='bottom'
      content={showMods && <div ><ul>{ctx?.modifiers?.map(m => <li style={{ color: 'red' }}>{m.modifier}</li>)}</ul></div>}>
      <button onClick={() => setShowMods(!showMods)}>Roll Mods</button>
    </Popover>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <img src={b17} style={{ opacity: 0.6, paddingTop: 30, paddingLeft: 75, paddingRight: 75 }} />
      <h2 style={{ marginBottom: -5 }}>{props.heading}</h2>
      {props.subHeading && <h3>{props.subHeading}</h3>}
      <p style={{ paddingLeft: '1rem', paddingRight: '1rem' }} >{props.description}</p>

      {props.cardTable && (props.actionType === 'tableForCard' || props.actionType === 'tableCardZoneClick') &&
        <TableCard
          note={cardTableSrc[0].note}
          table={cardTableSrc[0].table} />
      }
      {props.actionType === 'cardMessage' &&
        <MessageCard
          cardMessage={cardMessage}
          lastStep={lastStep}
          nextStep={nextStep}
        />
      }
      {props.actionType === 'cardMessage&Radio' &&
        <MessageAndRadioCard
          cardMessage={cardMessage}
          onRadioChange={onRadioChange}
          goToNextCard={goToNextCard}
          lastStep={lastStep}
          nextStep={nextStep}
          advance={advance} />
      }
      {props.actionType === 'yesOrNo' &&
        <YesOrNoCard
          cardMessage={cardMessage}
          onRadioChange={onRadioChange}
          goToNextCard={goToNextCard}
          radioDetails={props.radioDetails}
          lastStep={lastStep}
          nextStep={nextStep}
          advance={advance} />
      }
      {props.actionType === 'combatStatus' &&
        <CombatStatusCard
          cardMessage={cardMessage}
          round={ctx.round}
          lastStep={lastStep}
          nextStep={nextStep}
          waveCount={ctx?.waveCount}
          waveTotal={ctx?.waveTotal}
        />
      }
      {props.additionalInfo &&
        <div style={{ fontSize: 11, fontWeight: 800, margin: '1rem', border: '1px solid grey' }}>
          <h3>Additional Info:</h3>
          <ul style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', textAlign: 'left' }}>
            {props.additionalInfo.map((ai, i) => <li key={i}>{ai}</li>)}
          </ul>
        </div>}
      <i style={{ fontSize: 14, marginBottom: props.hasAction ? 0 : 10 }}>{props.reference}</i>
      {!props.isIncrement && (props.actionType === 'roll' || props.actionType === 'click') &&
        <ButtonActionCard
          params={params}
          actionText={props.actionText}
          outbound={ctx.setOutbound}
          setOutbound={ctx.setOutbound}
          lastStep={lastStep}
          nextStep={nextStep}
          action={action}
          setAdvance={setAdvance}
          advance={advance} />
      }
      {!props.isIncrement && props.actionType === 'select' &&
        <SelectCard
          selectRef={selectRef}
          stepOptions={stepOptions}
          onSelect={onSelect}
          selectValue={selectValue}
          lastStep={lastStep}
          nextStep={nextStep}
          advance={advance} />
      }
      {props.actionType === 'input' &&
        <div className='input'>
          <input onChange={onInput} />
          <button onClick={() => {
            onSubmit();
          }}
            className='card__button'>
            {props.actionText}
          </button>
        </div>
      }
      {!props.isIncrement && props.actionType === 'modal' && <>
        <button onClick={() => {
          setShowZoneModal(true);
          // setAdvance(true);
        }}
          className='card__button'>
          {props.actionText}
        </button>
      </>
      }
      {!props.isIncrement && props.actionType === 'tableModal' && <>
        <ModalCard setShowModal={setShowTableModal} actionText={props.actionText} />
      </>
      }
      {!props.isIncrement && props.actionType === 'tableModalYesNo' && <>
        <ModalYesOrNoCard
          setShowTableModal={setShowTableModal}
          actionText={props.actionText}
          cardMessage={cardMessage}
          onRadioChange={onRadioChange}
          goToNextCard={goToNextCard}
          radioDetails={props.radioDetails}
          radioQuestion={props.radioQuestion} />
        {/* <button onClick={() => {
          setShowTableModal(true);
        }}
          className='card__button'>
          {props.actionText}
        </button> */}
      </>
      }
      {props.actionType === 'damageModal' && <>
        <ModalCard setShowModal={setShowDamageModal} actionText={props.actionText} />
      </>
      }
      {(props.actionType === 'none' || props.actionType === 'tableForCard') &&
        <>
          {/* <div>
            <button style={{ float: 'left' }} onClick={() => lastStep()} className='card__goback'>Go Back</button>
            <button style={{ float: 'right' }} onClick={() => nextStep()} className='card__advance'>Next Step</button>
          </div> */}
        </>
      }
      {!props.isIncrement && props.actionType === 'cardModalCombo' && <>
        <div style={{ alignItems: 'center' }}>
          <Popover trigger='hover' content={<img src={cardTableSrc[0].note} style={{ opacity: 0.8, paddingTop: 10, alignSelf: 'baseline' }} />}>
            <img src={cardTableSrc[0].table} style={{ opacity: 0.6, paddingTop: 10, alignSelf: 'baseline' }} />
          </Popover>
        </div>
        <button onClick={() => {
          setShowTableModal(true);
        }}
          className='card__button'>
          {props.actionText}
        </button>
      </>
      }
      {inputRequired === 'none' ? <span><button style={{ float: 'left' }} onClick={() => lastStep()} className='card__goback'>Go Back</button>
        <button style={{ float: 'right' }} onClick={() => nextStep()} className='card__advance'>Next Step</button></span>
        : <div>
          <button style={{ float: 'left' }} onClick={() => lastStep()} className='card__goback'>Go Back</button>
          {advance && <button style={{ float: 'right' }} onClick={() => nextStep()} className='card__advance'>Next Step</button>}
        </div>}

    </div>
    <ZonesModal
      onSelect={onSelect}
      options={stepOptions}
      showZoneModal={showZoneModal}
      setShowZoneModal={setShowZoneModal}
      zones={ctx.zones}
      setZonesInfo={ctx.setZonesInfo} />
    <TableModal
      showModal={showTableModal}
      setShowModal={setShowTableModal}
      source={modalTableSrc}
      diceType={props.diceType}
    />
    <DamageModal
      showModal={showDamageModal}
      setShowModal={setShowDamageModal} />
  </div>
}

export default Card;