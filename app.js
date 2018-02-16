console.log('hello');

const headline = document.querySelector('.page-header');
const scrip = document.querySelector('script');
let studentList = document.querySelectorAll('ul.student-list li:not(.erased)');
const studentNames = document.querySelectorAll('h3');
// const items = studentList.querySelectorAll('li');
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
searchInput.setAttribute('type', 'text');
searchButton.textContent = 'Search';
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchButton);
searchFrag.appendChild(searchDiv);
headline.appendChild(searchFrag);


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

function getLinks(){
  const pgnUL = document.createElement('ul');
  // let students = document.querySelectorAll('.student-item');
  let links = [];
  for(let i = 0; i < Math.ceil(studentList.length/10); i++){
    links.push(i + 1);
    console.log(links, studentList.length);
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
    console.log(e);
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




searchButton.addEventListener('click', e => {
  console.log(e);
  let term = searchInput.value;
  console.log(term);
  studentNames.forEach(n => {
    if(!n.textContent.toLowerCase().includes(term.toLowerCase())){
        n.parentNode.parentNode.classList.add('erased');
    } else {
      n.parentNode.parentNode.classList.remove('erased');
    }


  });
  studentList = document.querySelectorAll('ul.student-list li:not(.erased)');
  pgnDiv.removeChild(pgnDiv.firstElementChild)
  getPage(1);
  getLinks();

});




















// 2
