const form = document.getElementById('addForm');
const itemList = document.getElementById('items');
const filter = document.getElementById('filter');

form.addEventListener('submit', addItem);

itemList.addEventListener('click', removeItem);

filter.addEventListener('keyup', filterItems);

function addItem(e) {
    e.preventDefault();

    let newItem = document.getElementById('item');
    let addInput = newItem.value.toLowerCase();

    if(addInput === '') {
        return;
    }

    var newArray = new Array();
    var myArray = [].slice.call(itemList.children);

    myArray.forEach((item) => {
        newArray.push(item.firstChild.textContent.toLowerCase().trim());
    });
    
    if(newArray.includes(addInput)) {
        document.getElementById('error').style.display = 'block';

        setTimeout(() => {
            document.getElementById('error').style.display = 'none';
        }, 1500);
        newItem.value = '';
        return;
    }

    let li = document.createElement('li');
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(`${newItem.value}`)) ;
    
    let deleteBtn = document.createElement('button');
    deleteBtn.className = "btn btn-danger btn-sm float-right delete";
    deleteBtn.appendChild(document.createTextNode(`X`)) ;

    li.appendChild(deleteBtn);

    itemList.appendChild(li);

    newItem.value = '';

    document.getElementById('notice').textContent = 'Items in Cart';
    
}

function removeItem(e) {
    if(e.target.classList.contains('delete')) {
        if(confirm('Are you Sure?')) {
            let li = e.target.parentElement;
            
            itemList.removeChild(li);

            if(itemList.childElementCount === 0) {
                let notice = document.getElementById('notice');                 
                notice.textContent = 'Empty Cart';               
            }
        }      
        
    }
    
}

function filterItems(e) {
    let inputText = e.target.value.toLowerCase();
    let notice = document.getElementById('notice'); 
    let counter = 0;
    let items = itemList.children;
    Array.from(items).forEach((item) => {
        let itemName = item.firstChild.textContent.toLowerCase(); 
        
        if(itemName.indexOf(inputText) != -1) {
            item.style.display = 'block';                           
            notice.textContent = 'Items in Cart';  
        } else {
            item.style.display = 'none';
            counter++;
            if(itemList.childElementCount === counter) {               
                notice.textContent = 'Empty Cart';   
            }
            
        }
        
    })
    
}