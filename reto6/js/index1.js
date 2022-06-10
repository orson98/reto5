'use strict';

  let productos = [
    new Producto('x-men', 12, 'español', 'accion', 10),
    new Producto('los vengadores', 15, 'ingles', 'ciencia ficción', 15),
    new Producto('rec', 10, 'portuguese', 'terror', 20),
    new Producto('red', 8, 'latino', 'infantil', 5)
  ];

  const contenedorAlerta = document.querySelector('#contenedorAlerta');
  let timeoutId = 0;

  const showAlert = (type, content) => {
    clearTimeout(timeoutId);
    contenedorAlerta.classList.remove('bg-primary');
    contenedorAlerta.classList.remove('bg-success');
    contenedorAlerta.classList.remove('bg-danger');
    switch (type) {
      case 'primary':
        contenedorAlerta.classList.add('bg-primary');
        break;
      case 'success':
        contenedorAlerta.classList.add('bg-success');
        break;
      case 'danger':
        contenedorAlerta.classList.add('bg-danger');
        break;
      default:
        contenedorAlerta.classList.add('bg-primary');
        break;
    }
    contenedorAlerta.innerHTML = content;
    timeoutId = setTimeout(() => {
      contenedorAlerta.innerHTML = '';
    }, 5000);
  };

  const getFormData = () => {
    const documentFormProducto = document.forms['formProducto'];
    const id = documentFormProducto['id'].value;
    const nombre = documentFormProducto['nombre'].value;
    const precio = documentFormProducto['precio'].value;
    const idioma = documentFormProducto['idioma'].value;
    const categoria = documentFormProducto['categoria'].value;
    const stock = documentFormProducto['stock'].value;

    return ({ id, nombre, precio, idioma, categoria, stock });
  };

  const validateForm = () => {
    const documentFormProducto = document.forms['formProducto'];
    const nombre = documentFormProducto['nombre'].value;
    const precio = documentFormProducto['precio'].value;
    const idioma = documentFormProducto['idioma'].value;
    const categoria = documentFormProducto['categoria'].value;
    const stock = documentFormProducto['stock'].value;

    return [nombre.trim(), precio.trim(), idioma.trim(), categoria.trim(), stock.trim()].includes('');
  };

  const resetForm = () => {
    const documentFormProducto = document.forms['formProducto'];
    documentFormProducto['id'].value = '';
    documentFormProducto['nombre'].value = '';
    documentFormProducto['precio'].value = '';
    documentFormProducto['idioma'].value = '';
    documentFormProducto['categoria'].value = '';
    documentFormProducto['stock'].value = '';
  };

  const createProduct = () => {
    const { nombre, precio, idioma, categoria, stock } = getFormData();
    if (validateForm()) {
      showAlert('danger', 'Completar todos los campos');
    } else {
      productos = [...productos, new Producto(nombre, +precio, idioma, categoria, +stock)];
      resetForm();
      readProducts();
      showAlert('primary', 'Registro creado');
    }
  };

  const readProducts = () => {
    const tBodyProducto = document.querySelector('#tBodyProducto');
    tBodyProducto.innerHTML = '';

    productos.forEach((element) => {
      const { id, nombre, precio, idioma, categoria, stock } = element;
      tBodyProducto.innerHTML += `
        <tr>
          <th>${id}</th>
          <td>${nombre}</td>
          <td>${precio.toLocaleString('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 2 })}</td>
          <td>${idioma}</td>
          <td>${categoria}</td>
          <td>${stock}</td>
          <td>
            <button
              class="bg-success rounded border-0 p-0"
              onclick="readProduct(${id})"
            >
              ✏
            </button>
            <button
              class="bg-danger rounded border-0 p-0"
              onclick="deleteProduct(${id})"
            >
              🗑
            </button>
          </td>
        </tr>
      `
    });
    showAlert('primary', 'Registros leídos');
  };

  const readProduct = (productId) => {
    const documentFormProducto = document.querySelector('#formProducto');
    const formTitle = document.querySelector('#formTitle');
    const formButton = document.querySelector('#formButton');

    const producto = productos.find((element) => {
      return element.id === productId;
    });
    const { id, nombre, precio, idioma, categoria, stock } = producto;

    formTitle.innerHTML = 'Editar producto';
    formButton.innerHTML = 'Editar';
    documentFormProducto['id'].value = id;
    documentFormProducto['nombre'].value = nombre;
    documentFormProducto['precio'].value = precio;
    documentFormProducto['idioma'].value = idioma;
    documentFormProducto['categoria'].value = categoria;
    documentFormProducto['stock'].value = stock;
    showAlert('primary', 'Registro leído');
  };

  const updateProduct = () => {
    const { id, nombre, precio, idioma, categoria, stock } = getFormData();
    const formTitle = document.querySelector('#formTitle');
    const formButton = document.querySelector('#formButton');

    if (validateForm()) {
      showAlert('danger', 'Completar todos los campos');
    } else {
      productos = productos.map((element) => {
        if (element.id !== +id) {
          return element;
        } else {
          element.nombre = nombre;
          element.precio = +precio;
          element.idioma = idioma;
          element.categoria = categoria;
          element.stock = +stock;
          return element;
        }
      });

      resetForm();
      formTitle.innerHTML = 'Crear producto';
      formButton.innerHTML = 'Crear';
      readProducts();
      showAlert('success', 'Registro actualizado');
    }
  };

  const deleteProduct = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-2',
        cancelButton: 'btn btn-danger mx-2'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí, elimínalo!',
      cancelButtonText: '¡No, cancélalo!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        productos = productos.filter((element) => {
          return element.id !== id;
        });
        readProducts();
        showAlert('danger', 'Registro eliminado');
        swalWithBootstrapButtons.fire(
          '¡Eliminado!',
          'Tu registro ha sido eliminado.',
          'success'
        );
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Tu registro está seguro',
          'error'
        );
      }
    });
  };

  const documentReady = () => {
    const formProducto = document.querySelector('#formProducto');

    const submitProduct = (e) => {
      e.preventDefault();
      const id = document.getElementById('formId').value;
      if (id === '') {
        createProduct();
      } else {
        updateProduct();
      }
    };

    readProducts();
    formProducto.addEventListener('submit', submitProduct);
  };

  document.addEventListener('DOMContentLoaded', documentReady);