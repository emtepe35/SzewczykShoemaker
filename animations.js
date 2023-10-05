var playAnimation = function (text) {
    if (text.length > 4) {
        let textfield = document.getElementById("whatnow")
        document.getElementById("main_input").style.opacity = 0;
        document.getElementById("dirs").style.opacity = 0;
        document.getElementById("what_u_see").style.opacity = 0;
        textfield.innerText = text;
        document.getElementById("image").style.opacity = 0.1;
        animTimeout = setTimeout(animation, 1100);
        function animation() {
            textfield.innerText = "What now?";
            document.getElementById("main_input").style.opacity = 1;
            document.getElementById("dirs").style.opacity = 1;
            document.getElementById("image").style.opacity = 1;
            document.getElementById("what_u_see").style.opacity = 1;
            clearTimeout(animTimeout);
        }
    } else if (text == "cc") {
        document.getElementById("main_input").style.opacity = 0;
        document.getElementById("whatnow").innerText = "You cannot carry anymore"
        animTimeout = setTimeout(animation, 1100);
        function animation() {
            document.getElementById("main_input").style.opacity = 1;
            document.getElementById("whatnow").innerText = "What now?";
            clearTimeout(animTimeout);
        }
    } else if (text === "nsi") {
        document.getElementById("main_input").style.opacity = 0;
        document.getElementById("whatnow").innerText = "There is no such item"
        animTimeout = setTimeout(animation, 1100);
        function animation() {
            document.getElementById("main_input").style.opacity = 1;
            document.getElementById("whatnow").innerText = "What now?";
            clearTimeout(animTimeout);
        }
    }
    else if (text == "dhi") {
        document.getElementById("main_input").style.opacity = 0;
        document.getElementById("whatnow").innerText = "You don't have such item"
        animTimeout = setTimeout(animation, 1100);
        function animation() {
            document.getElementById("main_input").style.opacity = 1;
            document.getElementById("whatnow").innerText = "What now?";
            clearTimeout(animTimeout);
        }
    }
    else if (text == "tmi") {
        document.getElementById("main_input").style.opacity = 0;
        document.getElementById("whatnow").innerText = "Cannot store anymore here!"
        animTimeout = setTimeout(animation, 1100);
        function animation() {
            document.getElementById("main_input").style.opacity = 1;
            document.getElementById("whatnow").innerText = "What now?";
            clearTimeout(animTimeout);
        }
    }
    else if (text == "wl") {
        document.getElementById("main_input").style.opacity = 0;
        document.getElementById("whatnow").innerText = "Nothing happened!"
        animTimeout = setTimeout(animation, 1100);
        function animation() {
            document.getElementById("main_input").style.opacity = 1;
            document.getElementById("whatnow").innerText = "What now?";
            clearTimeout(animTimeout);
        }
    }
    else if (text == "flag") {
        document.getElementById("main_input").style.opacity = 0;
        document.getElementById("whatnow").innerText = "You can't take it!"
        animTimeout = setTimeout(animation, 1100);
        function animation() {
            document.getElementById("main_input").style.opacity = 1;
            document.getElementById("whatnow").innerText = "What now?";
            clearTimeout(animTimeout);
        }
    } else if (text == "taki") {
        document.getElementById("main_input").style.opacity = 0;
        document.getElementById("whatnow").innerText = "You are taking " + item_list[game.inventory].flex;
        animTimeout = setTimeout(animation, 1100);
        function animation() {
            document.getElementById("main_input").style.opacity = 1;
            document.getElementById("whatnow").innerText = "What now?";
            clearTimeout(animTimeout);
        }
    }
    else if (text == "drop") {
        document.getElementById("main_input").style.opacity = 0;
        document.getElementById("whatnow").innerText = "You are dropping " + item_list[game.inventory].flex;
        animTimeout = setTimeout(animation, 1100);
        function animation() {
            document.getElementById("main_input").style.opacity = 1;
            document.getElementById("whatnow").innerText = "What now?";
            clearTimeout(animTimeout);
        }
    }
    else {
        document.getElementById("main_input").style.opacity = 0;
        document.getElementById("whatnow").innerText = "You can't go that way!"
        animTimeout = setTimeout(animation, 1100);
        function animation() {
            document.getElementById("main_input").style.opacity = 1;
            document.getElementById("whatnow").innerText = "What now?";
            clearTimeout(animTimeout);
        }
    }
}

var specialAnimation = function (id) {
    if (use_list[id].text.includes("(timeout)")) {
        document.getElementById("main_input").style.opacity = 0;
        let slicedtxt = use_list[id].text.split("(timeout)")
        if (slicedtxt.length == 2) {
            document.getElementById("whatnow").innerText = slicedtxt[0]
            animTimeout = setTimeout(animationpt2, 1500);
            function animationpt2() {
                document.getElementById("main_input").style.opacity = 1;
                document.getElementById("whatnow").innerText = slicedtxt[1];
                clearTimeout(animTimeout);
                animTimeout = setTimeout(animation, 1500);
            }
            function animation() {
                document.getElementById("main_input").style.opacity = 1;
                document.getElementById("whatnow").innerText = "What now?";
                clearTimeout(animTimeout);
            }
        } else if (slicedtxt.length == 3) {
            document.getElementById("whatnow").innerText = slicedtxt[0]
            animTimeout = setTimeout(animationpt1, 1500);
            function animationpt1() {
                document.getElementById("main_input").style.opacity = 1;
                document.getElementById("whatnow").innerText = slicedtxt[1];
                clearTimeout(animTimeout);
                animTimeout = setTimeout(animationpt2, 1500);
            }
            function animationpt2() {
                document.getElementById("main_input").style.opacity = 1;
                document.getElementById("whatnow").innerText = slicedtxt[2];
                clearTimeout(animTimeout);
                animTimeout = setTimeout(animation, 1500);
            }
            function animation() {
                document.getElementById("main_input").style.opacity = 1;
                document.getElementById("whatnow").innerText = "What now?";
                clearTimeout(animTimeout);
            }
        }

    } else {
        document.getElementById("main_input").style.opacity = 0;
        document.getElementById("whatnow").innerText = use_list[id].text;
        animTimeout = setTimeout(animation, 1500);
        function animation() {
            document.getElementById("main_input").style.opacity = 1;
            document.getElementById("whatnow").innerText = "What now?";
            clearTimeout(animTimeout);
        }
    }
}

var endGame = function () {
    let div = document.createElement("div");
    div.id = "endiv";
    div.innerText = "THE SHOEMAKER GAME - thank you for playing! ☺"
    document.getElementById("body").appendChild(div)
}

var teleport = function (x, y) {
    game.actual_x = x;
    game.actual_y = y;
    game.updateEnv()
}

var give = function (id) {
    game.inventory = id;
    game.updateEnv()
}

var cj = function () {
    game._locations[game.actual_x][game.actual_y].cj();
}

var gos = function () {
    let div = document.createElement("div");
    div.id = "gosdiv";
    div.innerHTML = "The  woodcutter lost his home key...<br>The butcher likes fruit... The cooper<br>is greedy... Dratewka plans to make a<br>poisoned  bait for the dragon...  The<br>tavern owner is buying food  from the<br>pickers... Making a rag from a bag...<br>Press any key..."
    document.getElementById("body").appendChild(div)
    document.addEventListener('keydown', function (event) {
        let plansza = document.getElementById("gosdiv");
        if (event.key && event.key != "Enter") {
            try {
                document.getElementById("body").removeChild(plansza);
            } catch (error) {
                //
            }
        }
    });
}

var voc = function () {
    let div = document.createElement("div");
    div.id = "gosdiv";
    div.innerHTML = "NORTH or N, SOUTH or S<br>WEST or W, EAST or E<br>TAKE (object) or T (object)<br>DROP (object) or D (object)<br>USE (object) or U (object)<br>GOSSIPS or G, VOCABULARY or V<br>Press any key..."
    document.getElementById("body").appendChild(div)
    document.addEventListener('keydown', function (event) {
        let plansza = document.getElementById("gosdiv");
        if (event.key && event.key != "Enter") {
            try {
                document.getElementById("body").removeChild(plansza);
            } catch (error) {
                //
            }
        }
    });
}

var startScreen = function () {
    const audioContext = new AudioContext();
    const element = document.querySelector("#audio");
    const source = audioContext.createMediaElementSource(element);
    source.connect(audioContext.destination)
    var playPromise = audio.play();
}