const f = require('./assets/regex.js');

console.clear();

test('Generating green letters', () => {
    expect(f.create_green('?????')).toBe('\\w\\w\\w\\w\\w');
    expect(f.create_green('st???')).toBe('st\\w\\w\\w');
    expect(f.create_green('sto?s')).toBe('sto\\ws');
    expect(f.create_green('st??o')).toBe('st\\w\\wo');
    expect(f.create_green('stasd')).toBe('stasd');
});

test('Generating yellow letters', () => {
    expect(f.create_yellow(['a', 's'])).toBe('^(?=.*a)(?=.*s).*$');
    expect(f.create_yellow(['a', 's', 'a'])).toBe('^(?=.*a)(?=.*s)(?=.*a).*$');
});

test('Generating gray letters', () => {
    expect(f.create_gray('asd')).toBe('[asd]');
    expect(f.create_gray('')).toBe('[]');
});

//console.log(new RegExp(f.create_green('??s?d?')));