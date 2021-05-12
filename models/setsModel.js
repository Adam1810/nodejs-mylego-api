const mongoose = require('mongoose');
const slugify = require('slugify');

const setsSchema = new mongoose.Schema({
  setId: {
    type: Number,
    required: [true, 'a set must have a id'],
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'a set must have a name'],
    trim: true,
  },
  year: {
    type: String,
    default: '20XX',
    required: [true, 'a set must have parts'],
  },
  numParts: {
    type: Number,
    default: 0,
    required: [true, 'a set must have parts'],
  },
  status: {
    type: String,
    // enum: {
    //   values: ['active', 'not released', 'eol'],
    // },
  },
  price: {
    type: Number,
    default: 0,
    required: [true, 'a set must have a price'],
  },
  priceUvp: {
    type: Number,
    default: 0,
    required: [true, 'a set must have a UVP price'],
  },
  priceBest: {
    type: Number,
    default: 0,
    required: [true, 'a set must have a best price'],
  },
  discount: {
    type: Number,
  },
  price30: {
    type: Number,
  },
  price40: {
    type: Number,
  },
  budget: {
    type: Number,
  },
  imageUrl: {
    type: String,
  },
  priority: {
    type: String,
    // enum: {
    //   values: [
    //     'must have',
    //     'nice to have',
    //     'only on discount',
    //     'maybe',
    //     'low',
    //     'owned',
    //     'dropped',
    //   ],
    //   message:
    //     'Priority is either: musthave, nice to have , only on discount, maybe, low, owned, dropped',
    // },
  },
  themeKey: {
    type: String,
  },
  themeKeySub: {
    type: String,
  },
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
// setsSchema.pre('save', function (next) {
//   next();
// });

setsSchema.pre('save', function (next) {
  this.discount = (this.priceBest / this.priceUvp - 1) * -1 * 100;
  this.discount = this.discount.toFixed(2);
  this.price30 = this.priceUvp * 0.7;
  this.price30 = this.price30.toFixed(2);

  this.price40 = this.priceUvp * 0.6;
  this.price40 = this.price40.toFixed(2);

  this.status = slugify(this.status, { lower: true });

  next();
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
// setsSchema.pre('save', function (next) {
//   next();
// });

setsSchema.post(/^find/, function (docs, next) {
  // console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

const Sets = mongoose.model('Sets', setsSchema);

module.exports = Sets;
