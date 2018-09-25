module.exports = function (pool){

    async function platesData(){
        let reg = await pool.query('select * from registration_numbers')
        return reg.rows;
    }
    async function selectnames(name){
        let names = await pool.query('select * from registration_numbers where names =$1',[name]);
        return names.rows;
    }

    async function insert(name, regs) {
        let found = await pool.query('insert into registration_numbers (reg, town_id) values ($1,$2)', [name, regs])
        return found;
       }

    async function selectplate(regs){
        let result = await pool.query('select town_name, reg from towns join registration_numbers on towns.id = registration_numbers.towns.id where initials = $1',[regs]);
        return result.rows[0];
    }
    async function count() {
        let count = await pool.query('select count(*) FROM registration_numbers');
        return parseInt(count.rows[0].count);
    }
    async function clear () {
        let clear = await pool.query('DELETE FROM towns');
         return clear.rows[0];
      }
   return{
    platesData,
    selectnames,
    selectplate,
    clear,
    insert,
    count

   }
}
