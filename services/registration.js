module.exports = function (pool){

    async function platesData(){
        let reg = await pool.query('select * from registration_numbers');
        return reg.rows;
    }

    async function selectTown(town){
        let result = await pool.query('select * from towns where initials=$1',[town]);
        return result.rows;
    }

    async function selectnames(regnumber){
        let regNum = await pool.query('select * from registration_numbers where reg=$1',[regnumber]);
        return regNum.rows;
    }

    async function insert(reg, town) {
        let foundId = town[0].id;
        let found = await pool.query('insert into registration_numbers (reg, town_id) values ($1,$2)', [reg, foundId])
        return found.rows;
       }

    async function clear(){
        await pool.query('delete from towns');
    }

    async function selectplate(regs){
        let townData = await selectTown(regs);
        if(regs !== "alltowns"){
            //faka logic to filter here
            return await filterTown(townData);
        }
        else{
            return await platesData();
        }
    }
    async function filterTown(data){
       let reg = await platesData();
       let temp = [];

        let id = data[0].id;
        for (var i = 0; i < reg.length; i++) {
        if(id === reg[i].town_id){
        temp.push(reg[i]);
         }
       }
       return temp;
    }
    async function allTowns(){
        result = await pool.query('select reg from registration_numbers')
        return result.rows;
    }
    
    async function count() {
        let count = await pool.query('select count(*) FROM registration_numbers');
        return parseInt(count.rows[0].count);
    }
    

   return{
    platesData,
    selectnames,
    selectplate,
    clear,
    insert,
    count,
    allTowns,
    selectTown,
    filterTown
   }
}
