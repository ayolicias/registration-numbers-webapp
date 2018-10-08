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
            if(regi === "" || regi === undefined){
                req.flash("entryOne",'Enter Regnumber')  
            }
            else{
                let regTag = regi.substring(0,3).toUpperCase().trim();
                let towns = await registrationServices.selectTown(regTag);

               if (towns.length ===0){
                   req.flash("entryTwo",'invalid REgnumber')
               }

               else{
                   await registrationServices.insert(regi, towns);
               }


            }


            res.redirect('/');
        }catch(err){
            console.log(err.stack) 
        }
    }

//     async function getAllregs(req, res){
//     try{
//         let towns = await registrationServices.platesData();
//         let database = towns;

//         res.render('home',{database});
//     }
//     catch(err){}
// }

async function reset(req, res) {
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
        // if (name === "" && regs === undefined){
        //     req.flash("entryOne",'Added')
        // }

        // else if (name ===''|| name === undefined){
        //     req.flash("entryTwo", 'Already Exits')

        // }

        // else if (regs === ""){
        //     req.flash("entryThree", 'invalid RegNumber')
        // }
        
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
    res.render('home',{regs:results});
}
return{
    Display,
    home,
    addReg,
    filterTowns,
    reset,
    filter,
    regNumber
}
}
