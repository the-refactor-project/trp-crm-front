type BasePath = "movements";
type Paths = Record<BasePath, Record<"root", string> & Record<string, string>>;

const paths: Paths = {
  movements: {
    root: "movimientos",
    new: "crear",
  },
};

export const getPath = (
  base: BasePath,
  child?: keyof (typeof paths)[BasePath],
): string => {
  if (child) {
    return `/${paths[base].root}/${paths[base][child]}`;
  }

  return paths[base].root;
};
