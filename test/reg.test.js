const assert = require('assert');
const service = require('../services/registration');
const pg = require("pg");
const Pool = pg.Pool;

let useSSL = false;
if (process.env.DATABASE_URL){
  useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/reg_test';

const pool = new Pool({
  connectionString,
  ssl: useSSL
});

describe('Registration Web App database', function(){
    beforeEach(async function(){
        await pool.query('delete from towns;');
    });
    it('should return 0',async function(){
        
    })
})