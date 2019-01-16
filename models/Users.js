const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    info: {
        username: { type: String, required: true }, 
        firstname: { type: String, required: true }, 
        lastname: { type: String, required: true }, 
        email: { type: mongoose.Schema.Types.String, required: true, unique: true, index: true, match:/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/ },
        birthday: { type: Date, required: true },
        postalcode: String,
        city: { type: String, required: true },
        country: { type: String, required: true },
        address: String,
        gender: { type: String, required: true, index: true, enum: ["Male", "Female", "Other"], default: "Other" },
        phone: { type: String, match: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/ },
        image: String
     },
     auth: {
         password: {type: String, required: true},
     },
     lastlogin: { type: Date, default: Date.now() },
     matchescriteria: {},
     lastgeo: {
         latitude: String,
         longitude: String
     },
     favourites: [ mongoose.Schema.Types.ObjectId ],
     series: [ mongoose.Schema.Types.ObjectId ],
     movies: [ mongoose.Schema.Types.ObjectId ],
     lists: [ mongoose.Schema.Types.ObjectId ],
     chats: [ mongoose.Schema.Types.ObjectId ],
     matches: [ mongoose.Schema.Types.ObjectId ],
 }, {
     timestamps: { createdAt: 'created_at', updatedAt: "updated_at" },
     //autoIndex: false // Production way
 });
 
 
 // Usamos index a nivel de field, más arriba
 // UserSchema.index({gender: 1, birthday: -1})
 
 module.exports = new mongoose.model("User", userSchema);