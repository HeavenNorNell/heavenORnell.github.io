let numOfLikes = [0, 0, 0, 0, 0];
function likePhoto(photo) {
    numOfLikes[photo]++;
    console.log(numOfLikes);
    document.getElementById("likeCount" + photo).innerHTML = numOfLikes[photo];
}

let user = {
    "name_first": "Hunter",
    "name_last": "Rogers",
    "name": "heavenOrNell",
    "followers": ["Amy123", "Milovs.theworld", "DallasYoung"],
    "profile_pic": "https://static.boredpanda.com/blog/wp-content/uploads/2015/07/leaf-sheep-sea-slug-costasiella-kuroshimae-fb.jpg",
}

setTimeout(function () { document.getElementById("name").innerHTML = user.name; }, 3000);
setTimeout(function () { document.getElementById("followers").innerHTML = "Followers: " + user.followers.length; }, 3000);
setTimeout(function () { $("#profile_pic").attr("src", user.profile_pic); }, 3000);