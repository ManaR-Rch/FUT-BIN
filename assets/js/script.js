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
function displayPlayerCard(player, index) {
    const card = document.createElement('div');
    card.classList.add('player');

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
                    <div class="player-stats">
                        <div class="stat"><span>| Pac</span><span>${player.pace}</span></div>
                        <div class="stat"><span>| Sho</span><span>${player.shooting}</span></div>
                        <div class="stat"><span>| Pas</span><span>${player.passing}</span></div>
                        <div class="stat"><span>| Dri</span><span>${player.dribbling}</span></div>
                        <div class="stat"><span>| Def</span><span>${player.defending}</span></div>
                        <div class="stat"><span>| Phy</span><span>${player.physical}</span></div>
                    </div>
                </div>
            </div>
        </div>
        <button class="edit-btn" data-index="${index}">Modifier</button>
    `;

    playerContainer.appendChild(card);
}

// Charger les joueurs au démarrage
document.addEventListener('DOMContentLoaded', function () {
    const players = loadFromLocalStorage();
    players.forEach((player, index) => displayPlayerCard(player, index));
});

// Écouteur pour le formulaire
form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Récupérer les données du formulaire
    const photo = document.getElementById('photo').value.trim();
    const flag = document.getElementById('flag').value.trim();
    const logo = document.getElementById('logo').value.trim();
    const name = document.getElementById('name').value.trim();
    const position = document.getElementById('position').value.trim();
    const nationality = document.getElementById('nationality').value.trim();
    const club = document.getElementById('club').value.trim();
    const rating = document.getElementById('rating').value.trim();
    const pace = document.getElementById('pace').value.trim();
    const shooting = document.getElementById('shooting').value.trim();
    const passing = document.getElementById('passing').value.trim();
    const dribbling = document.getElementById('dribbling').value.trim();
    const defending = document.getElementById('defending').value.trim();
    const physical = document.getElementById('physical').value.trim();

    const newPlayer = {
        photo: photo,
        flag: flag,
        logo: logo,
        name: name,
        position: position,
        nationality: nationality,
        club: club,
        rating: rating,
        pace: pace,
        shooting: shooting,
        passing: passing,
        dribbling: dribbling,
        defending: defending,
        physical: physical,
    };

    const players = loadFromLocalStorage();

    if (form.dataset.editingIndex !== undefined) {
        // Mise à jour d'un joueur existant
        const index = form.dataset.editingIndex;
        players[index] = newPlayer;

        // Mise à jour de Local Storage
        saveToLocalStorage(players);

        // Réafficher toutes les cartes des joueurs
        playerContainer.innerHTML = ''; // Effacer les anciennes cartes
        players.forEach((player, index) => displayPlayerCard(player, index)); // Réafficher les cartes mises à jour
    } else {
        // Ajout d'un nouveau joueur
        players.push(newPlayer);
        saveToLocalStorage(players);
        displayPlayerCard(newPlayer, players.length - 1);
    }

    // Réinitialiser le formulaire et fermer le modal
    form.reset();
    delete form.dataset.editingIndex; // Supprimer l'attribut de modification
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
        document.getElementById('nationality').value = player.nationality || '';
        document.getElementById('club').value = player.club || '';
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

// Ajouter un écouteur sur chaque joueur du terrain
fieldPlayers.forEach((fieldPlayer) => {
    fieldPlayer.addEventListener('click', function () {
        const position = fieldPlayer.id; // Obtenir la position (ID du joueur dans le terrain)
        const players = loadFromLocalStorage(); // Charger les joueurs sauvegardés
        const filteredPlayers = players.filter(player => player.position === position); // Filtrer par position

        // Réinitialiser l'affichage dans le playerContainer
        playerContainer.innerHTML = '';
        filteredPlayers.forEach(displayPlayerCard); // Afficher uniquement les joueurs filtrés
    });
});

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
    if (!clickedCard || !selectedFieldPlayer) return; // Arrêtez si aucune sélection

    // Échangez le contenu HTML entre le joueur sélectionné et le joueur cliqué
    const tempHTML = clickedCard.innerHTML;
    clickedCard.innerHTML = selectedFieldPlayer.innerHTML;
    selectedFieldPlayer.innerHTML = tempHTML;

    // Réinitialisez la sélection après l'échange
    selectedFieldPlayer.classList.remove('selected');
    selectedFieldPlayer = null;
});
