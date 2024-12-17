/* El numero 2 representa el nivel de error. (2 = error, 1 = warning, 0 = deshabilitado)*/
module.exports = {
  rules: {
    'header-max-length': [2, 'always', 400],
    'commit-format': [2, 'always'],
    'module-format': [2, 'always'],
    'type-format': [2, 'always'],
    'ticket-format': [2, 'always'],
  },
  // Definir mensajes personalizados para errores
  plugins: [
    {
      rules: {
        'commit-format': ({ header }) => {
          // Regex actualizada para manejar casos con y sin ticket
          const commitFormatRegex =
            /^\[.+\] - \[(Fix|Add|Refactor|Mod|Hotfix)\]( - |: ).+(\. \[.+\]\([^\)]*\))?$/;
          const noTicketFormatRegex = /^\[.+\] - \[(Fix|Add|Refactor|Mod|Hotfix)\]( - |: ).+$/;
          return [
            commitFormatRegex.test(header) || noTicketFormatRegex.test(header),
            'El formato del commit debe ser: "[Módulo] - [Tipo] - Descripción. opcional [Ticket opcional](URL)"',
          ];
        },
        'module-format': ({ header }) => {
          const moduleMatch = /^\[.+\]/.test(header);
          return [
            moduleMatch && header.match(/^\[.+\]/).length === 1,
            'El encabezado debe comenzar con UN módulo entre corchetes, e.g., "[Perfiles]"',
          ];
        },
        'type-format': ({ header }) => {
          const typeMatch = /\[(Fix|Add|Refactor|Mod|Hotfix)\]/.test(header);
          return [typeMatch, 'El tipo debe ser uno de: Fix, Add, Refactor, Mod, Hotfix'];
        },
        'ticket-format': ({ header }) => {
          // Si hay una parte de ticket, debe tener URL no vacía
          const ticketUrlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
          const ticketMatch = header.match(/\[.+\]\(([^\)]+)\)/);
          return ticketMatch
            ? [
                ticketUrlRegex.test(ticketMatch[1].trim()),
                'La URL del ticket debe ser una URL válida (ej: https://app.asana.com/...)',
              ]
            : [true];
        },
      },
    },
  ],
};

/*
Testing:

//Commit correcto - Con ticket
1. echo "[Perfiles] - [Fix] - Habilitar/Deshabilitar perfil. [Ticket](https://app.asana.com/0/1205855996523625/1208675701546458/f)" | npx commitlint

//Commit correcto - Sin ticket
2. echo "[UI] - [Add] - Agregar componente de navbar." | npx commitlint

//Commit correcto - Sin ticket y sin punto al final
3. echo "[Arreglos] - [Fix] - Agregar componente de navbar" | npx commitlint

//Commit correcto - Agregar descripcion con ":"
4. echo "[Cotizacion Standard] - [Hotfix]: Nuevo mensaje" | npx commitlint

//Commit mal formateado - No deberia permitir commit sin formato
5. echo "commit sin ningun tipo de formato" | npx commitlint

//Commit mal formateado - No deberia permitir commit convencionales
6. echo "fix: este es un commit convencional" | npx commitlint

//Commit mal formateado - No tiene ni el tipo, ni el modulo
7. echo "[] - [] - Agregar componente de navbar." | npx commitlint

//Commit mal formateado - Tiene el ticket pero vacio (Si no hay url no se agrega)
8. echo "[Arreglos] - [Fix] - Agregar componente de navbar. [Ticket]()" | npx commitlint

//Commit mal formateado - No tiene el modulo en el que se trabajo
9. echo "[] - [Mod] - Algun arreglo." | npx commitlint

//Commit Mal formateado - No tiene el tipo de commit
10. echo "[Componentes Nuevos] - [] - Se agregaron componentes nuevos de utilidad." | npx commitlint

//Commit mal formateado - No deberia de permitir descripcion vacia
11. echo "[Cotizacion Standard] - [Add]" | npx commitlint

//Commit mal formateado - No deberia de permitir descripcion vacia con un "-"
12. echo "[Cotizacion Standard] - [Mod] - " | npx commitlint

//Commit mal formateado - No deberia de permitir texto ramdom en la URL del ticket
13. echo "[Arreglos] - [Fix] - Agregar componente de navbar. [Ticket](asdasdasdasdasd)" | npx commitlint
*/
