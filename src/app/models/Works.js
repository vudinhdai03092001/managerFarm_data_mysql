const connection = require('../../config/db/index')
const WorkModel = {
    // lấy những công việc cùng ID
    getAllWorksWithId: (IdUser, callback) => {
        const query = 'SELECT * FROM works WHERE id_user = ? ';
        connection.query(query, IdUser, callback);
    },
    // lấy sản phẩm theo id 
    getWorkById: (Id, callback) => {
        const query = 'SELECT * FROM works WHERE _id';
        connection.query(query, Id, callback);
    },

    updateWork: (WorkId, Work, callback) => {
        const query = 'UPDATE works SET title=?, start=? ,end =? WHERE _id = ?';
        const values = [Work.title, Work.start, Work.end, WorkId];
        connection.query(query, values, callback);
    },

    addWork: (Work, callback) => {
        const query = 'INSERT INTO works (title, start,end,id_user) VALUES (?,?,?,?)';
        const values = [Work.title, Work.start, Work.end, Work.id_user];
        connection.query(query, values, callback);
    },
    deleteWork: (WorkId, callback) => {
        const query = 'DELETE FROM works WHERE _id = ?';
        connection.query(query, [WorkId], callback);
    },
    //tìm kiếm trang admin
    searchWorkByName: (title, callback) => {
        const sql = 'SELECT * FROM works WHERE title LIKE ?';
        const searchName = '%' + title + '%';
        connection.query(sql, [searchName], callback);
    },
}
// Export model để sử dụng ở nơi khác trong ứng dụng
module.exports = WorkModel;