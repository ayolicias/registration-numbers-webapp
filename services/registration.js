module.exports = function (pool){

    async function platesData(){
        let result = await pool.query('select * from registration_numbers')
        return result.row;
    }
    async function selectnames(names){
        let results = await pool.query('select * from registration_numbers where names =$1',[name]);
        return result.row;
    }
    async function selectplate(plate){
        let results = await pool.query('select * from registration_numbers where plates =$1',[number]);
        return result.row;
    }
    async function clear () {
        let clear = await pool.query('DELETE FROM towns');
         return clear.rows[0];
      }
   return{
    platesData,
    selectnames,
    selectplate,
    clear
   }
}
