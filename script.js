const totalInfo = document.querySelector('.total_info')
const totalSum = document.querySelector('.total_sum')
const menuLeft = document.querySelector('.menu_left')

const images = document.querySelector('.images')
const addImages = document.querySelector('.add_images')

const btnScratch = document.querySelector('.start_scratch')

const allBoxes = menuLeft.querySelectorAll('.menu_box');
const allAddItem = menuLeft.querySelectorAll('.add_item')

const numberOfSymbols = 22;
let counter = 6;

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

const addIngr = (link, text, section, sectionNr) => {
  const img = images.querySelector(`img[alt="${sectionNr}"]`);
  if (!img) {
    addImages.insertAdjacentHTML('afterbegin', html = `<div class="burger_img burger_middle">
    <span class="burger_text text_left">${text}</span>
    <img class="burger_in" src="./img/${link}.svg" alt="${sectionNr}" title="${sectionNr}">
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
    const sectionNr = +ingr.parentElement.getAttribute('data-section-nr')
    if (ingr.getAttribute('data-ingr') === '0') {
      removeIngr(sectionNr)
    }
    else {
      const itemName = String(ingr.getAttribute('data-ingr'));
      const sectionName = String(ingr.parentElement.getAttribute('data-section'));

      addIngr(itemName, text, sectionName, sectionNr);
    }
  }
}

const grabData = (arrow, itemBoxMenu, item, e) => {
  const priceVal = +(e.target).dataset.addonprice;
  const gramsVal = +(e.target).dataset.addongrams;

  const dropBox = itemBoxMenu.querySelector('.dropdown_list');
  const selectedText = itemBoxMenu.querySelector('.selected_text');
  item.classList.add('selected');

  if (e.target.innerHTML.length > numberOfSymbols) {
    selectedText.innerHTML = (e.target.innerHTML).substring(0, numberOfSymbols) + '...'
  } else { selectedText.innerHTML = e.target.innerHTML }

  const dataName = (item.innerHTML).substring(0, (item.innerHTML).indexOf("("));

  imgJello(e.target, dataName);

  arrow.classList.remove('arrow_rotate');
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

const handleArrow = (itemBoxMenu) => {
  const arrow = itemBoxMenu.querySelector('.arrow');
  const dropBox = itemBoxMenu.querySelector('.dropdown_list');
  arrow.classList.toggle('arrow_rotate');
  dropBox.classList.toggle('hidden');
  dropBox.querySelectorAll('ul li').forEach(item => {
    item.addEventListener('click', (e) => {
      item.classList.remove('selected');
      grabData(arrow, itemBoxMenu, item, e)
    })
  })
}

const resetValues = () => {
  document.querySelectorAll('.menu_box').forEach(box => {
    const dropBox = box.querySelector('.dropdown_list');
    dropBox.querySelectorAll('ul li').forEach(li => { li.classList.remove('selected') });
    const dataName = (dropBox.querySelectorAll('ul li')[0].innerHTML).substring(0, (dropBox.querySelectorAll('ul li')[0].innerHTML).indexOf("("));
    const priceVal = dropBox.querySelectorAll('ul li')[0].dataset.addonprice;
    const gramsVal = dropBox.querySelectorAll('ul li')[0].dataset.addongrams;
    let totalDataName = +box.getAttribute('data-clone-counter');

    let totalDtataUpdate = totalInfo.querySelector(`.total_data[data-clone-counter="${totalDataName}"]`);

    totalDtataUpdate.querySelector('.total_name').innerHTML = `${dataName}`;
    totalDtataUpdate.querySelector('.total_price').innerHTML = `: ${priceVal} LEI`;
    totalDtataUpdate.querySelector('.total_grams').innerHTML = `(${gramsVal} gr)`;
    box.querySelector('.selected_text').textContent = dropBox.querySelectorAll('ul li')[0].textContent
  })
}

allBoxes.forEach(elem => {
  elem.addEventListener('click', (e) => {
    handleArrow(e.target)
  })
})

btnScratch.addEventListener('click', () => {
  document.querySelector('.add_images').innerHTML = ''
  const img = images.querySelector(`img[alt="2"]`);
  img.src = "./img/vita.svg";
  img.parentNode.querySelector('.burger_text').textContent = 'BEEF PATTY'

  document.querySelectorAll('.fade_left').forEach(item => {
    item.classList.add('hidden')
  })

  document.querySelectorAll('ul').forEach(tag => {
    if (tag.getAttribute('data-section-nr') > 6) {
      tag.parentElement.parentNode.remove()
    }
  })
  document.querySelectorAll('.total_data').forEach(total => {
    if (total.getAttribute('data-clone-counter') > 6) {
      total.remove()
    }
  })
  resetValues()
  counter = 6
})

allAddItem.forEach(item => {
  item.addEventListener('click', (e) => {
    const original = e.target.closest('.add_item').parentNode.querySelector('.menu_box');
    let totalDataName = e.target.parentElement.parentElement.querySelector('.menu_box').getAttribute('data-clone-counter');
    let totalDtataElement = totalInfo.querySelector(`.total_data[data-clone-counter="${totalDataName}"]`);
    const originalPrice = totalInfo.querySelectorAll('.total_data')
    cloneOriginal(original);
    cloneTotalData(totalDtataElement)

    function cloneTotalData(totalDtataElement) {
      const clonePrice = totalDtataElement.cloneNode(true)
      clonePrice.setAttribute('data-clone-counter', counter)
      clonePrice.appendChild;
      totalDtataElement.insertAdjacentElement("afterend", clonePrice);
      clonePrice.classList.add('hidden')
    }
    function cloneOriginal(original) {
      const clone = original.cloneNode(true);
      counter++;
      clone.setAttribute('data-clone-counter', counter);
      clone.querySelector('ul').setAttribute('data-section-nr', counter)
      clone.appendChild;
      clone.querySelector('.selected_text').innerHTML = '-';
      item.insertAdjacentElement("beforebegin", clone);
      clone.addEventListener('click', (e) => {
        handleArrow(e.target)
      })
      createDeleteButton(clone)
    }

    function removeClon(clonedElem) {
      clonedElem.remove()
      removeIngr(counter)
      totalInfo.querySelector(`.total_data[data-clone-counter="${counter}"]`).remove()
      counter--
    }

    function createDeleteButton(clone) {
      const deleteElem = clone.querySelector('.menu_arrow').insertAdjacentHTML('afterbegin', '<div class="delete_item"></div>');
      clone.querySelector('.delete_item').addEventListener('click', () => {
        removeClon(clone)
      })
      return deleteElem;
    }
  })
})

window.addEventListener('click', calculateTotalData)