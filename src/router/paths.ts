type BasePath = "movements";
type Paths = Record<BasePath, Record<"root", string> & Record<string, string>>;

const paths: Paths = {
  movements: {
    root: "movimientos",
    new: "crear",
    edit: "modificar",
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
