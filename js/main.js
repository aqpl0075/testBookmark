//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save bookmark
function saveBookmark(e){
    //console.log('it works');

    //Get form values
    var siteNm = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteNm, siteUrl)){
        return false;
    }

    var oBookmark = {
        name: siteNm,
        url: siteUrl
    }

    /*
    //local storage test
    localStorage.setItem('test', 'Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
    */

    //test if bookmarks is null
    if(localStorage.getItem('bookmarks') === null){
        //init array
        var arrBookmark = [];
        arrBookmark.push(oBookmark);

        //set to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(arrBookmark));
    }
    else {
        //get bookmarks from localstorage
        var arrBookmark = JSON.parse(localStorage.getItem('bookmarks'));

        //add bookmarks to array
        arrBookmark.push(oBookmark);

        //set back to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(arrBookmark));
    }

    //Clear form
    document.getElementById('myForm').reset();

    //re-fetch bookmarks
    fetchBookmarks();

    //prevent form from submitting
    e.preventDefault();
}

//delete bookmark
function deleteBookmark(url){
    //get bookmarks from localstorage
    var arrBookmark = JSON.parse(localStorage.getItem('bookmarks'));

    //loop through bookmarks
    for(var i = 0; i < arrBookmark.length; i++){
        if(arrBookmark[i].url == url){
            //remove from array
            arrBookmark.splice(i, 1);
        }
    }

    //re-set back to localstorage
    localStorage.setItem('bookmarks', JSON.stringify(arrBookmark));

    //re-fetch bookmarks
    fetchBookmarks();
}

//fetch bookmark
function fetchBookmarks(){
    //get bookmarks from localstorage
    var arrBookmark = JSON.parse(localStorage.getItem('bookmarks'));

    //get output id
    var bookmarkResults = document.getElementById('bookmarksResults');

    //build output
    bookmarkResults.innerHTML = '';

    for(var i = 0; i < arrBookmark.length; i++){
        var name = arrBookmark[i].name;
        var url = arrBookmark[i].url;

        bookmarkResults.innerHTML += '<div class="well">' +
                                     '<h3>'+ name + 
                                     ' <a class="btn btn-default" target="_blank" href="' + url + '">Visit</a> ' +
                                     ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a> ' +
                                     '</h3>' +
                                     '</div>';
    }

    //console.log(arrBookmark);
}

function validateForm(siteNm, siteUrl){
    if(!siteNm || !siteUrl){
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)){
        alert('Please use a valid url');
        return false;
    }

    return true;
}