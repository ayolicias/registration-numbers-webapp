module.exports = function(registrationServices){

    async function home(req,res){
        try{
            let reg = req.body.inputName;
            let name = req.body.alltowns;
            // let insertReg = await registrationServices.insert(reg)
            // let regs = await registrationServices.selectnames(insertReg);
            //  console.log("here",insertReg);
            // {regs:result}
            res.render('home')
        }catch(err){
            console.log(err.stack) 
        }
    }
   
    async function addReg(req,res){
        try{
            let reg = req.body.inputName;
            let name = req.body.alltowns;
            let insertReg = await registrationServices.insert(reg)
            // let regs = await registrationServices.selectnames(insertReg);
             console.log("here",insertReg);
            
            res.render('home')
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

// async function reset (req, res) {
//     await registrationServices.clear();
   
//     res.redirect('/');
//   };
  
async function Display(req, res){
    const name = req.body.inputName;
    let regs = req.body.alltowns;
    console.log(name);
    try{
        if(name === '' || name === undefined){
            req.flash('info', "Please Enter a valid registration number")
        }
       let displayMessage = await registrationServices.platesData(name, regs);

        res.send('/');
    }
    catch(err){
        res.send(err.stack)
    }
}

async function filter(req, res){
    res.redirect('/')
}

async function filterTowns(req, res){
    let town = req.params.town; 
    let result= await registrationServices.selectplate(town);
    // console.log(result);
    res.render('home',{regs:result});
}


return{
    getAllregs,
    Display,
    home,
    addReg,
    filterTowns,
    // reset,
    filter
}
}
