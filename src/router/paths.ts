type BasePath = "movements" | "leads" | "providers" | "expenses";
type Paths = Record<BasePath, Record<"root", string> & Record<string, string>>;

const paths: Paths = {
  movements: {
    root: "movimientos",
    new: "crear",
    edit: "modificar",
  },
  leads: {
    root: "leads",
    new: "crear",
    edit: "modificar",
    events: "historial",
  },
  providers: {
    root: "proveedores",
    new: "crear",
    edit: "modificar",
  },
  expenses: {
    root: "gastos",
    new: "crear",
  },
};

export const getPath = (
  base: BasePath,
  child?: keyof (typeof paths)[BasePath],
  id?: unknown,
): string => {
  let path = `/${paths[base].root}`;

  if (child) {
    path += `/${paths[base][child]}`;
  }

  if (id) {
    path += `/${id}`;
  }

  return path;
};

export const getDynamicPath = (
  base: BasePath,
  child?: keyof (typeof paths)[BasePath],
  parameter?: string,
): string => {
  let path = getPath(base, child);

  if (parameter) {
    path += `/:${parameter}`;
  }

  return path;
};
