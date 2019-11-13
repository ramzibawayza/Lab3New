function Item(data) {
  this.image_url = data.image_url;
  this.title = data.title;
  this.description = data.description;
  this.keyword = data.keyword;
  this.horns = data.horns;
  Item.all.push(this);
}
Item.all = [];

Item.prototype.render = function() {

  let hornOutput = $('<div></div>');
      hornOutput.addClass(this.keyword);

  let template = $('#photo-template').html();

  hornOutput.html( template );

  hornOutput.find('h2').text( this.title );
  hornOutput.find('img').attr('src', this.image_url);
  hornOutput.find('p').text(this.description);

  $('main').append(hornOutput);

};

function populateSelectBox() {
  let seen = {};
  let select = $('select');
  Item.all.forEach( (horn) => {
    if ( ! seen[horn.keyword] ) {
      let option = `<option value="${horn.keyword}">${horn.keyword}</option>`;
      select.append(option);
      seen[horn.keyword] = true;
    }
  });

  console.log(seen);
}

$('select').on('change', function() {
  let selected = $(this).val();
  console.log('selected : ', selected);
  let a = $('div').hide();
  console.log('a : ', a);
  $(`.${selected}`).fadeIn(800);
  console.log('`.${selected}` : ', `.${selected}`);
});

$.get('../data/page-1.json')
  .then( data => {
    data.forEach( (thing) => {
      let horn = new Item(thing);
      horn.render();
    });
  })
  .then( () => populateSelectBox() );