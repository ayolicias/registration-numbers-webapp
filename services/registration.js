module.exports = function (pool){

    async function platesData(){
        let reg = await pool.query('select * from registration_numbers')
        console.log(reg.rows)
        return reg.rows;
    }
    async function selectnames(regnumber){
        let regNum = await pool.query('select * from registration_numbers where reg=$1',[regnumber]);
        return regNum.rows;
    }

    async function insert(reg) {
         let regTag = reg.substring(0,3).toUpperCase().trim();
        //  console.log(regTag);
         let foundTag = await pool.query('select id from towns where initials=$1',[regTag]);
          
          if (foundTag.rowCount === 0) {
              return "incorrectregistrationNum"
          }
        let foundId = foundTag.rows[0].id;
        let found = await pool.query('insert into registration_numbers (reg, town_id) values ($1,$2)', [reg, foundId])
        return found.rows;
       }
    //    async function updateReg(reg){
    //        let update = await pool.query('update towns set town_name')
    //    }


    async function selectplate(regs){
        if(regs !== "alltowns"){
            let result = await pool.query('SELECT reg from towns join registration_numbers on town_id=towns.id where initials=$1',[regs]);
            return result.rows;
        }
        else{
            return await platesData();
        }
    }
    async function allTowns(){
        result = await pool.query('select reg from registration_numbers')
        return result.rows;
    }
    
    async function count() {
        let count = await pool.query('select count(*) FROM registration_numbers');
        return parseInt(count.rows[0].count);
    }
    async function clear() {
        let remove = await pool.query('DELETE FROM towns');
         return remove.rows[0];
      }

   return{
    platesData,
    selectnames,
    selectplate,
    clear,
    insert,
    count,
    allTowns
    // updateReg
   }
}
