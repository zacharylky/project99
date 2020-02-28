const express = require("express");
const router = express.Router();
const Petitions = require("../models/petitions.js");

router.get("/", (req, res) => {
  Petitions.find({})
    .populate("user")
    .exec((err, foundPetitions) => {
      res.json(foundPetitions);
    });
});

router.get("/:id", (req, res) => {
  Petitions.findById(req.params.id, (err, foundPetition) => {
    res.json(foundPetition);
  });
});

router.post("/", (req, res) => {
  Petitions.create(req.body, (err, createdPetition) => {
    res.json(createdPetition); //.json() will send proper headers in response so client knows it's json coming back
    // res.redirect(303, '/');
  });
});

router.delete("/:id", (req, res) => {
  Petitions.findByIdAndRemove(req.params.id, (err, deletedPetition) => {
    res.redirect(303, "/");
  });
});

router.put("/:id", (req, res) => {
  console.log(req.body);
  Petitions.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedPetition) => {
      res.json(updatedPetition);
      //   console.log(updatedPetition);
      // res.redirect(303, '/profile');
    }
  );
});

router.put("/vote/:id", (req, res) => {
  console.log(req.body);
  Petitions.findByIdAndUpdate(
    req.params.id,
    req.body,
    { vote: req.body.vote },
    (err, updatedPetition) => {
      res.json(updatedPetition);
      //   console.log(updatedPetition);
      // res.redirect(303, '/profile');
    }
  );
});

module.exports = router;
