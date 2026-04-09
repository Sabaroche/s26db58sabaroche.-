var Sculpture = require('../models/sculpture');

// List of all Sculptures
exports.sculpture_list = async function (req, res) {
    try {
        theSculptures = await Sculpture.find();
        res.send(theSculptures);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

exports.sculpture_view_all_Page = async function (req, res) {
    try {
        theSculptures = await Sculpture.find();
        res.render('sculptures', { title: 'Sculptures', results: theSculptures });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// for a specific Sculpture.
exports.sculpture_detail = async function (req, res) {
    try {
        theSculpture = await Sculpture.findById(req.params.id);
        res.send(theSculpture);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle Sculpture create on POST.
exports.sculpture_create_post = async function (req, res) {
    console.log(req.body)
    let document = new Sculpture();
    document.material = req.body.material;
    document.style = req.body.style;
    document.year = req.body.year;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle Sculpture delete from on DELETE.
exports.sculpture_delete = async function (req, res) {
    try {
        const sculpture = await Sculpture.findByIdAndRemove(req.params.id);
        res.send(sculpture);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle Sculpture update form on PUT.
exports.sculpture_update_put = async function (req, res) {
    try {
        const sculpture = await Sculpture.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(sculpture);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
