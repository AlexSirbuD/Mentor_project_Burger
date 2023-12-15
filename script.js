const bunBoxMenu = document.getElementById('box_bun'),
  bunArrow = bunBoxMenu.querySelector('.menu_arrow');

const meatBoxMenu = document.querySelector('.box_meat'),
  meatArrow = meatBoxMenu.querySelector('.menu_arrow'),
  meatAddItem = document.getElementById('add_meat');

const botSouceBoxMenu = document.getElementById('box_bottom--souce'),
  botSouceArrow = botSouceBoxMenu.querySelector('.menu_arrow');

const topSouceBoxMenu = document.getElementById('box_top--souce'),
  topSouceArrow = topSouceBoxMenu.querySelector('.menu_arrow');

const cheeseBoxMenu = document.getElementById('box_cheese'),
  cheeseArrow = cheeseBoxMenu.querySelector('.menu_arrow');

const toppingsBoxMenu = document.getElementById('box_toppings'),
  toppingsArrow = toppingsBoxMenu.querySelector('.menu_arrow');

const totalInfo = document.querySelector('.total_info')
const totalSum = document.querySelector('.total_sum')
const menuLeft = document.querySelector('.menu_left')

const images = document.querySelector('.images')
const addImages = document.querySelector('.add_images')

const allSelected = document.querySelectorAll('.selected');
const btnScratch = document.querySelector('.start_scratch')

const numberOfSymbols = 22;

//-------START----------------  ADD ITEM  -------------------------------


// const allArrows = menuLeft.querySelectorAll('.arrow');
// const allAddItem = menuLeft.querySelectorAll('.icon')


// allArrows.forEach(elem => {
//   elem.addEventListener('click', (e) => {
//     const parent = e.target.parentNode
//     console.log(parent)
//     const parentParent = parent.parentNode.querySelector('.dropdown_list')
//     console.log(parentParent.parentNode)
//     parentParent.classList.toggle('hidden')
//     elem.classList.toggle('arrow_rotate');

//     parentParent.querySelectorAll('ul li').forEach(li => {
//       li.addEventListener('click', (e) => {
//         console.log(e.target.innerHTML)
//         const selectedText = parentParent.parentNode.querySelector('.selected_text')
//         console.log(selectedText)
//         if (e.target.innerHTML.length > numberOfSymbols) {
//           selectedText.innerHTML = (e.target.innerHTML).substring(0, numberOfSymbols) + '...'
//         } else { selectedText.innerHTML = e.target.innerHTML }
//         parentParent.classList.add('hidden');
//         elem.classList.add('arrow_rotate');
//       })
//     })
//   })
// })

// counter = 7

// allAddItem.forEach(item => {
//   console.log(item)
//   item.addEventListener('click', (e) => {
//     // const clonedElement = meatBoxMenu.cloneNode(true);
//     // clonedElement.classList.add('clone')
//     // meatBoxMenu.insertAdjacentElement('afterend', clonedElement)
//     console.log(e.target.parentNode)
//     const original = (e.target.parentNode).parentNode;


//     const originalPrice = totalInfo.querySelectorAll('.total_data')



//     cloneOriginal(counter, original);
//     cloneOriginal(counter, originalPrice);

//     function cloneOriginal(counter, original) {
//       const clone = original.cloneNode(true);
//       clone.setAttribute('data-clone-counter', counter);

//       clone.appendChild;
//       original.parentNode.appendChild(clone);
//     }
//     counter++;
//   })
// })

//-------END----------------  ADD ITEM  -------------------------------



let sum = 43;
let grams = 210;

const animationClass = (img) => {
  img.classList.add('burger_in');
  setTimeout(() => {
    img.classList.remove('burger_in')
  }, 500)
}



const calculateTotalData = () => {
  let calculateTotalPrice = 0;
  let calculateTotalGrams = 0;
  totalInfo.querySelectorAll('.total_price').forEach(selected => {
    calculateTotalPrice += +selected.innerHTML.match(/\d+/g);
    totalSum.querySelector('.total_price_sum').innerHTML = `${calculateTotalPrice} LEI`;
  });

  totalInfo.querySelectorAll('.total_grams').forEach(selected => {
    calculateTotalGrams += +selected.innerHTML.match(/\d+/g);
    totalSum.querySelector('.total_grams_sum').innerHTML = `(${calculateTotalGrams} gr)`;
  });
}


const addIngr = (link, text, section) => {
  const img = images.querySelector(`img[alt="${section}"]`);
  if (!img) {
    addImages.insertAdjacentHTML('afterbegin', html = `<div class="burger_img burger_middle">
    <span class="burger_text text_left">${text}</span>
    <img class="burger_in" src="./img/${link}.svg" alt="${section}" title="${section}">
  </div>`);
  } else {
    const burgerText = img.parentElement.querySelector('.burger_text');
    img.src = `./img/${link}.svg`;
    burgerText.innerHTML = text;
    animationClass(img);
  };
};

const removeIngr = (section) => {
  const img = images.querySelector(`img[alt="${section}"]`);
  (img.parentElement).remove((img.parentNode));
};



imgJello = (ingr, text) => {
  if (ingr.hasAttribute('data-ingr')) {
    if (ingr.getAttribute('data-ingr') === 'vita') {
      const img = images.querySelector('img[alt="BEEF PATTY"]');
      img.src = "./img/pirjoala-de-vita.svg";
      const burgerText = img.parentElement.querySelector('.burger_text');
      burgerText.innerHTML = text;
      animationClass(img);
    }
    else if (ingr.getAttribute('data-ingr') === 'pui') {
      const img = images.querySelector('img[alt="BEEF PATTY"]');
      img.src = "./img/pirjoala-de-pui.svg";
      const burgerText = img.parentElement.querySelector('.burger_text');
      burgerText.innerHTML = text;
      animationClass(img);
    }
    else if (ingr.getAttribute('data-ingr') === '0') {
      section = String(ingr.getAttribute('data-section'))
      removeIngr(section)
    }
    else {
      const itemName = String(ingr.getAttribute('data-ingr'));
      const sectionName = String(ingr.parentElement.getAttribute('data-section'));
      addIngr(itemName, text, sectionName);
    }
  }
}

const grabData = (itemArrow, itemBoxMenu, totalInfo, item, e) => {
  const priceVal = +(e.target).dataset.addonprice;
  const gramsVal = +(e.target).dataset.addongrams;
  const arrow = itemArrow.querySelector('.arrow');
  const dropBox = itemBoxMenu.querySelector('.dropdown_list');
  const selectedText = itemBoxMenu.querySelector('.selected_text');
  item.classList.add('selected');


  if (e.target.innerHTML.length > numberOfSymbols) {
    selectedText.innerHTML = (e.target.innerHTML).substring(0, numberOfSymbols) + '...'
  } else { selectedText.innerHTML = e.target.innerHTML }


  const dataName = (item.innerHTML).substring(0, (item.innerHTML).indexOf("("));

  imgJello(e.target, dataName);

  arrow.classList.add('arrow_rotate');
  dropBox.classList.add('hidden');

  let totalDataName = +itemBoxMenu.getAttribute('data-clone-counter');
  let totalDtataUpdate = totalInfo.querySelector(`.total_data[data-clone-counter="${totalDataName}"]`);
  totalDtataUpdate.querySelector('.total_name').innerHTML = `${dataName}`;
  totalDtataUpdate.querySelector('.total_price').innerHTML = `: ${priceVal} LEI`;
  totalDtataUpdate.querySelector('.total_grams').innerHTML = `(${gramsVal} gr)`;
  totalDtataUpdate.classList.remove('hidden');

  if (totalDtataUpdate.querySelector('.total_name').innerHTML === '') {
    totalDtataUpdate.classList.add('hidden')
  }
}

const handleArrow = (itemArrow, itemBoxMenu) => {
  const arrow = itemArrow.querySelector('.arrow');
  const dropBox = itemBoxMenu.querySelector('.dropdown_list');
  arrow.classList.toggle('arrow_rotate');
  dropBox.classList.toggle('hidden');
}

bunArrow.addEventListener('click', function () {
  handleArrow(bunArrow, bunBoxMenu)
})

bunBoxMenu.querySelectorAll('.dropdown_list ul li').forEach(item => {
  item.addEventListener('click', (e) => {
    item.classList.remove('selected');
    grabData(bunArrow, bunBoxMenu, totalInfo, item, e);
  })
})

meatArrow.addEventListener('click', function () {
  handleArrow(meatArrow, meatBoxMenu);
})

meatBoxMenu.querySelectorAll('.dropdown_list ul li').forEach(item => {
  item.addEventListener('click', (e) => {
    item.classList.remove('selected');
    grabData(meatArrow, meatBoxMenu, totalInfo, item, e);
  });
})

botSouceArrow.addEventListener('click', function () {
  handleArrow(botSouceArrow, botSouceBoxMenu)
})

botSouceBoxMenu.querySelectorAll('.dropdown_list ul li').forEach(item => {
  item.addEventListener('click', (e) => {
    item.classList.remove('selected')
    grabData(botSouceArrow, botSouceBoxMenu, totalInfo, item, e)
  })
})

topSouceArrow.addEventListener('click', function () {
  handleArrow(topSouceArrow, topSouceBoxMenu)
})

topSouceBoxMenu.querySelectorAll('.dropdown_list ul li').forEach(item => {
  item.addEventListener('click', (e) => {
    item.classList.remove('selected')
    grabData(topSouceArrow, topSouceBoxMenu, totalInfo, item, e)
  })
})

cheeseArrow.addEventListener('click', function () {
  handleArrow(cheeseArrow, cheeseBoxMenu)
})

cheeseBoxMenu.querySelectorAll('.dropdown_list ul li').forEach(item => {
  item.addEventListener('click', (e) => {
    item.classList.remove('selected')
    grabData(cheeseArrow, cheeseBoxMenu, totalInfo, item, e)
  })
})

toppingsArrow.addEventListener('click', function () {
  handleArrow(toppingsArrow, toppingsBoxMenu)
})

toppingsBoxMenu.querySelectorAll('.dropdown_list ul li').forEach(item => {
  item.addEventListener('click', (e) => {
    item.classList.remove('selected')
    grabData(toppingsArrow, toppingsBoxMenu, totalInfo, item, e)
  })
})

window.addEventListener('click', calculateTotalData)