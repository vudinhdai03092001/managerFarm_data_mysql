const connection = require('../../config/db/index')
const CenterModel = {
    getAllCenters: (callback) => {
        const query = 'SELECT * FROM centers ';
        connection.query(query, callback);
    },
    getCenterLimitOne: (callback) => {
        const query = 'SELECT * FROM centers LIMIT 1';
        connection.query(query, callback);
    },
    updateCenter: (CenterId, Center, callback) => {
        const query = 'UPDATE centers SET lat=?, lng=?,zoomLevel=?  WHERE _id = ?';
        const values = [Center.lat, Center.lng, Center.zoomLevel, CenterId];
        connection.query(query, values, callback);
    },

    addCenter: (Center, callback) => {
        const query = 'INSERT INTO centers (lat, lng,zoomLevel) VALUES (?,?,?)';
        const values = [Center.lat, Center.lng, Center.zoomLevel];
        connection.query(query, values, callback);
    },
}
// Export model để sử dụng ở nơi khác trong ứng dụng
module.exports = CenterModel;