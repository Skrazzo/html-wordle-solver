export function create_green(word){ // unknown letters with ?    
    word = word.replace(/\?/g, '\\w');
    return word;
}

export function create_yellow(arr){ // known letters
    // /^(?=.*h)(?=.*o)(?=.*l).*$/
    let tmp = '^';
    
    for(let i = 0; i < arr.length; i++){
        tmp += '(?=.*'+ arr[i] +')';
    }
    tmp += '.*$';

    return tmp;
}


export function create_gray(letters){
    let tmp = '[' + letters + ']';
    return tmp;
}


//module.exports = {create_green, create_yellow, create_gray};