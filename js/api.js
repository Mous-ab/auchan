export function fetchData(){
    return fetch('../data/data.json')
        .then(res => res.json())
}