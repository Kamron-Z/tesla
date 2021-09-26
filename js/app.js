const inputChange = document.querySelectorAll("input[data-change]")
const tesla__bottom_item = document.querySelectorAll(".tesla__bottom_item")
let salon__colors = document.querySelector(".salon__colors")
let tesla__bottom = document.querySelector(".tesla__bottom")
const tesla__img = document.querySelector(".tesla__img")
const color__item = document.querySelector(".color__item")
const btnUp = document.querySelector("#btnUp")
const btnDown = document.querySelector("#btnDown")

let km = document.querySelector("#km")
let deg = document.querySelector("#deg")

let data_btn = document.querySelectorAll("button[data-btn]")

let speed = document.querySelector("#speed")
let price = document.querySelector("#price")
let diski = document.querySelector("#diski")

// auto info
let autoSpeed = 750
let autoPrice = 89
let longRange = 10
let autoKm = 60
let autoDeg = 20
let disk = true

let colors = [{
      color: "#262626",
      img: "salon1.jpg",
   },
   {
      color: "#E6DDD0",
      img: "salon2.jpg",
   },
   {
      color: "#EFEFEF",
      img: "salon3.jpg",
   },
]

// salon colors
const colorSalon = () => {
   for (const item of colors) {
      let color = document.createElement("button")
      color.classList.add("color")
      color.style.backgroundColor = item.color

      color.onclick = () => tesla__img.setAttribute("src", `./img/${item.img}`)

      color__item.append(color)
   }
}

colorSalon()

// view auto
for (const item of inputChange) {
   if (item.getAttribute("data-change") == "img") {
      item.onclick = () => {
         if (item.checked) {
            tesla__img.setAttribute("src", "./img/tesla_17.jpg")
            for (let i = 0; i < tesla__bottom_item.length - 1; i++) {
               const element = tesla__bottom_item[i];
               element.classList.remove("hide")
               tesla__bottom.style.justifyContent = "space-between"
            }
            salon__colors.style.display = "none"
         } else {
            tesla__img.setAttribute("src", "./img/salon1.jpg")
            for (let i = 0; i < tesla__bottom_item.length - 1; i++) {
               const element = tesla__bottom_item[i];
               element.classList.add("hide")
               tesla__bottom.style.justifyContent = "center"
            }
            salon__colors.style.display = "block"
         }
      }
   }
   if (item.getAttribute("data-change") == "cond") {
      item.onclick = () => {
         if (item.checked) {
            speed.innerText = autoSpeed - 50 + "км"
            autoSpeed = autoSpeed - 50
         } else {
            autoSpeed = autoSpeed + 50
            speed.innerText = autoSpeed + "км"
         }
      }
   }
   if (item.getAttribute("data-change") == "long") {
      item.onclick = () => {
         if (item.checked) {
            autoPrice += longRange
            reload()
         } else {
            autoPrice -= longRange
            reload()
         }
      }
   }
}
// reload 
const reload = () => {
   price.innerText = "$" + autoPrice + ", 000"
   km.innerText = autoKm.toFixed() + "км/ч"
   deg.innerText = autoDeg.toFixed() + "°"
   speed.innerText = autoSpeed.toFixed() + "км"

   if (disk) {
      diski.innerText = "17"
      tesla__img.setAttribute("src", "./img/tesla_17.jpg")
   } else {
      diski.innerText = "19"
      tesla__img.setAttribute("src", "./img/tesla_19.jpg")
   }
}
// manage att
const removeAtt = (elem, child) => {
   elem.parentNode.children[child].removeAttribute("disabled")
}
const addSetAtt = (elem, set, set1) => {
   elem.setAttribute(set, set1)
}

// btnUp и btnDown 
for (const item of data_btn) {
   if (item.getAttribute("data-btn") == "km_up") {
      item.onclick = () => {
         removeAtt(item, 1)
         autoKm += 10
         autoSpeed -= 12.5
         autoKm >= 110 ? addSetAtt(item, "disabled", "disabled") : ""
         reload()
      }
   }
   if (item.getAttribute("data-btn") == "km_down") {
      item.onclick = () => {
         removeAtt(item, 0)
         autoKm -= 10
         autoSpeed += 12.5
         autoKm == 30 ? addSetAtt(item, "disabled", "disabled") : ""
         reload()
      }
   }
   if (item.getAttribute("data-btn") == "deg_up") {
      item.onclick = () => {
         removeAtt(item, 1)
         autoDeg += 10
         autoSpeed -= 20
         autoDeg >= 50 ? addSetAtt(item, "disabled", "disabled") : ""
         reload()
      }
   }
   if (item.getAttribute("data-btn") == "deg_down") {
      item.onclick = () => {
         removeAtt(item, 0)
         autoDeg -= 10
         autoSpeed += 20
         autoDeg == 10 ? addSetAtt(item, "disabled", "disabled") : ""
         reload()
      }
   }
   if (item.getAttribute("data-btn") == "disk_up") {
      item.onclick = () => {
         autoPrice += 5
         autoSpeed -= 20
         removeAtt(item, 1)
         disk = !disk
         if (!disk) addSetAtt(item, "disabled", "disabled")
         reload()
      }
   }
   if (item.getAttribute("data-btn") == "disk_down") {
      item.onclick = () => {
         autoSpeed += 20
         autoPrice -= 5
         removeAtt(item, 0)
         disk = true
         disk ? addSetAtt(item, "disabled", "disabled") : ""
         reload()
      }
   }
}