import { Request, Response } from "express";

const todos = [
  { id: 1, text: "Buy milk", createdAt: new Date() },
  { id: 2, text: "Buy bread", createdAt: null },
  { id: 3, text: "Buy buter", createdAt: new Date() },
];

export class TodosController {
  //*Dependency Inyection
  constructor() {}
  public getTodos = (req: Request, res: Response) => {
    //Es muy común poner un return para que la aplicacion deje de ejecutarse
    return res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id; // + para volverlo numero
    if (isNaN(id))
      return res.status(400).json({ error: `ID argument is not a number` });
    const todo = todos.find((todo) => todo.id === id);
    todo
      ? res.json(todo)
      : res.status(404).json({ error: `TODO with id ${id} not found` });
  };

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text)
      return res.status(400).json({ error: "Text property is required" });

    const newTodo = {
      id: todos.length + 1,
      text: text,
      createdAt: null,
    };
    todos.push(newTodo);
    res.json(newTodo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: `ID argument is not a number` });

    const todo = todos.find((todo) => todo.id === id);
    if (!todo)
      return res.status(400).json({ error: `Todo with id ${id} not found` });

    const { text, createdAt } = req.body;
    if (!text)
      return res.status(400).json({ error: `Text property is requid` });

    todo.text = text || todo.text;
    createdAt === "null"
      ? (todo.createdAt = null)
      : (todo.createdAt = new Date(createdAt || todo.createdAt));
    //!OJO, referencia

    res.json(todo);
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: `ID argument is not a number` });

    const todo = todos.find((todo) => todo.id === id);
    if (!todo)
      return res.status(400).json({ error: `Todo with id ${id} not found` });

    todos.splice(todos.indexOf(todo), 1);
    // const newTodos = todos.filter((todo) => todo.id !== id);
    res.json(todo);
  };
}
