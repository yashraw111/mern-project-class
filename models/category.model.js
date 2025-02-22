const { Schema, model } = require("mongoose");
const { common } = require("../utils/common");
const categorySchema = new Schema({
    cat_name:{
        ...common,
        unique:[true,"category already exist"]
    }
},{
    timestamps:true
})

exports.Category = model("Category",categorySchema)