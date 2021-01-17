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
$(document).ready(function () {
  $(".deletecattery").on("click", deleteCattery);
});
function deleteCattery() {
  event.preventDefault(); 
  var confirmation = confirm("Are you sure?");
  if (confirmation) {
    $.ajax({
      type: "DELETE",
      url: "/cattery/" + $(".deletecattery").data("id"),
    }).done(function (response) {
      window.location.replace("/");
    });
  } else {
    return false;
  }
}
$(document).ready(function () {
  $(".deletebreed").on("click", deleteBreed);
});
function deleteBreed() {
  event.preventDefault(); 
  var confirmation = confirm("Are you sure?");
  if (confirmation) {
    $.ajax({
      type: "DELETE",
      url: "/breed/" + $(".deletebreed").data("id"),
    }).done(function (response) {
      window.location.replace("/");
    });
  } else {
    return false;
  }
}

$(document).ready(function () {
  $(".deletekitten").on("click", deleteKitten);
});
function deleteKitten() {
  event.preventDefault(); 
  var confirmation = confirm("Are you sure?");
  if (confirmation) {
    $.ajax({
      type: "DELETE",
      url: "/kitten/" + $(".deletekitten").data("id"),
    }).done(function (response) {
      window.location.replace("/admin");
    });
  } else {
    return false;
  }
}