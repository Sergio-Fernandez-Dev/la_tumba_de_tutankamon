const doButton = document.getElementById('do');
const levels = initMap();
const actions = defineActions();
const objects = defineObjects();

doButton.onclick = executeCommands;

function checkIfWordExist(wordToCompare, wordList) {
    return wordList.has(wordToCompare) ? true : false;
}

function defineActions() {
    const actions = new Map([
        ['mirar', true],
        ['coger', true],
        ['usar', true],
        ['ir', true],
    ]);

    return actions;
}

function defineObjects() {
    const objects = new Map([
        ['ascuas', false],
        ['carbón', false],
        ['lino', false],
        ['antorcha', false],
        ['mapa', false],
        ['bastón', false],
        ['fresco', false],
        ['soporte', false],
        ['baúl', false],
        ['ladrillo', false],
        ['cuerda', false],
        ['cerradura', false],
    ]);

    return objects;
}

function executeCommands() {
    const inputValue = document.getElementById('commands').value;
    const output = document.getElementById('description');
    const words = splitWords(inputValue.toLowerCase());
    const p = document.createElement('p');
    const date = new Date();
    if (!checkIfWordExist(words[0], actions)) { 
        output.appendChild(p).classList.add('warning');
        p.innerHTML = date.toLocaleTimeString() + ' >> ' + sendWarning(0);

        return;
    }
    if (!checkIfWordExist(words[1], objects)) {
        output.appendChild(p).classList.add('warning');
        p.innerHTML = date.toLocaleTimeString()  + ' >> ' + sendWarning(1);
       
        return;
    }
}

function checkIfExitExists(direction, exit) {
    return exit.includes(direction);
}

function initMap() {
    const levels = [
        [0,1,2,3],
        [0,1,2,3],
        [0,1,2,3],
        [0,1,2,3]
    ];

    levels[0][0] = {
        description: 'Al fin has llegado a la puerta de la pirámide. La roca que tapaba la puerta está entreabierta y las ascuas de una hoguera reciente indica que alguien ha pasado allí la noche. Parece que los ladrones de tumbas se te han vuelto a adelantar.',
        exits: ['E'],
    };
    levels[0][1] = {
        description: 'El interior de la piramide está oscuro. Palpando la pared tocas algo que parece una antorcha.',
        exits: ['E','W'],
    };
    levels[0][2] = {
        description: 'Al avanzar por el pasillo, la luz de la antorcha ilumina las paredes llenas de jeroglíficos.',
        exits: ['E','W'],
    };
    levels[0][3] = {
        description: 'Te encuentras de frente con una pared. A lo lejos aún se puede ver la luz tenue de la entrada. El pasillo parece girar a la derecha.',
        exits: ['S', 'W'],
    };
    levels[1][0] = {
        description: 'Junto a la pared hay una estatua de oro macizo.',
        exits: ['E','S'],
    };
    levels[1][1] = {
        description: 'Al adentrarte en la bóveda descubres un baúl de madera maciza con incrustraciones de oro.',
        exits: ['E','S','W'],
    };
    levels[1][2] = {
        description: 'Al cruzar la puerta, accedes a un gran recibidor. El eco de tus pasos indica que estás en una especie de bóveda. En las paredes hay frisos de oro. Parece que los ladrones no han conseguido llegar hasta aquí.',
        exits: ['E','W'],
    };
    levels[1][3] = {
        description: 'Al girar, entras en un vestíbulo. Frente a tí hay un fresco de Anubis que llega hasta el techo. A tu derecha hay una puerta custodiada por una estatua del dios Ra.',
        exits: ['N','S','W'],
    };
    levels[2][0] = {
        description: 'Hay una puerta de madera maciza con una cerradura de hierro. Junto a ella, una cuerda cuelga de la pared.',
        exits: ['N','E','S'],
    };
    levels[2][1] = {
        description: 'Hay una pared de piedra repleta de jeroglíficos.',
        exits: ['N','W'],
    };
    levels[2][2] = {
        description: 'La habitación está repleta de tesoros. En el centro de la sala hay un féretro de oro iluminado por un rayo de sol que entra por una claraboya. Felicidades. Tu búsqueda ha terminado. Parece que después de tantos años, al fin has encontrado la tumba de Tutankamon',
        exits: [],
    };
    levels[2][3] = {
        description: 'Al atravesar la puerta escondida tras el fresco, accedes a una habitación secreta. Al igual que el resto de la pirámide, las paredes están llenas de jeroglíficos. Desde donde estás no consigues ver lo que hay al fondo de la habitación.',
        exits: ['N','S'],
    };
    levels[3][0] = {
        description: 'El suelo está lleno de escombros. Hay piedras por todas partes y trozos de madera humeante.',
        exits: ['N','E'],
    };
    levels[3][1] = {
        description: 'Los escombros llegan hasta aquí. En el suelo hay un amasijo de hierro retorcido de lo que debió ser la cerradura.',
        exits: ['E','W'],
    };
    levels[3][2] = {
        description: 'Hay una puerta de madera maciza con una cerradura de hierro.',
        exits: ['E','W'],
    };
    levels[3][3] = {
        description: 'Al adentrarte más en la habitación secreta, observas un pequeño altar. Tras él, hay un soporte cilíndrico anclado a la pared.',
        exits: ['N','S'],
    };

    console.log(levels[0][0].exits.includes('E'));
    return levels;
}

function moveToNextLevel(direction, level){
    switch (direction) {
        case 'N':
            
            break;
    
        default:
            break;
    }
}

function sendWarning(index) {
    let warnings = [
        'Acción no permitida. Por favor, utilice "mirar", "coger","usar" o "ir".',
        'El objeto no existe',
    ];
    return warnings[index]
}

function splitWords(text) {
    let separatedWords = text.split(' ');
    return separatedWords;
}
