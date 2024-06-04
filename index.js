/*
 * Unicode Toolkit
 * Develop by Clayton Cornell
 * * content warning: amature code
 */


console.log("Repo Import Successful!")


//#region GUI Container

const guiContainer = $("<div></div>")
guiContainer.addClass("guiContainer")

$("#english-text").parent().append(guiContainer)
$(".main-title").children()[0].innerHTML = 'ᵘη𝓲𝒸ᗝⒹԐ: Ⓣ𝕠𝓞𝓵ᛕ𝐢Ｔ'

//#endregion


//#region GUI Content


const number = $("<input>")

number.attr({
    "type": "number", 
    "id": "num", 
    "min": "1",
    "max": "200"
})

number.addClass("f-width")

number.val(50)

guiContainer.append(number)


const buttonContainer = $("<div></div>")
guiContainer.append(buttonContainer)

//#region Row1
const row1 = $("<div></div>")
buttonContainer.append(row1)


var random = $("<button></button>")

random.attr("onClick", "newRandom('simple')")

random.text("Random Characters")

row1.append(random)


var extra = $("<button></button>")

extra.attr("onClick", "newRandom()")

extra.text("Extra Characters")

row1.append(extra)

//#endregion

//#region 

var row2 = $("<div></div>")
buttonContainer.append(row2)

var emoji = $("<button></button>")

emoji.attr("onClick", "newRandom('emoji')")

emoji.text("Random Emojis")

row2.append(emoji)


// Translation Functions


function forward(input) {

var list = input.split(" ")

for (var i = 0; i < list.length; i++) {

    var value = parseInt(list[i], 16);
    var str = String.fromCodePoint(value);
    list[i] = str

}

return list.join('');

}



function backward(input) {

var list = input.split('')

for (var i = 0; i < list.length; i++) {

    if (input[i]=='+' && input[i+1]!=' ') {

        var half1 = list[i+1];
        var half2 = list[i+2];
        var value = (half1 + half2).codePointAt(0);
        var str = value.toString(16);
        
        list[i] = str;
        list[i+1] = '';
        list[i+2] = '';
        i += 2
        

    } else {

        var value = list[i].codePointAt(0);
        var str = value.toString(16);
        list[i] = str;

    }

}

return list.join(" ");

}


// Toolkit Functions

alert("Shortcuts: \n    'Shift + 1' - Random Characters \n    'Shift + 2' - Extra Characters \n    'Shift + 3' - Random Emojis \n    '/' - Search 16 bit character \n    'Shift + /' - Search 32 bit character \n    'Shift + `' - Copy to clipboard")

window.onkeydown = function(e) { 

    switch (e.key) {

        case '!':

        e.preventDefault()

        newRandom('simple')

        break


        case '@':

        e.preventDefault()

        newRandom()

        break


        case '#':

        e.preventDefault()

        newRandom('emoji')

        break


        case '$':

        e.preventDefault()

        randomText()

        break


        case '/':

        e.preventDefault()

        var selection = window.getSelection().toString()
        var value = selection.charCodeAt(0)
        var str = value.toString(16)

        while (str.length < 4) {
            str = '0' + str
        }

        window.open('https://www.compart.com/en/unicode/U+' + str)

        break


        case '?':

        e.preventDefault()

        var selection = window.getSelection().toString()
        var half1 = selection[0]
        var half2 = selection[1]
        var value = (half1 + half2).codePointAt(0)
        var str = value.toString(16)

        while (str.length < 4) {
            str = '0' + str
        }

        window.open('https://www.compart.com/en/unicode/U+' + str)

        break


        case '~':

        e.preventDefault()
        navigator.clipboard.writeText(document.querySelector("#ghetto-text").value)

        break


    }

}

function newRandom(extra) {
    
    var count = $('#num').val()
    var hexList = []
    var unicodeList = []
    
    for (var i = 0; i < count; i++) {

        var value = 0

        let regex = new RegExp()

        // Tool Check

        switch (extra) {

            default:

            value = Math.floor(Math.random() * 196607);

            break

            case 'simple':
            
            regex = /\P{C}/gmu
            value = Math.floor(Math.random() * 131071);

            while (!regexCheck(value, regex)) {

                value = Math.floor(Math.random() * 131071);

            }

            break

            case 'emoji':

            regex = /\p{Emoji_Presentation}/gmu
            value = Math.floor(Math.random() * 131071);

            while (!regexCheck(value, regex)) {

                value = Math.floor(Math.random() * 131071);

            }

            break

        }
        

        hexList[i] = value.toString(16);
        unicodeList[i] = String.fromCodePoint(value)
        console.log(value.toString(16) + ' - ' + String.fromCodePoint(value))
        
    }

    var hex = hexList.join(" ")
    $("#english-text").val(hex);

    if (extra != 'emoji') {
        var unicode = unicodeList.join("")
        $("#ghetto-text").val(unicode);

    } else {
        var unicode = unicodeList.join(" ")
        $("#ghetto-text").val(unicode);
    
    }

}


// Regular Expression Filter


function regexCheck(value, regex) {

    let character = String.fromCodePoint(value)
    let match = character.match(regex)

    if (match == null) {
        return false

    }

    return true

}

