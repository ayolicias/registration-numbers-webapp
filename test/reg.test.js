const assert = require('assert');
const service = require('../services/registration');
const pg = require("pg");
const Pool = pg.Pool;

let useSSL = false;
if (process.env.DATABASE_URL){
  useSSL = true;
}
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/registration_webapp';

const pool = new Pool({
  connectionString,
  ssl: useSSL
});


describe('registration Web App database', function() {
  beforeEach(async function() {
      await pool.query('delete from registration_numbers;');
    });
    it('should return 0', async function() {
      let reg = service(pool);
      let result = await reg.platesData();
      console.log(result);
      assert.strictEqual(result.length, 0);
    });

it('should return towns regNumbers', async function() {
  let reg = service(pool);
  await reg.insert('CA', '1');
  await reg.insert('CAW', '1');
  await reg.insert('CY', '1');
  await reg.insert('CJ', '1');
  let result = await reg.platesData();
  assert.strictEqual(result.length, 4);
});

it('should filter CA registration numbers', async function() {
  let reg = service(pool);
  await reg.insert('CA 871-987',1);
  await reg.insert('CAW 871-967',3);
  await reg.insert('CY 456-784',2);
  await reg.insert('CJ 985-475',4);
  let filter = await reg.selectplate('CA')
  
  assert.strictEqual(filter[0].reg,"CA 871-987")
  assert.strictEqual(filter[0].town_id,1)

});

it('should not duplicate registration numbers ', async function() {
  let reg = service(pool);
  await reg.insert('CA 871-987');
  await reg.insert('CA 871-987');
  await reg.insert('CAW 876-432');
  await reg.duplicateReg('CA 871-987');
  
  let result = await reg.selectnames();
  assert.strictEqual(result.length, 0);
});

it('should return false if regNum is Invalid', async function() {
  let reg = service(pool);
  await reg.insert('ZS 546-654');
  
  assert.deepEqual(reg.platesData(),[]);
});

// it('should update greeted users ', async function() {
//   let greet = service(pool);
//   await greet.insert('ziya', 'Hi');
//   await greet.insert('phindi', 'halo');
//   await greet.updateUsers('phindi', 'molo');
//   let result = await greet.findUser('phindi');
//   assert.strictEqual(result[0].counter, 2);
// });

beforeEach(async function() {
  await pool.query('delete from registration_numbers;');
  
});
after(function(){
  pool.end();
})
});
  



