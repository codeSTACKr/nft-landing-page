function changeTrait(id) {
    var selected = document.getElementById(`select_${id}`).value;
    var trait = document.getElementById(id);
console.log(selected + id);
    trait.src = `../images/pipi-kun/layers/${id} ${selected}.png`;
}