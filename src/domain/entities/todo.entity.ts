//Son nuestros objetos que están bien apegados, es lo más atómico de mi aplicación que no debería tener ninguna ingerencia del mundo exterior, es decir, todo lo que hagamos en domain no debería tener código externo como importancion de librerior o eso, solo el lenguaje de programacion que estemos usando
//Esto no está relacionada a mi bd, se asemeja mucho a lo que yo voy a grabar en la bd, pero esto es lo que yo usaré en mi aplicacion, no en la bd, y lo que yo despues tendré en la bd es indiferente porque la base de datos puede cambiar y si la bd cambia, yo no quiero que mi aplicacion se vea afectada. Entonces voy a tener que hacer las modificaciones respectivas a la hora de crear la entidad que esta es la q yo uso en mi programa, si esta entidad cambia, no debería verse afectada la base de datos tampoco
//Cada cosa que nosotros colocamos en domain son reglas que se van a imponer sobre todo lo demas, esto es lo más importante de mi aplicacion. Aquí después vamos a tener casos de uso. Los datasources son origenes de datos y los repositorios basicamente son métodos que vamos a tener para poder llegar a datasources, esto es básicamente todo. Los datasources y los repositorios en la carpeta de domain solo son las reglas para que nosotros podamos crear otros datasources, es decir, son las clases abstractas. Hay gente que las crea como interfaces.

export class TodoEntity {
  constructor(
    public id: number,
    public text: string,
    public completedAt?: Date | null,
  ) {}
  get isCompleted() {
    return !!this.completedAt;
  }

  //Para hacer un mapeo
  public static fromObject(object: { [key: string]: any }): TodoEntity {
    const { id, text, completedAt } = object;
    if (!id) throw "Id is required";
    if (!text) throw "text is required";

    let newCompletedAt;
    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (isNaN(newCompletedAt.getTime())) {
        throw "CompletedAt is not a valid date";
      }
    }
    return new TodoEntity(id, text, completedAt);
  }
}
