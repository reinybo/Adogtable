const URL = "https://api.rescuegroups.org/v5/public/";
// const URL = "https://api.rescuegroups.org/v5/public/animals/breeds";

const $dogSection = $('#dogs-section');
const $dogSection2 = $('#dogs-section2');
let dogsObjectsArray;


const apiKey = "lIjLEOom";


function handleGetData() {

    $.ajax({url: URL + "animals/search/available/", headers: {Authorization: apiKey}}).then(( data ) => {

        console.log('sucess');
        console.log("data: ");
        console.log(data);
        console.log("data.data[0].attributes.name: ");
        console.log(data.data[0].attributes.name);
        console.log(data.included[6].attributes.city);
        dogsDataArray=data.data;
        dogsIncludesArray=data.included;
        console.log(data.data[0].relationships.locations);
        console.log('data.data[0]:');
        console.log(data.data[0]);
 //       render(data.included);
//        render2(data.data)
        render();
    }, ( error ) => {
        console.log( 'bad request', error );
    } )
}



function render() {
    const availDogs = dogsDataArray.map(function(dogObject, index) {
        return `
        <article data-index="${index}">
            <h2>${dogObject.attributes.name}</h2> 
            <h3>${dogObject.id}</h3>
            <img id='dogImg' src="${dogObject.attributes.pictureThumbnailUrl}"/>
        </article>
        `;
    })
    $dogSection.html(availDogs);
    
    const availDogs2 = dogsIncludesArray.map(function(dogObject, index) {
        if (dogObject.type === 'locations'){
            console.log("found loc");
            return `
            <article data-index="${index}">
                <h3>${dogObject.attributes.coordinates}</h3>
                <h4>${dogObject.id}</h4>
            </article>
            `;
        }
    })
    $dogSection2.html(availDogs2);
    
}



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

handleGetData();