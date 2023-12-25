const Map = require('../models/Map')
const MapCenter = require('../models/MapCenter')
class MapController {
    index(req, res, next) {
        MapCenter.getAllCenters((err, onedata) => {
            if (err) {
                console.log('Lỗi truy vấn', err)
                return
            }
            Map.getAllMaps((err, data) => {
                if (err) {
                    console.log('Lỗi truy vấn', err)
                    return
                }
                else {
                    res.render('map/app', { onedata, data })
                }
            })

        })
    }
    store(req, res, next) {
        //   console.log(req.body)
        const namearea = req.body.namearea
        const coordinates = req.body.coordinates
        const type = req.body.type
        const area = req.body.area
        Map.addMap({
            areaMeter: area,
            type: type,
            namearea: namearea,
            coordinates: coordinates
        }, (err, results) => {
            if (err) {
                console.log('lỗi truy vấn', err)
            }
            else {
                console.log('Thêm bản ghi thành công', results)
            }
        })
        // const map = new Map(req.body)
        // map.save()
        //     .then(data => { console.log(data) })
        //     .catch(next)
    }
    setview(req, res, next) {
        res.render('map/setview')
    }
    savemapcenter(req, res, next) {
        try {
            const lat = req.body.lat;
            const lng = req.body.lng;
            const zoomLevel = req.body.zoomLevel
            // Sử dụng findOne để lấy sản phẩm đầu tiên từ cơ sở dữ liệu
            MapCenter.getCenterLimitOne((err, results) => {
                if (err) {
                    console.log('Lỗi truy vấn', err)
                    return
                }
                else {
                    if (results.length > 0) {
                        const id_data = results[0]._id
                        MapCenter.updateCenter(id_data, {
                            lat: lat,
                            lng: lng,
                            zoomLevel: zoomLevel,
                        }, (err, results) => {
                            if (err) {
                                console.log('Lỗi truy vấn', err)
                                return
                            }
                            else {
                                res.render('map/app')
                            }
                        })
                    }
                    else {
                        MapCenter.addCenter({
                            lat: lat,
                            lng: lng,
                            zoomLevel: zoomLevel,
                        }, (err, results) => {
                            if (err) {
                                console.log('Lỗi truy vấn', err)
                                return
                            }
                            else {
                                res.render('map/app')
                            }
                        })
                    }
                }
            })
        } catch (error) {
            console.error(error);
            res.send('Internal Server Error');
        }
    }


    loadMap(req, res, next) {
        Map.getAllMaps((err, data) => {
            if (err) {
                console.log('Lỗi truy vấn', err)
                return
            }
            else {
                return res.json({ data: data })
            }
        })
    }
    delete(req, res, next) {
        const Id_map = req.params.id
        Map.deleteMap(Id_map, (err, data) => {
            if (err) {
                console.log('Lỗi truy vấn', err)
                return
            }
            else {
                res.redirect('back')
            }
        })
    }
    edit(req, res, next) {
        const Id_map = req.params.id
        Map.getWorkById(Id_map, (err, map) => {
            if (err) {               
                console.log('lỗi truy vấn', err)
            }
            else {
                res.render('calendar/edit', { map: map[0] })
            }
        })
    }
    // detail(req, res, next) {
    //     const areaId = req.query.areaId;

    //     try {
    //         // Lấy thông tin về khu vực từ cơ sở dữ liệu
    //         const area = Area.findOne({ areaId: areaId });

    //         if (!area) {
    //             return res.status(404).json({ message: 'Area not found' });
    //         }

    //         res.json({
    //             data: data
    //         });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).send('Internal Server Error');
    //     }
    // }
}

module.exports = new MapController