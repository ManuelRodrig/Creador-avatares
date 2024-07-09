var cont = 0;
// Inicializar las características del avatar con valores predeterminados
let features = {
    hair: 0,
    eyes: 0,
    mouth: 0,
    accessory: 0,
    clothes: 0,
    face: 0
};

// Limites de los indices para cada característica
const featureLimits = {
    hair: 11,
    eyes: 6,
    mouth: 10,
    accessory: 4,
    clothes: 8,
    face: 5
};

/**
 * Actualiza la imagen del avatar para una característica específica.
 * @param {string} feature - La característica a actualizar (ej. "hair", "eyes").
 * @param {string} genero - El género del avatar (ej. "Mujer", "Hombre").
 */
function updateFeature(feature, genero) {
    // Asignar el valor del género a una variable
    valor = genero;
    // Actualizar la imagen de la característica correspondiente
    document.getElementById(`avatar-${feature}`).src = `${valor}/${feature}${features[feature]}.png`;
}

/**
 * Cambia a la imagen anterior de una característica específica.
 * @param {string} feature - La característica a actualizar (ej. "hair", "eyes").
 * @param {string} valor - El género del avatar (ej. "Mujer", "Hombre").
 */
function prevFeature(feature, valor) {
    // Asignar el valor del género a una variable
    genero = valor;
    // Calcular el índice de la imagen anterior, asegurando que se mantenga dentro de los límites
    features[feature] = (features[feature] - 1 + featureLimits[feature]) % featureLimits[feature] || featureLimits[feature];
   
    if (feature == 'hair') {
        cont= features[feature];
        console.log("este es el valor del contador: ",cont);
      }
    // Actualizar la imagen del avatar
    updateFeature(feature, genero);
}

/**
 * Cambia a la siguiente imagen de una característica específica.
 * @param {string} feature - La característica a actualizar (ej. "hair", "eyes").
 * @param {string} valor - El género del avatar (ej. "Mujer", "Hombre").
 */
function nextFeature(feature, valor) {
    // Asignar el valor del género a una variable
    genero = valor;
    // Calcular el índice de la siguiente imagen, asegurando que se mantenga dentro de los límites
    features[feature] = (features[feature] % featureLimits[feature]) + 1;
    if (feature == 'hair') {
        cont= features[feature];
        console.log("este es el valor del contador: ",cont);
      }
    // Actualizar la imagen del avatar
    updateFeature(feature, genero);
}


// Inicializar las características del avatar para la segunda funcionalidad
let features2 = {
    hair: 0,
};

// Limites de los indices para cada característica en la segunda funcionalidad
const featureLimits2 = {
    hair: 3,
};

// Colores disponibles para cada característica
const colors = {
    hair: ['#2596be', '#205434', '#501c3c', '#805424'],
    eyes: ['#2596be', '#205434', '#501c3c', '#805424'],
    mouth: ['#2596be', '#205434', '#501c3c', '#805424'],
};

// Inicializar un objeto para mantener el índice de color actual para cada característica
const currentColorIndex = {
    hair: 0,
    eyes: 0,
    mouth: 0,
    accessory: 0,
    clothes: 0,
    face: 0
};

/**
 * Actualiza el color de una característica específica.
 * @param {string} feature - La característica a actualizar (ej. "hair", "eyes").
 * @param {string} genero - El género del avatar (ej. "Mujer", "Hombre").
 */
function updateColorBox(feature, genero) {
    // Asignar el valor del género a una variable
    valor = genero;
    // Obtener el índice actual y el color para la característica
    const index = currentColorIndex[feature];
    const color = colors[feature][index];
    // Actualizar el color del cuadro de la característica
    document.getElementById(`${feature}-color`).style.backgroundColor = color;
    // Si la característica está definida en features2, actualizar la imagen del avatar
    if (typeof features2 !== 'undefined' && features2[feature]) {
       document.getElementById(`avatar-${feature}`).src = `${valor}colores/${valor}${cont}/${feature}${features2[feature]}.png`;
    }
    // Incrementar el índice de color y reiniciar si es necesario
    currentColorIndex[feature] = (index + 1) % colors[feature].length;
}

/**
 * Cambia al color anterior de una característica específica.
 * @param {string} feature - La característica a actualizar (ej. "hair", "eyes").
 * @param {string} valor - El género del avatar (ej. "Mujer", "Hombre").
 */
function prevFeature2(feature, valor) {
    // Asignar el valor del género a una variable
    genero = valor;
    // Calcular el índice del color anterior, asegurando que se mantenga dentro de los límites
    features2[feature] = (features2[feature] - 2 + featureLimits2[feature]) % featureLimits2[feature] + 1;
    // Actualizar el color del cuadro de la característica
    updateColorBox(feature, genero);
}

/**
 * Cambia al siguiente color de una característica específica.
 * @param {string} feature - La característica a actualizar (ej. "hair", "eyes").
 * @param {string} valor - El género del avatar (ej. "Mujer", "Hombre").
 */
function nextFeature2(feature, valor) {
    // Asignar el valor del género a una variable
    genero = valor;
    // Calcular el índice del siguiente color, asegurando que se mantenga dentro de los límites
    features2[feature] = (features2[feature] % featureLimits2[feature]) + 1;
    // Actualizar el color del cuadro de la característica
    updateColorBox(feature, genero);
}
async function downloadAvatar() {
    try {
        const canvas = await html2canvas(document.querySelector('.avatar-preview'), {
            backgroundColor: null // Establecer el fondo como transparente
        });
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'avatar.png';
        link.click();
    } catch (error) {
        console.error('Error al descargar el avatar:', error);
    }
}

async function captureAvatar() {
    // Array para almacenar los valores de las imágenes
    let avatarValues = [];

    // Obtener el div avatar-preview
    let avatarPreview = document.querySelector('.avatar-preview');

    // Obtener todos los divs dentro de avatar-preview
    let avatarDivs = avatarPreview.querySelectorAll('div');

    // Iterar sobre cada div y obtener sus imágenes internas y su ID
    avatarDivs.forEach(function(div) {
        // Obtener todas las imágenes dentro del div
        let images = div.querySelectorAll('img');

        // Iterar sobre cada imagen dentro del div
        images.forEach(function(image) {
            // Obtener el src de la imagen
            let src = image.getAttribute('src');

            // Obtener el ID del div
            let id = image.getAttribute('id');

            // Agregar el src y el id al arreglo
            avatarValues.push({ id: id, src: src });
        });
    });

    // Convertir el arreglo a una cadena JSON
    let avatarJSON = JSON.stringify(avatarValues);

    try {
        // Solicitar al usuario que seleccione un archivo TXT existente
        const [fileHandle] = await window.showOpenFilePicker({
            types: [{
                description: 'Text Files',
                accept: { 'text/plain': ['.txt'] }
            }]
        });

        // Obtener el archivo seleccionado
        const file = await fileHandle.getFile();

        // Leer el contenido del archivo
        const contents = await file.text();

        // Agregar los nuevos valores JSON al contenido existente
        const updatedContents = contents + '\n' + avatarJSON;

        // Crear un escritor para escribir en el archivo
        const writable = await fileHandle.createWritable();

        // Escribir el contenido actualizado en el archivo
        await writable.write(updatedContents);

        // Cerrar el archivo después de escribir
        await writable.close();

        alert('Los valores se han agregado al archivo con éxito.');
    } catch (error) {
        console.error('Error al acceder o escribir en el archivo:', error);
    }
}

//revisar esto codigo 
async function loadAvatarList() {
    try {
        const fileUrl = 'lista.txt';
        const response = await fetch(fileUrl);
        if (!response.ok) {
            throw new Error(`No se pudo cargar el archivo: ${response.statusText}`);
        }
        const contents = await response.text();
        const lines = contents.split('\n');

        let avatarSets = [];
        for (const line of lines) {
            if (line.trim() !== '') {
                try {
                    avatarSets.push(JSON.parse(line.trim()));
                } catch (e) {
                    console.error(`Error parsing JSON on line: ${line}`, e);
                }
            }
        }

        let listDiv = document.getElementById('list');
        if (!listDiv) {
            throw new Error('Element with id "list" not found.');
        }
        listDiv.innerHTML = '';

        let avatarListDiv = document.getElementById('avatar-list');
        if (!avatarListDiv) {
            throw new Error('Element with id "avatar-list" not found.');
        }
        avatarListDiv.innerHTML = '';

        avatarSets.forEach(function(avatarSet, index) {
            let button = document.createElement('button');
            button.textContent = `Avatares Set ${index + 1}`;
            button.onclick = function() {
                let avatarUrls = avatarSet.map(avatar => avatar.src).join('\n');
                alert(`URLs de las imágenes:\n${avatarUrls}`);

                avatarListDiv.innerHTML = '';
                const orderedRasgos = ['avatar-face', 'avatar-hair', 'avatar-eyes', 'avatar-mouth', 'avatar-accessory', 'avatar-clothes'];

                console.log("Rasgos ordenados:");
                orderedRasgos.forEach(function(rasgoId) {
                    const rasgo = avatarSet.find(avatar => avatar.id === rasgoId);
                    if (rasgo) {
                        console.log(`ID: ${rasgo.id}, SRC: ${rasgo.src}`);
                        let img = document.createElement('img');
                        img.src = rasgo.src;
                        img.id = rasgo.id;
                        avatarListDiv.appendChild(img);
                    } else {
                        console.log(`No se encontró rasgo con ID ${rasgoId}`);
                    }
                });
            };
            listDiv.appendChild(button);
        });
    } catch (error) {
        console.error('Error al acceder o leer el archivo:', error);
        alert('Hubo un error al cargar el archivo.');
    }
}

document.addEventListener('DOMContentLoaded', loadAvatarList);

const images = [
    'Botones/background1.svg',
    'Botones/background2.svg',
    'Botones/background3.svg',
    'Botones/background4.svg',
    // Añade más rutas de imágenes según sea necesario
];
let currentImageIndex = 0;

function changeBackgroundImage() {
    const avatarPreview = document.querySelector('.avatar-preview');
    currentImageIndex = (currentImageIndex + 1) % images.length;
    avatarPreview.style.backgroundImage = `url(${images[currentImageIndex]})`;
}







