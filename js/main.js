
var bookmarkInput = document.getElementById('bookmarkName')
var urlInput = document.getElementById('siteUrl')
var submitBtn = document.getElementById('submitBtn')
var ubdateBtn = document.getElementById('updateBtn')



var bookmarks;
bookmarks = JSON.parse(localStorage.getItem('mybookmarks')) || []
display()
function addBookmark(){
var bookmark = {
    bookmarkName : bookmarkInput.value,
    url :urlInput.value

}
claervalidate()
if (!isValidURL(bookmark.url)) {
    showdialog()
    return;
}
for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].bookmarkName.toLowerCase() === bookmark.bookmarkName.toLowerCase()) {
        Swal.fire('Bookmark already exists');
        return;
    }
   }  
   
   
   bookmarks.push(bookmark)
   console.log(bookmarks);
   setLocalStorage()
   claerForm()
   display()
   sweetalert('Bookmark Added successfully')


}



function setLocalStorage() {
    localStorage.setItem('mybookmarks' , JSON.stringify(bookmarks))    
}



function claerForm(){
    bookmarkInput.value = null
    urlInput.value = null
}

function display(){
    var cartona = ""
    for (let index = 0; index < bookmarks.length; index++) {
        cartona += `<tr>
                    <th>${index+1}</th>
                    <td>${bookmarks[index].bookmarkName}</td>
                    <td><button id="visitBtn" class="btn btn-outline-success" onclick="visitBookmark('${bookmarks[index].url}')"><i class="fa-regular fa-eye me-1"></i>Visit</button></td>
                    <td><button id="deleteBtn" class="btn btn-outline-warning" onclick="setForUpdate(${index})"><i class="fa-solid fa-pen me-1"></i>Update</button></td>
                    <td><button id="deleteBtn" class="btn btn-outline-danger" onclick="deleteBookmark(${index})"><i class="fa-solid fa-trash me-1"></i>Delete</button></td>
                  </tr>`
        
    }
   
document.getElementById('demo').innerHTML = cartona ;

}

function visitBookmark(url){
 
    window.open(url, '_blank');
    
}

function deleteBookmark(index){
bookmarks.splice(index,1)
display()
setLocalStorage()
}

function isValidURL(url) {
    const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/i;
    return pattern.test(url); 

}

function sweetalert(text){
    Swal.fire({
        title: "Good job!",
        text: `${text}`,
        icon: "success"
      });
}

function showdialog(){
    var dialog = document.getElementById('urlDialog')
    console.log(dialog);
    dialog.showModal()
    
}


function closeDialog(){
    var dialog = document.getElementById('urlDialog');
    dialog.close(); 
}
var updatedIndex;
function setForUpdate(index){
 updatedIndex=index   

bookmarkInput.value = bookmarks[index].bookmarkName
urlInput.value  = bookmarks[index].url
submitBtn.classList.replace('d-block','d-none');
ubdateBtn.classList.replace('d-none','d-block');

}

function updateBookmark() {
    bookmarks[updatedIndex].bookmarkName = bookmarkInput.value
    bookmarks[updatedIndex].url = urlInput.value
    submitBtn.classList.replace('d-none','d-block');
 ubdateBtn.classList.replace('d-block','d-none');
 
 localStorage.setItem('mybookmarks' , JSON.stringify(bookmarks))  
 sweetalert('Bookmark Updated successfully') 
 display()
 claerForm()
 claervalidate()
   
}

function validateUrl() {
    var url = urlInput.value
    if(!isValidURL(url)){
        urlInput.classList.add('is-invalid');
    }
    else{
        urlInput.classList.add('is-valid');
        urlInput.classList.remove('is-invalid');
    }



}
  

function validateBookmark(){
    var pattern = /^[a-zA-Z0-9_-]{3,15}$/
var bookmark = bookmarkInput.value
console.log(pattern.test(bookmark));
if(pattern.test(bookmark)){
   bookmarkInput.classList.add('is-valid');
    bookmarkInput.classList.remove('is-invalid');
}
else{
    bookmarkInput.classList.add('is-invalid');
}
}

urlInput.addEventListener('input',validateUrl)

bookmarkInput.addEventListener('input',validateBookmark)

function claervalidate(){
    bookmarkInput.classList.remove('is-valid', 'is-invalid');
    urlInput.classList.remove('is-valid', 'is-invalid');
}
