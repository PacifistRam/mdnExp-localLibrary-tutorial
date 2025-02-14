const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// virtual for author's full name
AuthorSchema.virtual("name").get(function () {
  //avoid errors in case where author doesn't have first name or family name
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }
  return fullname;
});

// virtual for author's url
AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("date_of_birth_formatted").get(function (){
  return this.date_of_birth ?
  DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
})
AuthorSchema.virtual("date_of_death_formatted").get(function (){
  return this.date_of_death ?
  DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';
})

module.exports = mongoose.model("Author", AuthorSchema);
