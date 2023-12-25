const connection = require('../../config/db/index')
const MapModel = {
    getAllMaps: (callback) => {
        const query = 'SELECT * FROM maps ';
        connection.query(query, callback);
    },
    getMapLimitOne: (callback) => {
        const query = 'SELECT * FROM maps LIMIT 1';
        connection.query(query, callback);
    },
    updateMap: (MapId, Map, callback) => {
        const query = 'UPDATE maps SET namearea=?, coordinates=?  WHERE _id = ?';
        const values = [Map.namearea, Map.coordinates, MapId];
        connection.query(query, values, callback);
    },

    addMap: (Map, callback) => {
        const query = 'INSERT INTO maps (namearea, coordinates,type) VALUES (?,?,?)';
        const values = [Map.namearea, Map.coordinates, Map.type];
        connection.query(query, values, callback);
    },
}
// Export model để sử dụng ở nơi khác trong ứng dụng
module.exports = MapModel;