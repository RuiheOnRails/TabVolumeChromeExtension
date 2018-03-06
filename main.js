console.log("js loaded")


let tabArray = chrome.tabs.query({},(tabs) => {
  console.log(tabs);
  let container = document.getElementById("mainContainer")
  tabs.forEach((tab) => {
    if (tab.audible === true) {
      let title = tab.title

      let img = document.createElement("img");
      img.src = "img/sound.png";
      img.alt = "sound";
      img.classList.add("soundState");
      img.addEventListener('click', () => {
        chrome.tabs.query({index:tab.index}, (innerTabs) => {
          innerTabs.forEach((innerTab) => {
            if(innerTab.mutedInfo.muted){
              img.alt = "sound";
              img.src = "img/sound.png";
            }else{
              img.alt = "nosound";
              img.src = "img/nosound.png";
            }
            let changeMute = innerTab.mutedInfo.muted ? false : true
            chrome.tabs.update(innerTab.id, {muted: changeMute})
          })
        })

      })

      let div = document.createElement("div")
      div.className = "col-3"
      div.appendChild(img)

      let nameDiv = document.createElement("div")
      nameDiv.id = title + tab.index
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





      let clickableTitle = document.getElementById(title + tab.index)

      clickableTitle.addEventListener("click", () => {
        chrome.tabs.query({highlighted:true}, (innerTabs) => {
          innerTabs.forEach((innerTab) => {
            chrome.tabs.update(innerTab.id, {highlighted: false})
          })
        })
        chrome.tabs.query({index:tab.index}, (innerTabs) => {
          innerTabs.forEach((innerTab) => {
            chrome.tabs.update(innerTab.id, {highlighted: true})
          })
        })
      })




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

let muteAll = document.getElementById("muteAll");

muteAll.addEventListener("click", () => {
  chrome.tabs.query({audible:true}, (innerTabs) => {
    innerTabs.forEach((innerTab) => {
      chrome.tabs.update(innerTab.id, {muted:true})
    })
  })
  document.querySelectorAll(".soundState").forEach((e) => {
    e.src = "img/nosound.png";
  })
})

let unMuteAll = document.getElementById("unMuteAll");

unMuteAll.addEventListener("click", () => {
  chrome.tabs.query({audible:true}, (innerTabs) => {
    innerTabs.forEach((innerTab) => {
      chrome.tabs.update(innerTab.id, {muted:false})
    })
  })
  document.querySelectorAll(".soundState").forEach((e) => {
    e.src = "img/sound.png";
  })
})

//this sets the default value of the slider
let volRange = document.getElementById("volRange");
let currentVol = document.getElementById("currentVol")
currentVol.innerHTML = volRange.value
