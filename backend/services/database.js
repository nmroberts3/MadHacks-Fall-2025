const { getRedis, loadRedis } = require('./redisService.js');

const { pool } = require("../db.js");

// Load data from SQL into Redis
const getState = () => {
    // Load all buildingIds from SQL
    const query = `
    SELECT 
        b.id, 
        c.content_data
    FROM 
        buildings b
    JOIN 
        building_content c ON b.id = c.building_id
        `;

    pool.query(query, (err, qres) => {
        if (err) {
            console.log("Query error");
            return;
        } else {
            const obj = qres.rows;

            for (const {id, content_data} of obj) {
                loadRedis(id, content_data);
            }
        }
    });

    // for each buildingId, call loadRedis
}; 

// Load data from Redis into SQL
const loadState = async () => {
    let query = `SELECT id from buildings`;
    
    pool.query(query, (err, qres) => {
        let building_ids;

        if (err) {
            res.status(500).json({
                message: "Query failed"
            });
        } else {
            building_ids = qres.rows;
        }

        query = `
            UPDATE public.building_content
            SET content_data = $1
            WHERE rid = $2
            `;
        
        for (let { id } of building_ids) {
            pool.query(query, [getRedis(id), id], (err, qres) => {
                if (err) {
                    console.log("Query failed");
                }
            });
        }
    });
}

module.exports = { getState , loadState };