module.exports = function(registrationServices){
   
    async function home(req,res){
        try{
            let regs = await registrationServices.platesData();
            console.log(regs);
            
            res.render('home', {regs})
        }catch(err){
            console.log(err.stack);
            
        }
    }
async function getAllregs(req, res){
    try{
        let towns = await registrationServices.platesData();
        let database = towns;

        res.render('plates',{database});
    }
    catch(err){}
}

async function reset (req, res) {
    await registrationServices.clear();
   
    res.redirect('/');
  };

async function Display(req, res){
    try{
        let name = req.body.inputName;
        let regs = req.body.alltowns;

        if (input.inputName = ''){
            req.flash("entryOne",'Added')
        };
        if (input.inputName = ''){
            req.flash("entryOne",'Added')
        };
        if (input.inputName = ''){
            req.flash("entryOne",'Added')
        };

       let displayMessage = await registrationServices.platesData();
       console.log(regs);
       
        res.redirect('/', {displayMessage});
    }
    catch(err){
        res.send(err.stack)
    }
}
return{
    getAllregs,
    Display,
    home,
    reset

}
}
