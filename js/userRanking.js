/* ////////////////////////////////////////////////////////////////////////////////////////

This file stores functions to show the user ranking by the number of condition reports submitted.
UserRanking() function will be called when the menu item of "User Ranking" is clicked.
It calls fetchUserRanking() after fetching the user_id by the promise return.

fetchUserRanking function alert the meassage of user's ranking from the data result return by endpoint: /userRanking/user_id

*/ ////////////////////////////////////////////////////////////////////////////////////////

function UserRanking() {
    fetchUserId()
    .then((userId) => {
        fetchUserRanking(userId);
    })
    .catch((error) => {
      console.error("Error fetching user ID:", error);
    });
}

//fetch User Ranking
function fetchUserRanking(userId) {
  let serviceUrl = document.location.origin + "/api/userRanking/" + userId;
      $.ajax({
          url: serviceUrl,
          crossDomain: true,
          type: "GET",
          success: function(data) {
          // Extract the ranking from the response data and show an alert
          let ranking = data[0].array_to_json[0].rank;
          alert("Your ranking based on condition reports is: " + ranking);
          },
          error: function(err) {
          console.error("Error while fetching user ranking:", err);
          }
      });
} 