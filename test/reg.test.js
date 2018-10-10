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

describe('Registration Web App database', function(){
  beforeEach(async function() {
    await pool.query('delete from registration_numbers;');
  });

    it('it should return zero(0) if not data', async function () {
      let service = registrationServices(pool);
      let result = await service.platesData();
      assert.strictEqual(result, 0); 
  });


beforeEach(async function() {
  await pool.query('delete from registration_numbers;');
  
});
after(function(){
  pool.end();
});
});

