import React, {useContext, useState, useEffect} from 'react';
import { Row, Col, Radio, Divider, Checkbox } from 'antd';
import GameContext from '../../GameContext';

const Guns = ({angle, level }) => {
  const ctx = useContext(GameContext);
  const [elligibleGuns, setElligibleGuns] = useState(null); //make ctx
  const [selectedGun, setSelectedGun] = useState(null); //make ctx


  const createGunList = () => {
    const bomber = ctx.bomber;
    const nose = ctx.nose;
    const pilotComp = ctx.pilotComp;
    let guns = [];
    switch (angle) {
      case '12:00':
        if (level === 'high') {
          guns.push({ gun: 'Top Turr.', inoperable: pilotComp.tTurretInoperable });
          if (bomber === 'B-17F' || bomber === 'B-24D')
            guns.push({ gun: 'Nose Gun', inoperable: nose.noseGun });
          if (bomber === 'B-24J')
            guns.push({ gun: 'Nose Turr.', inoperable: nose.noseGun });
        }
        if (level === 'level') {
          guns.push({ gun: 'Top Turr.', inoperable: pilotComp.tTurretInoperable });
          if (bomber === 'B-17F' || bomber === 'B-24D')
            guns.push({ gun: 'Nose Gun', inoperable: nose.noseGun });
          if (bomber === 'B-17G')
            guns.push({ gun: 'Chin Turr.', inoperable: nose.noseGun });
          if (bomber === 'B-24J')
            guns.push({ gun: 'Nose Turr.', inoperable: nose.noseGun });
        }
        if (level === 'low') {
          guns.push({ gun: 'Ball Turr.' })
        }
        break;
      // case '1:30':
      //   if (level === 'high') {
      //     guns.push('Top Turr.', 'Right Wst.', 'Right Chk')
      //   }
      //   if (level === 'level') {
      //     guns.push('Top Turr.', 'Right Wst.', 'Right Chk', 'Nose Gun')
      //   }
      //   if (level === 'low') {
      //     guns.push('Ball Turr.', 'Top Turr.', 'Right Wst.', 'Right Chk', 'Nose Gun')
      //   }
      //   break;

      default:
        break;
    }
    // return guns;
    setElligibleGuns(guns);
  }

  useEffect(() => {
    createGunList();
  }, [angle, level, ctx.pilotComp, ctx.nose])

  const onGunSelect = (e) => {
    const gun = e.target.value
    setSelectedGun(gun);
  }


  return <Radio.Group name='status' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 8, paddingLeft: 8 }} onChange={onGunSelect} value={selectedGun}>
    {elligibleGuns?.map(g => <Radio disabled={g.inoperable} value={g.gun}>{g.gun}</Radio>)}
  </Radio.Group>
}

export default Guns;