window.onscroll = function () { myFunction() };

var navbar = document.getElementById("mediaMenu");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

let dummy_data = {}

  let main_body = document.querySelector('.main-body');

for (let i = 0; i < dummy_data.length; i++) {
  const image = dummy_data[i].top_image
  const summary = dummy_data[i].summary
  const url = dummy_data[i].url
  const title = dummy_data[i].title
  const bias = dummy_data[i].bias
  const mbfc = dummy_data[i].mbfc

  let tile = '<div class="col-10 d-flex align-items-stretch">\
        <div class="row no-gutters bg-light position-relative mt-4" id="firstNews">\
          <div class="col-md-4 mb-md-0 p-md-4">\
            <img src="'+ image + '"\
              class="w-100 rounded" alt="">\
          </div>\
            <div class="col-md-8 position-relative p-4 pl-md-0">\
              <h5 id="newsTitle" class="mt-0">' + title + '</h5>\
              <p href="'+ url + '" class="stretched-link" style="position: relative;">' + summary + '\</p>\
            <div><strong>Bias: ' + bias + '</strong></div>\
              <div>\
                <a href="'+ url + '" class="stretched-link check history_' + i + '" style="position: relative;">Link to news</a></div>\
                <p style="transform: rotate(0);">\
                 <a href = '+ mbfc + '" class="text-warning stretched-link" > Bias Breakdown</a > \
                 </p >\
                </div>\
          </div>\
        </div>'
  main_body.innerHTML += tile
}

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('check')) {
    //  console.log("clicked article link!");
    let c = e.target.classList[2]
    const id = c[c.length - 1]
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/index/history", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.send(JSON.stringify({
    //   value: dummy_data[id]
    // }));
    xhr.send(JSON.stringify(dummy_data[id]));
  }
});