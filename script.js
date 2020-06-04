window.onload = () => {

    const answer = document.getElementById("answer");
    const theTeam = [];

    const teamArea = document.getElementById("team");
    createCheckboxes();

    function createCheckboxes() {
        for (const member of theTeam) {
            const checkerInput = document.createElement('input');
            const labelForChecker = document.createElement('label');
            checkerInput.type = "checkbox";
            checkerInput.id = member;
            checkerInput.value = member;
            checkerInput.checked = JSON.parse(window.localStorage.getItem(member));
            checkerInput.addEventListener('change', (e) => {
                window.localStorage.setItem(e.currentTarget.value, e.currentTarget.checked);
                e.currentTarget.checked = e.currentTarget.checked;
            })
            labelForChecker.innerText = member;
            teamArea.append(checkerInput);
            teamArea.append(labelForChecker);
        }
    }

    let backgroundColor = document.body;
    const members = [...document.getElementsByTagName("input")];
    console.log(members);

    const pickMc = () => {
        const pickedMembers = members.filter(member => member.checked === false);
        if (pickedMembers.length > 0) {
            const random = Math.floor(Math.random() * pickedMembers.length);
            const winner = pickedMembers[random];
            winner.checked = true;
            localStorage.setItem(winner.value, winner.checked);
            answer.innerText = winner.value;
        } else {
            answer.innerText = "Everyone has been MC! Restarting..."
            selectAll.innerText = "DESELECT ALL";
            selectDeselect();
        }
    }

    const button = document.getElementById("random");

    button.addEventListener("click", function () {
        pickMc();
        backgroundColor.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
        console.log(backgroundColor.style.backgroundColor);
    })

    const selectAll = document.getElementById("select-all");

    function selectDeselect() {
        members.map(member => {
            selectAll.innerText === "SELECT ALL" ? member.checked = true : member.checked = false;
            localStorage.setItem(member.value, member.checked);
        });
        selectAll.innerText === "SELECT ALL" ? selectAll.innerText = "DESELECT ALL" : selectAll.innerText = "SELECT ALL";
    }

    selectAll.addEventListener("click", () => { selectDeselect() })
}