const doButton = document.getElementById('do');
const levels = [
    [0][0] = 'Al fin has llegado a la puerta de la pirámide. La roca que tapaba la puerta está entreabierta y las ascuas de una hoguera reciente indica que alguien ha pasado allí la noche. Parece que los ladrones de tumbas se te han vuelto a adelantar.',
    [0][1] = 'El interior de la piramide está oscuro. Palpando la pared tocas algo que parece una antorcha.', 
    [0][2] = 'Al avanzar por el pasillo, la luz de la antorcha ilumina las paredes llenas de jeroglíficos.', 
    [0][3] = 'Te encuentras de frente con una pared. A lo lejos aún se puede ver la luz tenue de la entrada. El pasillo parece girar a la derecha.',
    [1][0] = 'Junto a la pared hay una estatua de oro macizo.', 
    [1][1] = 'Al adentrarte en la bóveda descubres un baúl de madera maciza con incrustraciones de oro.', 
    [1][2] = 'Al cruzar la puerta, accedes a un gran recibidor. El eco de tus pasos indica que estás en una especie de bóveda. En las paredes hay frisos de oro. Parece que los ladrones no han conseguido llegar hasta aquí.', 
    [1][3] = 'Al girar, entras en un vestíbulo. Frente a tí hay un fresco de Anubis que llega hasta el techo. A tu derecha hay una puerta custodiada por una estatua del dios Ra.',
    [2][0] = 'Hay una puerta de madera maciza con una cerradura de hierro. Junto a ella, una cuerda cuelga de la pared.', 
    [2][1] = 'Hay una pared de piedra repleta de jeroglíficos.', 
    [2][2] = 'La habitación está repleta de tesoros. En el centro de la sala hay un féretro de oro iluminado por un rayo de sol que entra por una claraboya. Felicidades. Tu búsqueda ha terminado. Parece que después de tantos años, al fin has encontrado la tumba de Tutankamon'
    [2][3] = 'Al atravesar la puerta escondida tras el fresco, accedes a una habitación secreta. Al igual que el resto de la pirámide, las paredes están llenas de jeroglíficos. Desde donde estás no consigues ver lo que hay al fondo de la habitación.', 
    [3][0] = 'El suelo está lleno de escombros. Hay piedras por todas partes y trozos de madera humeante.', 
    [3][1] = 'Los escombros llegan hasta aquí. En el suelo hay un amasijo de hierro retorcido de lo que debió ser la cerradura.', 
    [3][2] = 'Hay una puerta de madera maciza con una cerradura de hierro.', 
    [3][3] = 'Al adentrarte más en la habitación secreta, observas un pequeño altar. Tras él, hay un soporte cilíndrico anclado a la pared.',
];

const commands = new Map([
    ['mirar', true],
    ['coger', true],
    ['usar', true],
    ['ir', true],
]);

doButton.onclick = () => {
    const inputValue = document.getElementById('commands').value;
    const output = document.getElementById('description');
    const words = splitWords(inputValue.toLowerCase());
    if (!checkIfWordExist(words[0], commands)) {
        output.innerHTML = sendWarning();
        return;
    }
    output.innerHTML = 'Todo correcto';
}

function splitWords(text) {
    let separatedWords = text.split(' ');
    return separatedWords;
}


function checkIfWordExist(wordToCompare, wordList) {
    if (wordList.has(wordToCompare)) {
        return true;
    }
    return false;
}

function sendWarning() {
    return 'Acción no permitida. Por favor, utilice "mirar", "coger","usar" o "ir".'
}