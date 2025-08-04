const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isowner,validatelisting} = require("../middleware.js");
const listingControler = require("../controlers/listings.js");
const multer  = require("multer");
const {storage} = require("../cloudConfig.js");

const upload = multer({ storage });


router
.route("/")
.get(wrapAsync (listingControler.index))
.post(
  isLoggedIn,
 
  upload.single("listing[image]"),
    validatelisting,
  wrapAsync(listingControler.createListing));

//New Route
router.get("/new", isLoggedIn,listingControler.renderNewForm);

router
.route("/:id")
.get( wrapAsync(listingControler.showListing))
.put(
isLoggedIn,
isowner,
 upload.single("listing[image]"),
  validatelisting,
  
 wrapAsync(listingControler.updateListing))
 .delete(
   isLoggedIn, isowner,wrapAsync(listingControler.destroyListing));

 //Edit Route
router.get("/:id/edit",isLoggedIn,isowner, wrapAsync(listingControler.renderEditForm));

module.exports = router;