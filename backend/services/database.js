import {getRedis, loadRedis} from './redisService.js';
const { pool } = ;

const getState = () => {
    // Load all buildingIds from SQL



    // for each buildingId, call loadRedis

    loadRedis(buildingId, state);
}; 


const loadState = async (buidlingId) => {
    redisData = await getRedis(buidlingId);
    return /* some sql */;
}

export { getState , loadState };