// Gestion du modal
document.getElementById('openModal').addEventListener('click', function () {
    console.log("Modal ouvert");
    document.getElementById('modal').style.display = 'flex';
});

document.getElementById('closeModal').addEventListener('click', function () {
    document.getElementById('modal').style.display = 'none';
});


window.addEventListener('click', function (event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Gestion des joueurs
const form = document.getElementById('playerForm');
const playerContainer = document.getElementById('playerContainer');

// Fonction pour sauvegarder les joueurs dans Local Storage
function saveToLocalStorage(players) {
    localStorage.setItem('players', JSON.stringify(players));
}

// Fonction pour récupérer les joueurs depuis Local Storage
function loadFromLocalStorage() {
    const players = localStorage.getItem('players');
    return players ? JSON.parse(players) : [];
}

// Fonction pour afficher une carte de joueur
// Fonction pour afficher une carte de joueur
function displayPlayerCard(player, index) {
    const card = document.createElement('div');
    card.classList.add('player');

    // Vérifier si le joueur est un GK
    const playerStats = player.position === 'GK'
        ? `
            <div class="player-stats">
                <div class="stat"><span>| DIV</span><span>${player.diving}</span></div>
                <div class="stat"><span>| HAN</span><span>${player.handling}</span></div>
                <div class="stat"><span>| KIC</span><span>${player.kicking}</span></div>
                <div class="stat"><span>| REF</span><span>${player.reflexes}</span></div>
                <div class="stat"><span>| SPE</span><span>${player.speed}</span></div>
                <div class="stat"><span>| POS</span><span>${player.positioning}</span></div>
            </div>
        `
        : `
            <div class="player-stats">
                <div class="stat"><span>| Pac</span><span>${player.pace}</span></div>
                <div class="stat"><span>| Sho</span><span>${player.shooting}</span></div>
                <div class="stat"><span>| Pas</span><span>${player.passing}</span></div>
                <div class="stat"><span>| Dri</span><span>${player.dribbling}</span></div>
                <div class="stat"><span>| Def</span><span>${player.defending}</span></div>
                <div class="stat"><span>| Phy</span><span>${player.physical}</span></div>
            </div>
        `;

    card.innerHTML = `
        <div class="card">
            <img class="player" src="/assets/imgs/card.webp" alt="">
            <div class="card-content">
                <div class="stats">
                    <div class="rating">
                        <span class="rating-value">${player.rating}</span>
                        <span class="rating-position">${player.position}</span>
                        <div class="team-icons">
                            <img src="${player.flag}" alt="Flag">
                            <img src="${player.logo}" alt="Logo">
                        </div>
                    </div>
                    <img class="player-img" src="${player.photo}" alt="">
                </div>
                <div class="player-info">
                    <h1 class="player-name">${player.name}</h1>
                    ${playerStats}
                </div>
            </div>
        </div>
        <button class="edit-btn" data-index="${index}">Edit</button>
    `;

    playerContainer.appendChild(card);
}

// Charger les joueurs au démarrage
document.addEventListener('DOMContentLoaded', function () {
    const players = loadFromLocalStorage();
    players.forEach((player, index) => displayPlayerCard(player, index));
});

//Écouteur pour le formulaire
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const textFields = ['name', 'flag', 'logo','photo'];
    for (let fieldId of textFields) {
        const field = document.getElementById(fieldId);
        const fieldValue = field.value.trim();
        if (/^\d+$/.test(fieldValue)) { 
            alert(`Please type a valid text in the ${fieldId} field, not a number.`);
            field.focus();
            return; 
        }
    }

    // Récupérer les données du formulaire
    const newPlayer = {
        photo: document.getElementById('photo').value.trim(),
        flag: document.getElementById('flag').value.trim(),
        logo: document.getElementById('logo').value.trim(),
        name: document.getElementById('name').value.trim(),
        position: document.getElementById('position').value.trim(),
        rating: document.getElementById('rating').value.trim(),
        pace: document.getElementById('pace')?.value.trim(),
        shooting: document.getElementById('shooting')?.value.trim(),
        passing: document.getElementById('passing')?.value.trim(),
        dribbling: document.getElementById('dribbling')?.value.trim(),
        defending: document.getElementById('defending')?.value.trim(),
        physical: document.getElementById('physical')?.value.trim(),
        diving: document.getElementById('diving')?.value.trim(),
        handling: document.getElementById('handling')?.value.trim(),
        kicking: document.getElementById('kicking')?.value.trim(),
        reflexes: document.getElementById('reflexes')?.value.trim(),
        speed: document.getElementById('speed')?.value.trim(),
        positioning: document.getElementById('positioning')?.value.trim(),
    };

    const players = loadFromLocalStorage();

    if (form.dataset.editingIndex !== undefined) {
        // Mise à jour d'un joueur existant
        const index = form.dataset.editingIndex;
        players[index] = newPlayer;
    } else {
        // Ajout d'un nouveau joueur
        players.push(newPlayer);
       
    }

    // Sauvegarde et réaffichage
    saveToLocalStorage(players);
    playerContainer.innerHTML = ''; // Efface l'ancien affichage
    players.forEach((player, index) => displayPlayerCard(player, index));

    // Réinitialisation
    form.reset();
    delete form.dataset.editingIndex;
    document.getElementById('modal').style.display = 'none';
});

// Gestion de la modification d'un joueur
playerContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('edit-btn')) {
        const index = event.target.dataset.index; // Récupère l'index du joueur
        const players = loadFromLocalStorage();
        const player = players[index];

        // Remplir les champs du formulaire avec les informations du joueur
        document.getElementById('photo').value = player.photo || '';
        document.getElementById('flag').value = player.flag || '';
        document.getElementById('logo').value = player.logo || '';
        document.getElementById('name').value = player.name || '';
        document.getElementById('position').value = player.position || '';
        // document.getElementById('nationality').value = player.nationality || '';
        // document.getElementById('club').value = player.club || '';
        document.getElementById('rating').value = player.rating || '';
        document.getElementById('pace').value = player.pace || '';
        document.getElementById('shooting').value = player.shooting || '';
        document.getElementById('passing').value = player.passing || '';
        document.getElementById('dribbling').value = player.dribbling || '';
        document.getElementById('defending').value = player.defending || '';
        document.getElementById('physical').value = player.physical || '';

        // Ajouter un attribut au formulaire pour signaler qu'on modifie un joueur
        form.dataset.editingIndex = index;

        // Ouvrir le modal
        document.getElementById('modal').style.display = 'flex';
    }
});


/////////FIN MODOFICATION/////////////////////////////////
///////////////////////////////////////////////////////////



const fieldPlayers = document.querySelectorAll('.field .player');
//////////////////////////////Echange des joueurs/////////////////////////////////

let selectedFieldPlayer = null; // Pour suivre le joueur sélectionné dans le terrain

// Ajoutez un écouteur sur chaque joueur du terrain
fieldPlayers.forEach((fieldPlayer) => {
    fieldPlayer.addEventListener('click', function () {
        // Si un joueur est déjà sélectionné, le désélectionner
        if (selectedFieldPlayer) {
            selectedFieldPlayer.classList.remove('selected');
        }

        // Mémoriser le joueur du terrain cliqué et appliquer un style visuel
        selectedFieldPlayer = fieldPlayer;
        fieldPlayer.classList.add('selected'); // Ajoutez une classe CSS pour indiquer la sélection
    });
});

// Ajoutez un écouteur sur le container des joueurs
playerContainer.addEventListener('click', function (event) {
    const clickedCard = event.target.closest('.player'); // Vérifiez si un joueur a été cliqué
    console.log(clickedCard)
    if (!clickedCard || !selectedFieldPlayer) return; // Arrêtez si aucune sélection

    // Échangez le contenu HTML entre le joueur sélectionné et le joueur cliqué
    const tempHTML = clickedCard.children[0];
    clickedCard.innerHTML = selectedFieldPlayer.innerHTML;
    selectedFieldPlayer.parentElement.replaceChild(tempHTML, selectedFieldPlayer);

    // Réinitialisez la sélection après l'échange
    selectedFieldPlayer.classList.remove('selected');
    selectedFieldPlayer = null;
});
//Ajoutez un écouteur sur le container des joueurs
//Supprimer et renverser 
document.querySelector('.field').addEventListener('click', (e) => {
    const element = e.target.closest('.card')
    const parent = element?.parentElement || null
    if(element){
        const playerdiv = document.createElement('div')
        playerdiv.className = 'player'
        playerdiv.appendChild(element)
        document.getElementById('playerContainer').appendChild(playerdiv)
        parent.innerHTML = '<img src="/assets/imgs/card.webp" alt="" class="player">'
    }else{
        if(e.target.classList.contains('player')){

            const position = e.target.parentElement.id; // Obtenir la position (ID du joueur dans le terrain)

            const players = loadFromLocalStorage(); // Charger les joueurs sauvegardés
            const filteredPlayers = players.filter(player => player.position === position); // Filtrer par position

            // Réinitialiser l'affichage dans le playerContainer
            playerContainer.innerHTML = '';
            filteredPlayers.forEach(displayPlayerCard); // Afficher uniquement les joueurs filtrés
            selectedFieldPlayer = e.target;
        }
    }
})
// Références aux champs spécifiques au GK
const gkSpecificFields = `
    <input type="number" id="diving" placeholder="Diving" required />
    <input type="number" id="handling" placeholder="Handling" required />
    <input type="number" id="kicking" placeholder="Kicking" required />
    <input type="number" id="reflexes" placeholder="Reflexes" required />
    <input type="number" id="speed" placeholder="Speed" required />
    <input type="number" id="positioning" placeholder="Positioning" required />
`;

// Récupération du formulaire et du champ position
const positionSelect = document.getElementById('position');

// Écouteur pour changer la position
positionSelect.addEventListener('change', function () {
    const position = positionSelect.value;
    const basicStats = document.getElementById('basic-stats');
    const existingStatsContainer = document.querySelector('.stats-container');

    // Supprimer les anciens champs spécifiques pour GK si présents
    if (existingStatsContainer) {
        existingStatsContainer.remove();
    }

    // Si GK est sélectionné
    if (position === 'GK') {
        // Masquer le conteneur avec ID 'basic-stats'
        basicStats.style.display = 'none';

        // Ajouter les champs spécifiques pour GK
        const container = document.createElement('div');
        container.className = 'stats-container';
        container.innerHTML = gkSpecificFields;
        form.insertBefore(container, form.querySelector('button')); // Ajouter avant le bouton "Enregistrer"
    } else {
        // Réafficher le conteneur 'basic-stats'
        basicStats.style.display = '';
    }
});



