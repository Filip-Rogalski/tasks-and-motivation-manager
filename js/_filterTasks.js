import tasksArray from './tasks.json';

function filterTasks(searchArray) {
	let newArray = tasksArray.filter((item) => {
    let element = item.id;
	return searchArray.reduce((prev,cur) => {
		return prev + (cur == element);}, 0);
});
	return newArray;
}

export default filterTasks;


/* Wcześniej napisałem funkcję na filtrowanie tablicy przez elementy innej tablicy:
function filterArrayThroughArray(baseArray, indexesArray) {
    let newArray = baseArray.filter((item) => {
        let element = item;
        return indexesArray.reduce((prev,cur) => {
            return prev + (cur == element);
        }, 0);
    });
    return newArray;
}
let baseArray = [1,2,3,4,5,6,7,8];
let indexesArray = [1,4,5,8];
let filteredArray = filterArrayThroughArray(baseArray, indexesArray);
*/