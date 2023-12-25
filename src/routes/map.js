const express = require('express')
const router = express.Router()
const MapController = require('../app/controllers/MapController')

router.get('/', MapController.index)
//  create 
router.post('/store', MapController.store)
// khu vực bạn chọn để hiển thị 
router.get('/setview', MapController.setview)

router.post('/save-map-center', MapController.savemapcenter)
// Edit
 router.get('/:id/edit',MapController.edit)
//delete
router.delete('/:id', MapController.delete)

// //chi tiết khu vực vùng trồng
// router.get('/detail', MapController.detail)
// //load maps
router.get('/loadMap', MapController.loadMap)
module.exports = router