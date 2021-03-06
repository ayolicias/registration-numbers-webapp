module.exports = function registration(pool) {

    async function platesData() {
        let reg = await pool.query('select * from registration_numbers');
        return reg.rows;
    }

    async function selectTown(town) {
        let result = await pool.query('select id, town_name, initials from towns where initials=$1', [town]);
        return result.rows[0];
    }

    async function getAllTowns() {
        let result = await pool.query('select town_name, initials from towns');
        return result.rows;

    }

    async function isValidTown(town) {
        let result = await pool.query('select * from towns where initials=$1', [town]);
        return result.rows;
    }
    async function selectnames(regnumber) {
        let regNum = await pool.query('select * from registration_numbers where reg=$1', [regnumber]);
        return regNum.rows;
    }

    async function insert(reg, town) {

        let found = await pool.query('insert into registration_numbers (reg, town_id) values ($1,$2)', [reg, town])
        return found.rows;
    }

    async function clear() {
        let remove = await pool.query('DELETE FROM registration_numbers');
        return remove.rows;
    }

    async function selectplate(regs) {
        let townData = await selectTown(regs);
        if (regs !== "alltowns") {
            return await filterTown(townData);
        }
        else {
            return await platesData();
        }
    }
    
    async function filterTown(town) {
        if (town === 'all') {
            return await platesData();
        }
        let townId = await selectTown(town);
        if (townId) {
            let reg = await pool.query('select * from registration_numbers where town_id = $1', [townId.id]);
            return reg.rows;
        }
        return 'unknown town';
    }

    async function allTowns() {
        result = await pool.query('select reg from registration_numbers')
        return result.rows[0];
    }

    async function count() {
        let count = await pool.query('select count(*) FROM registration_numbers');
        return parseInt(count.rows[0].count);
    }

    async function duplicateReg(reg) {
        let duplicate = await pool.query('select * from registration_numbers where reg=$1', [reg]);
        return duplicate.rows;
    }
    return {
        platesData,
        selectnames,
        selectplate,
        clear,
        insert,
        count,
        allTowns,
        selectTown,
        filterTown,
        duplicateReg,
        isValidTown,
        getAllTowns
    }
}
