
// const URL = "https://api.rescuegroups.org/v5/public/animals/breeds";

const $dogSection = $('#dogs-section');
const $dogSection2 = $('#dogs-section2');
let dogsObjectsArray;
let dogsBreedsArray=[];

const apiKey = "lIjLEOom";

const URL = "https://api.rescuegroups.org/v5";

const $form = $('form');
const $zipInputSpace = $('#zip');
const $radiusInputSpace = $('#radius');




$form.on('submit', handleGetData)

$dogSection.on('click', handleClick);


function handleGetData() {
    const zipcodeInput = $zipInputSpace.val();
    const radiusInput = $radiusInputSpace.val(); 

    $.ajax({type: 'POST', 
            url: URL + "/public/animals/search/available/dogs", 
            headers: {Authorization: apiKey}, 
            data: JSON.stringify({
                     data: {
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


function render() {
    const availDogs = dogsDataArray.map(function(dogObject, index) {

        dogsBreedsArray.push(dogObject.attributes.breedPrimary);

        return `
            <article data-index="${index}">
                <h2>${dogObject.attributes.name}</h2> 
                <h5>${dogObject.attributes.distance} miles</h5>
                <img id='dogImg' src="${dogObject.attributes.pictureThumbnailUrl}"/>
            </article>
        `;
    })
    $dogSection.html(availDogs);
}



function sideBarBreeds() {
    console.log(dogsBreedsArray);
    let $breedParent = document.getElementById('dropdown'); 

    for(let i = 0; i < dogsBreedsArray.length; i++) {
        var breed = dogsBreedsArray[i];
        var el = document.createElement('option');
        el.text = breed;
        console.log(el.text);
        el.value = breed;
        console.log(el.value);
        $breedParent.appendChild(el);
    }
}









function handleClick() {
    const $target = $(this);
    // const answer = $target.text();
    const $dogClicked = $target.closest('article');
    console.log($dogClicked);
    
    // const dogIndex = $dogClicked.attr('data-index');
    // console.log($dogClicked.attr(data-index));
    // const questionReference = questionObjectsArray[questionIndex];
    
    // if (questionReference.correct_answer === answer) {
    //     $answerResult.text('You Guessed Correctly');
    // } else {
    //     $answerResult.text('You Guessed Incorrectly');
    // }
}





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
