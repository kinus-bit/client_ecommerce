const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    }
});

//Ensure unique subcategory per category
SubCategorySchema.index({ name: 1, category:1 }, {unique: true});


module.exports = mongoose.model('Subcategory',SubCategorySchema);