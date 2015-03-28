var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var digSchema = new Schema({
    title: String,
    artists: [String],
    year: Number,
    cover: String,
    links: {
        youtube: String,
        discogs: String
    },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    created_at: Date,
});

var Dig = mongoose.model('Dig', digSchema);

module.exports = Dig;