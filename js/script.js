const URL = "https://api.rescuegroups.org/v5/public/";
// const URL = "https://api.rescuegroups.org/v5/public/animals/breeds";

const $dogSection = $('#dogs-section');
let dogsObjectsArray;


const apiKey = "lIjLEOom";


function handleGetData() {

    $.ajax({url: URL + "animals/search/available/", headers: {Authorization: apiKey}}).then(( data ) => {

        console.log('sucess');
        console.log("data: " + data );
        console.log(data);
        console.log("data.data[0].attributes.name: " + data.data[0].attributes.name)
        dogsObjectsArray=data.data;
        console.log("data.data: " + data.data);
        console.log('data.data[0]:')
        console.log(data.data[0])
        render(data.data);
    }, ( error ) => {
        console.log( 'bad request', error );
    } )
}



function render(dogs) {
    const availDogs = dogs.map(function(dogObject, index) {
        return `
        <article data-index="${index}">
            <h2>${dogObject.attributes.name}</h2>      
            <img id='dogImg' src="${dogObject.attributes.trackerimageUrl}"/>
        </article>
        `;
    })
    $dogSection.html(availDogs);
}

handleGetData();