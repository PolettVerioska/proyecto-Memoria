<template>
  <div class="consulta-container">
    <form @submit.prevent="handleSubmit" class="consulta-form">
      <h2 class="form-title">Historial Clínico</h2>

      <!-- 1. Datos del paciente -->
      <section class="form-section">
        <h3 class="section-title">Datos del paciente</h3>
        <div class="form-grid">

          <!-- Nombre -->
          <div>
            <label class="form-label">Nombre completo</label>
            <input
              v-model="form.nombre"
              required
              class="form-input"
            />
          </div>
          
          <!-- RUT -->
          <div>
            <label class="form-label">RUT</label>
            <input
              v-model="form.rut"
              required
              class="form-input"
            />
          </div>
          
          <!-- Correo -->
          <div>
            <label class="form-label">Correo electrónico</label>
            <input
              v-model="form.email"
              type="email"
              class="form-input"
            />
          </div>
          
          <!-- Teléfono -->
          <div>
            <label class="form-label">Teléfono</label>
            <input
              v-model="form.telefono"
              class="form-input"
            />
          </div>
          
          <!-- Sexo -->
          <div>
            <label class="form-label">Sexo</label>
            <select v-model="form.sexo" required class="form-input">
              <option disabled value="">Seleccione...</option>
              <option>F</option>
              <option>M</option>
            </select>
          </div>
          
          <!-- Fecha de nacimiento -->
          <div>
            <label class="form-label">Fecha de nacimiento</label>
            <input
              v-model="form.fechaNacimiento"
              type="date"
              class="form-input"
            />
          </div>  
        </div>
      </section>

      <!-- Anamnesis Social -->
      <section class="form-section">
        <h3 class="section-title">Anamnesis Social</h3>
        <div class="form-grid">
          
         <div>
            <label class="form-label">¿Asiste con alguien a las consultas?</label>
            <input
              v-model="form.asisteCon"
              class="form-input"
            />
          </div>

          <div>
            <label class="form-label">¿Cuántos hijos tiene?</label>
            <input 
              v-model="form.hijos" 
              class="form-input" 
            />
          </div>

          <div>
            <label class="form-label">Vive con</label>
            <input
              v-model="form.viveCon"
              class="form-input"
            />
          </div>

          <div>
            <label class="form-label">Ocupación</label>
            <input
              v-model="form.ocupacion"
              class="form-input"
            />
          </div>

          <div>
            <label class="form-label">Escolaridad</label>
            <input
              v-model="form.escolaridad"
              class="form-input"
            />
          </div>

          <div>
            <label class="form-label">Redes de apoyo</label>
            <input
              v-model="form.redesDeApoyo"
              class="form-input"
            />
          </div>

          <div>
            <label class="form-label">Servicios básicos</label>
            <input
              v-model="form.serviciosBasicos"
              class="form-input"
            />
          </div>
        </div>
      </section>

     <!--   Anamnesis Alimentaria 
      <section class="form-section">
        <h3 class="section-title">Anamnesis Alimentaria</h3>
        <div class="form-grid">
          <input
            v-model="form.alergiaIntolerancia"
            placeholder="Alergias e intolerancias"
            class="form-input"
          />
          <input
            v-model="form.alimentoNoGusta"
            placeholder="Alimentos que no le gustan"
            class="form-input"
          />
          <input
            v-model="form.alimentoPreferencia"
            placeholder="Alimentos preferidos"
            class="form-input"
          />
          <input
            v-model="form.cocinaEnCasa"
            placeholder="¿Cocina en casa?"
            class="form-input"
          />
          <input
            v-model="form.habitualmenteComeEn"
            placeholder="Habitualmente come en..."
            class="form-input"
          />
        </div>
      </section> -->

      <!-- Anamnesis Clínica -->
      <section class="form-section">
        <h3 class="section-title">Anamnesis Clínica</h3>
        <div class="form-grid">

          <div>
            <label class="form-label">Antecedentes familiares</label>
            <input
              v-model="form.antecedenteFamiliar"
              class="form-input"
            />
          </div>

          <div>
            <label class="form-label">Patologías base</label>
            <input
              v-model="form.patologiaBase"
              class="form-input"
            />
          </div>

          <div>
            <label class="form-label">Medicamentos que utiliza</label>
            <input
              v-model="form.medicamento"
              class="form-input"
            />
          </div>

          <div>
              <label class="form-label">Utiliza insulina</label>
            <select v-model="form.utilizaInsulina" required class="form-input">
              <option disabled value="">Seleccione...</option>
              <option>Si</option>
              <option>No</option>
            </select>
          </div>

          <div>
            <label class="form-label">Antecedentes quirúrgicos</label>
            <input
              v-model="form.antecedenteQuirurgico"
              class="form-input"
            />
          </div>

          <div>
            <label class="form-label">Alergia a medicamentos</label>
            <input
              v-model="form.alergia"
              class="form-input"
            />
          </div>

          <div>
            <label class="form-label">Embarazo</label>
            <input
              v-model="form.embarazo"
              class="form-input"
            />
          </div>
          <div>
            <label class="form-label">Semanas de gestación</label>
            <input
              v-model="form.semanaGestacion"
              class="form-input"
            />
          </div>
          <div>
            <label class="form-label">Complicaciones gestacionales</label>
            <input
              v-model="form.complicacionGestacion"
              class="form-input"
            />
          </div>
          <div>
            <label class="form-label">Resultados de Examenes</label>
            <input
              v-model="form.resultadosExamenes"
              class="form-input"
              placeholder="Escriba aquí los resultados de laboratorio"          
            />
          </div>
        </div>
      </section>

      <!-- Signos y síntomas -->
      <section class="form-section">
        <h3 class="section-title">Signos y Síntomas</h3>
        <div class="form-grid">

          <div>
            <label class="form-label">Presión Arterial</label>
            <input
              v-model="form.presionArterial"
              class="form-input"
            />
          </div>

          <div>
            <label class="form-label">Glicemia</label>
            <input
              v-model="form.glicemia"
              class="form-input"
            />
          </div>

          <div>
            <label class="form-label">Diuresis</label>
            <input
              v-model="form.diuresis"
              class="form-input"
            />
          </div>

          <div>
            <label class="form-label">Apetito</label>
            <input
              v-model="form.apetito"
              class="form-input"
            />
          </div>

          <div>
            <label class="form-label">Calambres</label>
            <input
              v-model="form.calambre"
              class="form-input"
            />
          </div>
          
          <div>
            <label class="form-label">Polidipsia</label>
            <input
              v-model="form.polidipsia"
              class="form-input"
            />
          </div>

          <div>
            <label class="form-label">Poliuria</label>
            <input
              v-model="form.poliuria"
              class="form-input"
            />
          </div>

          <div>
            <label class="form-label">Polifagia</label>
            <input
              v-model="form.polifagia"
              class="form-input"
            />
          </div>

          <div>
            <label class="form-label">Deposición (Bristol)</label>
            <input
              v-model="form.deposicionBristol"
              class="form-input"
            />
          </div>

          <div>
            <label class="form-label">Tinnitus</label>
            <input
              v-model="form.tinnitus"
              class="form-input"
            />
          </div>
          
          <div>
            <label class="form-label">Sudoración nocturna</label>
            <input
              v-model="form.sudoracionNocturna"
              class="form-input"
            />
          </div>
          
          <div>
            <label class="form-label">Otro síntoma</label>
            <input
              v-model="form.otroSigno"
              class="form-input"
            />
          </div>
        </div>
      </section>

      <!-- Hábitos -->
      <section class="form-section">
        <h3 class="section-title">Hábitos</h3>
        <div class="form-grid">
          
          <div>
            <label class="form-label">Alcohol</label>
            <input
              v-model="form.alcohol"
              class="form-input"
            />
          </div>

          <div>
            <label class="form-label">Drogas</label>
            <input 
              v-model="form.droga" 
              class="form-input" />
          </div>

          <div>
            <label class="form-label">Actividad física</label>
            <input
              v-model="form.actividadFisica"
              class="form-input"
            />
          </div>
        </div>
      </section>

      <!-- Anamnesis Alimentaria -->
      <section class="form-section">
        <h3 class="section-title">Anamnesis Alimentaria</h3>
        <div class="form-grid">
          
          <div>
            <label class="form-label">Alergias e intolerancias</label>
            <input
              v-model="form.alergiaIntolerancia"
              class="form-input"
            />
          </div>

          <div>
            <label class="form-label">Alimentos que no le gustan</label>
            <input
              v-model="form.alimentoNoGusta"
              class="form-input"
            />
          </div>

          <div>
            <label class="form-label">Alimentos preferidos</label>
            <input
              v-model="form.alimentoPreferencia"
              class="form-input"
            />
          </div>

          <div> 
            <label class="form-label">¿Cocina en casa?</label>
            <input
              v-model="form.cocinaEnCasa"
              class="form-input"
            />
          </div>

          <div>
            <label class="form-label">¿Come habitualmente en?</label>
            <input
              v-model="form.habitualmenteComeEn"
              class="form-input"
            />
          </div>
        </div>
      </section>

      <!-- TENDENCIA CONSUMO -->
      <section class="form-section">
        <h3 class="section-title">Encuesta de Tendencia de Consumo</h3>

        <div
          v-for="(item, index) in form.encuestaConsumo"
          :key="index"
          class="form-grid align-center"
        >
          <div class="form-group">
            <label>Alimento</label>
            <select v-model="item.fkAlimento_id" class="form-input" required>
              <option disabled value="">Seleccione un alimento</option>
              <option
                v-for="alimento in alimentosDisponibles"
                :key="alimento.id"
                :value="alimento.id"
              >
                {{ alimento.alimento }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>Días por semana</label>
            <select
              v-model="item.cuantosDiasSemana"
              class="form-input"
              required
            >
              <option disabled value="">Seleccione días</option>
              <option v-for="n in 7" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>

          <div class="form-group full-width">
            <button
              type="button"
              @click="quitarAlimento(index)"
              class="submit-button"
              style="background: #e53e3e"
            >
              Quitar alimento
            </button>
          </div>
          <div>
            <label class="form-label">Ingreso manual de alimentos</label>
            <input
              v-model="form.alimentosManuales"
              class="form-input"
              placeholder="Escriba aquí los alimentos si prefiere no seleccionarlos de la lista..."
            />
          </div>
        </div>

        <button
          type="button"
          @click="agregarAlimento"
          class="submit-button"
          style="margin-top: 1rem"
        >
          + Agregar alimento
        </button>
      </section>

      <button type="submit" class="submit-button">Guardar Consulta</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "FichaClinica",
  mounted() {
    this.cargarAlimentos();

    if (this.$route.name === "EditarFicha") {
      const rut = this.$route.params.id;
      this.editando = true;
      this.cargarFichaPorRut(rut);
    }
  },
  data() {
    return {
      editando: false,
      fichaId: null,
      usuarioId: null,
      anamnesisSocialId: null,
      anamnesisAlimentariaId: null,
      anamnesisClinicaId: null,
      signoSintomaId: null,
      habitoId: null,
      encuestaId: null,
      alimentosDisponibles: [],
      form: {
        rut: "",
        nombre: "",
        email: "",
        telefono: "",
        sexo: "",
        fechaNacimiento: "",

        asisteCon: "",
        hijos: "",
        viveCon: "",
        ocupacion: "",
        escolaridad: "",
        redesDeApoyo: "",
        serviciosBasicos: "",

        antecedenteFamiliar: "",
        patologiaBase: "",
        medicamento: "",
        utilizaInsulina: "",
        antecedenteQuirurgico: "",
        alergia: "",
        embarazo: "",
        semanaGestacion: "",
        complicacionGestacion: "",
        resultadosExamenes: "",

        presionArterial: "",
        glicemia: "",
        diuresis: "",
        apetito: "",
        calambre: "",
        polidipsia: "",
        poliuria: "",
        polifagia: "", 
        deposicionBristol: "",
        tinnitus: "",
        sudoracionNocturna: "",
        otroSigno: "",
        
        alcohol: "",
        droga: "",
        actividadFisica: "",
        
        alergiaIntolerancia: "",
        alimentoNoGusta: "",
        alimentoPreferencia: "",
        cocinaEnCasa: "",
        habitualmenteComeEn: "",

        encuestaConsumo: [],
        alimentosManuales: "",
      },
    };
  },
  methods: {
    async cargarAlimentos() {
      try {
        const res = await axios.get(`${process.env.VUE_APP_API_URL}/alimento`);
        const apiData = res.data && res.data.data ? res.data.data : res.data;
        const alimentos = Array.isArray(apiData) && apiData.length
          ? this.normalizeAlimentos(apiData)
          : this.getAlimentosDefault();
        this.alimentosDisponibles = alimentos.length
          ? alimentos
          : this.getAlimentosDefault();
      } 
      catch (error) {
        console.error("Error cargando alimentos:", error);
        this.alimentosDisponibles = this.getAlimentosDefault();
      }
    },

    normalizeAlimentos(items) {
      const normalized = items
        .map((item) => ({
          id: item.id ?? item.ID,
          alimento:
            item.alimento ||
            item.ALIMENTO ||
            item.nombre ||
            item.nombreAlimento ||
            item.name ||
            "",
        }))
        .filter((item) => item.alimento && item.id != null);
      return normalized;
    },

    unwrapResponseData(response) {
      return response?.data && response.data.data ? response.data.data : response?.data;
    },

    getAlimentosDefault() {
      return [
        { id: 1, alimento: "Manzana" },
        { id: 2, alimento: "Plátano" },
        { id: 3, alimento: "Arroz integral" },
        { id: 4, alimento: "Pollo" },
        { id: 5, alimento: "Lechuga" },
      ];
    },

    async cargarFichaPorRut(rut) {
      try {
        const res = await axios.get(`${process.env.VUE_APP_API_URL}/ficha/${rut}`);
        const ficha = res.data;

        this.fichaId = ficha.id;
        this.usuarioId = ficha.fkUsuario.id;
        this.anamnesisSocialId = ficha.fkAnamnesisSocial.id;
        this.anamnesisAlimentariaId = ficha.fkAnamnesisAlimentaria.id;
        this.anamnesisClinicaId = ficha.fkAnamnesisClinica.id;
        this.encuestaId = ficha.fkEncuestaTendenciaConsumo.id;

        this.form.rut = ficha.fkUsuario.rut;
        this.form.nombre = ficha.fkUsuario.nombre;
        this.form.email = ficha.fkUsuario.correo;
        this.form.telefono = ficha.fkUsuario.telefono;
        this.form.sexo = ficha.fkUsuario.sexo;
        this.form.fechaNacimiento = ficha.fkUsuario.fechaNacimiento;

        const signos = ficha.fkAnamnesisClinica.signosSintomas[0] || {};
        const habitos = ficha.fkAnamnesisClinica.habitos[0] || {};

        this.signoSintomaId = signos.id;
        this.habitoId = habitos.id;

        Object.assign(this.form, {
          asisteCon: ficha.fkAnamnesisSocial.asisteCon || "",
          hijos: ficha.fkAnamnesisSocial.hijos || "",
          viveCon: ficha.fkAnamnesisSocial.viveCon || "",
          ocupacion: ficha.fkAnamnesisSocial.ocupacion || "",
          escolaridad: ficha.fkAnamnesisSocial.escolaridad || "",
          redesDeApoyo: ficha.fkAnamnesisSocial.redesDeApoyo || "",
          serviciosBasicos: ficha.fkAnamnesisSocial.serviciosBasicos || "",

          antecedenteFamiliar: ficha.fkAnamnesisClinica.antecedenteFamiliar || "",
          patologiaBase: ficha.fkAnamnesisClinica.patologiaBase || "",
          medicamento: ficha.fkAnamnesisClinica.medicamento || "",
          utilizaInsulina: ficha.fkAnamnesisClinica.utilizaInsulina || "",  
          antecedenteQuirurgico: ficha.fkAnamnesisClinica.antecedenteQuirurgico || "",
          alergia: ficha.fkAnamnesisClinica.alergia || "",
          embarazo: ficha.fkAnamnesisClinica.embarazo || "",
          semanaGestacion: ficha.fkAnamnesisClinica.semanaGestacion || "",
          complicacionGestacion: ficha.fkAnamnesisClinica.complicacionGestacion || "",
          resultadosExamenes: ficha.fkAnamnesisClinica.resultadosExamenes || "",

          presionArterial: signos.presionArterial || "",
          glicemia: signos.glicemia || "",
          diuresis: signos.diuresis || "",
          apetito: signos.apetito || "",
          calambre: signos.calambre || "",
          polidipsia: signos.polidipsia || "",
          poliuria: signos.poliuria || "",
          polifagia: signos.polifagia || "",
          deposicionBristol: signos.deposicionBristol || "",
          tinnitus: signos.tinitus || "",
          sudoracionNocturna: signos.sudoracionNocturna || "",
          otroSigno: signos.otro || "",
          
          alcohol: habitos.alcohol || "",
          droga: habitos.droga || "",
          actividadFisica: habitos.actividadFisica || "",
          
          alergiaIntolerancia: ficha.fkAnamnesisAlimentaria.alergiaIntolerancia || "",
          alimentoNoGusta: ficha.fkAnamnesisAlimentaria.alimentoNoGusta || "",
          alimentoPreferencia: ficha.fkAnamnesisAlimentaria.alimentoPreferencia || "",
          cocinaEnCasa: ficha.fkAnamnesisAlimentaria.cocinaEnCasa || "",
          habitualmenteComeEn: ficha.fkAnamnesisAlimentaria.habitualmenteComeEn || "",

          alimentosManuales: ficha.fkEncuestaTendenciaConsumo.alimentosManuales || "",

        });

        this.form.encuestaConsumo = ficha.fkEncuestaTendenciaConsumo.rEncuestaTendenciaConsumoAlimento.map(item => ({
          fkAlimento_id: item.fkAlimento.id,
          cuantosDiasSemana: item.cuantosDiasSemana,
        }));
      } 
      catch (error) {
        console.error("Error al cargar ficha para edición:", error);
      }
    },

    agregarAlimento() {
      this.form.encuestaConsumo.push({
        fkAlimento_id: "",
        cuantosDiasSemana: 1,
      });
    },

    quitarAlimento(index) {
      this.form.encuestaConsumo.splice(index, 1);
    },

    async handleSubmit() {
      try {
        const fechaFormateada = new Date(this.form.fechaNacimiento).toISOString();
        const usuarioPayload = {
          rut: this.form.rut,
          nombre: this.form.nombre,
          correo: this.form.email,
          telefono: this.form.telefono,
          sexo: this.form.sexo,
          fechaNacimiento: fechaFormateada,
        };

        if (this.editando) {
          await axios.patch(`${process.env.VUE_APP_API_URL}/usuario/${this.usuarioId}`, usuarioPayload);
          await axios.patch(`${process.env.VUE_APP_API_URL}/anamnesis-social/${this.anamnesisSocialId}`, {
            asisteCon: this.form.asisteCon,
            hijos: this.form.hijos,
            viveCon: this.form.viveCon,
            ocupacion: this.form.ocupacion,
            escolaridad: this.form.escolaridad,
            redesDeApoyo: this.form.redesDeApoyo,
            serviciosBasicos: this.form.serviciosBasicos
          });                    
          await axios.patch(`${process.env.VUE_APP_API_URL}/anamnesis-clinica/${this.anamnesisClinicaId}`, {
            antecedenteFamiliar: this.form.antecedenteFamiliar,
            patologiaBase: this.form.patologiaBase,
            medicamento: this.form.medicamento,
            utilizaInsulina: this.form.utilizaInsulina,
            antecedenteQuirurgico: this.form.antecedenteQuirurgico,
            alergia: this.form.alergia,
            embarazo: this.form.embarazo,
            semanaGestacion: this.form.semanaGestacion,
            complicacionGestacion: this.form.complicacionGestacion,
            resultadosExamenes: this.form.resultadosExamenes
          });
          await axios.patch(`${process.env.VUE_APP_API_URL}/signo-sintoma/${this.signoSintomaId}`, {
          presionArterial: this.form.presionArterial,
          glicemia: this.form.glicemia,
          diuresis: this.form.diuresis,
          apetito: this.form.apetito,
          calambre: this.form.calambre,
          polidipsia: this.form.polidipsia,
          poliuria: this.form.poliuria,
          polifagia: this.form.polifagia,
          deposicionBristol: this.form.deposicionBristol,
          tinitus: this.form.tinitus,
          sudoracionNocturna: this.form.sudoracionNocturna,          
          otro: this.form.otro
          });
          await axios.patch(`${process.env.VUE_APP_API_URL}/habito/${this.habitoId}`, {
          alcohol: this.form.alcohol,
          droga: this.form.droga,
          actividadFisica: this.form.actividadFisica
          });
          await axios.patch(`${process.env.VUE_APP_API_URL}/anamnesis-alimentaria/${this.anamnesisAlimentariaId}`, {
            alimentoNoGusta: this.form.alimentoNoGusta,
            alimentoPreferencia: this.form.alimentoPreferencia,
            cocinaEnCasa: this.form.cocinaEnCasa,
            habitualmenteComeEn: this.form.habitualmenteComeEn,
            alergiaIntolerancia: this.form.alergiaIntolerancia
          });
          await axios.patch(`${process.env.VUE_APP_API_URL}/encuesta-tendencia-consumo/${this.encuestaId}`, {
            alimentosManuales: this.form.alimentosManuales
          });

          Swal.fire({ icon: 'success', title: 'Ficha actualizada correctamente', confirmButtonColor: '#b35fc3' });
        } else {
          // const resUsuario = await axios.post(`${process.env.VUE_APP_API_URL}/usuario`, {
          //   ...usuarioPayload,
          //   rRolUsuario: { fkRol_id: 2 },
          // });
          // const usuarioId = resUsuario.data.id;
          const usuarioId = await this.obtenerOCrearUsuario(usuarioPayload, 2);

          const resAnamnesisSocial = await axios.post(`${process.env.VUE_APP_API_URL}/anamnesis-social`, {
            asisteCon: this.form.asisteCon,
            hijos: this.form.hijos,
            viveCon: this.form.viveCon,
            ocupacion: this.form.ocupacion,
            escolaridad: this.form.escolaridad,
            redesDeApoyo: this.form.redesDeApoyo,
            serviciosBasicos: this.form.serviciosBasicos,
          });        

          const resAnamnesisClinica = await axios.post(`${process.env.VUE_APP_API_URL}/anamnesis-clinica`, {
            antecedenteFamiliar: this.form.antecedenteFamiliar,
            patologiaBase: this.form.patologiaBase,
            medicamento: this.form.medicamento,
            utilizaInsulina: this.form.utilizaInsulina,
            antecedenteQuirurgico: this.form.antecedenteQuirurgico,
            alergia: this.form.alergia,
            embarazo: this.form.embarazo,
            semanaGestacion: this.form.semanaGestacion,
            complicacionGestacion: this.form.complicacionGestacion,
            resultadosExamenes: this.form.resultadosExamenes,
            signoSintoma: {      
              presionArterial: this.form.presionArterial,
              glicemia: this.form.glicemia,
              diuresis: this.form.diuresis,
              apetito: this.form.apetito,
              calambre: this.form.calambre,
              polidipsia: this.form.polidipsia,
              poliuria: this.form.poliuria,
              polifagia: this.form.polifagia,
              deposicionBristol: this.form.deposicionBristol,
              tinitus: this.form.tinnitus,
              sudoracionNocturna: this.form.sudoracionNocturna,            
              otro: this.form.otroSigno,
            },
            habito:{          
              alcohol: this.form.alcohol,
              droga: this.form.droga,
              actividadFisica: this.form.actividadFisica,
            },
          });  

          const resAnamnesisAlimentaria = await axios.post(`${process.env.VUE_APP_API_URL}/anamnesis-alimentaria`, {
            alergiaIntolerancia: this.form.alergiaIntolerancia,
            alimentoNoGusta: this.form.alimentoNoGusta,
            alimentoPreferencia: this.form.alimentoPreferencia,
            cocinaEnCasa: this.form.cocinaEnCasa,
            habitualmenteComeEn: this.form.habitualmenteComeEn,
          });

          const encuestaPayload = {
            alimentosManuales: this.form.alimentosManuales,
            rEncuestaTendenciaConsumoAlimentos: this.form.encuestaConsumo.map((item) => ({
              fkAlimento_id: item.fkAlimento_id,
              cuantosDiasSemana: item.cuantosDiasSemana.toString(),
            })),
          };

          const resEncuesta = await axios.post(`${process.env.VUE_APP_API_URL}/encuesta-tendencia-consumo`, encuestaPayload);

          await axios.post(`${process.env.VUE_APP_API_URL}/ficha`, {
            fkUsuario_id: usuarioId,
            fkAnamnesisSocial_id: resAnamnesisSocial.data.id,
            fkAnamnesisClinica_id: resAnamnesisClinica.data.id,
            fkAnamnesisAlimentaria_id: resAnamnesisAlimentaria.data.id,
            fkEncuestaTendenciaConsumo_id: resEncuesta.data.id,
          });

          Swal.fire({ icon: 'success', title: 'Ficha creada correctamente', confirmButtonColor: '#b35fc3' });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({ icon: 'error', title: 'Error al guardar la ficha', confirmButtonColor: '#b35fc3' });
      }
    },

    limpiarRut(rut) {
      return String(rut).replace(/\D/g, "");
    },
      async obtenerOCrearUsuario(usuarioPayload, fkRolId = 2) {
      const rutLimpio = Number(this.limpiarRut(usuarioPayload.rut));

      try {
        const resUsuario = await axios.get(
          `${process.env.VUE_APP_API_URL}/usuario/rut/${rutLimpio}`
        );

        console.log("=== USUARIO ENCONTRADO POR RUT ===");
        console.log(resUsuario.data);

        const usuarioId = resUsuario.data.id;

        const resRoles = await axios.get(
          `${process.env.VUE_APP_API_URL}/r-rol-usuario/usuario/${usuarioId}/roles`
        );

        console.log("=== ROLES ENCONTRADOS DEL USUARIO ===");
        console.log(resRoles.data);

        const roles = resRoles.data.roles || [];
        const yaTieneRol = roles.some((rol) => Number(rol.id) === Number(fkRolId));

        console.log("=== VALIDACION DE ROL ===");
        console.log({
          usuarioId,
          rut: rutLimpio,
          rolBuscado: fkRolId,
          rolesEncontrados: roles,
          yaTieneRol,
        });

        if (!yaTieneRol) {
          const resNuevoRol = await axios.post(
            `${process.env.VUE_APP_API_URL}/r-rol-usuario`,
            {
              fkUsuario_id: usuarioId,
              fkRol_id: fkRolId,
            }
          );

          console.log("=== ROL AGREGADO ===");
          console.log(resNuevoRol.data);
        } else {
          console.log("=== NO SE AGREGA ROL ===");
          console.log(`El usuario ${usuarioId} ya tiene el rol ${fkRolId}`);
        }

        return usuarioId;
      } catch (error) {
        if (error?.response?.status === 404) {
          console.log("=== USUARIO NO EXISTE, SE CREA ===");

          const resUsuarioNuevo = await axios.post(
            `${process.env.VUE_APP_API_URL}/usuario`,
            {
              ...usuarioPayload,
              rut: rutLimpio,
              rRolUsuario: { fkRol_id: fkRolId },
            }
          );

          console.log("=== USUARIO NUEVO CREADO ===");
          console.log(resUsuarioNuevo.data);

          return resUsuarioNuevo.data.id;
        }

        throw error;
      }
    }
  },
};
</script>





<style scoped>
.consulta-container {
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: center;
}

.consulta-form {
  width: 100%;
  max-width: 1000px;
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.form-title {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
}

.form-section {
  margin-bottom: 2rem;
}

.section-title {
  color: #4a5568;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.form-group {
  margin-bottom: 0.5rem;
}

.full-width {
  grid-column: span 2;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
}

.form-input:focus {
  outline: none;
  border-color: #b35fc3;
  box-shadow: 0 0 0 3px rgba(179, 95, 195, 0.2);
}

.form-input.disabled {
  background-color: #f7fafc;
  color: #4a5568;
}

.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
}

.form-textarea:focus {
  outline: none;
  border-color: #b35fc3;
  box-shadow: 0 0 0 3px rgba(179, 95, 195, 0.2);
}

.submit-button {
  width: 100%;
  padding: 1rem;
  background-color: #b35fc3;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1.5rem;
}

.submit-button:hover {
  background-color: #9e4fb0;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Responsive */
@media (max-width: 768px) {
  .consulta-container {
    padding: 1rem;
  }

  .consulta-form {
    padding: 1.5rem;
    box-shadow: none;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .full-width {
    grid-column: span 1;
  }

  .form-title {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  .section-title {
    font-size: 1.1rem;
  }

  .submit-button {
    padding: 0.8rem;
  }
}
</style>
