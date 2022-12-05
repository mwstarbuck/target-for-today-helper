import React, { useContext, useState, useEffect } from 'react';
import { Row, Col, Radio, Divider, Checkbox } from 'antd';
import GameContext from '../../Game/GameContext';

const BomberGuns = ({ angle, level }) => {
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
          guns.push({ gun: 'Ball Turr.' });
          if (bomber === 'B-17F' || bomber === 'B-24D')
            guns.push({ gun: 'Nose Gun', inoperable: nose.noseGun });
          if (bomber === 'B-17G')
            guns.push({ gun: 'Chin Turr.', inoperable: nose.noseGun });
          if (bomber === 'B-24J')
            guns.push({ gun: 'Nose Turr.', inoperable: nose.noseGun });
        }
        break;
      case '1:30':
        if (level === 'high') {
          guns.push({ gun: 'Top Turr.', inoperable: pilotComp.tTurretInoperable }, { gun: 'Right Wst.', inoperable: 'todo' });
          if (bomber === 'B-17F' || bomber === 'B-17G' || bomber === 'B-24D')
            guns.push({ gun: 'Right Chk', inoperable: nose.rightCheekGun });
          if (bomber === 'B-24J')
            guns.push({ gun: 'Nose Turr.', inoperable: nose.noseGun });
        }
        if (level === 'level') {
          guns.push({ gun: 'Top Turr.', inoperable: pilotComp.tTurretInoperable });
          if (bomber === 'B-17F' || bomber === 'B-17G' || bomber === 'B-24D')
            guns.push({ gun: 'Right Chk', inoperable: nose.rightCheekGun });
          if (bomber === 'B-17G')
            guns.push({ gun: 'Chin Turr.', inoperable: nose.noseGun });
          if (bomber === 'B-24J')
            guns.push({ gun: 'Nose Turr.', inoperable: nose.noseGun });
        }
        if (level === 'low') {
          guns.push({ gun: 'Ball Turr.', inoperable: 'todo' });
          if (bomber === 'B-17F' || bomber === 'B-17G' || bomber === 'B-24D')
            guns.push({ gun: 'Right Chk', inoperable: nose.rightCheekGun });
          if (bomber === 'B-17F' || bomber === 'B-17G' || bomber === 'B-24D' || bomber === 'B-24J')
            guns.push({ gun: 'Right Wst', inoperable: 'todo' });
          if (bomber === 'B-17G')
            guns.push({ gun: 'Chin Turr.', inoperable: nose.noseGun });
          if (bomber === 'B-24J')
            guns.push({ gun: 'Nose Turr.', inoperable: nose.noseGun });
        }
        break;
      case '3:00':
        if (level === 'high') {
          guns.push({ gun: 'Top Turr.', inoperable: pilotComp.tTurretInoperable }, { gun: 'Right Wst.', inoperable: 'todo' });
          
        }
        if (level === 'level') {
          guns.push({ gun: 'Top Turr.', inoperable: pilotComp.tTurretInoperable });
          
        }
        if (level === 'low') {
          guns.push({ gun: 'Ball Turr.', inoperable: 'todo' });
      
        }
        break;
      case '6:00':
        if (level === 'high') {
          guns.push({ gun: 'Top Turr.', inoperable: pilotComp.tTurretInoperable }, { gun: 'Right Wst.', inoperable: 'todo' });

        }
        if (level === 'level') {
          guns.push({ gun: 'Top Turr.', inoperable: pilotComp.tTurretInoperable });

        }
        if (level === 'low') {
          guns.push({ gun: 'Ball Turr.', inoperable: 'todo' });

        }
        break;
      case '9:00':
        if (level === 'high') {
          guns.push({ gun: 'Top Turr.', inoperable: pilotComp.tTurretInoperable }, { gun: 'Right Wst.', inoperable: 'todo' });

        }
        if (level === 'level') {
          guns.push({ gun: 'Top Turr.', inoperable: pilotComp.tTurretInoperable });

        }
        if (level === 'low') {
          guns.push({ gun: 'Ball Turr.', inoperable: 'todo' });

        }
        break;
      case '10:30':
        if (level === 'high') {
          guns.push({ gun: 'Top Turr.', inoperable: pilotComp.tTurretInoperable }, { gun: 'Right Wst.', inoperable: 'todo' });

        }
        if (level === 'level') {
          guns.push({ gun: 'Top Turr.', inoperable: pilotComp.tTurretInoperable });

        }
        if (level === 'low') {
          guns.push({ gun: 'Ball Turr.', inoperable: 'todo' });

        }
        break;
      case 'Vertical Dive':
        guns.push({ gun: 'Top Turr.', inoperable: 'todo' });
        break;
      case 'Vertical Climb':
        guns.push({ gun: 'Ball Turr.', inoperable: 'todo' });
        break;
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


  return <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 0, paddingLeft: 8 }}>
    {elligibleGuns?.map(g => <Checkbox /*disabled={g.inoperable}*/ value={g.gun}>{g.gun}</Checkbox>)}
  </div>
}

export default BomberGuns;