// Write a function that takes an array of data in the below format. 
// Assume that this function is run in a browser. It should update a
// tag with id="awesome-index" with the average awesome-index of 
// all programmers. Your solution should continue to work even 
// if more people are added to the array. Write two versions, 
// 	one using lodash (or underscore) and jQuery, and one using 
// only Javascript utilities native to the browser. *

//with jQuery/Underscore:

//Jquery and Underscore

var simulatedInput = [
    {
        name: 'Bob',
        occupation: 'programmer',
        awesomeIndex: 7,
    },
    {
        name: 'Alice',
        occupation: 'programmer',
        awesomeIndex: 9,
    },
    {
        name: 'Zaphod',
        occupation: 'President of the Galaxy'
    },
    {name: 'Fareez', occupation: 'programmer', awesomeIndex: 1000,},
    {name: 'Matt', occupation: 'engineer', awesomeIndex: 5000,}
];

function updateAverageAwesome(awesomePeople) {
    var averageAwesomeness = 0;
    var programmers = _.filter(awesomePeople, { 'occupation': 'programmer' });
    if (programmers.length > 0) {
        var awesomeTotal = _.reduce(programmers, function(sum, programmer) {
            return sum + programmer.awesomeIndex;
        }, 0);
        averageAwesomeness = awesomeTotal / programmers.length;
    }
$("#awesome-index").text("Here's the awesomeness: " + averageAwesomeness.toFixed(2));
};

updateAverageAwesome(simulatedInput);

//pureJS:


function updateAverageAwesome(awesomePeople) {
    var awesomeTotal = 0;
    var programmerCount = 0;
    for (var i in awesomePeople) {
        var person = awesomePeople[i];
        if (person.occupation == 'programmer') {
            awesomeTotal += person.awesomeIndex
            programmerCount ++;
        }
    }
    var averageAwesomeness = (programmerCount > 0) ? (awesomeTotal / programmerCount) : 0;
    document.getElementById('awesome-index').innerHTML = "Here's the awesomeness: " + averageAwesomeness.toFixed(2);
}

var simulatedInput = [
    {
        name: 'Bob',
        occupation: 'programmer',
        awesomeIndex: 7,
    },
    {
        name: 'Alice',
        occupation: 'programmer',
        awesomeIndex: 9,
    },
    {
        name: 'Zaphod',
        occupation: 'President of the Galaxy'
    },
    {
        name: 'Fareez',
        occupation: 'programmer',
        awesomeIndex: 1000
    }
];

updateAverageAwesome(simulatedInput);