# Mudi Pixel AMoblando Pullman

El **Mudi Pixel** es una herramienta JavaScript diseñada para registrar y analizar la interacción de los usuarios en el sitio web de Mudi. Esta clase proporciona funciones para identificar usuarios, rastrear eventos de interacción, recopilar información sobre el dispositivo del usuario y enviar datos al servidor para su posterior análisis.

## Características

- Identificación de usuarios.
- Seguimiento de eventos de interacción, como clics en botones y compras.
- Recopilación de información sobre el dispositivo del usuario, incluido el sistema operativo y el tipo de dispositivo.
- Registro de datos de navegación, como la URL actual y la hora de la sesión.
- Envío de datos al servidor para análisis posterior.

## Uso

1. **Importación y creación de instancia**:
    ```javascript
    const mudiPixel = new MudiPixel();
    ```

2. **Encendido del Mudi Pixel**:
    ```javascript
    mudiPixel.pixelMudiOn();
    ```

## Métodos

- `verifyTestingAB()`: Verifica si el usuario está participando en una prueba AB y actualiza el tipo de prueba si es necesario.
- `verifyAddToCar()`: Verifica si se ha hecho clic en el botón "Agregar al carrito" y registra el evento si es así.
- `verifyCategory()`: Verifica la categoría y la subcategoría de la página actual.
- `verifyPurchase()`: Verifica si se ha hecho clic en el botón de compra y registra el evento si es así.
- `verifyContainerBtnsMudi()`: Verifica la existencia y la interacción con los botones en la página de detalle del producto.
- `verifyBtnAR()`: Verifica la existencia y la interacción con el botón de realidad aumentada en la página de detalle del producto.
- `verifySku()`: Verifica el número de SKU del producto.
- `identifyUserMudi()`: Identifica al usuario y lo registra en el servidor si es necesario.
- `getPath()`: Obtiene la URL de la página actual.
- `recognizeDevice()`: Reconoce el dispositivo del usuario.
- `getDate()`: Obtiene la fecha actual.
- `timeSesion()`: Inicia un temporizador para calcular el tiempo de sesión del usuario.
- `addEventBeforeUnload()`: Agrega un evento antes de descargar la página para enviar los datos al servidor.

## Ejemplo

```javascript
const mudiPixel = new MudiPixel();
mudiPixel.pixelMudiOn();