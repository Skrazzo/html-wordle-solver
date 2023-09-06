


// Assuming you have a JSON file named data.json in the same directory
const words_url = './assets/5-letter-words.json';
let words = [];

// Use the fetch API to retrieve the JSON data
fetch(words_url)
.then(response => response.json())
.then(data => {
    // You can now work with the JSON data here
    words = data;
})
.catch(error => {
    console.error('Error fetching JSON:', error);
});



$(document).ready(function() {
    // on yellow input
    $('#yellow_input').on('input', function () {
        const reg = /[a-z]/;
        const letter = $(this).val();
        
        if(reg.test(letter)){ // is correct letter
            if($('.yellow-letters').length !== 4){
                $('.yellow-input-container').append(`
                    <span class="yellow-letters">`+ letter.toUpperCase() +`</span>
                `);
            }

            $(this).val('');
            start();
        }else{
            $(this).val('');
        }

        
    });

    // on grey input 
    $('#gray_input').on('input', function () {
        const reg = /[a-z]/;
        const letter = $(this).val();
        
        if(reg.test(letter)){ // is correct letter
            
        
            $('.gray-input-container').append(`
                <span class="gray-letters">`+ letter.toUpperCase() +`</span>
            `);
        
            $(this).val('');
            start();

        }else{
            $(this).val('');
        }

        
    });

    // on green input
    $('.green_input').on('input', function () {
        const reg = /[a-z]/;
        const letter = $(this).val();

        if(reg.test(letter)){
            if(letter !== ''){
                $(this).val(letter.toUpperCase());
                $(this).addClass('green');
            }else{
                $(this).removeClass('green');
            }

            start();

        }else{
            $(this).removeClass('green');
            $(this).val('');
        }
    });

    $('body').on('click', 'span', function () {
        if(!$(this).parent().hasClass('answers-container')){
            $(this).remove();
        }
        
    });
});
  

function start(){ // starts guessing the word
    // getting green inputs and sorting them for needed letter string
    const green = $('.green_input');
    let green_letters = '';
    $.map(green, function (el, i) {
        green_letters += ($(el).val() === '') ? '?' : $(el).val().toLowerCase();
    });

    // getting yellow letters
    const yellow = $('.yellow-letters');
    const yellow_letters = $.map(yellow, function (el, i) {
        return $(el).text().toLowerCase();
    });

    // getting gray letters
    const gray = $('.gray-letters');
    let gray_letters = '';
    $.map(gray, function (el, i) {
        gray_letters += $(el).text().toLowerCase();
    });


    console.log(create_green(green_letters));
    console.log(create_yellow( yellow_letters));
    console.log(create_gray( gray_letters));

    const possible_answers = search(create_green(green_letters), create_yellow(yellow_letters), create_gray(gray_letters));
    remove_ans(); // remove answers
    possible_answers.forEach(x => {
        $('.answers-container').append(`
            <span>`+ x +`</span>
        `);
    });
}

function search(green, yellow, gray){
    // using javascript regex
    console.clear();
    
    
    // find green regex letters
    // /\w{3}h\w/
    // ???h?
    let tmp = words.map(x => x.match(green));
    tmp = tmp.filter(x => x !== null);
    tmp = tmp.map(x => x['input']);
    
    // find yellow regex letters
    // /^(?=.*h)(?=.*o)(?=.*l).*$/
    tmp = tmp.map(x => x.match(yellow));
    tmp = tmp.filter(x => x !== null);
    tmp = tmp.map(x => x['input']);


    // find gray letters
    // [asd]
    tmp = tmp.filter(x => gray.test(x) === false);
    return tmp;

}

function create_green(word){ // unknown letters with ?    
    word = word.replace(/\?/g, '\\w');
    return new RegExp(word);
}

function create_yellow(arr){ // known letters
    // /^(?=.*h)(?=.*o)(?=.*l).*$/
    let tmp = '^';
    
    for(let i = 0; i < arr.length; i++){
        tmp += '(?=.*'+ arr[i] +')';
    }
    tmp += '.*$';

    return new RegExp(tmp);
}

function remove_ans(){
    $('.answers-container span').remove();
}

function create_gray(letters){
    let tmp = '[' + letters + ']';
    return new RegExp(tmp);
}

