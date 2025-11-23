import { getRedis, loadRedis } from './redisService.js';
const { pool } = require("../db.js");

const getState = () => {
    // Load all buildingIds from SQL
    const query = `
    SELECT 
        b.name, 
        ST_DumpValues(c.content_data, 1) as red_channel,
        ST_DumpValues(c.content_data, 2) as green_channel,
        ST_DumpValues(c.content_data, 3) as blue_channel
    FROM 
        buildings b
    JOIN 
        building_content c ON b.id = c.building_id
        `;

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

    for (let { id, red, green, blue }  in query) {
        const state = new Array(100);

        for (let i = 0; i < 100; i++) {
            state[i] = new Array(100);
        }

        for (let i = 0; i < 100; i++) {
            for (let j = 0; j < 100; j++) {
                state[i][j] = [red[i][j], green[i][j], blue[i][j]];
            }
        }

        loadRedis(id, state);
    }
}; 


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
            SET content_id = $1
            WHERE rid = $2
            `;
        
        for (let id of building_ids) {
            pool.query(query, [getRedis(buildingId), id], (err, qres) => {
                if (err) {
                    res.status(500).json({
                        message: "Query failed"
                    });
                }
            });
        }
    });
}

export { getState , loadState };