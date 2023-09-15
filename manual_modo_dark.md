# Proyecto Final


# Modo de uso Languaje 
.
- [ ] importar libreria que usa el contexto 
``` js
    import { LanguajeContext } from "..../utils/languaje/languajeProvider";
    import {useContext} from 'react';
```
- [ ] obtener las variables de contexto q utilizaras para hacer uso del lenguaje dentro de tu componente 

``` js
    const { StringsLanguaje, locale } = useContext(LanguajeContext);
``` 
- [ ] para poder usar la variable en el renderizado utilizarlo de la sgt manera ejm
``` js
    <Text > {localizedStrings.Welcome}<Text />
``` 
- [ ] para ver que opciones contamos y podemos agregar revisar el archivo . existen dos objetos uno que dice en y otro es, cada clave que se cree debe tener una identica en ambos objetos pero con valores distintos
``` js
.../Languaje/stringsLanguaje.js
``` 

# Modo de uso Thema Oscuro
- [ ] importar libreria que usa el contexto 
``` js
    import {useContext} from 'react';
    import { ThemeContext } from "..../utils/theme/ThemeProvider";
```
- [ ] obtener las variables de contexto q utilizaras para hacer uso del lenguaje dentro de tu componente 

``` js
    const { StringsDark, isDarkMode } = useContext(ThemeContext);
``` 
- [ ] Para aplicar el contexto de stilo dark/ligth
``` js
<View style={[styles.Container,{backgroundColor :StringsDark.backgroundTittle}]}>
```
podemos observar que en style, se le esta cargando un arreglo ,el primer elemento se envia Container, seguido de un objeto donde cambiaremos el backgroundcolor, color, etc  y le asignamos nuestra variable de contexto para que carge su respectivo valor.

En nuestro stylesheet deberiamos ver algo asi
``` js
const styles = StyleSheet.create({
    Container: {
      justifyContent: 'center',
      //  backgroundColor: color_azul,
      alignItems: 'center',
      width: '92%',
      flexDirection: 'row',
    }}),
```    
- [ ] Ahora para poder ver las opciones con las q contamos para aplicar necesitamos revisar el archivo 
``` js
.../Theme/stringsColor.js
```
En dicho archivo tambien se cuenta con una variable q maneja dos objetos los cuales hacen referencia a los valores que recibira la variable ccuando sea ligth y cuando sea dark si quieres agregar mas claves y valores, teniendo en cuenta tener la misma clave en ambos modos.