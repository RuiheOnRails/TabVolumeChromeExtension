console.log("js loaded")

let tabArray = chrome.tabs.query({},(tabs) => {
  console.log(tabs);
  let container = document.getElementById("mainContainer")
  tabs.forEach((tab) => {
    if (tab.audible === true) {
      let title = tab.title

      let img = document.createElement("img")
      img.src = "img/sound.png"
      img.alt = "Sound"
      img.addEventListener('click', () => {
        chrome.tabs.query({index:tab.index}, (innerTabs) => {
          innerTabs.forEach((innerTab) => {
            let changeMute = innerTab.mutedInfo.muted ? false : true
            chrome.tabs.update(innerTab.id, {muted: changeMute})
          })
        })
      })

      let div = document.createElement("div")
      div.className = "col-3"
      div.appendChild(img)

      let nameDiv = document.createElement("div")
      nameDiv.className = "col-9"
      nameDiv.innerHTML = title

      let tabDiv = document.createElement("div")
      tabDiv.className = "row"

      let tabContainer = document.createElement("div")
      tabContainer.className = "tabs container border rounded bg-white m-2 p-2"

      tabDiv.appendChild(nameDiv)
      tabDiv.appendChild(div)
      tabContainer.appendChild(tabDiv)
      container.appendChild(tabContainer)
    }

  })
})

document.addEventListener('DOMContentLoaded', () => {
    let volRange = document.getElementById("volRange");
    volRange.oninput = () => {
      console.log(volRange.value);
      let currentVol = document.getElementById("currentVol")
      currentVol.innerHTML = volRange.value
    }
});

let muteAll = document.getElementById("muteAll")
muteAll.addEventListener("click", () => {
  chrome.tabs.query({audible:true}, (innerTabs) => {
    innerTabs.forEach((innerTab) => {
      chrome.tabs.update(innerTab.id, {muted:true})
    })
  })
})

//this sets the default value of the slider
let volRange = document.getElementById("volRange");
let currentVol = document.getElementById("currentVol")
currentVol.innerHTML = volRange.value
