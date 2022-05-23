"use strict"

var input = document.getElementById("input-text")
var add = document.getElementById("add")
var toToList = document.getElementById("todo")
var removeSvg = 
`
 <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink"
                    enable-background="new 0 0 512 512">
                    <g>
                        <g class="fillRed" fill="#FFFFFF""><path class=" fillRed" fill="#FFFFFF"
                            d="m450.9,73.5h-118.4v-52.1c0-5.8-4.7-10.4-10.4-10.4h-132.2c-5.8,0-10.4,4.7-10.4,10.4v52.1h-118.4c-5.8,0-10.4,4.7-10.4,10.4v64.9c0,5.8 4.7,10.4 10.4,10.4h24.6v264.7c0,42.5 34.6,77.1 77.1,77.1h186.4c42.5,0 77.1-34.6 77.1-77.1v-264.6h24.6c5.8,0 10.4-4.7 10.4-10.4v-65c-5.68434e-14-5.7-4.7-10.4-10.4-10.4zm-250.5-41.6h111.3v41.7h-111.3v-41.7zm205,392c0,31-25.2,56.2-56.2,56.2h-186.4c-31,0-56.2-25.2-56.2-56.2v-264.6h298.8v264.6zm35-285.5h-368.8v-44h368.9v44z" />
                        <path class="fillRed"
                            d="m164.1,427c5.8,0 10.4-4.7 10.4-10.4v-193.7c0-5.8-4.7-10.4-10.4-10.4-5.8,0-10.4,4.7-10.4,10.4v193.7c0,5.7 4.7,10.4 10.4,10.4z" />
                        <path class="fillRed" fill="#FFFFFF"
                            d="M256,427c5.8,0,10.4-4.7,10.4-10.4V222.9c0-5.8-4.7-10.4-10.4-10.4s-10.4,4.7-10.4,10.4v193.7    C245.6,422.3,250.2,427,256,427z" />
                        <path class="fillRed" fill="#FFFFFF"
                            d="m347.9,427c5.8,0 10.4-4.7 10.4-10.4v-193.7c0-5.8-4.7-10.4-10.4-10.4-5.8,0-10.4,4.7-10.4,10.4v193.7c-0.1,5.7 4.6,10.4 10.4,10.4z" />
                    </g>
                    </g>
</svg>
`
var memoryList = []

// Pirmas užkrovimas
var list = localStorage.getItem("memoryList")
if(list){
    memoryList = list.split(",")
    todo.innerHTML = ""
    for(var x of memoryList){
        populate(x)
    }
}

// Mouse click
add.addEventListener("click", function(){
    var text = input.value
    if(text){
    // Užkrauna į DOM
    populate(text)

    // Prideda į memoryList
    memoryList.push(text)
    console.log(memoryList)
    
    // Prideda į localstorage
    localStorage.setItem("memoryList", memoryList)

    // Išvalo input
    input.value = ""
    }
})

// Enter click
document.addEventListener("keypress", function(e){
    if(e.key != "Enter") return

    var text = input.value
    if(text){
    // Užkrauna į DOM
    populate(text)

    // Prideda į memoryList
    memoryList.push(text)
    console.log(memoryList)
    
    // Prideda į localstorage
    localStorage.setItem("memoryList", memoryList)

    // Išvalo input
    input.value = ""
    }
})


function populate(text){
        // Creates element
        var newListEl = document.createElement("li")
        newListEl.classList.add("list-item")
        newListEl.innerHTML =
        `
            <div class="text">${text}</div>
            <button class="remove">${removeSvg}</button>
        `
        toToList.prepend(newListEl)

        // Removes element
        remove(newListEl)
}

 //  Get index and remove from memory list array
function remove(element){
        var remove = element.querySelector(".remove")
        remove.addEventListener("click", function(){
            var index = 0
            var parentNode = this.parentNode
            while(parentNode.previousSibling != null){
                index++
                parentNode = parentNode.previousSibling
            }

            // Removes list item from memory list and localstorage
            memoryList.reverse().splice(index, 1)
            localStorage.setItem("memoryList", memoryList.reverse())

            // Removes parent element
            this.parentNode.remove()
        })            
}

