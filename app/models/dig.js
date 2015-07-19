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
    hasSleeve: {
        type: Boolean,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    youtubeId: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    links: {
        type: Schema.Types.Mixed
    },
    published: {
        type: Boolean,
        required: true
    },
    page: {
        type: Number
    },
    creator: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    created_at: {
        type: Date
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