
export function buscadorDeTexto(array, texto) {
    if (!texto) {
      return array;
    } else {
      let textoMiniscula = texto.toLowerCase();
      return array.filter(
        (nota) =>
          nota.name.toLowerCase().includes(textoMiniscula) ||
          nota.description.toLowerCase().includes(textoMiniscula)
      );
    }
}
export function filtrarPorCategoria(array,categorias){
if (categorias.length === 0 ){
return array
}else{
return array.filter(array => categorias.includes(array.category))
}
}
export function imprimirCategorias(parametro,lugar){
    let template=""
    for (let categoria of parametro) {
        template+= `<input type="checkbox" id="" name="${categoria}" value="${categoria}">
        <label for="${categoria}">${categoria}</label>  `
    }
    lugar.innerHTML=template


        return `
        <div class="card d-flex justify-content-center align-items-end m-2" style="width: 18rem;height:25rem">
        <img src="${evento.image}" class="card-img-top p-1" alt="Coming soon" style="width:18rem; height: 10rem;">
        <div class="card-body d-flex flex-column justify-content-center ">
        <h5 class="card-title">${evento.name}</h5>
        <p class="card-text fs-5">${evento.description}</p>
        <div class=" d-flex flex-row justify-content-between">
        <p> Price: ${evento.price} </p>

        <a href="${url}?id=${evento._id}" class="btn vermas btn-dark">See more..</a>

        </div>
        </div>
        </div>`
}

export function imprimirEventos(parametro,lugar,url) {
            if (parametro.length === 0) {
            lugar.innerHTML = "NO HAY EVENTOS";
            } else {
              const eve = parametro.map((evento) => crearEvento(evento,url)).join("")
              console.log(eve)
              lugar.innerHTML = eve;
            }
}

function crearEvento(evento){
  let urlLocation= location.search
  evento._id
  return `
  <div class="card d-flex justify-content-center align-items-end m-2" style="width: 18rem;height:25rem">
  <img src="${evento.image}" class="card-img-top p-1" alt="Coming soon" style="width:18rem; height: 10rem;">
  <div class="card-body d-flex flex-column justify-content-center ">
  <h5 class="card-title">${evento.name}</h5>
  <p class="card-text fs-5">${evento.description}</p>
  <div class=" d-flex flex-row justify-content-between">
  <p> Price: ${evento.price} </p>
  <a href=${urlLocation == "https://amazing-events-6v05toab7-joeldamato.vercel.app/" ? `../pages/details.html?id=${evento._id}` :`./details.html?id=${evento._id}`} class="btn vermas btn-dark">See more..</a>
  </div>
  </div>
  </div>`
  }
//* Details

export function imprimirDetail(evento){
  return `<div class="d-flex justify-content-center mt-5 mb-5 card" style="width: 80%; min-height: 66vh;">
  <div class="d-flex justify-content-center row g-0">
    <div class="col-md-4">
      <img src="${evento?.image}" class="paginaDeDetails" alt="..." style="width:100%; height: 100%;">
    </div>
    <div class="col-md-6">
      <div class="ms-3 card-body ">
        <h2 class="card-title">${evento?.name}</h2>
        <p class="card-text">
          <ul>
          <li>Date: ${evento?.date} </li>
          <li>Category: ${evento?.category}</li>
          <li>Place: ${evento?.place}</li>
          <li>Capacity: ${evento?.capacity}</li>
          ${evento?.assistance ? `<li>Assistance: ${evento?.assistance}</li>` : `<li>Estimate: ${evento?.estimate}</li>`}
          <li>Price: ${evento?.price}</li>
          <li>Description:${evento?.description}</li>
        </ul>
      </div>
    </div>
  </div>
  </div>
  `
  }


//* Stats

export function tabla(array,lugar){
 
  const template =array.reduce((acc,act) => {
    return (acc+ `
    <td>${act.categoria}</td>
    <td>${act.revenues} </td>
    <td>${act.porcentaje.toFixed(2)} %</td>
  </tr>
  `
  );},'');
  lugar.innerHTML= template;
  }

export function imprimirTabla(array) {
    return `
                  
                  <table>
                  <thead>
                  <tr>
                      <th class="fs-1 bg-light" colspan="3">Events Statistics</th>
                  </tr>
                  <tr>
                      <th>Events with the highest percentage of attendance</th>
                      <th>Events with the lowest percentage of attendance</th>
                      <th>Events with larger capacity</th>
                  </tr>
                  <tr>
                      <td id="evenmax"></td>
                      <td id="evenmin"></td>
                      <td id="evencap"></td>
                  </tr>
                  </thead>
                  <tr>
                      <th class="fs-1 bg-light" colspan="3">Upcomming events statistics by category</th>
                  </tr>
                  <tr>
                      <td><b>Categories</b></td>
                      <td><b>Revenues</b></td>
                      <td><b>Percentage off attendance</b></td>
                  </tr>
                  <tbody id="up">
                  <tr>
                  
                  <tr>
                  </tbody>
                  <tr>
                      <th class="fs-1 bg-light" colspan="3">Past Events statistic by category</th>
                  </tr>
                  <tr>
                      <td><b>Categories</b></td>
                      <td><b>Revenues</b></td>
                      <td><b>Percentage off attendance</b></td>
                  </tr>
                  <tbody id="past">
                 
                  </tbody>
              </table>
                  
                  `;
  }

export function eventMaxAssistance(array) {
  let mayorAsistencia = { nombre: "", asistencia: 0 };

  array.forEach((a) => {
    const asistencia = (a.assistance * 100) / a.capacity;
    if (asistencia > mayorAsistencia.asistencia) {
      mayorAsistencia.nombre = a.name;
      mayorAsistencia.asistencia = asistencia;
    }
  });

  return `-${mayorAsistencia.nombre} : ${mayorAsistencia.asistencia.toFixed(
    1
  )} %`;
}

export function eventMinAssistance(array) {
  let menorAsistencia = { nombre: "", asistencia: 100 };

  array.forEach((a) => {
    const asistencia = (a.assistance * 100) / a.capacity;
    if (asistencia < menorAsistencia.asistencia) {
      menorAsistencia.nombre = a.name;
      menorAsistencia.asistencia = asistencia;
    }
  });

  return `-${menorAsistencia.nombre} : ${menorAsistencia.asistencia.toFixed(
    1
)} %`;
}

export function eventMaxCapacity(array) {
  let mayorCapacidad = { nombre: "", capacidad: 0 };

  array.forEach((a) => {
    const capacidad = a.capacity;
    if (capacidad > mayorCapacidad.capacidad) {
      mayorCapacidad.nombre = a.name;
      mayorCapacidad.capacidad = capacidad;
    }
  });

  return `${mayorCapacidad.nombre} : ${mayorCapacidad.capacidad.toFixed(0
  )} (capacity) `;
}

export function estadisticas(parametro,parametro2){
  let arraystic= [...new Set(parametro.map((evento) => evento.category))].map((categoria) =>{ 
    let aux = parametro2.filter((elemento) => elemento.categoria == categoria)
    let acumulado= {categoria:categoria,revenues:0,porcentaje:0,cantidad:0}
    for (let iterator of aux) {
      acumulado.revenues += iterator.revenues
      acumulado.porcentaje += iterator.porcentajeDeAsistencia
      acumulado.cantidad ++
      
    }
    acumulado.porcentaje = acumulado.porcentaje/acumulado.cantidad
    return acumulado
  })
  return arraystic
  }

export function statistic(parametro){
    let Statics = parametro.map((e)=>{
      return {
          categoria : e.category,
          revenues : e.price * e.assistance? e.assistance : e.estimate,
          porcentajeDeAsistencia: ((e.assistance ? e.assistance : e.estimate) * 100)/e.capacity
      }
    })
    return Statics }

