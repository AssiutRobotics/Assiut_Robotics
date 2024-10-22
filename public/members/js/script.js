//global variables
const board = document.querySelectorAll('.circle');

const info = document.querySelector('.col-4');
const border = document.querySelector('.vline');

//Setup Members
var membersData = [];
const container = document.getElementsByClassName(".members");


//fetching data from the api
async function fetchingData() {
    try{
    let response = await fetch('https://assiutrobotics-production.up.railway.app/members/getAllMembers');
    let data = await response.json();
    return data.data.members;
    }
    catch(error){
        console.log(error);
    }
}

// testing the data
const testing = async () => {

    membersData = await fetchingData();
    console.log(membersData);


    function searchFor(Committee, data) {
        for (let i = 0; i < data.length; i++) {
            
            if (data[i].committee === Committee && data[i].role == /*For testing we will use the number*/ 2 /*'head'*/) {
                console.log(data[i].avatar);
                return data[i].avatar;
            }
        }
    }
    
    function createMembers() {
        let data = membersData;
        let teamLeaderPicture = document.getElementById('PTeamLeader')
        // let pictureLeader = searchFor('team', data)
        let commitiesHeads = document.getElementById('CSlider') // this will contain the committees taps 
        // Create the taps  // HR PR    marketing AC media web 
        // solve the problem that the styles doesn't work
        let arrOfCommities = ['HR', 'PR', 'marketing', 'AC', 'media', 'web']
        for (let i = 0; i < 6; i++) {
            let pciture = searchFor(arrOfCommities[i], data)
            let content = `
            <div class="col-2">
              <div class="circle">
                <img src="${pciture}" class="pic">
              </div>
              <h3>${arrOfCommities[i]}</h3>
            </div>`
            
            commitiesHeads.innerHTML += content
        }
    }
    createMembers()
}

testing();



//clicking event for board members
board.forEach(e => {
    e.addEventListener("click", () => {
        if (info.style.display === 'none') {
            info.style.display = 'block';
            border.style.display = 'block';
        } else {
            info.style.display = 'none';
            border.style.display = 'none';
        }
    })
});


const members = document.querySelectorAll('.circle2');
//clicking event for team members
// members.forEach(e => {
//     e.addEventListener("click", () => {
//         if (info.style.display === 'none') {
//             info.style.display = 'block';
//             border.style.display = 'block';
//         } else {
//             info.style.display = 'none';
//             border.style.display = 'none';
//         }
//     })
// });

