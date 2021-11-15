const router = require('express').Router();
const { Download } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Download.findAll().then(dbDownloadData => res.json(dbDownloadData)).catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

router.post('/', (req, res) => {
    if (req.session) {
        Download.create({
            download_type: req.body.download_type,
            download_link: req.body.download_link,
            tournament_id: req.body.tournament_id
        }).then(dbDownloadData => res.json(dbDownloadData)).catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});

router.delete('/:id', withAuth, (req, res) => {
    Download.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbDownloadData => {
    if (!dbDownloadData) {
        res.status(404).json({message: 'No comment found with this id'});
        return;
    }
    res.json(dbDownloadData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;