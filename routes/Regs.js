module.exports = function(registrationServices){

    async function home(req,res){
        try{
            let reg = req.body.inputName;
             let regs = await registrationServices.platesData()
            let towns = await registrationServices.getAllTowns()
            res.render('home',{reg, regs,towns})
            }catch(err){
            res.send(err.stack);
        }
    }
   
    async function addReg(req,res){
        try{
            let regi = req.body.inputName;
            let regTag = regi.substring(0,3).toUpperCase().trim();
            // console.log(regTag);
            
            let isValid = await registrationServices.isValidTown(regTag);
            isValid = isValid.length;
             //console.log(isValid)

            let repeatedReg = await registrationServices.duplicateReg(regi);
            repeatedReg = repeatedReg.length;
            //console.log("Duplicate: ",repeatedReg);

            if(regi === "" || regi === undefined){
                req.flash("entryOne",'Enter Regnumber')
                res.redirect('/');  
            }
            else if(isValid === 0){
                req.flash("entryOne",'Reg Number is inValid. Please Enter a new Regnumber')
                res.redirect('/');
            }
            else if(repeatedReg === 1){
                req.flash("entryOne",'Reg Number is a duplicate. Please Enter a new Regnumber')
                res.redirect('/');
             }

        
             else{
                let town = await registrationServices.selectTown(regTag);
                await registrationServices.insert(regi, town.id);
                res.redirect('/');
            }

        }catch(err){
           console.log(err.stack) 
        }
    }


async function clearAll(req, res) {
    try{
        await registrationServices.clear();
        res.redirect('/');

    } catch (err) {
        res.send(err.stack)
    }
}

async function regNumber(name,regs){
    let reg = await  findUser(name);
    if (reg.length == 0) {
     await insert(name,regs);
    }
     else{
      await updateRegs(name,regs, regs)
    }
  }

async function filter(req, res){regs
    res.redirect('/')
}
async function filterTowns(req, res){
    let town = req.params.town; 
    if(town === 'alltowns'){
        let allTowns = await registrationServices.getAllTowns()
        res.render('home',{ regs: allTowns});
    }
    let results= await registrationServices.selectplate(town);
    let regs = await registrationServices.platesData();
    let towns = await registrationServices.getAllTowns()


    // let towns = await registrationServices.getTowns();

    res.render('home',{ regs: results,towns});
}
return{
    home,
    addReg,
    filterTowns,
    clearAll,
    filter,
    regNumber
}
}