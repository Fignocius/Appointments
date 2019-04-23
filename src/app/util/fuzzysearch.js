// https://gist.github.com/samknight/8863745

export default function(term, text) {
    if(typeof term !== "string" || typeof text !== "string") return false;
    // Build Regex String
    var matchTerm = '.*';

    // Split all the search terms
    var terms = term.split(" ");
    term = term.replace(/\W/g, ''); // strip non alpha numeric

    for(var i = 0; i < terms.length; i++) {
        matchTerm += '(?=.*' + terms[i] + '.*)';
    };

    matchTerm += '.*';

    // Convert to Regex
    // => /.*(?=.*TERM1.*)(?=.*TERM2.*).*/
    var matchRegex = new RegExp(matchTerm.toUpperCase());

    return text.toUpperCase().match(matchRegex);
}