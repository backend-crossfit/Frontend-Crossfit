<script setup>
import { ref } from 'vue';


</script>

<template>
    <div
        style="background-color: #8c8888; min-height: 93.5vh; box-sizing: border-box; padding-top: 3rem; width: 100%;">
        <div class="container">
            <div class="row">
                <!--Formulario de los datos del deportista-->
                <div class="col-12 col-md-4">
                    <div class=" mb-3" style="text-align: center;">
                        <h4 style="font-weight: bold; color: #fdfefe;">Datos del Deportista</h4>
                    </div>
                    <form id="formularioUserDato">
                        <div class="form-group mb-3">
                            <label for="NombreUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Nombres:</label>
                            <input type="text" class="form-control" id="NombreUser" disabled>
                        </div>
                        <div class="form-group mb-3">
                            <label for="ApellidosUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Apellidos:</label>
                            <input type="number" class="form-control" id="ApellidosUser" disabled>
                        </div>
                        <div class="form-group mb-3">
                            <label for="TipoDocumento" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Tipo de
                                Documento:</label>
                            <input class="form-control" list="ListaTipoDocumento" id="TipoDocumento" disabled>
                            <datalist id="ListaTipoDocumento">
                                <option value="Cédula de Ciudadanía"></option>
                                <option value="Cédula de Extranjería"></option>
                                <option value="Tarjeta de Identidad"></option>
                                <option value="Pasaporte"></option>
                            </datalist>
                        </div>
                        <div class="form-group mb-3">
                            <label for="NumeroDocumento" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Numero de
                                Documento:</label>
                            <input type="number" class="form-control" id="NumeroDocumento" disabled>
                        </div>
                        <div class="form-group mb-3">
                            <label for="EdadUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Edad:</label>
                            <input type="number" class="form-control" id="EdadUser" disabled>
                        </div>
                        <div class="form-group mb-3">
                            <label for="TipoSexo" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Tipo de Sexo:</label>
                            <input class="form-control" list="ListaTipoSexo" id="TipoSexo" disabled>
                            <datalist id="ListaTipoSexo">
                                <option value="Masculino"></option>
                                <option value="Femenino"></option>
                                <option value="No especifica"></option>
                            </datalist>
                        </div>
                        <div class="form-group mb-3">
                            <label for="Email" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold;">Correo
                                Electronico:</label>
                            <input type="email" class="form-control" id="Email" placeholder="email@gmail.com" disabled>
                        </div>
                        <button type="submit" class="btn"
                            style="background-color: #f8601d; color: #fdfefe; border-radius: 4px; font-weight: bold;">Actualizar</button>
                        <button type="submit" class="btn"
                            style="background-color: #f8601d; color: #fdfefe; border-radius: 4px; font-weight: bold;">Guardar</button>
                    </form>
                </div>
                <!--Formulario de los datos generales-->
                <div class="col-12 col-md-4">
                    <div class=" mb-4" style="text-align: center;">
                        <h4 style="font-weight: bold; color: #fdfefe;">Datos Parte del Cuerpo</h4>
                    </div>
                    <form id="formularioUserDato2">
                        <h5 class="mb-3" style="font-weight: bold; color: #000000;">Datos Antropometricos</h5>
                        <div class="form-group mb-3">
                            <label for="EstaturaUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Estatura (cm):</label>
                            <input type="number" class="form-control" id="EstaturaUser" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="PesoUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Peso (kg):</label>
                            <input type="number" class="form-control" id="PesoUser" required>
                        </div>
                        <h5 class="mt-1 mb-3" style="font-weight: bold; color: #000000;">Pliegues Cutaneos</h5>
                        <div class="form-group mb-3">
                            <label for="BicepsUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Biceps:</label>
                            <input type="number" class="form-control" id="BicepsUser" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="TricepsUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Triceps:</label>
                            <input type="number" class="form-control" id="TricepsUser" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="EscapulaUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Escapula:</label>
                            <input type="number" class="form-control" id="EscapulaUser" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="AbdomenUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Abdomen:</label>
                            <input type="number" class="form-control" id="AbdomenUser" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="suprailiacoUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Suprailiaco:</label>
                            <input type="number" class="form-control" id="suprailiacoUser" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="PectoralUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Pectoral:</label>
                            <input type="number" class="form-control" id="PectoralUser" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="PiernaUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Pierna:</label>
                            <input type="number" class="form-control" id="PiernaUser" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="PantorrillaUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Pantorrilla:</label>
                            <input type="number" class="form-control" id="PantorrillaUser" required>
                        </div>
                    </form>
                </div>
                <div class="col-12 col-md-4 mt-5">
                    <form id="formularioUserDato3">
                        <h5 class="mt-1 mb-3" style="font-weight: bold; color: #000000;">Perimetros Mosculares</h5>
                        <div class="form-group mb-3">
                            <label for="PectoralUser2" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Pectoral:</label>
                            <input type="number" class="form-control" id="PectoralUser2" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="HombroUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Hombro:</label>
                            <input type="number" class="form-control" id="HombroUser" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="CuelloUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Cuello:</label>
                            <input type="number" class="form-control" id="CuelloUser" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="BicepsRelajadoUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Biceps Relajado:</label>
                            <input type="number" class="form-control" id="BicepsRelajadoUser" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="BicepsContraidoUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Biceps
                                Contraido:</label>
                            <input type="number" class="form-control" id="BicepsContraidoUser" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="AbdomenUser2" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Abdomen:</label>
                            <input type="number" class="form-control" id="AbdomenUser2" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="CinturaUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Cintura:</label>
                            <input type="number" class="form-control" id="CinturaUser" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="CaderaUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Cadera:</label>
                            <input type="number" class="form-control" id="caderaUser" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="MusloMayorUser" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Muslo Mayor:</label>
                            <input type="number" class="form-control" id="MusloMayorUser" required>
                        </div>
                        <div class="form-group mb-3">
                            <label for="PantorrillaUser2" class="form-label d-flex justify-content-start"
                                style="color: #fdfefe; font-size: smaller; font-weight: bold; ">Pantorrilla:</label>
                            <input type="number" class="form-control" id="PantorrillaUser2" required>
                        </div>
                        <button type="submit" class="btn mb-3"
                            style="background-color: #f8601d; color: #fdfefe; border-radius: 4px; font-weight: bold;">Guardar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>