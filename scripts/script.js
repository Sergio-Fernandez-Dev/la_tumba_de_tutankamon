const levels = initMap();
const objects = defineObjects();
let player = {
    position: [0,1],
    objects: {}, 
}
const defaultDirection = 'o';
let currentLevel = levels[player.position[0]][player.position[1]];
const actions = defineActions(defaultDirection);
const doButton = document.getElementById('do');
const firstLine = document.getElementById('first_line');

firstLine.innerHTML = getCurrentTime() + currentLevel.description;
doButton.onclick = executeCommands;

function executeCommands() {
    const words = getInputText();
    const action = words[0];
    if (!checkIfWordExist(action, actions)) { 
        return printInDescription(sendWarning(0), true);
    }
    if (action === 'ir') {
        const direction = words[1];

        if (!checkIfDirectionIsValid(direction, currentLevel)) {
            return printInDescription(sendWarning(2), true);
        }
        movePlayer(direction);
        return printInDescription(currentLevel.description);
    }
    if (!checkIfWordExist(words[1], objects)) {
        return printInDescription(sendWarning(1), true);   
    }
    // const object = words[1];
    // if (action === 'coger') {
    //     const inventory = player.objects;


        
    // }
}
// function checkIfObjectCanBePickedUp(object, level, inventory)
//     level.objects.includes

function checkIfWordExist(wordToCompare, wordList) {
    return wordList.has(wordToCompare);
}

function checkIfDirectionIsValid(direction, level) {
    return level.exits.includes(direction);
}

function checkIfExitExists(direction, exit) {
    return exit.includes(direction);
}

function getCurrentTime() {
    const date = new Date();

    return date.toLocaleTimeString() + ' >> ' ;
}

function getInputText() {
    const inputValue = document.getElementById('commands').value;
    const normalizedInputValue = inputValue.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
    const words = splitWords(normalizedInputValue.toLowerCase());

    return words;
}

function movePlayer(direction) {
    switch (direction) {
        case 'n':
            player.position[0]--;
            currentLevel = levels[player.position[0]][player.position[1]];
            break
        case 's':
            player.position[0]++;
            currentLevel = levels[player.position[0]][player.position[1]];
            break;
        case 'e':
            player.position[1]++;
            currentLevel = levels[player.position[0]][player.position[1]];
            break;
        case 'o':
            player.position[1]--;
            currentLevel = levels[player.position[0]][player.position[1]];  
            break;
        default:
            break;
    }
}

function printInDescription(description, warning = false) {
    const p = document.createElement('p');
    const output = document.getElementById('description');
    output.appendChild(p);

    if (warning) {
        p.classList.add('warning');
    }
    p.innerHTML = getCurrentTime() + description;
}

function saveObject(object) {

}

function sendWarning(index) {
    let warnings = [
        'Acción no permitida. Por favor, utilice "mirar", "coger","usar" o "ir".',
        'El objeto no existe',
        'No puedes ir en esa dirección',
    ];
    return warnings[index]
}

function showInventory(player) {

}

function splitWords(text) {
    let separatedWords = text.split(' ');
    return separatedWords;
}

function defineActions(direction) {
    const actions = new Map([
        ['mirar', true],
        ['coger', true],
        ['usar', true],
        ['ir', {do: movePlayer(direction)}],
    ]);

    return actions;
}

function defineObjects() {
    const objects = new Map([
        ['ascuas', false],
        ['carbon', false],
        ['lino', false],
        ['antorcha', false],
        ['mapa', false],
        ['baston', false],
        ['fresco', false],
        ['soporte', false],
        ['baul', false],
        ['llave', false],
        ['ladrillo', false],
        ['cuerda', false],
        ['cerradura', false],
    ]);

    return objects;
}

function initMap() {
    const levels = [
        [0,1,2,3],
        [0,1,2,3],
        [0,1,2,3],
        [0,1,2,3],
    ];

    levels[0][0] = {
        description: 'Al fin has llegado a la puerta de la pirámide. La roca que tapaba la puerta está entreabierta y las ASCUAS de una hoguera reciente indica que alguien ha pasado allí la noche. Parece que los ladrones de tumbas se te han vuelto a adelantar.',
        exits: ['e'],
        objects: ['ascuas', 'carbon'],
    };
    levels[0][1] = {
        description: 'El interior de la piramide está oscuro. Palpando la pared tocas algo que parece una ANTORCHA.',
        exits: ['e','o'],
        objects: ['antorcha', 'lino'],
    };
    levels[0][2] = {
        description: 'Al avanzar por el pasillo, la luz de la antorcha ilumina las paredes llenas de jeroglíficos.',
        exits: ['e','o'],
        objects: ['mapa'],
    };
    levels[0][3] = {
        description: 'Te encuentras de frente con una pared. A lo lejos aún se puede ver la luz tenue de la entrada. El pasillo parece girar a la derecha.',
        exits: ['s', 'o'],
        objects: [],
    };
    levels[1][0] = {
        description: 'Junto a la pared hay una estatua de oro macizo.',
        exits: ['e','s'],
        objects: [],
    };
    levels[1][1] = {
        description: 'Al adentrarte en la bóveda descubres un baul de madera maciza con incrustraciones de oro.',
        exits: ['e','s','o'],
        objects: ['baul', 'llave'],
    };
    levels[1][2] = {
        description: 'Al cruzar la puerta, accedes a un gran recibidor. El eco de tus pasos indica que estás en una especie de bóveda. En las paredes hay frisos de oro. Parece que los ladrones no han conseguido llegar hasta aquí.',
        exits: ['e','o'],
        objects: [],
    };
    levels[1][3] = {
        description: 'Al girar, entras en un vestíbulo. Frente a tí hay un fresco de Anubis que llega hasta el techo. A tu derecha hay una puerta custodiada por una estatua del dios Ra.',
        exits: ['n','s','o'],
        objects: ['estatua', 'baston', 'fresco'],
    };
    levels[2][0] = {
        description: 'Hay una puerta de madera maciza con una cerradura de hierro. Junto a ella, una cuerda cuelga de la pared.',
        exits: ['n','e','s'],
        objects: ['cuerda'],
    };
    levels[2][1] = {
        description: 'Hay una pared de piedra repleta de jeroglíficos.',
        exits: ['n','o'],
        objects: ['ladrillo'],
    };
    levels[2][2] = {
        description: 'La habitación está repleta de tesoros. En el centro de la sala hay un féretro de oro iluminado por un rayo de sol que entra por una claraboya. Felicidades. Tu búsqueda ha terminado. Parece que después de tantos años, al fin has encontrado la tumba de Tutankamon',
        exits: [],
        objects: [],
    };
    levels[2][3] = {
        description: 'Al atravesar la puerta escondida tras el fresco, accedes a una habitación secreta. Al igual que el resto de la pirámide, las paredes están llenas de jeroglíficos. Desde donde estás no consigues ver lo que hay al fondo de la habitación.',
        exits: ['n','s'],
        objects: [],
    };
    levels[3][0] = {
        description: 'El suelo está lleno de escombros. Hay piedras por todas partes y trozos de madera humeante.',
        exits: ['n','e'],
        objects: [],
    };
    levels[3][1] = {
        description: 'Los escombros llegan hasta aquí. En el suelo hay un amasijo de hierro retorcido de lo que debió ser la cerradura.',
        exits: ['e','o'],
        objects: [],
    };
    levels[3][2] = {
        description: 'Hay una puerta de madera maciza con una cerradura de hierro.',
        exits: ['n','o'],
        objects: ['cerradura'],
    };
    levels[3][3] = {
        description: 'Al adentrarte más en la habitación secreta, observas un pequeño altar. Tras él, hay un soporte cilíndrico anclado a la pared.',
        exits: ['n'],
        objects: ['soporte'],
    };

    return levels;
}