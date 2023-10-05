document.onmousedown = (e) => {
    e.preventDefault();
}
let animTimeout = 0;
class Location {
    constructor(text, img_src, color, direction, items) {
        this.text = text;
        this.img_src = img_src;
        this.color = color;
        this.direction = direction;
        this.items = items;
    }
    update_env() {
        document.querySelector("#image").style.backgroundColor = this.color;
        document.querySelector("#main-text").innerText = this.text;
        document.querySelector("#photo").src = "./img/" + this.img_src;
    }
    change_img() {
        this.img_src = "dragon.bmp";
        document.querySelector("#photo").src = "./img/" + this.img_src;
    }
    cj() {
        this.text = "Grovestreet, home!";
        this.img_src = "grovestreet.png";
        document.querySelector("#photo").style.backgroundColor = "green";
        this.update_env();
    }
}
window.onload = function () {
    startScreen();
}
let game = {
    _locations: [[]],
    actual_x: 6,
    actual_y: 3,
    inventory: 0,
    milestone_count: 1,
    startGame: function () {
        this.fillTable();
        this.updateEnv();
        this.waitForEnter();
    },
    fillTable: function () {
        this.gen2dimArray(10, 10);
        for (let x in data) {
            for (let y in data[x]) {
                let a = parseInt(x); let b = parseInt(y);
                if (a > 3) {
                    this._locations[b + 3][a] = new Location(data[a][b].text, data[a][b].img_src, data[a][b].color, data[a][b].direction, data[a][b].items);
                } else {
                    this._locations[b][a] = new Location(data[a][b].text, data[a][b].img_src, data[a][b].color, data[a][b].direction, data[a][b].items);
                }
            }
        }
    },
    updateEnv: function () {
        if (this._locations[this.actual_x][this.actual_y] != 0) {
            this._locations[this.actual_x][this.actual_y].update_env();
        }
        //directions and compass
        let covers = [document.querySelector("#ecover"), document.querySelector("#wcover"), document.querySelector("#scover"), document.querySelector("#ncover")]
        covers.forEach(element => {
            element.style.display = "none";
        });
        if (!this._locations[this.actual_x][this.actual_y].direction.includes("e")) covers[0].style.display = "block";
        if (!this._locations[this.actual_x][this.actual_y].direction.includes("w")) covers[1].style.display = "block";
        if (!this._locations[this.actual_x][this.actual_y].direction.includes("s")) covers[2].style.display = "block";
        if (!this._locations[this.actual_x][this.actual_y].direction.includes("n")) covers[3].style.display = "block";
        this.updateDirs();

        //items
        if (this._locations[this.actual_x][this.actual_y].items.length != 0) {
            document.getElementById("what_u_see").innerText = ""
            let a = this._locations[this.actual_x][this.actual_y].items
            let count = 0;
            a.forEach(element => {
                document.getElementById("what_u_see").innerHTML += item_list[element].flex + ", ";
                count++
                if (count == a.length) {
                    let txt = document.getElementById("what_u_see").innerHTML
                    document.getElementById("what_u_see").innerHTML = txt.slice(0, -2)
                }
            });
        } else {
            document.getElementById("what_u_see").innerText = "nothing"
        }
        //carrying
        if (this.inventory != 0) {
            document.getElementById("what_u_carry").innerHTML = item_list[this.inventory].name;
        } else {
            document.getElementById("what_u_carry").innerHTML = "nothing";
        }
    },
    updateDirs: function () {
        let dir_names = [];
        if (document.querySelector("#ecover").style.display == "none") {
            dir_names.push("EAST");
        }
        if (document.querySelector("#wcover").style.display == "none") {
            dir_names.push("WEST");
        }
        if (document.querySelector("#ncover").style.display == "none") {
            dir_names.push("NORTH");
        }
        if (document.querySelector("#scover").style.display == "none") {
            dir_names.push("SOUTH");
        }
        document.querySelector("#dirs").innerText = dir_names;
    },
    movePlayer: function (dir) {
        switch (dir) {
            case "N":
                if (this._locations[this.actual_x][this.actual_y].direction.includes("n")) {
                    this.actual_y--;
                    this.animationEngine("You are going north...");
                }
                else {
                    this.animationEngine(null);
                }
                break;
            case "W":
                if (this._locations[this.actual_x][this.actual_y].direction.includes("w")) {
                    this.actual_x--;
                    this.animationEngine("You are going west...");
                }
                else {
                    this.animationEngine("null");
                }
                break;
            case "S":
                if (this._locations[this.actual_x][this.actual_y].direction.includes("s")) {
                    this.actual_y++;
                    this.animationEngine("You are going south...");
                }
                else {
                    this.animationEngine("null");
                }
                break;
            case "E":
                if (this._locations[this.actual_x][this.actual_y].direction.includes("e")) {
                    this.actual_x++;
                    this.animationEngine("You are going east...");
                }
                else {
                    this.animationEngine("null");
                }
                break;
        }
        this.updateEnv();
    },
    inputEngine: function () {
        let command = document.getElementById("main_input").value
        switch (command.toUpperCase()) {
            case "EAST":
            case "E":
                this.movePlayer("E");
                break;
            case "S":
            case "SOUTH":
                this.movePlayer("S");
                break;
            case "W":
            case "WEST":
                this.movePlayer("W");
                break;
            case "N":
            case "NORTH":
                this.movePlayer("N");
                break;
            default:
                let upperCommand = command.toUpperCase();
                if (upperCommand.split(" ")[0] == "T" || upperCommand.split(" ")[0] == "TAKE") {
                    command = command.split(" ")
                    let deletecommand = command.splice(0, 1);
                    command = command.join(" ");
                    com_id = -1;
                    item_list.forEach(element => {
                        if (element.name == command) { com_id = element.id; }
                    });
                    if (this.inventory == 0 && this._locations[this.actual_x][this.actual_y].items.includes(com_id) && item_list[com_id].flag == 1) {
                        let indexToCut = this._locations[this.actual_x][this.actual_y].items.indexOf(com_id)
                        this._locations[this.actual_x][this.actual_y].items.splice(indexToCut, 1)
                        this.inventory = com_id;
                        this.animationEngine("taki")
                        this.updateEnv();
                    } else if (this.inventory != 0) {
                        this.animationEngine("cc")
                    } else if (!this._locations[this.actual_x][this.actual_y].items.includes(com_id)) {
                        this.animationEngine("nsi")
                    } else if (item_list[com_id].flag == 0) {
                        this.animationEngine("flag")
                    }
                }
                else if (upperCommand.split(" ")[0] == "D" || upperCommand.split(" ")[0] == "DROP") {
                    command = command.split(" ")
                    let deletecommand = command.splice(0, 1);
                    command = command.join(" ");
                    com_id = -1;
                    item_list.forEach(element => {
                        if (element.name == command) { com_id = element.id }
                    });
                    if (this.inventory == com_id && this.inventory != 0 && this._locations[this.actual_x][this.actual_y].items.length < 4) {
                        this._locations[this.actual_x][this.actual_y].items.push(com_id)
                        this.animationEngine("drop")
                        this.inventory = 0;
                        this.updateEnv();
                    } else if (this.inventory != com_id) {
                        this.animationEngine("dhi")
                    } else if (this._locations[this.actual_x][this.actual_y].items.length == 3) {
                        this.animationEngine("tmi")
                    }
                }
                else if (upperCommand.split(" ")[0] == "U" || upperCommand.split(" ")[0] == "USE") {
                    command = command.split(" ")
                    let deletecommand = command.splice(0, 1);
                    command = command.join(" ");
                    com_id = -1;
                    item_list.forEach(element => {
                        if (element.name == command) { com_id = element.id }
                    });
                    if (this.inventory == com_id && this.inventory != 0 && String(use_list[com_id].where) == String(this.actual_y + 1) + String(this.actual_x + 1)) {
                        if (use_list[com_id].hand) {
                            if (com_id == 36) { this.inventory = 0; endGame() }
                            else if (com_id == 33 && this._locations[2][3].items.includes(30)) {
                                this.inventory = use_list[com_id].result;
                            } else {
                                this.inventory = use_list[com_id].result;
                            }
                        } else {
                            this.inventory = 0;
                            this._locations[2][3].items.push(use_list[com_id].result);
                        }
                        console.log(use_list[com_id].milestone)
                        if (use_list[com_id].milestone) {
                            this.milestone_count++;
                            if (this.milestone_count >= 7) {
                                this._locations[2][3].items = [];
                                this.inventory = 37;
                            } else {
                                this.inventory = 0;
                            }
                        }
                        specialAnimation(com_id);
                        if (com_id == 37) {
                            this._locations[2][3].change_img();
                            data[3][1].direction.push("w");
                        }
                        this.updateEnv();
                    } else if (this.inventory != com_id) {
                        this.animationEngine("dhi")
                    } else if (String(use_list[com_id].where) != String(this.actual_x) + String(this.actual_y)) {
                        this.animationEngine("wl")
                    }
                }
                else if (upperCommand.split(" ")[0] == "AEZAKMI") {
                    cj();
                }
                else if (upperCommand.split(" ")[0] == "V" || upperCommand.split(" ")[0] == "VOCABULARY") {
                    voc();
                }
                else if (upperCommand.split(" ")[0] == "G" || upperCommand.split(" ")[0] == "GOSSIPS") {
                    gos();
                }
                else {
                    //
                }
                break;

        }
        document.getElementById("main_input").value = ""
    },
    animationEngine: function (text) {
        playAnimation(text);
    },
    waitForEnter: function () {
        document.getElementById("main_input").addEventListener("keydown", function (e) {
            if (e.keyCode == 13) { game.inputEngine(); }
        }, false);
    },
    gen2dimArray: function (y_max, x_max) {
        this._locations = Array.from(Array(parseInt(y_max)), () => {
            return new Array(parseInt(x_max)).fill(0)
        })
    },
}
game.startGame();

var myMusic = document.getElementById("music");
function play() {
    myMusic.play();
}

function pause() {
    myMusic.pause();
}