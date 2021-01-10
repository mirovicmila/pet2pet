$(document).ready(function () {
  $(".deleteuser").on("click", deleteUser);
});
function deleteUser() {
  event.preventDefault(); 
  var confirmation = confirm("Are you sure?");
  if (confirmation) {
    $.ajax({
      type: "DELETE",
      url: "/user/" + $(".deleteuser").data("id"),
    }).done(function (response) {
      window.location.replace("/admin");
    });
  } else {
    return false;
  }
}
