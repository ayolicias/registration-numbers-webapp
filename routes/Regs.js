module.exports = function(registrationServices){

    async function home(req,res){
        try{
            let reg = req.body.inputName;
            let name = req.body.alltowns;
            
            res.render('home',{reg})
            }catch(err){
            console.log(err.stack) 
        }
    }
   
    async function addReg(req,res){
        try{
            let reg = req.body.inputName;
            let name = req.body.alltowns;
            let insertReg = await registrationServices.insert(reg)
           
            res.render('home',{reg});
        }catch(err){
            console.log(err.stack) 
        }
    }
    async function getAllregs(req, res){
    try{
        let towns = await registrationServices.platesData();
        let database = towns;

        res.render('home',{database});
    }
    catch(err){}
}

async function reset(req, res) {
    try{
        await services.clear();
        res.redirect('/');
    } catch (err) {
        res.send(err.stack)
    }
}
  
async function Display(req, res){
    const name = req.body.inputName;
    let regs = req.body.town;


    try{
        res.render('home',{regsinsert:results});

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
    getAllregs,
    Display,
    home,
    addReg,
    filterTowns,
    reset,
    filter,
    regNumber
}
}
