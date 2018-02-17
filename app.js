const headline = document.querySelector('.page-header');
let studentList = document.querySelectorAll('ul.student-list li:not(.erased)');
const studentNames = document.querySelectorAll('h3');
const pageDiv = document.querySelector('.page');
const linksFrag = document.createDocumentFragment();
const pgnDiv = document.createElement('div');
pgnDiv.className = 'pagination';
const searchFrag = document.createDocumentFragment();
const searchDiv = document.createElement('div');
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');
searchDiv.className = 'student-search';
searchInput.setAttribute('placeholder', 'Search for students...');
searchInput.setAttribute('type', 'search');
searchButton.textContent = 'Search';
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchButton);
searchFrag.appendChild(searchDiv);
headline.appendChild(searchFrag);

// gets the proper group of up to 10 students by looping through every student not excluded by the search term, if any, and applying the appropriate class to either show or hide the student. called on page load to show first 10 students.
function getPage(page){
  studentList.forEach((x,i) => {
    if(Math.floor(i / 10) !== page - 1){
      x.classList.remove('shown');
      x.classList.add('hidden');
    } else {
      x.classList.remove('hidden');
      x.classList.add('shown');
    }
  });
}
getPage(1);

// create pagination links and insert into DOM. based on number of students not excluded by search term, if any. if 10 or fewer students, no links created. click handler assigns active class to clicked link and calls getPage to get students.
function getLinks(){
  const pgnUL = document.createElement('ul');
  let links = [];
  if(studentList.length > 10){
    for(let i = 0; i < Math.ceil(studentList.length/10); i++){
      links.push(i + 1);
    }
  }
  links.forEach((n,i) => {
    let li = document.createElement('li');
    let anc = document.createElement('a');
    if(i === 0){
       anc.classList.add('active');
    }
    anc.textContent = n;
    li.appendChild(anc);
    pgnUL.appendChild(li);
  });
  pgnDiv.appendChild(pgnUL);
  pgnUL.addEventListener('click', e => {
    [...pgnUL.children].forEach(x => {
      x.firstElementChild.classList.remove('active');
    });
    if(e.target.tagName === 'A'){
      getPage(parseInt(e.target.textContent));
      e.target.classList.add('active');
    }
  });
}
getLinks();

linksFrag.appendChild(pgnDiv);
pageDiv.appendChild(linksFrag);

// excludes students from appearing or being able to appear via pagination if name does not include search term. creates and inserts into DOM a message that no results match the search term.
searchButton.addEventListener('click', e => {
  let term = searchInput.value;
  studentNames.forEach(n => {
    if(!n.textContent.toLowerCase().includes(term.toLowerCase())){
        n.parentNode.parentNode.classList.add('erased');
    } else {
      n.parentNode.parentNode.classList.remove('erased');
    }
  });
  studentList = document.querySelectorAll('ul.student-list li:not(.erased)');
  let noMatch;
  if(studentList.length === 0){
    if(pageDiv.lastElementChild.tagName === 'P'){
      pageDiv.lastElementChild.textContent = `There were no matches for the term "${term}".`;
    } else {
      noMatch = document.createElement('p');
      noMatch.textContent = `There were no matches for the term "${term}".`;
      pageDiv.appendChild(noMatch);
    }
  } else {
    if(pageDiv.lastElementChild.tagName === 'P'){
      pageDiv.removeChild(pageDiv.lastElementChild);
    }
  }
  pgnDiv.removeChild(pgnDiv.firstElementChild);
  getPage(1);
  getLinks();
});
