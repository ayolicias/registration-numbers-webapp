function Registration(storedregs) {

    var regs = storedregs || {};
  
    function RegFunction(value) {
      if (value !== '') {
        if (regs[value] === undefined) {
          regs[value] = 0;
          return true;
        }
      }
      return false;
    }
  
    function TownReg(reg) {
      var list = ['CA ', 'CAW', 'CL ', 'CJ '];
  
      if (reg != '') {
        if (regs[reg] === undefined) {
          for (var i = 0; i < list.length; i++) {
            if (reg.startsWith(list[i])) {
  
              regs[reg] = 0
              return true;
            }
          }
        }
        return false;
      }
    }
  
    function getMap() {
      return regs;
    }
  
    function getStored() {
      return Object.keys(regs);
    }
  
    function getregs() {
      return regs;
    }
  
    function gettowns() {
      return towns;
    }
  
    function  regfilter(town) {
      var townsreg = Object.keys(regs);
      if (town === 'allTowns') {
        return townsreg;
      }
  
      var filtetown = townsreg.filter(function(storetown, storeReg) {
        return storetown.startsWith(town)
      })
      location.hash = town;
      return filtetown;
  
    }
  
    return {
      store: getStored,
      regs: getregs,
      display: RegFunction,
      storedMap: getMap,
      regKey: TownReg,
      city: gettowns,
      filt: regfilter
    }
  
  }
  