var app = angular.module('prueba',[]);

app.controller('DesafioCtrl', function($scope) {

  //inicializando variables

  $scope.numeroRepetido = true;
  $scope.aviso = "";
  $scope.numeros = [];
  $scope.posicionTemp = 0;
  $scope.posicion = 0;

  $scope.agregarNumero = function() {
    $scope.aviso = "";
    if (NoEsNumeroRepetido($scope.desafioNumero)) {
      $scope.numeros.push($scope.desafioNumero);
     
    } else {
      $scope.aviso = "aviso";
    }
  };

  $scope.ordenarTodos = function() {
    //llamando al loop que pasara por cada numero
    angular.forEach($scope.numeros, function(value, key) {
        console.log("posicion: " + key);
        //$scope.numeros[key].resaltar
        buscar(key);
    });
  };
  
  $scope.ordenarUnoPorUno = function() {
    //llamando al loop que pasara por cada numero
    var longitud = $scope.numeros.length;
    var posicion = $scope.posicion;
    if ($scope.posicionTemp > 0) {
    	posicion = $scope.posicionTemp;
    }
    console.log("posicion: " + posicion);
    if (posicion <= longitud) {
    	buscarPasoAPaso(posicion);
    }
  };

  //creando la funcion recursiva para comparar los numeros entre si
  function buscar(posicion) {
  	var numero1 = $scope.numeros[posicion];
    var numero2 = $scope.numeros[posicion - 1];
    if (numero2 == null) {
    	return;
    }
    if (numero1 < numero2) {
      console.log(numero1 + " es menor que " + numero2);
      console.log("entonces movemos el numero " + numero1 + " a la posicion del " + numero2);
      var temp = $scope.numeros[posicion - 1];
      $scope.numeros[posicion - 1] = $scope.numeros[posicion];
      $scope.numeros[posicion] = temp;
      return buscar(posicion - 1);
    } else {
      console.log(numero1 + " no es menor que " + numero2);
    }
  };

  //creando una copia de la funcion recursiva para comparar los numeros entre si pero paso a paso
  function buscarPasoAPaso(posicion) {
  	var numero1 = $scope.numeros[posicion];
    var numero2 = $scope.numeros[posicion - 1];
    if (numero2 == null) {
      $scope.posicion++;
      $scope.posicionTemp = 0;
      return false;
    }
    if (numero1 < numero2) {
      console.log(numero1 + " es menor que " + numero2);
      console.log("entonces movemos el numero " + numero1 + " a la posicion del " + numero2);
      var temp = $scope.numeros[posicion - 1];
      $scope.numeros[posicion - 1] = $scope.numeros[posicion];
      $scope.numeros[posicion] = temp;
      $scope.posicionTemp = posicion - 1;
      return true;
    } else {
      console.log(numero1 + " no es menor que " + numero2);
      $scope.posicion++;
      $scope.posicionTemp = 0;
      return false;
    }
  };

  $scope.resaltarPosicion = function(index) {
    if ( (index == $scope.posicionTemp) && ( $scope.posicionTemp > 0 ) ) {
      return "actual";
    } else if ( index < $scope.posicion ) {
      return "pasado";
    } else if ( (index == $scope.posicion) && ( $scope.posicionTemp == 0 ) ) {
      return "actual";
    } 
  };
  
  $scope.reset = function() {
    $scope.numeros = [];

    $scope.numeroRepetido = false;
    $scope.aviso = "";
    $scope.posicion = 0;
    $scope.posicionTemp = 0;
  };
  
  $scope.demo = function() {
    $scope.reset();
    $scope.numeros = [];
  };

  function NoEsNumeroRepetido(value) {
    return $scope.numeros.indexOf(value) == -1;
  }

});

