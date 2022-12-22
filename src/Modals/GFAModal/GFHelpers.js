
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
  const noseB24J = ctx.noseB24J
  const pilotComp = ctx.pilotComp;
  const TTRComp = ctx.TTRComp;
  const waistComp = ctx.waistComp;
  const radioComp = ctx.radioComp;
  const tailSection = ctx.tailSection;

  let guns = [];
  switch (gf.angle) {
    case '12:00':
      if (gf.level === 'high') {
        guns.push({ gun: 'Top Turr', inoperable: (ctx.bomber === 'B-24D' || ctx.bomber === 'B-24J') ? TTRComp.tTurrInop : pilotComp.tTurretInop, inUse: false, checked: false });
        if (bomber === 'B-17F' || bomber === 'B-24D')
          guns.push({ gun: 'Nose Gun', inoperable: nose.noseGunInop, inUse: false, checked: false });
        if (bomber === 'B-24J')
          guns.push({ gun: 'Nose Turr', inoperable: noseB24J.noseGunInop, inUse: false, checked: false });
      }
      if (gf.level === 'level') {
        guns.push({ gun: 'Top Turr', inoperable: (ctx.bomber === 'B-24D' || ctx.bomber === 'B-24J') ? TTRComp.tTurrInop : pilotComp.tTurretInop, inUse: false, checked: false });
        if (bomber === 'B-17F' || bomber === 'B-24D')
          guns.push({ gun: 'Nose Gun', inoperable: nose.noseGunInop, inUse: false, checked: false });
        if (bomber === 'B-17G')
          guns.push({ gun: 'Chin Turr', inoperable: nose.noseGunInop, inUse: false, checked: false });
        if (bomber === 'B-24J')
          guns.push({ gun: 'Nose Turr', inoperable: noseB24J.noseGunInop, inUse: false, checked: false });
      }
      if (gf.level === 'low') {
        guns.push({ gun: 'Ball Turr', inoperable: waistComp.ballInop, inUse: false, checked: false });
        if (bomber === 'B-17F' || bomber === 'B-24D')
          guns.push({ gun: 'Nose Gun', inoperable: nose.noseGunInop, inUse: false, checked: false });
        if (bomber === 'B-17G')
          guns.push({ gun: 'Chin Turr', inoperable: nose.noseGunInop, inUse: false, checked: false });
        if (bomber === 'B-24J')
          guns.push({ gun: 'Nose Turr', inoperable: noseB24J.noseGunInop, inUse: false, checked: false });
      }
      break;
    case '1:30':
      if (gf.level === 'high') {
        guns.push({ gun: 'Top Turr', inoperable: ctx.bomber === 'B-24D' || ctx.bomber === 'B-24J' ? TTRComp.tTurrInop : pilotComp.tTurretInop, inUse: false, checked: false }, { gun: 'Right Wst', inoperable: waistComp.RWstGunInop, inUse: false, checked: false });
        if (bomber === 'B-17F' || bomber === 'B-17G' || bomber === 'B-24D')
          guns.push({ gun: 'Right Chk', inoperable: nose.RChkGunInop, inUse: false, checked: false });
        if (bomber === 'B-24J')
          guns.push({ gun: 'Nose Turr', inoperable: noseB24J.noseGunInop, inUse: false, checked: false });
      }
      if (gf.level === 'level') {
        guns.push({ gun: 'Top Turr', inoperable: ctx.bomber === 'B-24D' || ctx.bomber === 'B-24J' ? TTRComp.tTurrInop : pilotComp.tTurretInop, inUse: false, checked: false });
        if (bomber === 'B-17F' || bomber === 'B-17G' || bomber === 'B-24D')
          guns.push({ gun: 'Right Chk', inoperable: nose.RChkGunInop, inUse: false, checked: false });
        if (bomber === 'B-17G')
          guns.push({ gun: 'Chin Turr', inoperable: nose.noseGunInop, inUse: false, checked: false });
        if (bomber === 'B-24J')
          guns.push({ gun: 'Nose Turr', inoperable: noseB24J.noseGunInop, inUse: false, checked: false });
      }
      if (gf.level === 'low') {
        guns.push({ gun: 'Ball Turr', inoperable: waistComp.ballInop, inUse: false, checked: false });
        if (bomber === 'B-17F' || bomber === 'B-17G' || bomber === 'B-24D')
          guns.push({ gun: 'Right Chk', inoperable: nose.RChkGunInop, inUse: false, checked: false });
        if (bomber === 'B-17F' || bomber === 'B-17G' || bomber === 'B-24D' || bomber === 'B-24J')
          guns.push({ gun: 'Right Wst', inoperable: waistComp.RWstGunInop, inUse: false, checked: false });
        if (bomber === 'B-17G')
          guns.push({ gun: 'Chin Turr', inoperable: nose.noseGunInop, inUse: false, checked: false });
        if (bomber === 'B-24J')
          guns.push({
            gun: 'Nose Turr', inoperable: noseB24J.noseGunInop, inUse: false, checked: false});
      }
      break;
    case '3:00':
      if (gf.level === 'high') {
        guns.push({ gun: 'Top Turr', inoperable: ctx.bomber === 'B-24D' || ctx.bomber === 'B-24J' ? TTRComp.tTurrInop : pilotComp.tTurretInop, inUse: false, checked: false }, { gun: 'Right Wst', inoperable: waistComp.RWstGunInop, inUse: false, checked: false });
      }
      if (gf.level === 'level') {
        guns.push({ gun: 'Top Turr', inoperable: ctx.bomber === 'B-24D' || ctx.bomber === 'B-24J' ? TTRComp.tTurrInop : pilotComp.tTurretInop, inUse: false, checked: false },
          { gun: 'Ball Turr', inoperable: waistComp.ballInop, inUse: false, checked: false }, { gun: 'Right Wst', inoperable: waistComp.RWstGunInop, inUse: false, checked: false });

      }
      if (gf.level === 'low') {
        guns.push({ gun: 'Ball Turr', inoperable: waistComp.ballInop, inUse: false, checked: false }, { gun: 'Right Wst', inoperable: waistComp.RWstGunInop, inUse: false, checked: false });

      }
      break;
    case '6:00':
      if (gf.level === 'high') {
        guns.push({ gun: 'Top Turr', inoperable: ctx.bomber === 'B-24D' || ctx.bomber === 'B-24J' ? TTRComp.tTurrInop : pilotComp.tTurretInop, inUse: false, checked: false }, { gun: 'Right Wst', inoperable: waistComp.RWstGunInop, inUse: false, checked: false });
        if (bomber === 'B-17F' || bomber === 'B-17G')
          guns.push({ gun: 'Radio Rm', inoperable: radioComp.radioGunInop, inUse: false, checked: false }, { gun: 'Tail Guns', inoperable: tailSection.tailGunsInop, inUse: false, checked: false });
        if (bomber === 'B-24D' || bomber === 'B-24J')
          guns.push({ gun: 'Tail Turr', inoperable: tailSection.tailTurrInop, inUse: false, checked: false });
      }
      if (gf.level === 'level') {
        if (bomber === 'B-17F' || bomber === 'B-17G')
          guns.push({ gun: 'Tail Guns', inoperable: tailSection.tailGunsInop, inUse: false, checked: false });
        if (bomber === 'B-24D' || bomber === 'B-24J')
          guns.push({ gun: 'Tail Turr', inoperable: tailSection.tailTurrInop, inUse: false, checked: false });
      }
      if (gf.level === 'low') {
        guns.push({ gun: 'Ball Turr', inoperable: waistComp.ballInop, inUse: false, checked: false });
        if (bomber === 'B-17F' || bomber === 'B-17G')
          guns.push({ gun: 'Tail Guns', inoperable: tailSection.tailGunsInop, inUse: false, checked: false });
        if (bomber === 'B-24D' || bomber === 'B-24J')
          guns.push({ gun: 'Tail Turr', inoperable: tailSection.tailTurrInop, inUse: false, checked: false });
      }
      break;
    case '9:00':
      if (gf.level === 'high') {
        guns.push({ gun: 'Top Turr', inoperable: ctx.bomber === 'B-24D' || ctx.bomber === 'B-24J' ? TTRComp.tTurrInop : pilotComp.tTurretInop, inUse: false, checked: false }, { gun: 'Left Wst', inoperable: waistComp.LWstGunInop, inUse: false, checked: false });

      }
      if (gf.level === 'level') {
        guns.push({ gun: 'Top Turr', inoperable: ctx.bomber === 'B-24D' || ctx.bomber === 'B-24J' ? TTRComp.tTurrInop : pilotComp.tTurretInop, inUse: false, checked: false },
          { gun: 'Ball Turr', inoperable: waistComp.ballInop, inUse: false, checked: false }, { gun: 'Left Wst', inoperable: waistComp.LWstGunInop, inUse: false, checked: false });

      }
      if (gf.level === 'low') {
        guns.push({ gun: 'Ball Turr', inoperable: waistComp.ballInop, inUse: false, checked: false }, { gun: 'Left Wst', inoperable: waistComp.LWstGunInop, inUse: false, checked: false });
      }
      break;
    case '10:30':
      if (gf.level === 'high') {
        guns.push({ gun: 'Top Turr', inoperable: ctx.bomber === 'B-24D' || ctx.bomber === 'B-24J' ? TTRComp.tTurrInop : pilotComp.tTurretInop, inUse: false, checked: false }, { gun: 'Left Wst', inoperable: waistComp.LWstGunInop, inUse: false, checked: false });
        if (bomber === 'B-17F' || bomber === 'B-17G' || bomber === 'B-24D')
          guns.push({ gun: 'Left Chk', inoperable: nose.LChkGunInop, inUse: false, checked: false });
        if (bomber === 'B-24J')
          guns.push({ gun: 'Nose Turr', inoperable: noseB24J.noseGunInop, inUse: false, checked: false });
      }
      if (gf.level === 'level') {
        guns.push({ gun: 'Top Turr', inoperable: ctx.bomber === 'B-24D' || ctx.bomber === 'B-24J' ? TTRComp.tTurrInop : pilotComp.tTurretInop, inUse: false, checked: false });
        if (bomber === 'B-17F' || bomber === 'B-17G' || bomber === 'B-24D')
          guns.push({ gun: 'Left Chk', inoperable: nose.LChkGunInop, inUse: false, checked: false });
        if (bomber === 'B-17G')
          guns.push({ gun: 'Chin Turr', inoperable: nose.noseGunInop, inUse: false, checked: false });
        if (bomber === 'B-24J')
          guns.push({ gun: 'Nose Turr', inoperable: noseB24J.noseGunInop, inUse: false, checked: false });
      }
      if (gf.level === 'low') {
        guns.push({ gun: 'Ball Turr', inoperable: waistComp.ballInop, inUse: false, checked: false });
        if (bomber === 'B-17F' || bomber === 'B-17G' || bomber === 'B-24D')
          guns.push({ gun: 'Left Chk', inoperable: nose.LChkGunInop, inUse: false, checked: false });
        if (bomber === 'B-17F' || bomber === 'B-17G' || bomber === 'B-24D' || bomber === 'B-24J')
          guns.push({ gun: 'Left Wst', inoperable: waistComp.LWstGunInop, inUse: false, checked: false });
        if (bomber === 'B-17G')
          guns.push({ gun: 'Chin Turr', inoperable: nose.noseGunInop, inUse: false, checked: false });
        if (bomber === 'B-24J')
          guns.push({ gun: 'Nose Turr', inoperable: noseB24J.noseGunInop, inUse: false, checked: false });
      }
      break;
    case 'Vertical Dive':
      if (bomber === 'B-17F' || bomber === 'B-17G')
        guns.push({ gun: 'Top Turr', inoperable: ctx.bomber === 'B-24D' || ctx.bomber === 'B-24J' ? TTRComp.tTurrInop : pilotComp.tTurretInop, inUse: false, checked: false });
      if (bomber === 'B-17G')
        guns.push({ gun: 'Radio Rm', inoperable: radioComp.radioGunInop, inUse: false, checked: false }); //optional rule 10.5.3
      break;
    case 'Vertical Climb':
      guns.push({ gun: 'Ball Turr', inoperable: waistComp.ballInop, inUse: false, checked: false });
      break;
    default:
      break;
  }
   return guns;
}
