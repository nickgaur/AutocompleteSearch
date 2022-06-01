const search = document.getElementById("search")
const matchList = document.getElementById('match-list')

// Search element in the states.json and filter it
const searchStates = async (searchText) => {
    const result = await fetch('../data/states.json')
    const states = await result.json();

    // Get matches to current text input
    let matches = states.filter((state) => {
        const regex = new RegExp(`^${searchText}`, 'gi')
        return state.name.match(regex) || state.abbr.match(regex)
    })

    // If the length of the search text is 0 then empty the array
    if (searchText.length === 0) {
        matches = []
        matchList.innerHTML = ""
    }

    // Output the result of the matches
    outputHTML(matches)
}

// Implementation of the function to output the result
const outputHTML = (matches) => {
    if (matches.length > 0) {
        const html = matches.map((state) => 
            `<div class="card card-body mb-1">
            <h4>${state.name} (${state.abbr}) <span class="text-primary">${state.capital}</span></h4>
            <small>Lat: ${state.lat} / Long: ${state.long}</small>
            </div>`).join('')
        matchList.innerHTML = html
    }
}


// Call the searchStates function on every keypress
search.addEventListener('input', () => {
    searchStates(search.value)
})