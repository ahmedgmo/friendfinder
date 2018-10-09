var friends = require("../data/friends");

module.exports = function(app) {
  
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

   app.post("/api/friends", function(req, res) {
    
    var perfectMatch = {
      name: "",
      photo: "",
      friendDifference: Infinity
    };

    var userInput = req.body;
    var userScore = userInput.scores;

    var difference;

    for (var i = 0; i < friends.length; i++) {
      var currentFriend = friends[i];
      difference = 0;

      for (var x = 0; x < currentFriend.scores.length; x++) {
        var currentFriendScore = currentFriend.scores[x];
        var currentUserScore = userScore[x];

        difference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
      }

      if (difference <= perfectMatch.friendDifference) {
        perfectMatch.name = currentFriend.name;
        perfectMatch.photo = currentFriend.photo;
        perfectMatch.friendDifference = difference;
      }
    }

    friends.push(userInput);

    res.json(perfectMatch);
  });
};
