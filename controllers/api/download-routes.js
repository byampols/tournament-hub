const router = require('express').Router();
const { route } = require('.');
const { Download } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Download.findAll().then(dbDownloadData => res.json(dbDownloadData)).catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
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

router.put('/:id', withAuth, (req, res) => {
    Download.update({
        download_link: req.body.download_link,
        download_type: req.body.download_type
    }, {
        where: {
            id: req.params.id
        }
    }).then(dbDownloadData => {
    if (!dbDownloadData) {
        res.status(404).json({message: 'No download found with this id'});
        return;
    }
    res.json(dbDownloadData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
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