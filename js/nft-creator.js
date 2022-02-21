const face = 8;
const head = 10;
const torso = 9;
const shoes = 6;
const outfits = 9;
const zombie = 1;
function changeTrait(operator) {
    var selected = document.getElementById(`trait`).value;
    var img = document.getElementById(selected);
    var value = document.getElementById(selected).alt;
    var trait = parseInt(value);
    switch (selected) {
        case "face":
            var limit = face;
            break;
        case "head":
            var limit = head;
            if (document.getElementById("head").classList.contains("hide-layer")) {
                document.getElementById("head").classList.toggle("hide-layer");
                document.getElementById("torso").classList.toggle("hide-layer");
                document.getElementById("shoes").classList.toggle("hide-layer");
                document.getElementById("outfit").classList.toggle("hide-layer");
            }
            break;
        case "torso":
            var limit = torso;
            if (document.getElementById("torso").classList.contains("hide-layer")) {
                document.getElementById("head").classList.toggle("hide-layer");
                document.getElementById("torso").classList.toggle("hide-layer");
                document.getElementById("shoes").classList.toggle("hide-layer");
                document.getElementById("outfit").classList.toggle("hide-layer");
            }
            break;
        case "shoes":
            var limit = shoes;
            if (document.getElementById("shoes").classList.contains("hide-layer")) {
                document.getElementById("head").classList.toggle("hide-layer");
                document.getElementById("torso").classList.toggle("hide-layer");
                document.getElementById("shoes").classList.toggle("hide-layer");
                document.getElementById("outfit").classList.toggle("hide-layer");
            }
            break;
        case "outfit":
            var limit = outfits;
            if (document.getElementById("outfit").classList.contains("hide-layer")){
                document.getElementById("head").classList.toggle("hide-layer");
                document.getElementById("torso").classList.toggle("hide-layer");
                document.getElementById("shoes").classList.toggle("hide-layer");
                document.getElementById("outfit").classList.toggle("hide-layer");
            }
            break;
        case "zombie":
            var limit = zombie;
            break;
        default:
        break;
    }

    if (operator == "plus" && trait != limit){
        var id = trait + 1;
    } else if (operator == "minus" && trait != 0) {
        var id = trait - 1;
    } else if (operator == "plus" && trait == limit) {
        var id = 0;
    } else if (operator == "minus" && trait == 0) {
        var id = limit;
    }

        img.alt = id;
        if (id == 0){
            img.src = `../images/pipi-kun/layers/${id}.png`;
        } else {
            img.src = `../images/pipi-kun/layers/${selected} ${id}.png`;
        }
}