var x = document.createElement("TABLE");
    x.setAttribute("id", "myTable");
    //x.setAttribute("style", "border:3px solid black;border-style: solid;margin-left: auto;margin-right: auto;")
    document.body.appendChild(x);
    var y = document.createElement("TBODY");
    y.setAttribute("id", "mybody");
    document.getElementById("myTable").appendChild(y);
    for (var i = 0; i < 25; i++) {
        var z = document.createElement("TR");
        document.getElementById("mybody").appendChild(z);
        for (var j = 0; j < 50; j++) {
            var w = document.createElement("TD");
            w.setAttribute("style", "height:5px;width:5px;background-color:#eedddd;border: 1px solid Gray;border-collapse: collapse;padding: 9px;")
            z.appendChild(w);
        }
    }
    var check = 0
    var check1 = 0
    var bl = [];
    var s = [1, 1];
    var en = [4, 5];
    var dia = 0;
    var objarr = [];
    var mainarr = [];

    function remove() {
        check = 4
    }

    function reset() {
        dia = 0;
        check = 0;
        check1 = 0;
        bl = [];
        s = [10, 10];
        en = [10, 22];
        visited = [s];
        objarr = [];
        mainarr = [];
        for (var c = 0; c < 25; c++) {
            for (var d = 0; d < 50; d++) {
                var x = document.getElementById("myTable").rows[c].cells;
                x[d].style.backgroundColor = "#eedddd";

            }
        }
    }

    function diagonal() {
        dia = 1;
    }

    function ranblock() {
        for (var c = 0; c < 25; c++) {
            for (var d = 0; d < 50; d++) {
                if (Math.random() > 0.6) {
                    var x = document.getElementById("myTable").rows[c].cells;
                    x[d].style.backgroundColor = "#333333";
                    bl.push([c, d]);
                }
            }

        }
    }

    function start() {
        check = 1
    }

    function stop() {
        check = 2
    }

    function block() {
        check = 3
    }

    var table = document.getElementById('myTable');
    var getTBody = table.getElementsByTagName("tbody")[0];
    getTBody.onclick = function(e) {
        var a = e.target.parentNode.rowIndex;
        var b = e.target.cellIndex;
        if (check == 1) {
            var x = document.getElementById("myTable").rows[a].cells;
            x[b].style.backgroundColor = "MediumSeaGreen";
            var x = document.getElementById("myTable").rows[s[0]].cells;
            x[s[1]].style.backgroundColor = "#eedddd";
            s.push(a, b);
            s.shift();
            s.shift();
        } else if (check == 2) {
            var x = document.getElementById("myTable").rows[a].cells;
            x[b].style.backgroundColor = "#ff3399";
            var x = document.getElementById("myTable").rows[en[0]].cells;
            x[en[1]].style.backgroundColor = "#eedddd";
            en.push(a, b);
            en.shift();
            en.shift();

        } else if (check == 3) {
            var x = document.getElementById("myTable").rows[a].cells;
            x[b].style.backgroundColor = "#333333";
            bl.push([a, b]);
        } else if (check == 4) {
            var x = document.getElementById("myTable").rows[a].cells;
            x[b].style.backgroundColor = "#eedddd";
            var index = -1;
            //var index = bl.indexOf([a, b]);
            for (var i = 0; i < bl.length; i++) {
                if (bl[i][0] == a && bl[i][1] == b) {
                    index = i;
                    break
                } else {
                    index = -1;
                }
            }
            console.log(index)
            if (index > -1) {
                bl.splice(index, 1);
            }
            console.log(bl)
        } else {

        }
    }
    getTBody.onmousedown = function(e) {
        if (check == 3) {
            check1 = 1
        }
    }
    getTBody.onmouseup = function(e) {
        if (check == 3) {
            check1 = 0
        }
    }
    getTBody.onmouseover = function(e) {
        var a = e.target.parentNode.rowIndex;
        var b = e.target.cellIndex;
        if ((check == 3) && (check1 == 1)) {
            var x = document.getElementById("myTable").rows[a].cells;
            x[b].style.backgroundColor = "#333333";
            bl.push([a, b]);
        }
    }

    async function main() {
        var visited = [s];
        var posi = [s[0], s[1]];
        mainarr.push([posi, null]);
        class arr {
            constructor(position, parent) {
                this.position = position;
                this.parent = parent;
            }
            present() {
                return "position" + this.position + "parent" + this.parent;
            }
        }

        function findparentcl(parentpos) {
            for (var i = 0; i < objarr.length; i++) {
                if (objarr[i].position == parentpos) {
                    return objarr[i]
                }
            }
        }

        function canvisit(cordinates) {
            for (var i = 0; i < visited.length; i++) {
                if (visited[i][0] == cordinates[0] && visited[i][1] == cordinates[1]) {
                    return false
                }
            }
            visited.push(cordinates);
            return true
        }

        function isend(cord) {
            if (cord.position[0] == en[0] && cord.position[1] == en[1]) {
                return true
            }
            return false
        }

        function isinscope(pos) {
            if ((pos[0] >= 0 && pos[1] >= 0 && pos[0] <= 24 && pos[1] <= 49)) {

                return true
            }
            return false
        }


        function block(pos) {

            for (var i = 0; i < bl.length; i++) {
                if (bl[i][0] == pos[0] && bl[i][1] == pos[1]) {
                    return false
                }
            }
            return true
        }


        function findshortest(obj) {
            arra = [];
            while (true) {
                arra.push([obj.position[0], obj.position[1]]);
                obj = findparentcl(obj.parent);
                if (obj.parent == null) {
                    arra.push([obj.position[0], obj.position[1]]);
                    arra.reverse();
                    return arra
                }
            }
        }

        function findchild(ppos) {
            //1
            var tem = ppos[0][0] - 1;
            var poss = [tem, ppos[0][1]];
            if (isinscope(poss) && canvisit(poss) && block(poss)) {
                mainarr.push([poss, ppos[0]])
            }
            //2
            var tem = ppos[0][0] + 1;
            var poss = [tem, ppos[0][1]];
            if (isinscope(poss) && canvisit(poss) && block(poss)) {
                mainarr.push([poss, ppos[0]])
            }
            //3
            var tem = ppos[0][1] - 1;
            var poss = [ppos[0][0], tem];
            if (isinscope(poss) && canvisit(poss) && block(poss)) {
                mainarr.push([poss, ppos[0]])
            }
            //4
            var tem = ppos[0][1] + 1;
            var poss = [ppos[0][0], tem];
            if (isinscope(poss) && canvisit(poss) && block(poss)) {
                mainarr.push([poss, ppos[0]])
            }
            if (dia == 1) {
                //5
                var tem = ppos[0][0] + 1;
                var tem1 = ppos[0][1] + 1;
                var poss = [tem, tem1];
                if (isinscope(poss) && canvisit(poss) && block(poss)) {
                    mainarr.push([poss, ppos[0]])
                }
                //6
                var tem = ppos[0][0] - 1;
                var tem1 = ppos[0][1] - 1;
                var poss = [tem, tem1];
                if (isinscope(poss) && canvisit(poss) && block(poss)) {
                    mainarr.push([poss, ppos[0]])
                }
                //7
                var tem = ppos[0][0] + 1;
                var tem1 = ppos[0][1] - 1;
                var poss = [tem, tem1];
                if (isinscope(poss) && canvisit(poss) && block(poss)) {
                    mainarr.push([poss, ppos[0]])
                }
                //8
                var tem = ppos[0][0] - 1;
                var tem1 = ppos[0][1] + 1;
                var poss = [tem, tem1];
                if (isinscope(poss) && canvisit(poss) && block(poss)) {
                    mainarr.push([poss, ppos[0]])
                }

            }
        }
        var i = 0;
        var a = -1;
        while (true) {
            var pos = [mainarr[0]];
            if (mainarr.length == 0) {
                window.alert("no ways to reach end point")
            }
            findchild(pos[0]);
            if ((pos[0][0][0] !== s[0] || pos[0][0][1] !== s[1]) && (pos[0][0][0] !== en[0] || pos[0][0][1] !== en[1])) {
                const promise = new Promise((accept) => {
                    setTimeout(() => {
                        var x = document.getElementById("myTable").rows[pos[0][0][0]].cells;
                        x[pos[0][0][1]].style.background = "Dodgerblue";
                        accept();
                    }, 10);
                });
                await promise;
            };
            objarr[i] = new arr(pos[0][0], pos[0][1]);
            len = objarr.length;
            if (isend(objarr[len - 1])) {
                var arra = findshortest(objarr[len - 1]);
                for (var i = 0; i < arra.length; i++) {
                    if ((arra[i][0] !== s[0] || arra[i][1] !== s[1]) && (arra[i][0] !== en[0] || arra[i][1] !== en[1])) {
                        const promise = new Promise((accept) => {
                            setTimeout(() => {
                                var x = document.getElementById("myTable").rows[arra[i][0]].cells;
                                x[arra[i][1]].style.backgroundColor = "yellow";
                                accept();
                            }, 10);
                        });
                        await promise;
                    }
                };
                break
            }
            mainarr.shift();
            i++;
        }
    }