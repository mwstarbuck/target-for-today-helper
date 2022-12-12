
// const inUse = (gun) => {
//   const targetAndGun = activeGuns.find(g => g.gun === gun);
//   if (targetAndGun) {
//     if (targetAndGun.id === fighter) {
//       return false;
//     }
//     else {
//       return true;
//     }
//   }
//   return false;
// }

export const createGunList = (ctx, gf) => {
  const bomber = ctx.bomber;
  const nose = ctx.nose;
  const pilotComp = ctx.pilotComp;
  let guns = [];
  switch (gf.angle) {
    case '12:00':
      if (gf.level === 'high') {
        guns.push({ gun: 'Top Turr', inoperable: pilotComp.tTurretInoperable, inUse: false, checked: false });
        if (bomber === 'B-17F' || bomber === 'B-24D')
          guns.push({ gun: 'Nose Gun', inoperable: nose.noseGun, inUse: false, checked: false });
        if (bomber === 'B-24J')
          guns.push({ gun: 'Nose Turr', inoperable: nose.noseGun, inUse: false, checked: false });
      }
      if (gf.level === 'level') {
        guns.push({ gun: 'Top Turr', inoperable: pilotComp.tTurretInoperable, inUse: false, checked: false });
        if (bomber === 'B-17F' || bomber === 'B-24D')
          guns.push({ gun: 'Nose Gun', inoperable: nose.noseGun, inUse: false, checked: false });
        if (bomber === 'B-17G')
          guns.push({ gun: 'Chin Turr', inoperable: nose.noseGun, inUse: false, checked: false });
        if (bomber === 'B-24J')
          guns.push({ gun: 'Nose Turr', inoperable: nose.noseGun, inUse: false, checked: false });
      }
      if (gf.level === 'low') {
        guns.push({ gun: 'Ball Turr', inoperable: 'todo', inUse: false, checked: false });
        if (bomber === 'B-17F' || bomber === 'B-24D')
          guns.push({ gun: 'Nose Gun', inoperable: nose.noseGun, inUse: false, checked: false });
        if (bomber === 'B-17G')
          guns.push({ gun: 'Chin Turr', inoperable: nose.noseGun, inUse: false, checked: false });
        if (bomber === 'B-24J')
          guns.push({ gun: 'Nose Turr', inoperable: nose.noseGun, inUse: false, checked: false });
      }
      break;
    case '1:30':
      if (gf.level === 'high') {
        guns.push({ gun: 'Top Turr', inoperable: pilotComp.tTurretInoperable, inUse: false, checked: false }, { gun: 'Right Wst', inoperable: 'todo', inUse: false, checked: false });
        if (bomber === 'B-17F' || bomber === 'B-17G' || bomber === 'B-24D')
          guns.push({ gun: 'Right Chk', inoperable: nose.rightCheekGun, inUse: false, checked: false });
        if (bomber === 'B-24J')
          guns.push({ gun: 'Nose Turr', inoperable: nose.noseGun, inUse: false, checked: false });
      }
      if (gf.level === 'level') {
        guns.push({ gun: 'Top Turr', inoperable: pilotComp.tTurretInoperable, inUse: false, checked: false });
        if (bomber === 'B-17F' || bomber === 'B-17G' || bomber === 'B-24D')
          guns.push({ gun: 'Right Chk', inoperable: nose.rightCheekGun, inUse: false, checked: false });
        if (bomber === 'B-17G')
          guns.push({ gun: 'Chin Turr', inoperable: nose.noseGun, inUse: false, checked: false });
        if (bomber === 'B-24J')
          guns.push({ gun: 'Nose Turr', inoperable: nose.noseGun, inUse: false, checked: false });
      }
      if (gf.level === 'low') {
        guns.push({ gun: 'Ball Turr', inoperable: 'todo', inUse: false, checked: false });
        if (bomber === 'B-17F' || bomber === 'B-17G' || bomber === 'B-24D')
          guns.push({ gun: 'Right Chk', inoperable: nose.rightCheekGun, inUse: false, checked: false });
        if (bomber === 'B-17F' || bomber === 'B-17G' || bomber === 'B-24D' || bomber === 'B-24J')
          guns.push({ gun: 'Right Wst', inoperable: 'todo', inUse: false, checked: false });
        if (bomber === 'B-17G')
          guns.push({ gun: 'Chin Turr', inoperable: nose.noseGun, inUse: false, checked: false });
        if (bomber === 'B-24J')
          guns.push({
            gun: 'Nose Turr', inoperable: nose.noseGun, inUse: false, checked: false});
      }
      break;
    case '3:00':
      if (gf.level === 'high') {
        guns.push({ gun: 'Top Turr', inoperable: pilotComp.tTurretInoperable, inUse: false, checked: false }, { gun: 'Right Wst', inoperable: 'todo', inUse: false, checked: false });

      }
      if (gf.level === 'level') {
        guns.push({ gun: 'Top Turr', inoperable: pilotComp.tTurretInoperable, inUse: false, checked: false },
          { gun: 'Ball Turr', inoperable: 'todo', inUse: false, checked: false }, { gun: 'Right Wst', inoperable: 'todo', inUse: false, checked: false });

      }
      if (gf.level === 'low') {
        guns.push({ gun: 'Ball Turr', inoperable: 'todo', inUse: false, checked: false }, { gun: 'Right Wst', inoperable: 'todo', inUse: false, checked: false });

      }
      break;
    case '6:00':
      if (gf.level === 'high') {
        guns.push({ gun: 'Top Turr', inoperable: pilotComp.tTurretInoperable, inUse: false, checked: false }, { gun: 'Right Wst', inoperable: 'todo', inUse: false, checked: false });
        if (bomber === 'B-17F' || bomber === 'B-17G')
          guns.push({ gun: 'Radio Rm', inoperable: 'todo', inUse: false, checked: false }, { gun: 'Tail Guns', inoperable: 'todo', inUse: false, checked: false });
        if (bomber === 'B-24D' || bomber === 'B-24J')
          guns.push({ gun: 'Tail Turr', inoperable: 'todo', inUse: false, checked: false });
      }
      if (gf.level === 'level') {
        if (bomber === 'B-17F' || bomber === 'B-17G')
          guns.push({ gun: 'Tail Guns', inoperable: 'todo', inUse: false, checked: false });
        if (bomber === 'B-24D' || bomber === 'B-24J')
          guns.push({ gun: 'Tail Turr', inoperable: 'todo', inUse: false, checked: false });
      }
      if (gf.level === 'low') {
        guns.push({ gun: 'Ball Turr', inoperable: 'todo', inUse: false, checked: false });
        if (bomber === 'B-17F' || bomber === 'B-17G')
          guns.push({ gun: 'Tail Guns', inoperable: 'todo', inUse: false, checked: false });
        if (bomber === 'B-24D' || bomber === 'B-24J')
          guns.push({ gun: 'Tail Turr', inoperable: 'todo', inUse: false, checked: false });
      }
      break;
    case '9:00':
      if (gf.level === 'high') {
        guns.push({ gun: 'Top Turr', inoperable: pilotComp.tTurretInoperable, inUse: false, checked: false }, { gun: 'Left Wst', inoperable: 'todo', inUse: false, checked: false });

      }
      if (gf.level === 'level') {
        guns.push({ gun: 'Top Turr', inoperable: pilotComp.tTurretInoperable, inUse: false, checked: false },
          { gun: 'Ball Turr', inoperable: 'todo', inUse: false, checked: false }, { gun: 'Left Wst', inoperable: 'todo', inUse: false, checked: false });

      }
      if (gf.level === 'low') {
        guns.push({ gun: 'Ball Turr', inoperable: 'todo', inUse: false, checked: false }, { gun: 'Left Wst', inoperable: 'todo', inUse: false, checked: false });

      }
      break;
    case '10:30':
      if (gf.level === 'high') {
        guns.push({ gun: 'Top Turr', inoperable: pilotComp.tTurretInoperable, inUse: false, checked: false }, { gun: 'Left Wst', inoperable: 'todo', inUse: false, checked: false });
        if (bomber === 'B-17F' || bomber === 'B-17G' || bomber === 'B-24D')
          guns.push({ gun: 'Left Chk', inoperable: nose.rightCheekGun, inUse: false, checked: false });
        if (bomber === 'B-24J')
          guns.push({ gun: 'Nose Turr', inoperable: nose.noseGun, inUse: false, checked: false });
      }
      if (gf.level === 'level') {
        guns.push({ gun: 'Top Turr', inoperable: pilotComp.tTurretInoperable, inUse: false, checked: false });
        if (bomber === 'B-17F' || bomber === 'B-17G' || bomber === 'B-24D')
          guns.push({ gun: 'Left Chk', inoperable: nose.rightCheekGun, inUse: false, checked: false });
        if (bomber === 'B-17G')
          guns.push({ gun: 'Chin Turr', inoperable: nose.noseGun, inUse: false, checked: false });
        if (bomber === 'B-24J')
          guns.push({ gun: 'Nose Turr', inoperable: nose.noseGun, inUse: false, checked: false });
      }
      if (gf.level === 'low') {
        guns.push({ gun: 'Ball Turr', inoperable: 'todo', inUse: false, checked: false });
        if (bomber === 'B-17F' || bomber === 'B-17G' || bomber === 'B-24D')
          guns.push({ gun: 'Left Chk', inoperable: nose.rightCheekGun, inUse: false, checked: false });
        if (bomber === 'B-17F' || bomber === 'B-17G' || bomber === 'B-24D' || bomber === 'B-24J')
          guns.push({ gun: 'Left Wst', inoperable: 'todo', inUse: false, checked: false });
        if (bomber === 'B-17G')
          guns.push({ gun: 'Chin Turr', inoperable: nose.noseGun, inUse: false, checked: false });
        if (bomber === 'B-24J')
          guns.push({ gun: 'Nose Turr', inoperable: nose.noseGun, inUse: false, checked: false });
      }
      break;
    case 'Vertical Dive':
      guns.push({ gun: 'Top Turr', inoperable: 'todo', inUse: false, checked: false });
      if (bomber === 'B-17G')
        guns.push({ gun: 'Radio Rm', inoperable: 'todo', inUse: false, checked: false }); //optional rule 10.5.3
      break;
    case 'Vertical Climb':
      guns.push({ gun: 'Ball Turr', inoperable: 'todo', inUse: false, checked: false });
      break;
    default:
      break;
  }
   return guns;
}
