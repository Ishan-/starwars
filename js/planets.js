function searchPlanets() {
    let input = document.getElementById('myInput').value.toLowerCase()
        //if list contains input query then 
    let list = planetList.filter((pl) => {
        return (pl.name.toLowerCase().startsWith(input))
    })
    if (list.length) {
        list = list.sort((a, b) => {
            return parseInt(a.population) - parseInt(b.population)
        })
    }
    //populate list
    generateList(document.getElementById('results'), list)
}

function generateList(parent, list) {
    while (parent.hasChildNodes()) {
        parent.removeChild(parent.lastChild);
    }
    if (list.length) {
        list.forEach(element => {
            let li = document.createElement('li')
            li.setAttribute('id', 'planet' + element.name)
            li.setAttribute('url', element.url)
            li.className = 'list-group-item'
            li.innerHTML = element.name
            parent.appendChild(li)
        });
    } else {
        let li = document.createElement('li')
        li.setAttribute('id', 'noResult')
        li.className = 'list-group-item no-data'
        li.innerHTML = 'No Planets found'
        parent.appendChild(li)
    }

}

function getPlanetDetails(e) {
    if (e.target && e.target.nodeName == "LI") {
        // console.log(e.target.attributes.url.nodeValue + " was clicked");
        if (e.target.attributes.url) {
            document.getElementById('homeLoader').style.display = 'block'
            API.getResource(e.target.attributes.url.nodeValue)
                .then(function(res) {
                    console.log(res)
                    document.getElementById('homeLoader').style.display = 'none'
                    setModalContent(res)
                })
                .catch(function(err) {
                    console.error('Augh, there was an error!', err);
                });
        }

    }
}

function setModalContent(planet) {
    document.getElementById('planet-name').innerHTML = planet.name
    document.getElementById('climate').innerHTML = planet.climate
    document.getElementById('diameter').innerHTML = planet.diameter
    document.getElementById('terrain').innerHTML = planet.terrain
    document.getElementById('myModal').style.display = "block";
}


function closeModal() {
    document.getElementById('myModal').style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == document.getElementById('myModal')) {
        document.getElementById('myModal').style.display = "none";
    }
}

function logOut() {
    hasAccess = false
    window.location.hash = '#login'
}