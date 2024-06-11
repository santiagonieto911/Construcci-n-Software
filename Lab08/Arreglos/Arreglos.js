function calcularPromedio(numeros) {
    if (numeros.length === 0) {
        return 0;
    }
    const suma = numeros.reduce((total, num) => total + num, 0);
    const promedio = suma / numeros.length;
    return promedio;
}

const arreglo1 = [1, 2, 3, 4, 5];


console.log(calcularPromedio(arreglo1));

