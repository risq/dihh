var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var digSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artists: {
        type: [String],
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    youtubeId: {
        type: String,
        required: true
    },
    links: {
        discogs: String
    },
    published: {
        type: Boolean,
        required: true
    },
    creator: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    created_at: {
        type: Date,
        required: true
    }
});

digSchema.pre('save', function(next){
  if ( !this.created_at ) {
    this.created_at = new Date();
  }
  next();
});

var Dig = mongoose.model('Dig', digSchema);

module.exports = Dig;