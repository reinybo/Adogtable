
// const URL = "https://api.rescuegroups.org/v5/public/animals/breeds";

const $dogSection = $('#dogs-section');
const $dogSection2 = $('#dogs-section2');
let dogsObjectsArray;
let dogsBreedsArray=[];

let operationVal = 'notblank';
let breedChoice = 'chihuahua';
let sexChoice='male';

const apiKey = "lIjLEOom";

const URL = "https://api.rescuegroups.org/v5";

const $form = $('#seeDogs');
const $zipInputSpace = $('#zip');
const $radiusInputSpace = $('#radius');

const $dropdown = $('#filterResults');

$dropdown.on('submit', handleFilter);

$form.on('submit', handleGetData);

// $dogSection.on('click', handleClick);


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
                            'fieldName': 'animals.breedPrimary',
                            'operation': operationVal,
                            'criteria': breedChoice
                        },
                        {
                            'fieldName': 'animals.sex',
                            'operation': operationVal,
                            'criteria': sexChoice
                        }
                        ],
                         "filterRadius": {
                             "miles": radiusInput,
                             "postalcode": zipcodeInput,
                            }
                     }
             })}).then((data) => {

        console.log('success');
        console.log("data: ");
        console.log(data);
        dogsDataArray=data.data;
        render();
        sideBarBreeds();

    }, ( error ) => {
        console.log( 'bad request', error );
    } )
}


function render(index) {
    const availDogs = dogsDataArray?.map(function(dogObject, index) {

        if (!dogsBreedsArray.includes(dogObject.attributes.breedPrimary)){
            dogsBreedsArray.push(dogObject.attributes.breedPrimary);
        }
        
        return `
            <article class="dog" id="${index}">
                <h2>${dogObject.attributes.name}</h2> 
                <h5>${dogObject.attributes.distance} miles</h5>
                <img id='dogImg' src="${dogObject.attributes.pictureThumbnailUrl}"/>
                <br></br>
                <button onclick="learnMore(${index})">Learn more</button>
            </article>
        `;
    });
    $dogSection.html(availDogs);
}



function sideBarBreeds() {
    // console.log(dogsBreedsArray);
    let $breedParent = document.getElementById('breedDropdown'); 

    for(let i = 0; i < dogsBreedsArray.length; i++) {
        let breed = dogsBreedsArray[i];
        let el = document.createElement('option');
        el.text = breed;
        // console.log(el.text);
        el.value = breed;
        // console.log(el.value);
        $breedParent.appendChild(el);
    }
}



function handleFilter() {
    console.log('pressed');
    const breedFilter = document.querySelector('#breedDropdown');
    breedChoice = breedFilter.value;

    operationVal = 'equal';

    const sexFilter = document.querySelector('#sexDropdown');
    sexChoice = sexFilter.value;

    handleGetData();
}



function learnMore(doggyIndex) {
    console.log(dogsDataArray[doggyIndex].attributes.breedPrimary);
    selectedArticle = document.getElementById(doggyIndex);
    console.log(selectedArticle);
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




// function handleClick() {
//     const $target = $(this);
//     const $dogClicked = $target.closest('article.dog');
//     // const answer = $dogClicked.text();
//     // console.log(answer);
//     console.log($dogClicked);
//     const dogIndex = $dogClicked.attr('class');
//     console.log('index:');
//     console.log(dogIndex);

//     console.log(dogsDataArray.indexOf($dogClicked));

    
//     // const dogIndex = $dogClicked.attr('data-index');
//     // console.log($dogClicked.attr(data-index));


//     // const questionReference = questionObjectsArray[questionIndex];
    
//     // if (questionReference.correct_answer === answer) {
//     //     $answerResult.text('You Guessed Correctly');
//     // } else {
//     //     $answerResult.text('You Guessed Incorrectly');
//     // }
// }





     //   console.log("data.data[0].attributes.name: ");
     //   console.log(data.data[0].attributes.name);
     //   console.log(data.included[6].attributes.city);
     //   dogsDataArray=data.data;
     //   dogsIncludesArray=data.included;
     //   console.log(data.data[0].relationships.locations);
     //   console.log('data.data[0]:');
     //   console.log(data.data[0]);
 //       render(data.included);
//        render2(data.data)
 //       render();




// function handleSubmission() {
//     console.log('button pressed');
//     const zipcodeInput = $zipInputSpace.val();
//     console.log($zipInputSpace.val());
//     // console.log($(radiusInputSpace).val());
//     // const radiusInput = radiusInputSpace.value; 
//     return zipcodeInput;   
// }







    
//     const availDogs2 = dogsIncludesArray.map(function(dogObject, index) {
//         if (dogObject.type === 'locations'){
//             console.log("found loc");
//             let locDogId = dogObject.id;
            
//             const availDogs = dogsDataArray.map(function(dogObject, index) {
//                 if (dogObject.relationships.locations.data[0].id === locDogId) {
//                     console.log('found match');
//                     let doggyName = dogObject.attributes.name;
//                     return `
//                         <article data-index="${index}">
//                          <h2>${dogObject.attributes.name}</h2> 
//                          <h3>${dogObject.id}</h3>
//                          <img id='dogImg' src="${dogObject.attributes.pictureThumbnailUrl}"/>
//                         </article>                    
//                     `;
//                 }
//             }).join('');
//             $dogSection.html(availDogs);
//             return `
//             <article data-index="${index}">
//                 <h2>${dogObject.attributes.name}</h2> 
//                 <h3>${dogObject.id}</h3>
//                 <img id='dogImg' src="${dogObject.attributes.pictureThumbnailUrl}"/>
//                 <h3>${dogObject.attributes.coordinates}</h3>
//                 <h4>${dogObject.id}</h4>
//             </article>
//             `;
//         }
//     }).join('');
//     $dogSection2.html(availDogs2);
    
// }



// function render(doggies) {
    // console.log('running render');
    // const availDogs2 = doggies.map(function(dogObject, index) {
    //     if (dogObject.type === 'locations'){
    //         console.log("found loc");
    //         return `
    //         <article data-index="${index}">
    //             <h3>${dogObject.attributes.coordinates}</h3>
    //             <h4>${dogObject.id}</h4>
    //         </article>
    //         `;
    //     }
    // })
    // $dogSection.html(availDogs2);
// }



// function render2(dogs) {
//     const availDogs = dogs.map(function(dogObject, index) {
//         render(dogs)
//         return `
//         <article data-index="${index}">
//             <h2>${dogObject.attributes.name}</h2> 
//             <h3>${dogObject.id}</h3>
//             <img id='dogImg' src="${dogObject.attributes.pictureThumbnailUrl}"/>
//         </article>
//         `;
//     })
//     $dogSection2.html(availDogs);
// }
