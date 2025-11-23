const { getRedis, loadRedis } = require( './redisService.js');
const { pool } = require("../db.js");

const getState = () => {
    // Load all buildingIds from SQL
    const query = `SELECT b.id FROM buildings b`;

    pool.query(query, (err, qres) => {
        if (err) {
            res.status(500).json({
                message: "Query failed"
            });
        } else {
            const obj = qres.rows;
            console.log(obj);
        }
    });

    // for each buildingId, call loadRedis

    

    loadRedis(buildingId, state);
}; 


const loadState = async (buidlingId) => {
    redisData = await getRedis(buidlingId);
    return /* some sql */;
}

module.exports = { getState , loadState };