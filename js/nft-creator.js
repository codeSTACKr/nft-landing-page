const face = 5;
const head = 6;
const torso = 2;
const shoes = 2;
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
            break;
        case "torso":
            var limit = torso;
            break;
        case "shoes":
            var limit = shoes;
            break;
        default:
        break;
    }

    if (operator == "plus" && trait != limit){
        var id = trait + 1;
    } else if (operator == "minus" && trait != 1) {
        var id = trait - 1;
    } else if (operator == "plus" && trait == limit) {
        var id = 1;
    } else if (operator == "minus" && trait == 1) {
        var id = limit;
    }

        img.alt = id;
        img.src = `../images/pipi-kun/layers/${selected} ${id}.png`;
}