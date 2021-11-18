let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const addToyForm = document.querySelector(".add-toy-form");
  console.log(addToyForm);
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
  function createToy(toy){
    const div = document.createElement("div");
      div.className = "card";
      
      const h2 = document.createElement("h2");
      h2.textContent = toy.name;
      div.appendChild(h2);
      
      const img = document.createElement("img");
      img.className = "toy-avatar";
      img.src = toy.image;
      img.style.width = "100%";
      img.style.height = "auto";
      div.appendChild(img);
      
      const p = document.createElement("p");
      p.textContent = toy.likes;
      div.appendChild(p);
      
      const btn = document.createElement("button");
      btn.className = "like-btn";
      btn.id = toy.id;
      btn.textContent = "Like!";
      btn.addEventListener("click", function(){
        fetch(`http://localhost:3000/toys/${toy.id}`, {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            'likes': toy.likes+=1
          })
        })
          .then(p.textContent = toy.likes)
      })
      div.appendChild(btn);
      
      document.querySelector("#toy-collection").appendChild(div);
  }

  function intialLoad(json){
    for(toy of json){
      createToy(toy);
    }
  }
  
  addToyForm.addEventListener("submit", e => {
    e.preventDefault();
    [n, img] = addToyForm.querySelectorAll(".input-text");
    fetch("http://localhost:3000/toys", {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        'name': n.value,
        'image': img.value,
        'likes': 0
      })
    })
    .then(res => res.json())
    .then(createToy)
    .catch(() => "error");
    addToyForm.reset();
  });
  
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(intialLoad)
  .catch(() => "error");
  
  
});
