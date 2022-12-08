
/////////////
///VARIABLES
/////////////

let dogsObjectsArray;
let dogsBreedsArray=[];

let operationVal = 'notblank';
let breedChoice = 'null';
let sexChoice='null';

const apiKey = "lIjLEOom";

const URL = "https://api.rescuegroups.org/v5";

/////////////
///ELEMENTS REF'D / CACHED ELEMENTS
/////////////

const $dogSection = $('#dogs-section');

const $form = $('#seeDogs');
const $zipInputSpace = $('#zip');
const $radiusInputSpace = $('#radius');

const $dropdown = $('#filterResults');

var $paw = document.getElementById('paw');

//////////////
///EVENT LISTENERS
//////////////

$dropdown.on('submit', handleFilter);
$form.on('submit', handleGetData);

//////////////
///FUNCTIONS
//////////////

function handleGetData() {
    const zipcodeInput = $zipInputSpace.val();
    const radiusInput = $radiusInputSpace.val(); 

    $.ajax({type: 'POST', 
            url: URL + "/public/animals/search/available/dogs/", 
            headers: {Authorization: apiKey}, 
            data: JSON.stringify({
                     data: {
                        'filters':
                        [
                        {
                            'fieldName': 'animals.breedPrimary',    //filters results by breed
                            'operation': operationVal,
                            'criteria': breedChoice
                        },
                        {
                            'fieldName': 'animals.sex',     //filters results by sex
                            'operation': operationVal,
                            'criteria': sexChoice
                        }
                        ],
                         "filterRadius": {              //filters results by radius
                             "miles": radiusInput,
                             "postalcode": zipcodeInput,
                            }
                     }
             })}).then((data) => {

        console.log(data);
        dogsDataArray=data.data;
        render();
        $paw.classList.add("fa-shake");
        sideBarBreeds();

    }, ( error ) => {
        console.log( 'bad request', error );
    } )
}


function render(index) {
    const availDogs = dogsDataArray.map(function(dogObject, index) {

        if (!dogsBreedsArray.includes(dogObject.attributes.breedPrimary)){  //creates array of dog breeds for dropdown menu
            dogsBreedsArray.push(dogObject.attributes.breedPrimary);
        }
                                                        //creates each dog profile square and adds to html element
        return `
            <article class="dog" id="${index}">
                <h2>${dogObject.attributes.name}</h2> 
                <h5>${dogObject.attributes.distance} miles</h5>
                <img id='dogImg' src="${dogObject.attributes.pictureThumbnailUrl}"/>
                <br></br>
                <button id='learnMore' onclick="learnMore(${index})">Learn more</button>
            </article>
        `; 
    });
    $dogSection.html(availDogs);
}



function sideBarBreeds() {      //creates drop down menu out of breeds array
    let $breedParent = document.getElementById('breedDropdown'); 

    for(let i = 0; i < dogsBreedsArray.length; i++) {
        let breed = dogsBreedsArray[i];
        let el = document.createElement('option');
        el.text = breed;
        el.value = breed;
        $breedParent.appendChild(el);
    }
}



function handleFilter() {   //when filter button is pressed, selections are placed in data filter variables
    const breedFilter = document.querySelector('#breedDropdown');
    breedChoice = breedFilter.value;
    operationVal = 'equal';
    const sexFilter = document.querySelector('#sexDropdown');
    sexChoice = sexFilter.value;

    handleGetData();
}



function learnMore(doggyIndex) {        //when 'Learn More' button is pressed, display more attributes
    selectedArticle = document.getElementById(doggyIndex);
    selectedArticle.style.border='none';
    selectedArticle.innerHTML = `
        <article class="dog" id="${doggyIndex}">
            <h5>${dogsDataArray[doggyIndex].attributes.name}</h2> 
            <h5>${dogsDataArray[doggyIndex].attributes.distance} miles</h5>
            <h5>sex: ${dogsDataArray[doggyIndex].attributes.sex}</h6>
            <h5>breed: ${dogsDataArray[doggyIndex].attributes.breedPrimary}</h6>
            <a href="${dogsDataArray[doggyIndex].attributes.url}">LINK</a>
            <br></br>
            <img id='dogImg' src="${dogsDataArray[doggyIndex].attributes.pictureThumbnailUrl}"/>
            <br></br>
            <button onclick="render(${doggyIndex})">Show less</button>
        </article>
        `;
}


