
const SecurityMenu = () => {
  return (
    <div className='flex flex-col flex-1 gap-y-4'>
        <p className="w-full text-center font-medium text-[20px] text-gray-600">Claves</p>
        <div className="flex flex-col items-center gap-y-4">
          <button
            className="p-2 rounded-lg bg-gray-300 transition hover:bg-gray-400"
          >
            Generar claves
          </button>

          <div className="flex gap-x-4">
            <button
              className="p-2 rounded-lg w-[130px] bg-gray-300 transition hover:bg-gray-400"
            >
              Mostrar clave privada
            </button>
            <button
              className="p-2 rounded-lg w-[130px] bg-gray-300 transition hover:bg-gray-400"
            >
              Mostrar clave publica
            </button>
          </div>

        </div>
    </div>
  )
}

export default SecurityMenu