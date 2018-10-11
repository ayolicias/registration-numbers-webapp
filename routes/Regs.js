module.exports = function(registrationServices){

    async function home(req,res){
        try{
            let reg = req.body.inputName;
            let regs = await registrationServices.platesData()
            
            res.render('home',{reg, regs})
            }catch(err){
            res.send(err.stack);
        }
    }
   
    async function addReg(req,res){
        try{
            let regi = req.body.inputName;
            let regTag = regi.substring(0,3).toUpperCase().trim();
            console.log(regTag);
            
            let isValid = await registrationServices.isValidTown(regTag);
            isValid = isValid.length;
             console.log(isValid)

            let repeatedReg = await registrationServices.duplicateReg(regi);
            repeatedReg = repeatedReg.length;
            console.log("Duplicate: ",repeatedReg);

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
                let towns = await registrationServices.selectTown(regTag);
                await registrationServices.insert(regi, towns);
                res.redirect('/');
            }




           
                // console.log("Duplicate: ",repeatedReg);
                

            //    if (towns.length === 0 || isValid === false){
            //        req.flash("entryTwo",'invalid Regnumber')
            //    }

            //     else if(isValid === true){
            //       
            //    }
  
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
  
async function Display(req, res){
    const name = req.body.inputName;
    let regs = req.body.town;

    try{
      
        res.render('home',{name:results});

       let displayMessage = await registrationServices.platesData(name, regs);

        res.send('/');
    }
    catch(err){
        res.send(err.stack)
    }
}
async function regNumber(name,regs){
    let reg = await  findUser(name);
    if (reg.length == 0) {
     await insert(name,regs);
    }
     else{
      await updateRegs(name,regs);
    }
  }

async function filter(req, res){
    res.redirect('/')
}

async function filterTowns(req, res){
    let town = req.params.town; 
    // console.log(town)

    let results= await registrationServices.selectplate(town);
    res.render('home',{results});
}
return{
    Display,
    home,
    addReg,
    filterTowns,
    clearAll,
    filter,
    regNumber
}
}