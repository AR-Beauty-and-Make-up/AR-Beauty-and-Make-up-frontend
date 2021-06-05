


const TEXT ={
    esp : {
        navbar: {
            title: "AR Beauty & Make up",
            subtitle1: "Tienda",
            subtitle2: "Turnos",
            subtitle3: "Servicios",
            login: "Iniciar sesión"
        },
        cartshopping: {
            header: "Tus compras",
            body: "Aun no tiene compras",
            footer: "Total:"
        },
        cartitem: {
            price: "Precio:",
            subtotal: "Subtotal:"
        },
        login: {
            header: "Iniciar sesión",
            validation: {
                email: {
                    error: "Correo electronico invalido",
                    required: "Debe completar este campo"
                },
                password: {
                    error: "Contraseña debe tener al menos 8 caracteres",
                    required: "Debe completar este campo"
                }
            },
            notification: "Se ha iniciado sesion exitosamente",
            label: {
                email: "Correo electronico",
                password: "Contraseña",
            },
            buttom: "Iniciar sesión",
            footer: {
                span: "Todavia no tienes una cuenta?",
                link: "Registate"
            }

        },
        signup: {
            name: "Debe completar este campo",
            lastname: "Debe completar este campo",
            email: {
                error: "Correo electronico invalido",
                required: "Debe completar este campo"
            },
            password: {
                error: "Contraseña debe tener al menos 8 caracteres",
                required: "Debe completar este campo"
            },
            notification: "Se ha dado de alta usuario exitosamente",
            header: "Registrate",
            title: "Llena este formulario para crear tu cuenta",
            label: {
                name: "Nombre",
                lastname: "Apellido",
                email: "Correo electronico",
                password: "Contraseña",
            },
            buttom: "Registrar"
        },
        profile: {
            header1: "Mis datos",
            header2: "Datos de cuenta",
            email: "Correo electronico",
            password: "Contraseña",
            header3: "Datos personales",
            fullname: "Nombre y Apellido",
            dateofbirth: "Fecha de nacimiento",
            phone: "Telefono",
            address: "Domicilios"
        },
        modalagenda: {
            client: "Nombre del Cliente",
            service: "Servicio",
            phone: "Teléfono",
            email: "Correo electronico",
            date: "Fecha y Hora",
            span: "Debe completar todos los campos."
        },
        removemodalconfirmation: {
            suggestion: "Está seguro de borrar este turno?",
            acept: "Aceptar",
            cancel: "Cancelar"
        },
        updatesucceed: {
            update: "El turno fue editado con éxito",
            delete: "El turno fue eliminado con éxito"
        },
        product: {
            buttom: "Agregar al carrito"
        },
        calendar: {
            locale: "es",
            placeholderText: "Elegir fecha",
            timeCaption: "Hora"
        },
        turn: {
            validation: {
                email: {
                    placeholder:"Ingrese un correo electronico", 
                    error: "Ingrese un correo electronico valido",
                    required: "Correo electronico es requerido"
                },
                contact: {
                    placeholder:"Ingrese un numero de contacto", 
                    error: "Numero de contacto debe incluir prefijo 011",
                    required: "Numero de contacto es requerido"
                },
                firstname: {
                    placeholder:"Ingrese primer nombre", 
                    required: "Primer nombre es requerido"
                },
                lastname: {
                    placeholder:"Ingrese apellido", 
                    required: "Apellido es requerido"
                },

            },
            label: {
                email: "Correo electronico",
                name: "Nombre",
                lastname: "Apellido",
                contact: "Numero de contacto"
            },
            buttom: "Completar datos",
            notification: {
                header: "Revisa tu correo",
                body1: "Enviamos un mail de confimacion a ",
                body2: "Deberás confirmar tu reserva dentro de los próximos 15 minutos.",
                body3: "De lo contrario, será cancelada automaticamente."
            },
            check: {
                disclaimer: "Declaro no tener fiebre ni haber estado en contacto con personas con diagnostico positivo de COVID-19" ,
                buttom: "Completar mis datos"
            },
            calendar: {
                date: "Selecionar fecha",
                buttom: "Aceptar"
            },
            service: "Elegir Servicio"
        }
    }

}


export default TEXT